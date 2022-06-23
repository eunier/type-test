import {
  Component,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  Setter,
} from 'solid-js';

export const TypingBoard: Component<{
  targetWord: string;
  setTargetWordIndex: Setter<number>;
}> = props => {
  const [inputText, setInputText] = createSignal('');
  const [charsCount, setCharsCount] = createSignal(0);
  const [dateStart, setDateStart] = createSignal<Date>();
  const [elapsedMs, setElapsedMs] = createSignal(0);
  const [intervalNum, setIntervalNum] = createSignal(0);
  const inputValue = () => inputText().trim();
  const elapsedMin = () => elapsedMs() / 1000 / 60;

  const elapsedMinString = () => {
    const [whole, decimal] = elapsedMin().toString().split('.');
    const elapsedMinStringVal = `${whole}.${(decimal ?? '0').slice(0, 1)}`;
    return elapsedMinStringVal;
  };

  onMount(() =>
    setIntervalNum(
      setInterval(() => {
        if (dateStart()) {
          const date = new Date();
          const timeElapsedVal =
            date.getTime() - (dateStart() ?? date).getTime();
          setElapsedMs(timeElapsedVal);
        }
      })
    )
  );

  onCleanup(() => clearInterval(intervalNum()));

  const handleOnKeyDown: JSX.EventHandlerUnion<
    HTMLInputElement,
    KeyboardEvent
  > = e => {
    if (!dateStart()) setDateStart(new Date());

    if (e.key === ' ') {
      if (inputValue() !== '') {
        setCharsCount(charsCount() + inputValue().length + 1);
        props.setTargetWordIndex(prev => prev + 1);
      }

      setInputText('');
    }
  };

  return (
    <>
      <p>{props.targetWord}</p>
      <input
        value={inputValue()}
        onInput={e => setInputText(e.currentTarget.value)}
        onKeyDown={handleOnKeyDown}
      />
      <p>{`->${inputValue()}<-`}</p>
      <p>charsCount: {charsCount()}</p>
      <p>dateStart: {dateStart()?.toDateString()}</p>

      <p>
        elapsedMs: <code>{elapsedMs()}</code>
      </p>

      <p>
        elapsedMinString: <code>{elapsedMinString()}</code>
      </p>
      {/* <p>typedWords: {typedWords()}</p> */}
    </>
  );
};

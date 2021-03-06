import * as IO from 'fp-ts/IO';
import {
  Component,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  Setter,
} from 'solid-js';

export const TypingBoard: Component<{
  targetWord: IO.IO<string>;
  setTargetWordIndex: Setter<number>;
}> = props => {
  const [inputText, setInputText] = createSignal('');
  const [charsCount, setCharsCount] = createSignal(0);
  const [dateStart, setDateStart] = createSignal<Date>();
  const [elapsedMs, setElapsedMs] = createSignal(0);
  const [intervalNum, setIntervalNum] = createSignal(0);
  const [errorsCount, setErrorsCount] = createSignal(0);
  const inputValue = () => inputText().trim();
  const elapsedMin = () => elapsedMs() / 1000 / 60;
  const wordsCount = () => charsCount() / 5;
  const grossWpm = () => Math.floor(wordsCount() / elapsedMin() || 0);
  const netWpm = () =>
    Math.max((wordsCount() - errorsCount()) / elapsedMin() || 0, 0);

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
        if (inputValue() !== props.targetWord()) {
          const lookUp = {
            [props.targetWord.length]: () => props.targetWord,
            [inputValue().length]: () => inputValue(),
          };

          const key = Math.max(
            ...Object.keys(lookUp).map(key => parseInt(key))
          );

          const tickErrorCount = lookUp[key]().length;
          setErrorsCount(errorsCount() + tickErrorCount);
        }

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

      <p>wordsCount: {wordsCount()}</p>
      <p>grossWpm: {grossWpm()}</p>
      <p>errorsCount: {errorsCount()}</p>
      <p>netWpn: {netWpm()}</p>
    </>
  );
};

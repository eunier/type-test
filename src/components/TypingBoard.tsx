import { Component, createSignal, JSX, Setter } from 'solid-js';

export const TypingBoard: Component<{
  targetWord: string;
  setTargetWordIndex: Setter<number>;
}> = props => {
  const [inputText, setInputText] = createSignal('');
  const inputValue = () => inputText().trim();
  const [charsCount, setCharsCount] = createSignal(0);
  const [dateStart, setDateStart] = createSignal<Date>();
  const [timeElapsed, setTimeElapsed] = createSignal(0);

  setInterval(() => {
    if (dateStart()) {
      const date = new Date();
      const timeElapsedVal = date.getTime() - (dateStart() ?? date).getTime();
      setTimeElapsed(timeElapsedVal);
    }
  }, 1000);

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
      <p>timeElapsed: {timeElapsed()}</p>
      {/* <p>typedWords: {typedWords()}</p> */}
    </>
  );
};

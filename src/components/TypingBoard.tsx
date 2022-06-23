import { Component, createSignal, JSX, Setter } from 'solid-js';

export const TypingBoard: Component<{
  targetWord: string;
  setTargetWordIndex: Setter<number>;
}> = props => {
  // TODO pass whole text
  const [inputText, setInputText] = createSignal('');
  const inputValue = () => inputText().trim();
  const [charsCount, setCharsCount] = createSignal(0);
  const typedWords = () => charsCount() / 5;

  const handleOnKeyDown: JSX.EventHandlerUnion<
    HTMLInputElement,
    KeyboardEvent
  > = e => {
    if (e.key === ' ') {
      if (inputValue() !== '') {
        setCharsCount(charsCount() + props.targetWord.length);
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
      <p>typedWords: {typedWords()}</p>
    </>
  );
};

import { Component, createSignal, JSX, Setter } from 'solid-js';

export const TypingBoard: Component<{
  targetWord: string;
  setTargetWordIndex: Setter<number>;
}> = props => {
  const [inputText, setInputText] = createSignal('');
  const inputValue = () => inputText().trim();

  const handleOnKeyDown: JSX.EventHandlerUnion<
    HTMLInputElement,
    KeyboardEvent
  > = e => {
    if (e.key === ' ') {
      if (inputValue() !== '') props.setTargetWordIndex(prev => prev + 1);
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
      <p>{inputText()}</p>
    </>
  );
};

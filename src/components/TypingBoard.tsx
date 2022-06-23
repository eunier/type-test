import { Component, createSignal, JSX } from 'solid-js';

export const TypingBoard: Component<{ targetWord: string }> = props => {
  const [inputText, setInputText] = createSignal('');

  const handleOnKeyDown: JSX.EventHandlerUnion<
    HTMLInputElement,
    KeyboardEvent
  > = event => event.key === ' ' && setInputText('');

  return (
    <>
      <p>{props.targetWord}</p>
      <input
        value={inputText()}
        onInput={e => setInputText(e.currentTarget.value)}
        onKeyDown={handleOnKeyDown}
      />
      <p>{inputText()}</p>
    </>
  );
};

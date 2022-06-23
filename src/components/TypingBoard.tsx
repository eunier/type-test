import { Component, createSignal, JSX } from 'solid-js';

export const TypingBoard: Component = () => {
  const [inputText, setInputText] = createSignal('');

  const handleOnKeyDown: JSX.EventHandlerUnion<
    HTMLInputElement,
    KeyboardEvent
  > = event => {
    event.key === ' ' && setInputText('');
  };

  return (
    <>
      <input
        value={inputText()}
        onInput={e => setInputText(e.currentTarget.value)}
        onKeyDown={handleOnKeyDown}
      />
      <p>{inputText()}</p>
    </>
  );
};

import { Component, createSignal, JSX } from 'solid-js';

export const TypingBoard: Component = () => {
  const [text, setText] = createSignal('');

  const handleOnKeyDown: JSX.EventHandlerUnion<
    HTMLInputElement,
    KeyboardEvent
  > = event => {
    event.key === ' ' && setText('');
  };

  return (
    <>
      <input
        value={text()}
        onInput={e => setText(e.currentTarget.value)}
        onKeyDown={handleOnKeyDown}
      />
      <p>{text()}</p>
    </>
  );
};

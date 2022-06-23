import { Component, createSignal } from 'solid-js';

export const TypingBoard: Component = () => {
  const [text, setText] = createSignal('');

  return (
    <>
      <input type="text" onInput={e => setText(e.currentTarget.value)} />
      <p>{text()}</p>
    </>
  );
};

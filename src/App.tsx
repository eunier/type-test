import { faker } from '@faker-js/faker';
import { Component, createSignal } from 'solid-js';

import styles from './App.module.css';
import { TextDisplay } from './components/TextDisplay';
import { TypingBoard } from './components/TypingBoard';

const App: Component = () => {
  const [words] = createSignal(
    Array(50)
      .fill(null)
      .map(() => faker.random.word().toLowerCase())
  );

  const [targetWordIndex, setTargetWordIndex] = createSignal(0);
  const targetWord = () => words()[targetWordIndex()];
  const text = () => words().join(' ');

  return (
    <div class={styles.App}>
      <TextDisplay text={text()} />
      <TypingBoard targetWord={targetWord()} />
    </div>
  );
};

export default App;

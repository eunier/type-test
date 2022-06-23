import { faker } from '@faker-js/faker';
import { Component, createSignal } from 'solid-js';

import styles from './App.module.css';
import { TextDisplay } from './components/TextDisplay';
import { TypingBoard } from './components/TypingBoard';

const App: Component = () => {
  const [words] = createSignal(
    Array(50)
      .fill(null)
      .map(() => faker.random.word())
  );

  const text = () => words().join(' ').toLowerCase();

  return (
    <div class={styles.App}>
      <TextDisplay text={text()} />
      <TypingBoard />
    </div>
  );
};

export default App;

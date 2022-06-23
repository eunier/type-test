import type { Component } from 'solid-js';

import styles from './App.module.css';
import { TextDisplay } from './components/TextDisplay';
import { TypingBoard } from './components/TypingBoard';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <TextDisplay />
      <TypingBoard />
    </div>
  );
};

export default App;

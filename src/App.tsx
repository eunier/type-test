import type { Component } from 'solid-js';

import styles from './App.module.css';
import { TextDisplay } from './components/TextDisplay';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <TextDisplay />
    </div>
  );
};

export default App;

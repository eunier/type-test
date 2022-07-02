import { faker } from '@faker-js/faker';
import { pipe } from 'fp-ts/lib/function';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { toLowerCase } from 'fp-ts/string';
import { Component, createSignal } from 'solid-js';
import styles from './App.module.css';
import { TextDisplay } from './components/TextDisplay';
import { TypingBoard } from './components/TypingBoard';

const App: Component = () => {
  const [words] = createSignal(
    pipe(
      RNEA.range(0, 49),
      RNEA.map(() => faker.random.word()),
      RNEA.map(toLowerCase)
    )
  );

  const [targetWordIndex, setTargetWordIndex] = createSignal(0);
  const targetWord = () => words()[targetWordIndex()];
  const text = () => words().join(' ');

  return (
    <div class={styles.App}>
      <TextDisplay text={text()} />
      <TypingBoard
        targetWord={targetWord()}
        setTargetWordIndex={setTargetWordIndex}
      />
    </div>
  );
};

export default App;

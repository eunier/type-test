import { faker } from '@faker-js/faker';
import { pipe } from 'fp-ts/lib/function';
import { map, range } from 'fp-ts/lib/ReadonlyNonEmptyArray';
import { Component, createSignal } from 'solid-js';
import styles from './App.module.css';
import { TextDisplay } from './components/TextDisplay';
import { TypingBoard } from './components/TypingBoard';

const test = pipe(
  range(0, 49),
  map(i => faker.random.word())
);

console.log({ test });

const App: Component = () => {
  const [words] = createSignal(
    Array(50)
      .fill(null)
      .map(() => faker.random.word().toLowerCase())
  );
  const [test] = createSignal(range(0, 49));

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

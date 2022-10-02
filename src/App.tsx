import { faker } from '@faker-js/faker';
import { flow, pipe } from 'fp-ts/function';
import * as IO from 'fp-ts/IO';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as S from 'fp-ts/string';
import { Component, createSignal } from 'solid-js';
import styles from './App.module.css';
import { TextDisplay } from './components/TextDisplay';
import { TypingBoard } from './components/TypingBoard';

const App: Component = () => {
  const [words] = createSignal(
    pipe(
      RNEA.range(0, 49),
      RNEA.map(faker.random.word),
      RNEA.map(S.toLowerCase)
    )
  );

  const [targetWordIndex, setTargetWordIndex] = createSignal(O.some(0));
  // const targetWord = (): IO.IO<string> => () => words()[targetWordIndex()];
  const targetWord = (): IO.IO<string> => () => pipe(words()[0]);

  const text = flow(
    words,
    RNEA.reduce('', (b, a) => `${b} ${a}`)
  );

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

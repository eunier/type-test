import { faker } from '@faker-js/faker';
import styles from 'App.module.css';
import { TextDisplay } from 'components/TextDisplay';
import { TypingBoard } from 'components/TypingBoard';
import { flow, pipe } from 'fp-ts/function';
import * as IO from 'fp-ts/IO';
import * as RA from 'fp-ts/ReadonlyArray';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as Semigroup from 'fp-ts/Semigroup';
import * as S from 'fp-ts/string';
import { Component, createSignal } from 'solid-js';

const TextSemigroup: Semigroup.Semigroup<string> = {
  concat: (a, b) => `${a} ${b}`,
};

const App: Component = () => {
  const [words] = createSignal(
    pipe(RNEA.range(0, 49), RA.map(faker.random.word), RA.map(S.toLowerCase))
  );

  const [targetWordIndex, setTargetWordIndex] = createSignal(0);

  const targetWord = (): IO.IO<string> => () =>
    pipe(targetWordIndex(), idx => RA.toArray(words())[idx]);

  const text = flow(words, Semigroup.concatAll(TextSemigroup)(''));

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

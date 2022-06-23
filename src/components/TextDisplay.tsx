import { faker } from '@faker-js/faker';
import { Component, createSignal } from 'solid-js';

export const TextDisplay: Component = () => {
  const [words] = createSignal(
    Array(50)
      .fill(null)
      .map(() => faker.random.word())
  );

  const text = () => words().join(' ').toLowerCase();

  return <p>{text()}</p>;
};

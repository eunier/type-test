import { faker } from '@faker-js/faker';
import { Component, createSignal } from 'solid-js';

export const TextDisplay: Component = () => {
  const [text] = createSignal(faker.random.words(50).toLowerCase());

  return <p>{text}</p>;
};

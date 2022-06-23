import { Component } from 'solid-js';

export const TextDisplay: Component<{ text: string }> = props => {
  return <p>{props.text}</p>;
};

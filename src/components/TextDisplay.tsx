import { Component } from 'solid-js';

export type TextDisplayProps = { text: string };

export const TextDisplay: Component<TextDisplayProps> = props => {
  return <p>{props.text}</p>;
};

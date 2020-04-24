import React from 'react';
import { storiesOf } from '@storybook/react';

export interface ButtonProps {
  color: string;
  onClick?: (color: string) => void;
}
const Button: React.FC<ButtonProps> = ({ color, onClick }) => {
  return (
    <button type="button" style={{ color }} onClick={(): void => onClick && onClick(color)}>
      Color Button
    </button>
  );
};

export default {
  title: 'Button',
  component: Button,
};

storiesOf('ColorButton', module)
  .add('red', () => <Button color="red" />)
  .add('blue', () => <Button color="blue" />);

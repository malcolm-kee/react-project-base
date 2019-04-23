import { Input as OriInput } from 'antd';
import { InputProps as OriInputProps } from 'antd/lib/input/Input';
import * as React from 'react';
import { callAll } from '../lib/fn';

export interface InputProps extends OriInputProps {
  onChangeValue?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({ onChangeValue, onChange, ...props }) => (
  <OriInput
    onChange={callAll(onChange, onChangeValue && (ev => onChangeValue(ev.target.value)))}
    {...props}
  />
);

export const InputGroup = OriInput.Group;

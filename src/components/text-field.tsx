import * as React from 'react';
import { Field, FieldProps } from './field';
import { Input, InputProps } from './input';

export interface ITextFieldProps extends FieldProps, InputProps {}

export const TextField: React.FC<ITextFieldProps> = ({
  label,
  labelAlign,
  labelCol,
  validateStatus,
  ...inputProps
}) => (
  <Field label={label} validateStatus={validateStatus} required={inputProps.required}>
    <Input {...inputProps} />
  </Field>
);

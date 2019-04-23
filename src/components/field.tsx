import * as React from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

export interface FieldProps extends FormItemProps {}

export const Field: React.FC<FieldProps> = props => <Form.Item {...props} />;

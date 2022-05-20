import React from 'react';
import { Input as AntdInput } from 'antd';
import { ValueType } from '@/src/models/form-types/form-types';
interface IProps {
  placeholder?: string;
  name: string;
  onInput: (name: string, value: ValueType) => void;
  value?: string;
}
function Input({ placeholder, onInput, name, value }: IProps) {
  const handleInputChange = ({ target }: { target: HTMLInputElement }) => {
    onInput(name, target.value);
  };
  return <AntdInput placeholder={placeholder} onChange={handleInputChange} value={value} />;
}

export default Input;

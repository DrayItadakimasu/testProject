import React from 'react';
import { Select as AntdSelect } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { IOption, ValueType } from '../../models/form-types/form-types';
import { FieldNamesType } from 'antd/es/cascader';

// prop types
interface IProps {
  onSelect?: (name: string, value: ValueType) => void;
  name?: string;
  value?: ValueType;
  options?: IOption[];
  width?: number;
  additionalProps?: Record<string, number | string | boolean>;
  placeholder?: string;
  size?: SizeType;
}

function Select({
  value,
  options,
  onSelect,
  name,
  width = 100,
  additionalProps,
  placeholder,
  size = 'middle',
}: IProps) {
  // data
  const fieldNames: FieldNamesType = {
    label: 'title',
    value: 'id',
  };
  // actions
  const onSelectAction = (value: ValueType) => {
    if (name && onSelect) onSelect(name, value);
  };

  return (
    <div>
      <AntdSelect
        fieldNames={fieldNames}
        placeholder={placeholder}
        value={value}
        options={options}
        size={size}
        defaultValue={value}
        onSelect={onSelectAction}
        style={{ width: `${width}%` }}
        {...additionalProps}
      />
    </div>
  );
}

export default Select;

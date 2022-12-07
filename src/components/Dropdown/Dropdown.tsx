import React from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { FormControl, FormOption } from '../FormularStepper/FormularTypes';

interface Props extends FormControl<HTMLSelectElement> {
  multiple?: boolean;
  options: FormOption[];
}

const Dropdown = (props: Props) => {
  const {
    disabled, id, name, label, multiple, options, required, onChange,
  } = props;
  return (
    <div className={classNames(styles.Dropdown)}>
      <label className={classNames(styles.DropdownLabel)} htmlFor={id}>{label}</label>
      <select
        name={name}
        id={id}
        className={classNames(styles.DropdownSelect)}
        onChange={onChange}
        disabled={disabled}
        required={required}
        multiple={multiple}
      >
        {options.map((option, index) => (
          <option
            className={classNames(styles.DropdownSelectOption)}
            key={index}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
};

export default Dropdown;

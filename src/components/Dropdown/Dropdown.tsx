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
    <>
      <label className={classNames(styles.Label)} htmlFor={id}>{label}</label>
      <select
        name={name}
        id={id}
        className={classNames(styles.Select)}
        onChange={onChange}
        disabled={disabled}
        required={required}
        multiple={multiple}
      >
        {options.map((option, index) => (
          <option
            className={classNames(styles.Option)}
            key={index}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </>
  );
};

export default Dropdown;

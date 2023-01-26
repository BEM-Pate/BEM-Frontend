import React from 'react';
import classNames from 'classnames';
import styles from './Textfield.module.scss';
import { FormControl } from '../FormularStepper/FormularTypes';

interface Props extends FormControl {
  type?: 'text' | 'number' | 'email' | 'date' | 'password';
  placeholder?: string;
}

const Textfield = (props: Props) => {
  const {
    placeholder,
    type = 'text',
    id,
    name,
    disabled,
    onChange,
    label,
    required,
    onBlur,
    defaultValue,
  } = props;

  return (
    <div className={classNames(styles.Textfield)}>
      {label
          && (
          <label
            className={classNames(styles.TextfieldLabel)}
            htmlFor={id}
          >
            {label}
            {required && <span className={classNames(styles.TextfieldLabelRequired)}>*</span>}
          </label>
          )}
      <input
        placeholder={placeholder}
        className={classNames(styles.TextfieldInput)}
        type={type}
        id={id}
        name={name}
        disabled={disabled}
        onChange={onChange && ((e) => onChange(e.target.value))}
        onBlur={onBlur}
        required={required}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Textfield;

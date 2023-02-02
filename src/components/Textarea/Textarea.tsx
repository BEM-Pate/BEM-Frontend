import React from 'react';
import classNames from 'classnames';
import styles from './Textarea.module.scss';
import { FormControl } from '../FormularStepper/FormularTypes';

interface Props extends FormControl {
  placeholder?: string;
  resizable?: boolean;
  rows?: number;
}

const Textarea = (props: Props) => {
  const {
    placeholder,
    id,
    name,
    disabled,
    onChange,
    label,
    required,
    resizable,
    rows = 5,
    defaultValue,
  } = props;

  return (
    <div className={classNames(styles.Textarea)}>
      {label
        && (
          <label
            className={classNames(styles.TextareaLabel)}
            htmlFor={id}
          >
            {label}
            {required && <span className={classNames(styles.TextareaLabelRequired)}>*</span>}
          </label>
        )}
      <textarea
        className={classNames(styles.TextareaInput, { [styles.resizable]: resizable })}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange && ((e) => onChange(e.target.value.trim()))}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Textarea;

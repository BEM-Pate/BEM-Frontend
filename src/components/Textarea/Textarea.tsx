import React from 'react';
import classNames from 'classnames';
import styles from './Textarea.module.scss';
import { FormControl } from '../FormularStepper/FormularTypes';

interface Props extends FormControl {
  placeholder?: string;
  resizable?: boolean;
  defaultValue?: string;
  rows?: number;
}

const Textarea = (props: Props) => {
  const {
    placeholder, id, name, disabled, onChange, label, required, defaultValue, resizable, rows = 5,
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
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange && ((e) => onChange(e.target.value))}
      />
    </div>
  );
};

export default Textarea;

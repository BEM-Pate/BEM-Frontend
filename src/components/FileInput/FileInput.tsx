import React from 'react';
import classNames from 'classnames';
import styles from './FileInput.module.scss';
import { FormControl } from '../FormularStepper/FormularTypes';

interface Props extends FormControl<HTMLInputElement> {}

const FileInput = (props: Props) => {
  const {
    label, id, required, name, disabled, onChange, onBlur,
  } = props;
  return (
    <div className={classNames(styles.FileInput)}>
      {label
        && (
          <label
            className={classNames(styles.FileInputLabel)}
            htmlFor={id}
          >
            {label}
            {required && <span className={classNames(styles.FileInputLabelRequired)}>*</span>}
          </label>
        )}
      <input
        className={classNames(styles.FileInputInput)}
        type="file"
        id={id}
        name={name}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
    </div>
  );
};

export default FileInput;

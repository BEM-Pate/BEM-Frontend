import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import fileinput_placeholder from '../../images/icons/ui/fileinput_placeholder.svg';
import styles from './FileInput.module.scss';
import { FormControl } from '../FormularStepper/FormularTypes';

interface Props extends FormControl {}

const FileInput = (props: Props) => {
  const {
    label, id, required, name, disabled, onChange, onBlur,
  } = props;

  const [value, setValue] = useState<File | null>(null);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value]);

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
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className={classNames(styles.FileInputPreview)}
        htmlFor={id}
      >
        <img
          className={classNames(styles.FileInputPreviewImage)}
          src={value ? URL.createObjectURL(value) : fileinput_placeholder}
          alt=""
        />
      </label>
      <input
        className={classNames(styles.FileInputInput)}
        type="file"
        id={id}
        name={name}
        disabled={disabled}
        onChange={(e) => setValue(e.target.files && e.target.files[0])}
        onBlur={onBlur}
        required={required}
        accept="image/png, image/jpeg, image/jpeg4, image/jpeg"
      />
    </div>
  );
};

export default FileInput;

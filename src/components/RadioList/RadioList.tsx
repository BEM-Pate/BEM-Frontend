import React from 'react';
import classNames from 'classnames';
import { FormControl, FormOption } from '../FormularStepper/FormularTypes';
import styles from './RadioList.module.scss';

interface RadioListProps extends FormControl {
  options: FormOption[];
}

const RadioList = (props: RadioListProps) => {
  const {
    options, name, onChange, label: title, required,
  } = props;
  return (
    <div className={classNames(styles.RadioList)}>
      {title && (
        <span className={styles.RadioListLabel}>
          {title}
          {required && <span className={classNames(styles.RadioListLabelRequired)}>*</span>}
        </span>
      )}

      {options.map(({ value, label }, i) => (
        <div className={classNames(styles.RadioListOption)} key={i}>
          <input
            type="radio"
            value={value}
            id={`radio-${name}-${i}`}
            name={name}
            onChange={onChange && ((e) => onChange(e.target.value))}
            required={required}
          />
          <label
            htmlFor={`radio-${name}-${i}`}
            className={classNames(styles.RadioListOptionLabel)}
          >
            <span className={classNames(styles.RadioListOptionIcon)} />
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioList;

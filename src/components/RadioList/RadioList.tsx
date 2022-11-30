import React from 'react';
import classNames from 'classnames';
import { FormControl, FormOption } from '../FormularStepper/FormularTypes';
import styles from './RadioList.module.scss';

interface RadioListProps extends FormControl<HTMLInputElement> {
  options: FormOption[];
}

const RadioList = (props: RadioListProps) => {
  const {
    options, name, onChange, label: title, required,
  } = props;
  return (
    <div className={classNames(styles.RadioList)}>
      <span className={styles.RadioListLabel}>{title}</span>
      {options.map(({ value, label }, i) => (
        <div className={classNames(styles.RadioListOption)}>
          <input
            type="radio"
            value={value}
            id={`radio-${name}-${i}`}
            name={name}
            onChange={onChange}
            required={required}
          />
          <label htmlFor={`radio-${name}-${i}`}>{label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioList;

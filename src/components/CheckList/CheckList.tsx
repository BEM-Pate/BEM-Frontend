import React from 'react';
import classNames from 'classnames';
import { FormControl, FormOption } from '../FormularStepper/FormularTypes';
import styles from './CheckList.module.scss';

interface CheckListProps extends FormControl<HTMLInputElement> {
  options: FormOption[];
}

const CheckList = (props: CheckListProps) => {
  const {
    options, name, onChange, label: title, required,
  } = props;
  return (
    <div className={classNames(styles.CheckList)}>
      <span className={styles.CheckListLabel}>
        {title}
        {required && <span className={classNames(styles.CheckListLabelRequired)}>*</span>}
      </span>
      {options.map(({ value, label }, i) => (
        <div className={classNames(styles.CheckListOption)}>
          <input
            type="checkbox"
            value={value}
            id={`checkbox-${name}-${i}`}
            name={name}
            onChange={onChange}
            required={required}
          />
          <label htmlFor={`checkbox-${name}-${i}`}>{label}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckList;

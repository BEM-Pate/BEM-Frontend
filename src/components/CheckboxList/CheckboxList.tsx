import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import { FormControl, FormOption } from '../FormularStepper/FormularTypes';
import styles from './CheckboxList.module.scss';

interface Props extends FormControl {
  options: FormOption[];
  className?: any | undefined; 
}

const CheckboxList = (props: Props) => {
  const {
    options, name, onChange, label: title, required, className, defaultValue
  } = props;

  const [values, setValues] = useState<string[]>([]);

  const handleChange = (clickedValue: string) => {
    const newState = values.includes(clickedValue)
      ? values.filter((s) => s !== clickedValue)
      : [...values, clickedValue];

    setValues(newState);

    if (onChange) onChange(newState);
  }

  useEffect(() => {
    if(defaultValue) setValues(defaultValue);
  }, [defaultValue])

  return (
    <div className={classNames(styles.CheckboxList, className)}>
      {title && (
        <span className={styles.CheckboxListLabel}>
          {title}
          {required && <span className={classNames(styles.CheckboxListLabelRequired)}>*</span>}
        </span>
      )}
      {options.map(({ value, label }, i) => (
        <div className={classNames(styles.CheckboxListOption)} key={i}>
          <input
            type="checkbox"
            value={value}
            id={`check-${name}-${i}`}
            name={name}
            checked={values.includes(value) ? true : false}
            onChange={(e) => handleChange(e.target.value)}
            required={required}
          />
          <label
            htmlFor={`check-${name}-${i}`}
            className={classNames(styles.CheckboxListOptionLabel)}
          >
            <span className={classNames(styles.CheckboxListOptionIcon)} />
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;

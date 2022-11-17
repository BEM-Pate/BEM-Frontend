import React from 'react';
import classNames from 'classnames';
import { FormOption } from '../FormularStepper/FormularTypes';
import styles from './RadioList.module.scss';

interface RadioListProps {
  options: FormOption[];
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioList = (props: RadioListProps) => {
  const { options, name, onChange } = props;
  return (
    <div className={classNames(styles.RadioList)}>
      {options.map(({ value, label }, i) => (
        <div className={classNames(styles.RadioListOption)}>
          <input type="radio" value={value} id={`radio-${name}-${i}`} name={name} onChange={onChange} />
          <label htmlFor={`radio-${name}-${i}`}>{label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioList;

import React from 'react';
import PinCodeInput from 'react-pin-input';
import classNames from 'classnames';
import { FormControl } from '../FormularStepper/FormularTypes';
import styles from './PinInput.module.scss';

interface Props extends FormControl {
  length: number;
}

const PinInput = (props: Props) => {
  const {
    id, label, required, disabled, length, onChange,
  } = props;

  return (
    <div className={classNames(styles.PinInput)}>
      {label
        && (
          <label
            className={classNames(styles.PinInputLabel)}
            htmlFor={id}
          >
            {label}
            {required
              && <span className={classNames(styles.PinInputRequired)}>*</span>}
          </label>
        )}
      <PinCodeInput
        length={length}
        initialValue=""
        onChange={onChange && ((value: string) => onChange(value))}
        disabled={disabled}
        type="numeric"
        inputMode="number"
        autoSelect
      />
    </div>
  );
};

export default PinInput;

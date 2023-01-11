import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PhoneInputWithCountry from 'react-phone-number-input';
import de from 'react-phone-number-input/locale/de.json';
import flags from 'react-phone-number-input/flags';
import { FormControl } from '../FormularStepper/FormularTypes';
import styles from './PhoneNumberInput.module.scss';
import 'react-phone-number-input/style.css';

interface Props extends FormControl {}

const PhoneNumberInput = (props: Props) => {
  const {
    id, name, disabled, onChange, label, required, onBlur,
  } = props;

  const [value, setValue] = useState<any>();

  useEffect(() => {
    if (onChange) {
      onChange(value ?? '');
    }
  }, [value]);

  return (
    <div className={classNames(styles.PhoneNumberInput)}>
      {label
          && (
          <label
            className={classNames(styles.PhoneNumberInputLabel)}
            htmlFor={id}
          >
            {label}
            {required
              && <span className={classNames(styles.PhoneNumberInputLabelRequired)}>*</span>}
          </label>
          )}
      <PhoneInputWithCountry
        id={id}
        name={name}
        disabled={disabled}
        onChange={setValue}
        onBlur={onBlur}
        labels={de}
        flags={flags}
        defaultCountry="DE"
        international
        countryCallingCodeEditable={false}
      />
    </div>
  );
};

export default PhoneNumberInput;

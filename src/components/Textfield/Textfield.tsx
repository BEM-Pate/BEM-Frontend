import React, { HTMLInputTypeAttribute } from 'react';
import classNames from 'classnames';
import styles from './Textfield.module.scss';

interface Props {
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  id: string;
  name: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
}

const Textfield = (props: Props) => {
  const {
    placeholder, type, id, name, disabled, onChange, label,
  } = props;

  return (
    <div className={classNames(styles.Textfield)}>
      {label
          && (
          <label
            className={classNames(styles.TextfieldLabel)}
            htmlFor={id}
          >
            {label}
          </label>
          )}
      <input
        placeholder={placeholder}
        className={classNames(styles.TextfieldInput)}
        type={type}
        id={id}
        name={name}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default Textfield;

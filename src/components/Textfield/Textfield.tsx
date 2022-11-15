import React, { HTMLInputTypeAttribute } from 'react';
import classNames from 'classnames';
import styles from './Textfield.module.scss';

interface Props {
  placeholder: string,
  type: HTMLInputTypeAttribute,
  id: string,
  disabled?: boolean;
}

const Textfield = (props: Props) => {
  const {
    placeholder, type, id, disabled,
  } = props;

  return (
    <>
      <label hidden className={classNames(styles.Label)} htmlFor={id}>{placeholder}</label>
      <input
        placeholder={placeholder}
        className={classNames(styles.Input)}
        type={type}
        id={id}
        name={id}
        disabled={disabled}
      />
    </>
  );
};

export default Textfield;

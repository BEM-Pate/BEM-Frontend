import React, { HTMLInputTypeAttribute } from 'react';
import classNames from 'classnames';
import styles from './Textfield.module.scss';

interface TextfieldProps {
  children: string,
  type: HTMLInputTypeAttribute,
  id: string,
  disabled?: boolean;
}

/* Label is hidden because there is no need to see the placeholder text twice */
const Textfield: React.FC<TextfieldProps> = ({
  children, type, id, disabled,
}) => (
  <>
    <label className={classNames(styles.Label)} htmlFor={id}>{children}</label>
    <input
      placeholder={children}
      className={classNames(styles.Input)}
      type={type}
      id={id}
      name={id}
      disabled={disabled}
    />
  </>
);

export default Textfield;

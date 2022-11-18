import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface Props {
  type?: 'submit' | 'reset' | 'button' | undefined;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: Props) => {
  const {
    type = 'button', children, disabled, onClick = (() => {}),
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(styles.Button)}
    >
      {children}
    </button>
  );
};

export default Button;

import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: Props) => {
  const { children, disabled, onClick = (() => {}) } = props;
  return <button type="button" onClick={onClick} disabled={disabled} className={classNames(styles.Button)}>{children}</button>;
};

export default Button;

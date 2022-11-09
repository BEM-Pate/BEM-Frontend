import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface Props {
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: Props) => {
  const { children, onClick = (() => {}) } = props;
  return <button type="button" onClick={onClick} className={classNames(styles.Button)}>{children}</button>;
};

export default Button;

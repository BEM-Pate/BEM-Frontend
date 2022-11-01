import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode,
}

const Button = (props: ButtonProps) => {
  const { children } = props;
  return <button type="button" className={classNames(styles.Button)}>{children}</button>;
};

export default Button;

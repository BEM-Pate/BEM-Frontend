import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface Props {
  type?: 'submit' | 'reset' | 'button' | undefined;
  styling?: 'primary' | 'outline';
  icon?: boolean;
  className?: string | undefined;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: Props) => {
  const {
    type = 'button', styling = 'primary', icon = false, className = '', children, disabled, onClick = (() => {}),
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(styles.Button, {
        [styles.outlined]: styling === 'outline',
        [styles.icon]: icon,
      }, className)}
    >
      <p className={classNames(styles.ButtonbuttonText)}>{children}</p>
    </button>
  );
};

export default Button;

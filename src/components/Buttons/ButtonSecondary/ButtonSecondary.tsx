import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import styles from './ButtonSecondary.module.scss';

interface Props {
  type?: 'submit' | 'reset' | 'button' | undefined;
  styling?: 'primary' | 'outline';
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonSecondary = (props: Props) => {
  const {
    type = 'button', styling = 'primary', children, disabled, onClick = (() => {}),
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(styles.Button, { [styles.outlined]: styling === 'outline' })}
    >
      <p className={classNames(styles.ButtonbuttonText)}>{children}</p>
    </button>
  );
};

export default ButtonSecondary;

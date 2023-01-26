import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import arrow_setting from "../../images/icons/ui/arrow_setting.svg";

interface Props {
  type?: 'submit' | 'reset' | 'button' | undefined;
  styling?: 'primary' | 'outline' | 'link' | 'setting';
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
        [styles.link]: styling === 'link',
        [styles.setting]: styling === 'setting',
        [styles.icon]: icon,
      }, className)}
    >
      {children}
      {styling === 'setting' && <img src={arrow_setting} alt="arrow"></img>}
    </button>
  );
};

export default Button;

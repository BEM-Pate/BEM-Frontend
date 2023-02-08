import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import arrow_setting from "../../images/icons/ui/arrow_setting.svg";
import back_arrow from "../../images/icons/ui/arrow_back_dark.svg";

interface Props {
  type?: 'submit' | 'reset' | 'button' | undefined;
  styling?: 'primary' | 'outline' | 'link' | 'setting' | 'back';
  icon?: boolean;
  arrow?: boolean;
  className?: string | undefined;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: Props) => {
  const {
    type = 'button', styling = 'primary', arrow = true, icon = false, className = '', children, disabled, onClick = (() => {}),
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
        [styles.back]: styling === 'back',
        [styles.icon]: icon,
      }, className)}
    >
      {styling === 'back' && icon && <img src={back_arrow} alt="arrow"></img>}
      {children}
      {styling === 'setting' && arrow && <img src={arrow_setting} alt="arrow"></img>}
    </button>
  );
};

export default Button;

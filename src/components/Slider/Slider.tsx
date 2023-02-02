import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import styles from './Slider.module.scss';
import arrow_setting from "../../images/icons/ui/arrow_setting.svg";

interface Props {
  styling?: 'primary' | 'outline' | 'link' | 'setting';
  defaultValue?: number;
  min?: number;
  max?: number;
  label?: string;
  className?: string | undefined;
  disabled?: boolean;
  array?: Iterable<any>;
  onChange?: () => void;
}

const Slider = (props: Props) => {
  const {
  className = '', disabled, onChange = (() => {}), min, max, array
  } = props;

  if(array) {
    console.log(array)
  }

  return (
   <div>
    <div>
    <label></label>
    <p></p>
    </div>
     <input
      type="range"
      onChange={onChange}
      disabled={disabled}
      max={max}
      min={min}
      className={classNames(styles.Slider, className)}
    >  
    </input>
   </div>
  );
};

export default Slider;

import React from 'react';
import classNames from 'classnames';
import styles from './Slider.module.scss';
import { FormControl } from '../FormularStepper/FormularTypes';


interface Props extends FormControl {
    defaultValue?: number;
    min: number;
    max: number;
    step?: number;
}

const Slider = (props: Props) => {
  const {
min, max
  } = props;
  return (
    <div className={classNames(styles.Slider)}>
        <label>asd</label>
        <input
   className={classNames(styles.SliderInput)}
    type="range"
    min={min}
    max={max}
    defaultValue={20}
    >
    
    </input>
    </div>
  );
};

export default Slider;

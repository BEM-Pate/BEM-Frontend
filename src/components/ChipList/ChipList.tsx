import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { FormControl, FormOption } from "../FormularStepper/FormularTypes";
import styles from "./ChipList.module.scss";
import getEmoji from "../../helpers/emoji";

interface Props extends FormControl {
  options: FormOption[];
  defaultValue?: any[];
  className?: any | undefined;
}

const ChipList = (props: Props) => {
  const { options, onChange, className, defaultValue, name } = props;


  const [vaules, setValues] = useState<string[]>([]);

  
  const handleClick = (clickedValue: string) => {
    const newState = vaules.includes(clickedValue)
      ? vaules.filter((s) => s !== clickedValue)
      : [...vaules, clickedValue];

    setValues(newState);

    if (onChange) onChange(newState);
  };

  useEffect(() => {
    if(defaultValue) setValues(defaultValue);
  }, [defaultValue])

  return (
    <div className={classNames(styles.ChipList, className)}>
      {options.map(({ value, label }, index) => {
        return (
          <div key={index}>
            <label htmlFor={value}>{name}</label>
            <input
              id={`chip-${value}`}
              className={classNames(styles.ChipListChip, vaules.includes(value) ? styles.ChipListChipActive : "")}
              type="button"
              name={value}
              value={`${getEmoji(value)} ${label}`}
              onClick={(e: any) => handleClick(e.target.name)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChipList;

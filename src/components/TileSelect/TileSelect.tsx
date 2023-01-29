import React, {
  MouseEvent, useCallback, useEffect, useState,
} from 'react';
import classNames from 'classnames';
import { FormControl, FormOption } from '../FormularStepper/FormularTypes';
import styles from './TileSelect.module.scss';
import checkmarkCircled from '../../images/icons/ui/checkmark_circled.svg';

interface Props extends FormControl {
  options: FormOption[];
  multiple?: boolean;
}

const TileSelect = (props: Props) => {
  const {
    id, options, multiple, onChange,
  } = props;

  const [selected, setSelected] = useState<string | string[] | null>(multiple ? [] : null);

  const change = useCallback((e: MouseEvent<HTMLButtonElement>, newValue: string) => {
    e.preventDefault();
    if (multiple) {
      const selectedOptions = selected as string[];

      if (selectedOptions.some((o) => o === newValue)) {
        setSelected([...selectedOptions].filter((o) => o !== newValue));
      } else {
        setSelected([...selectedOptions, newValue]);
      }
    } else {
      setSelected(newValue);
    }
  }, [multiple, selected]);

  useEffect(() => {
    if (multiple) {
      setSelected([]);
    } else {
      setSelected(null);
    }
  }, [multiple]);

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [onChange, selected]);

  return (
    <div id={id} className={classNames(styles.TileSelect)}>
      {options.map((option, i) => (
        <button
          onClick={(e) => change(e, option.value)}
          key={i}
          className={classNames(styles.TileSelectTile, {
            [styles.selected]: multiple
              ? (selected as string[]).some((o) => o === option.value)
              : (selected as string) === option.value,
          })}
        >
          <div className={classNames(styles.TileSelectTileInner)}>
            {option.icon && <img src={option.icon} alt={option.label} />}
            {option.label}
            <img
              className={classNames(styles.TileSelectTileCheckmark)}
              src={checkmarkCircled}
              alt="selected"
            />
          </div>
        </button>
      ))}
    </div>
  );
};

export default TileSelect;

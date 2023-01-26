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

  const [selected, setSelected] = useState<FormOption | FormOption[] | null>(multiple ? [] : null);

  const change = useCallback((e: MouseEvent<HTMLButtonElement>, value: FormOption) => {
    e.preventDefault();
    if (multiple) {
      const selectedOptions = selected as FormOption[];

      if (selectedOptions.some((o) => o.value === value.value)) {
        setSelected([...selectedOptions].filter((o) => o.value !== value.value));
      } else {
        setSelected([...selectedOptions, value]);
      }
    } else {
      setSelected(value);
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
  }, [selected]);

  return (
    <div id={id} className={classNames(styles.TileSelect)}>
      {options.map((option, i) => (
        <button
          onClick={(e) => change(e, option)}
          key={i}
          className={classNames(styles.TileSelectTile, {
            [styles.selected]: multiple
              ? (selected as FormOption[]).some((o) => o.value === option.value)
              : (selected as FormOption)?.value === option.value,
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

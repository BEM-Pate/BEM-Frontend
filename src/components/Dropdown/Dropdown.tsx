import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { FormControl, FormOption } from '../FormularStepper/FormularTypes';
import expand from '../../images/icons/ui/expand.svg';

interface Props extends FormControl<HTMLSelectElement> {
  multiple?: boolean;
  options: FormOption[];
}

const Dropdown = (props: Props) => {
  const {
    disabled,
    id,
    name,
    label,
    multiple,
    options,
    required,
    onChange,
  } = props;
  const [value, setValue] = useState<string | string[] | undefined>(multiple ? [] : undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const updateValue = useCallback((e: any, newValue: any) => {
    e.preventDefault();
    if (multiple) {
      const values = value as any[];
      const newValueIsPresent = values.some((v) => v === newValue);
      if (e.shiftKey || e.ctrlKey) {
        if (newValueIsPresent) {
          setValue(values.filter((v) => v !== newValue));
        } else {
          setValue([...values, newValue]);
        }
      } else {
        setValue([newValue]);
      }
    } else {
      setValue(newValue);
      setIsOpen(false);
    }
  }, [multiple, value]);

  const toggleList = useCallback((e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (multiple) {
      setValue([]);
    } else {
      setValue(undefined);
    }
  }, [multiple]);

  const isEmpty = useCallback(() => {
    if (multiple) {
      return value && value?.length <= 0;
    }
    return value === undefined;
  }, [multiple, value]);

  const isSelected = useCallback((selectedValue: string) => {
    if (multiple) {
      return !!value
        && (value?.length > 0)
        && (value as string[]).some((v) => v === selectedValue);
    }
    return value === selectedValue;
  }, [multiple, value]);
  return (
    <div
      className={classNames(
        styles.Dropdown,
        {
          [styles.open]: isOpen,
          [styles.multiple]: multiple,
          [styles.disabled]: disabled,
        },
      )}
      id={id}
    >
      {label && (
        <span className={classNames(styles.DropdownLabel)}>
          {label}
          {required && <span className={classNames(styles.DropdownLabelRequired)}>*</span>}
        </span>
      )}
      <div className={classNames(styles.DropdownContainer)}>
        <button
          className={classNames(
            styles.DropdownValue,
            { [styles.DropdownValueEmpty]: isEmpty() },
          )}
          onClick={(e) => toggleList(e)}
        >
          {value || 'Please select...'}
          <img
            className={classNames(styles.DropdownValueIcon)}
            src={expand}
            alt=""
          />
        </button>
        <div className={classNames(styles.DropdownList)}>
          {options.map((option, index) => (
            <button
              className={classNames(
                styles.DropdownOption,
                { [styles.DropdownOptionSelected]: isSelected(option.value) },
              )}
              key={index}
              onClick={(e) => updateValue(e, option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <select
        className={classNames(styles.hidden)}
        value={value}
        name={name}
        onChange={onChange}
        multiple={multiple}
      >
        {options.map((option, i) => <option key={i} value={option.value}>{option.value}</option>)}
      </select>
    </div>
  );
};

export default Dropdown;

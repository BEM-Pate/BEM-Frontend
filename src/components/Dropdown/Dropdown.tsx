import React, { ChangeEventHandler } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';

interface Props {
  id: string,
  options: string[],
  label: string,
  disabled?: boolean;
  required?: boolean
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

/* onChange function in parent component:

const selectHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
  console.log(event.target.value);
};

*/

const Dropdown = (props: Props) => {
  const {
    disabled, id, label, options, required, onChange = (() => {}),
  } = props;
  return (
    <>
      <label className={classNames(styles.Label)} htmlFor={id}>{label}</label>
      <select
        name={id}
        id={id}
        className={classNames(styles.Select)}
        onChange={onChange}
        disabled={disabled}
        required={required}
      >
        {options.map((option, index) => (
          <option
            className={classNames(styles.Option)}
            key={index}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

    </>
  );
};

export default Dropdown;

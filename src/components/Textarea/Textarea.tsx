import React from 'react';
import classNames from 'classnames';
import styles from './Textarea.module.scss';

interface Props {
  placeholder?: string;
  id: string;
  name: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  label?: string;
  resizable?: boolean;
  rows?: number;
}

const Textarea = (props: Props) => {
  const {
    placeholder, id, name, disabled, onChange, label, resizable, rows,
  } = props;
  return (
    <div className={classNames(styles.Textarea)}>
      {label
        && (
          <label
            className={classNames(styles.TextareaLabel)}
            htmlFor={id}
          >
            {label}
          </label>
        )}
      <textarea
        className={classNames(styles.TextareaInput, { [styles.resizable]: resizable })}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;

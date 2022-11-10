import React from 'react';
import classNames from 'classnames';
import styles from './Textarea.module.scss';

interface Props {
  disabled?: boolean;
  id: string,
  placeholder: string,
  rows: number,
}

const Textarea = (props: Props) => {
  const {
    disabled, id, placeholder, rows,
  } = props;
  return (
    <>
      <label htmlFor={id} className={classNames(styles.Label)} hidden>{placeholder}</label>
      <textarea
        className={classNames(styles.Textarea)}
        disabled={disabled}
        id={id}
        name={id}
        placeholder={placeholder}
        rows={rows}
      />
    </>
  );
};

export default Textarea;

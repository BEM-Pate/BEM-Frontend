import React from 'react';
import classNames from 'classnames';
import styles from './FormularStepper.module.scss';
import { FormField } from './FormularTypes';

interface Props {
  fields: FormField[];
  title: string;
  active: boolean;
  onChange: any;
}

const FormularStep = (props: Props) => {
  const {
    fields, title, active, onChange,
  } = props;
  return (
    <div className={classNames(styles.FormularStep, { [styles.isActive]: active })}>
      <h1 className={classNames(styles.FormularStepTitle)}>{title}</h1>
      {fields.map((field, i) => {
        switch (field.type) {
          case 'number':
            return <input key={i} type="number" onChange={(e) => onChange(field.name, e.target.value)} />;
          case 'date':
            return <input key={i} type="date" onChange={(e) => onChange(field.name, e.target.value)} />;
          case 'text':
            return <input key={i} type="text" onChange={(e) => onChange(field.name, e.target.value)} />;
          case 'radio':
            return <>radio</>;
          default:
            return undefined;
        }
      })}
    </div>
  );
};

export default FormularStep;

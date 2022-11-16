import React from 'react';
import classNames from 'classnames';
import styles from './FormularStepper.module.scss';
import { FormField, FormValue } from './FormularTypes';
import Textfield from '../Textfield/Textfield';
import Textarea from '../Textarea/Textarea';

interface Props {
  fields: FormField[];
  title: string;
  active: boolean;
  onChange: (fieldName: string, newFieldValue: FormValue) => void;
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
            return (
              <Textfield
                key={i}
                type="number"
                id={`field-${field.name}`}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                onChange={(e) => onChange(field.name, e.target.value)}
              />
            );
          case 'date':
            return (
              <Textfield
                key={i}
                type="date"
                id={`field-${field.name}`}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                onChange={(e) => onChange(field.name, e.target.value)}
              />
            );
          case 'text':
            return (
              <Textfield
                key={i}
                type="text"
                id={`field-${field.name}`}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                onChange={(e) => onChange(field.name, e.target.value)}
              />
            );
          case 'textarea':
            return (
              <Textarea
                key={i}
                id={`field-${field.name}`}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                onChange={(e) => onChange(field.name, e.target.value)}
              />
            );
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

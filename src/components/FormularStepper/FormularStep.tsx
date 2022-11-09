import React from 'react';
import classNames from 'classnames';
import styles from './FormularStepper.module.scss';
import { FormField } from './FormularTypes';

interface Props {
  fields: FormField[];
  title: string;
}

const FormularStep = (props: Props) => {
  const { fields, title } = props;
  return (
    <div className={classNames(styles.FormularStep)}>
      <h1>{title}</h1>
      {JSON.stringify(fields)}
    </div>
  );
};

export default FormularStep;

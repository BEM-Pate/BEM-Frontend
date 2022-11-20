import React from 'react';
import classNames from 'classnames';
import styles from './FormularStepper.module.scss';

interface Props {
  title: string;
  active?: boolean;
  children?: React.ReactNode;
}

const FormularStep = (props: Props) => {
  const {
    title, active, children,
  } = props;
  return (
    <div className={classNames(styles.FormularStep, { [styles.isActive]: active })}>
      <h1 className={classNames(styles.FormularStepTitle)}>{title}</h1>
      {children}
    </div>
  );
};

export default FormularStep;

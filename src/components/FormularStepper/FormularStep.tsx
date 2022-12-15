import React from 'react';
import classNames from 'classnames';
import styles from './FormularStepper.module.scss';
import Headline from '../Headline/Headline';

interface Props {
  title?: string;
  active?: boolean;
  children?: React.ReactNode;
}

const FormularStep = (props: Props) => {
  const {
    title, active, children,
  } = props;
  return (
    <div className={classNames(styles.FormularStep, { [styles.isActive]: active })}>
      {title && (
      <Headline
        headline="h2"
        className={classNames(styles.FormularStepTitle)}
      >
        {title}
      </Headline>
      )}
      <div className={classNames(styles.FormularStepChildren)}>
        {children}
      </div>
    </div>
  );
};

export default FormularStep;

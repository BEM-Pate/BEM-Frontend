import React from 'react';
import classNames from 'classnames';
import styles from './FormularStepper.module.scss';
import Headline from '../Headline/Headline';
import { Validator } from '../../helpers/validators';

interface Props {
  title: string;
  // eslint-disable-next-line react/no-unused-prop-types
  validation?: { value: any, validation: Validator[] }[];
  // eslint-disable-next-line react/no-unused-prop-types
  nextStepAction?: () => boolean;
  active?: boolean;
  children?: React.ReactNode;
}

const FormularStep = (props: Props) => {
  const {
    title, active, children,
  } = props;
  return (
    <div className={classNames(styles.FormularStep, { [styles.isActive]: active })}>
      <Headline headline="h2" className={classNames(styles.FormularStepTitle)}>{title}</Headline>
      <div className={classNames(styles.FormularStepChildren)}>
        {children}
      </div>
    </div>
  );
};

export default FormularStep;

import React from 'react';
import classNames from 'classnames';
import styles from './ProgressIndicator.module.scss';

interface ProgressIndicatorProps {
  currentStep: number;
  max: number;
}

const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const { currentStep, max } = props;
  return (
    <div className={classNames(styles.ProgressIndicator)}>
      <div className={classNames(styles.ProgressIndicatorBar)} style={{ width: `${(currentStep / max) * 100}%` }} />
    </div>
  );
};

export default ProgressIndicator;

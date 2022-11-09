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
      {[...Array(max)].map((e, i) => {
        const isActive = i + 1 <= currentStep;

        return (
          <>
            {i !== 0 && (
            <span className={classNames(
              styles.ProgressIndicatorSeparator,
              { [styles.ProgressIndicatorSeparatorActive]: isActive },
            )}
            />
            )}
            <span
              key={`indicator-${i}`}
              className={classNames(
                styles.ProgressIndicatorElement,
                { [styles.ProgressIndicatorElementActive]: isActive },
              )}
            />
          </>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;

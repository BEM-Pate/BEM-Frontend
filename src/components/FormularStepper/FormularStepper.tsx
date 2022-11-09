import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import styles from './FormularStepper.module.scss';
import FormularStep from './FormularStep';
import { FormStep } from './FormularTypes';
import Button from '../Button/Button';

interface Props {
  steps: FormStep[];
}

const FormularStepper = (props: Props) => {
  const { steps } = props;
  const [currentStep, setCurrentStep] = useState(0);

  const previousStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  return (
    <div className={classNames(styles.FormularStepper)}>
      {steps.map((step) => <FormularStep fields={step.fields} title={step.title} />)}
      <div>
        <Button>Previous</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default FormularStepper;

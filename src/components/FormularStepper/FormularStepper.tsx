import React, {
  Children, useCallback, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import styles from './FormularStepper.module.scss';
import Button from '../Button/Button';
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator';
import Headline from '../Headline/Headline';
import arrowRight from '../../images/icons/ui/arrow_forward.svg';
import arrowLeft from '../../images/icons/ui/arrow_back.svg';
import Validators, { Validator } from '../../helpers/validators';

interface Props {
  dataLabels: any;
  dataFields: { [s: string]: any };
  submitAction: () => void;
  children?: React.ReactNode;
}

const FormularStepper = (props: Props) => {
  const {
    dataLabels, dataFields, submitAction, children,
  } = props;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStepIsValid, setCurrentStepIsValid] = useState<boolean>();

  const form = useRef<HTMLFormElement>(null);

  const previousStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const nextStep = useCallback(() => {
    if (currentStep <= Children.count(children)) {
      setCurrentStep(currentStep + 1);
    }
  }, [children, currentStep]);

  useEffect(() => {
    const validators = ((Children.toArray(children)[currentStep - 1] as any)
      ?.props?.validation ?? []) as { value: any, validation: Validator[] }[] | undefined;

    const valid = !validators?.some(
      ({ value, validation }) => Validators.validate(value, validation),
    );

    setCurrentStepIsValid(valid);
  }, [currentStep, children]);

  const submit = async () => {
    setIsSubmitting(true);
    await submitAction();
    setIsSubmitting(false);
  };

  const stepCount = Children.count(children);

  return (
    <div className={classNames(styles.FormularStepper)}>
      <form
        ref={form}
        className={classNames(styles.FormularStepperForm)}
      >
        {Children.map(
          children,
          (child, i) => (React.cloneElement(
            child as React.ReactElement,
            { active: i === currentStep - 1 },
          )
          ),
        )}
        <div className={classNames(
          styles.FormularData,
          { [styles.isActive]: currentStep > stepCount },
        )}
        >
          <Headline headline="h2">Summary</Headline>
          <div className={classNames(styles.FormularDataTable)}>
            {Object.entries(dataFields).map(([fieldName, fieldValue]) => (
              <div className={classNames(styles.FormularDataTableRow)}>
                <span className={classNames(styles.FormularDataTableKey)}>
                  {dataLabels[fieldName] || fieldName}
                </span>
                <span className={classNames(styles.FormularDataTableValue)}>
                  {fieldValue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </form>
      <div className={classNames(styles.FormularStepperProgress)}>
        <span className={classNames(styles.FormularStepperProgressCounter)}>
          <span className={classNames(styles.FormularStepperProgressCounterCurrent)}>
            {Math.min(currentStep, stepCount)}
          </span>
          <span className={classNames(styles.FormularStepperProgressCounterTotal)}>
            {`/${stepCount}`}
          </span>
        </span>
        <div className={classNames(styles.FormularStepperProgressControls)}>
          <Button
            className={classNames(styles.FormularStepperProgressControlsBack)}
            onClick={previousStep}
            disabled={currentStep <= 1}
            icon
          >
            <img
              className={classNames(styles.FormularStepperControlsIcon)}
              src={arrowLeft}
              alt=">"
            />
          </Button>
          {currentStep <= stepCount
          && (
          <Button onClick={nextStep} disabled={currentStep > stepCount || !currentStepIsValid} icon>
            <img
              className={classNames(styles.FormularStepperControlsIcon)}
              src={arrowRight}
              alt=">"
            />
          </Button>
          )}
          {currentStep > stepCount
          && <Button disabled={isSubmitting} onClick={submit}>Submit</Button>}
        </div>
        <div className={classNames(styles.FormularStepperProgressBar)}>
          <ProgressIndicator currentStep={currentStep} max={stepCount + 1} />
        </div>
      </div>
    </div>
  );
};

export default FormularStepper;

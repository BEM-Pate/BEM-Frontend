import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './FormularStepper.module.scss';
import FormularStep from './FormularStep';
import { FormStep, FormValue } from './FormularTypes';
import Button from '../Button/Button';
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator';

interface Props {
  steps: FormStep[];
}

const FormularStepper = (props: Props) => {
  const { steps } = props;
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<{ [key: string]: FormValue }>({});

  const previousStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const nextStep = useCallback(() => {
    if (currentStep <= steps.length) setCurrentStep(currentStep + 1);
  }, [currentStep]);

  const form = useRef<HTMLFormElement>(null);

  const submit = useCallback(() => {
    // TODO: handle validation
    console.log(formData);
  }, [formData]);

  const changeValue = useCallback((fieldName: string, newFieldValue: FormValue) => {
    const data = { ...formData };
    data[fieldName] = newFieldValue;
    setFormData(data);
  }, [formData]);

  const stepCount = steps.length;

  return (
    <div className={classNames(styles.FormularStepper)}>
      <ProgressIndicator currentStep={currentStep} max={stepCount + 1} />
      <form ref={form} className={classNames(styles.FormularStepperForm)} onSubmit={submit}>
        {steps.map((step, i) => (
          <FormularStep
            key={i}
            fields={step.fields}
            title={step.title}
            active={i + 1 === currentStep}
            onChange={
            (fieldName: string, newFieldValue: FormValue) => changeValue(fieldName, newFieldValue)
          }
          />
        ))}
        <div className={classNames(
          styles.FormularData,
          { [styles.isActive]: currentStep > stepCount },
        )}
        >
          <h1>Summary</h1>
          <table>
            <tbody>
              {steps.map((step) => step.fields.map((field) => (
                <tr>
                  <td>{field.label}</td>
                  <td>{formData[field.name]}</td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </form>
      <div className={classNames(styles.FormularStepperControls)}>
        <Button onClick={previousStep} disabled={currentStep <= 1}>Back</Button>
        {currentStep <= stepCount
          && <Button onClick={nextStep} disabled={currentStep > stepCount}>Next</Button>}
        {currentStep > stepCount && <Button onClick={submit}>Submit</Button>}
      </div>
    </div>
  );
};

export default FormularStepper;

import React, {
  Children, FormEvent, useCallback, useRef, useState,
} from 'react';
import classNames from 'classnames';
import styles from './FormularStepper.module.scss';
import Button from '../Button/Button';
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator';

interface Props {
  postUrl: string;
  postDataStructure: (args: any) => any;
  postDataLabels: any;
  children?: React.ReactNode;
}

const FormularStepper = (props: Props) => {
  const {
    postUrl, postDataStructure, postDataLabels, children,
  } = props;
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const form = useRef<HTMLFormElement>(null);

  const previousStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const nextStep = useCallback(() => {
    if (currentStep <= Children.count(children)) setCurrentStep(currentStep + 1);

    setFormData(new FormData(form.current ?? undefined));
  }, [currentStep, form]);

  const submit = useCallback((e: FormEvent) => {
    // TODO: handle validation
    e.preventDefault();

    // console.log(form.current?.querySelector(':invalid')?.parentElement);

    const parsedFormData: any = {};
    formData.forEach((value, key) => {
      parsedFormData[key] = value;
    });

    fetch(postUrl, {
      body: postDataStructure(parsedFormData),
      method: 'POST',
    });
  }, [form]);

  const stepCount = Children.count(children);

  return (
    <div className={classNames(styles.FormularStepper)}>
      <ProgressIndicator currentStep={currentStep} max={stepCount + 1} />
      <form
        ref={form}
        className={classNames(styles.FormularStepperForm)}
        onSubmit={submit}
        noValidate
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
          <h1>Summary</h1>
          <table>
            <tbody>
              {Array.from(formData.entries(), ([key, value]) => (
                <tr>
                  <td>{postDataLabels[key] || key}</td>
                  {/* eslint-disable-next-line no-nested-ternary */}
                  <td>{typeof value === 'string' ? ((key === 'password' && value !== '') ? '******' : value) : 'File'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={classNames(styles.FormularStepperControls)}>
          <Button onClick={previousStep} disabled={currentStep <= 1}>Back</Button>
          {currentStep <= stepCount
            && <Button onClick={nextStep} disabled={currentStep > stepCount}>Next</Button>}
          {currentStep > stepCount
            && <Button type="submit">Submit</Button>}
        </div>
      </form>
    </div>
  );
};

export default FormularStepper;

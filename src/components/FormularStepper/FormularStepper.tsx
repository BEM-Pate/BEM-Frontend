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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useRef<HTMLFormElement>(null);

  const parseFormData = (data: FormData) => {
    const parsedFormData: any = {};
    Array.from(data.entries()).forEach(([key, value]) => {
      if (key in parsedFormData) {
        if (!Array.isArray(parsedFormData[key])) {
          parsedFormData[key] = [parsedFormData[key]];
        }
        parsedFormData[key].push(value);
      } else {
        parsedFormData[key] = value;
      }
    });

    return parsedFormData;
  };

  const previousStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const nextStep = useCallback(() => {
    if (currentStep <= Children.count(children)) setCurrentStep(currentStep + 1);

    setFormData(new FormData(form.current ?? undefined));
  }, [currentStep, form]);

  const submit = useCallback((e: FormEvent) => {
    e.preventDefault();

    const invalidElement = form.current?.querySelector(':invalid') as Node | null;
    if (invalidElement !== null) {
      for (let i = 0; i < Children.count(children); i += 1) {
        if (form.current?.children.item(i)?.contains(invalidElement)) {
          setCurrentStep(i + 1);
          return;
        }
      }
    }

    const parsedFormData = parseFormData(formData);

    setIsSubmitting(true);

    fetch(postUrl, {
      body: postDataStructure(parsedFormData),
      method: 'POST',
    }).finally(() => {
      setIsSubmitting(false);
    });
  }, [form, currentStep]);

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
              {Object.entries(parseFormData(formData)).map(([key, value]) => (
                <tr>
                  <td>{postDataLabels[key] || key}</td>
                  {/* eslint-disable-next-line no-nested-ternary */}
                  <td>{typeof value === 'string' ? ((key === 'password' && value !== '') ? '******' : value) : Array.isArray(value) ? value.join(', ') : 'File'}</td>
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
            && <Button disabled={isSubmitting} type="submit">Submit</Button>}
        </div>
      </form>
    </div>
  );
};

export default FormularStepper;

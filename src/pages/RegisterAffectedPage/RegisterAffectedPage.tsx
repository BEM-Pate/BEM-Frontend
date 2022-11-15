import React from 'react';
import classNames from 'classnames';
import styles from './RegisterAffectedPage.module.scss';
import FormularStepper from '../../components/FormularStepper/FormularStepper';
import { FormStep } from '../../components/FormularStepper/FormularTypes';

interface LandingPageProps {
  children?: React.ReactNode
}

const RegisterAffectedPage = (props: LandingPageProps) => {
  const { children } = props;

  const fields: FormStep[] = [
    {
      title: 'Titel',
      fields: [
        { type: 'text', name: 'text1', label: 'Label 1' },
        { type: 'text', name: 'text2', label: 'Label 2' },
        {
          type: 'number', name: 'text3', label: 'Label 3', value: 42,
        }],
    },
    {
      title: 'Titel 2',
      fields: [
        { type: 'text', name: 'text4', label: 'Label 4' }, {
          type: 'number', name: 'text5', label: 'Label 5', value: 42,
        }],
    },
    {
      title: 'Titel 3',
      fields: [
        { type: 'text', name: 'text6', label: 'Label 6' }, {
          type: 'number', name: 'text7', label: 'Label 7', value: 42,
        }],
    },
  ];

  return (
    <div className={classNames(styles.RegisterAffectedPage)}>
      <h1>register affected page</h1>
      {children}
      <FormularStepper steps={fields} />
    </div>
  );
};

export default RegisterAffectedPage;

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
      title: 'Wer bist du?',
      fields: [
        { type: 'text', name: 'surname', label: 'Vorname' },
        { type: 'text', name: 'name', label: 'Nachname' },
        { type: 'email', name: 'text3', label: 'Email' },
      ],
    },
    {
      title: 'Was kannst Du anbieten?',
      fields: [
        {
          type: 'radio',
          name: 'text4',
          options: [
            { value: 'case-study', label: 'BEM-Fallbegleitung' },
            { value: 'consulting', label: 'BEM-Beratung allgemein' },
            { value: 'consulting-disease', label: 'BEM-Beratung für ein spezielles Krankheitsbild' },
          ],
        }, {
          type: 'select', name: 'certificate', label: 'Zertifikat wählen',
        }],
    },
    {
      title: 'Titel 3',
      fields: [
        { type: 'textarea', name: 'experiences', label: 'Was sind Deine Erfahrungen in Bezug auf BEM und psychische Erkrankungen?' },
        { type: 'textarea', name: 'motivation', label: 'Was motiviert dich, BEM-Pate zu werden?' },
      ],
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

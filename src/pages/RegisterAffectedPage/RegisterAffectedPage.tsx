import React from 'react';
import classNames from 'classnames';
import styles from './RegisterAffectedPage.module.scss';
import FormularStepper from '../../components/FormularStepper/FormularStepper';
import FormularStep from '../../components/FormularStepper/FormularStep';
import Textfield from '../../components/Textfield/Textfield';
import RadioList from '../../components/RadioList/RadioList';

interface LandingPageProps {
  children?: React.ReactNode;
}

const RegisterAffectedPage = (props: LandingPageProps) => {
  const { children } = props;

  return (
    <div className={classNames(styles.RegisterAffectedPage)}>
      <h1>register affected page</h1>
      {children}
      <FormularStepper
        postUrl="backend-url"
        postDataStructure={(
          {
            email,
            firstName,
            lastName,
            password,
            meetingNeeds,
            meetingPreference,
          },
        ) => ({
          email,
          firstName,
          lastName,
          password,
          meetingPreference: {
            support: '',
            diseaseConsultation: '',
            meeting: '',
            location: '',
            time: '',
          },
          supportGroup: {
            groupAdmin: 'string',
            title: 'string',
            description: 'string',
            picture: 'string',
            meeting: {
              support: meetingNeeds,
              diseaseConsultation: 'string',
              meeting: meetingPreference,
              location: 'string',
              time: '2022-06-11T01:02:03+00:00',
            },
            virtualPreference: 'string',
          },
          processBEM: 'NOT_STARTED',
          bemInformation: {
            diseases: [
              'string',
            ],
            occupation: 'string',
            languages: [
              'string',
            ],
          },
        })}
        postDataLabels={{
          email: 'E-Mail',
          firstName: 'Vorname',
          lastName: 'Nachname',
          password: 'Passwort',
        }}
      >
        <FormularStep title="Werde Teil der BEMpsy Community - Du bist nicht allein!">
          <Textfield type="text" id="textfield-firstName" name="firstName" label="Vorname" required />
          <Textfield type="text" id="textfield-lastName" name="lastName" label="Nachname" required />
          <Textfield type="email" id="textfield-email" name="email" label="Email" required />
          <Textfield
            type="password"
            id="textfield-password"
            name="password"
            label="Passwort"
            required
          />
          <RadioList
            id="radiolist-inProgress"
            label="Befindest du dich bereits im BEM-Prozess?"
            name="inProgress"
            options={[
              { value: 'true', label: 'Ja' },
              { value: 'false', label: 'Nein' },
            ]}
            required
          />
        </FormularStep>
        <FormularStep title="Werde Teil der BEMpsy Community - Du bist nicht allein!">
          <RadioList
            id="radiolist-needs"
            name="meetingNeeds"
            label="Was brauchst du?"
            options={[
              { value: 'CASE_SUPPORT', label: 'BEM Fallbegleitung' },
              { value: 'CASE_CONSULTING', label: 'BEM-Beratung Allgemein' },
              { value: 'CASE_CONSULTING_SPECIALIZED', label: 'BEM-Beratung auf ein spezielles Krankheitsbild bezogen' },
            ]}
            required
          />
          <RadioList
            id="radiolist-meetingPreference"
            name="meetingPreference"
            label="Präferenzen für ein Treffen"
            options={[
              { value: 'IN_PERSON', label: 'persönlich' },
              { value: 'VIRTUAL', label: 'virtuell' },
            ]}
            required
          />
        </FormularStep>
      </FormularStepper>
    </div>
  );
};

export default RegisterAffectedPage;

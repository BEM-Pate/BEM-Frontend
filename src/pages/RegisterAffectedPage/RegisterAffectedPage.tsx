import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './RegisterAffectedPage.module.scss';
import FormularStepper from '../../components/FormularStepper/FormularStepper';
import FormularStep from '../../components/FormularStepper/FormularStep';
import Textfield from '../../components/Textfield/Textfield';
import RadioList from '../../components/RadioList/RadioList';
import { API_ADDRESS } from '../../helpers/env';
import Dropdown from '../../components/Dropdown/Dropdown';

interface LandingPageProps {
  children?: React.ReactNode;
}

const RegisterAffectedPage = (props: LandingPageProps) => {
  const { children } = props;

  const [selectDisease, setSelectDisease] = useState(false);

  return (
    <div className={classNames(styles.RegisterAffectedPage)}>
      <h1>register affected page</h1>
      {children}
      <FormularStepper
        postUrl={`${API_ADDRESS}/user/register/defaultUser`}
        postDataStructure={(
          {
            email,
            firstName,
            lastName,
            password,
            meetingNeeds,
            meetingNeedsDisease,
            meetingPreference,
            inProgress,
          },
        ) => ({
          email,
          firstName,
          lastName,
          password,
          meetingPreference: {
            support: meetingNeeds,
            diseaseConsultation: '',
            meeting: meetingPreference,
            location: '',
            time: '',
          },
          processBEM: inProgress,
          bemInformation: {
            diseases: Array.isArray(meetingNeedsDisease)
              ? meetingNeedsDisease
              : [meetingNeedsDisease],
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
          inProgress: 'BEM Prozessstatus',
          meetingNeeds: 'Auf der Suche nach',
          meetingNeedsDisease: 'Krankheitsbild',
          meetingPreference: 'Präferenzen für ein Treffen',
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
              { value: 'RUNNING', label: 'Ja' },
              { value: 'NOT_STARTED', label: 'Nein' },
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
            onChange={(e) => setSelectDisease(e.target.value === 'CASE_CONSULTING_SPECIALIZED')}
            required
          />
          {selectDisease && (
          <Dropdown
            id="dropdown-disease"
            label="Bitte wähle dein Krankheitsbild"
            name="meetingNeedsDisease"
            options={[
              {
                value: 'disease-1',
                label: 'Krankheit 1',
              },
              {
                value: 'disease-2',
                label: 'Krankheit 2',
              },
              {
                value: 'disease-3',
                label: 'Krankheit 3',
              },
            ]}
            multiple
            required
          />
          )}
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

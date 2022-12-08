import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './RegisterSeekerPage.module.scss';
import FormularStepper from '../../components/FormularStepper/FormularStepper';
import FormularStep from '../../components/FormularStepper/FormularStep';
import Textfield from '../../components/Textfield/Textfield';
import RadioList from '../../components/RadioList/RadioList';
import { API_ADDRESS } from '../../helpers/env';
import Dropdown from '../../components/Dropdown/Dropdown';

interface LandingPageProps {
  children?: React.ReactNode;
}

const RegisterSeekerPage = (props: LandingPageProps) => {
  const { children } = props;

  const [selectDisease, setSelectDisease] = useState(false);

  return (
    <div className={classNames(styles.RegisterAffectedPage)}>
      {children}
      <FormularStepper
        postUrl={`${API_ADDRESS}/user/register/seeker`}
        postDataStructure={(
          {
            email,
            firstName,
            lastName,
            password,
            meetingPreferenceSupport,
            meetingPreferenceDisease,
            meetingPreferenceMeeting,
            inProgress,
          },
        ) => ({
          email,
          firstName,
          lastName,
          password,
          meetingPreference: {
            support: meetingPreferenceSupport,
            diseaseConsultation: Array.isArray(meetingPreferenceDisease)
              ? meetingPreferenceDisease
              : [meetingPreferenceDisease],
            meeting: meetingPreferenceMeeting,
          },
          processBEM: inProgress,
          experience: 'tsdfsdsd',
          motivation: 'sdfregverv',
          bemInformation: {
            diseases: Array.isArray(meetingPreferenceDisease)
              ? meetingPreferenceDisease
              : [meetingPreferenceDisease],
            occupation: ['PHYSICAL'],
            languages: ['DE', 'EN'],
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
            name="meetingPreferenceSupport"
            label="Was brauchst du?"
            options={[
              { value: 'CASE_SUPPORT', label: 'BEM Fallbegleitung' },
              { value: 'CONSULTATION', label: 'BEM-Beratung Allgemein' },
              { value: 'DISEASE_CONSULTATION', label: 'BEM-Beratung auf ein spezielles Krankheitsbild bezogen' },
            ]}
            onChange={(e) => setSelectDisease(e.target.value === 'DISEASE_CONSULTATION')}
            required
          />
          {selectDisease && (
          <Dropdown
            id="dropdown-disease"
            label="Bitte wähle dein Krankheitsbild (Mehrfachauswahl möglich)"
            name="meetingNeedsDisease"
            options={[
              {
                value: 'ACUTE_CRISIS',
                label: 'ACUTE_CRISIS',
              },
              {
                value: 'OVERLOAD',
                label: 'OVERLOAD',
              },
              {
                value: 'DEPRESSION',
                label: 'DEPRESSION',
              },
              {
                value: 'ADDICTION',
                label: 'ADDICTION',
              },
              {
                value: 'BURNOUT',
                label: 'BURNOUT',
              },
              {
                value: 'FEAR',
                label: 'FEAR',
              },
            ]}
            multiple
            required
          />
          )}
          <RadioList
            id="radiolist-meetingPreference"
            name="meetingPreferenceMeeting"
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

export default RegisterSeekerPage;

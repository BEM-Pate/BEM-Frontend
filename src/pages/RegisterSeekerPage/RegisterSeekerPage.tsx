import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './RegisterSeekerPage.module.scss';
import FormularStepper from '../../components/FormularStepper/FormularStepper';
import FormularStep from '../../components/FormularStepper/FormularStep';
import Textfield from '../../components/Textfield/Textfield';
import RadioList from '../../components/RadioList/RadioList';
import Dropdown from '../../components/Dropdown/Dropdown';

const RegisterSeekerPage = () => {
  const { t } = useTranslation();

  const [selectDisease, setSelectDisease] = useState(false);

  return (
    <div className={classNames(styles.RegisterAffectedPage)}>
      <FormularStepper
        postUrl="/user/register/seeker"
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
          email: t('labelEMail'),
          firstName: t('labelFirstName'),
          lastName: t('labelLastName'),
          password: t('labelPassword'),
          inProgress: t('registerSeekerStatus'),
          meetingNeeds: t('registerSeekerNeeds'),
          meetingNeedsDisease: t('labelDiseaseProfile'),
          meetingPreference: t('registerSeekerMeetingHeader'),
        }}
      >
        <FormularStep title={t('registerSeekerHeader')!}>
          <Textfield
            type="text"
            id="textfield-firstName"
            name="firstName"
            label={t('labelFirstName')!}
            required
          />
          <Textfield
            type="text"
            id="textfield-lastName"
            name="lastName"
            label={t('labelLastName')!}
            required
          />
          <Textfield
            type="email"
            id="textfield-email"
            name="email"
            label={t('labelEMail')!}
            required
          />
          <Textfield
            type="password"
            id="textfield-password"
            name="password"
            label={t('labelPassword')!}
            required
          />
          <RadioList
            id="radiolist-inProgress"
            label={t('registerSeekerStatus')!}
            name="inProgress"
            options={[
              { value: 'RUNNING', label: t('labelYes') },
              { value: 'NOT_STARTED', label: t('labelNo') },
            ]}
            required
          />
        </FormularStep>
        <FormularStep title={t('registerSeekerStatus')!}>
          <RadioList
            id="radiolist-needs"
            name="meetingPreferenceSupport"
            label={t('registerSeekerNeeds')!}
            options={[
              { value: 'CASE_SUPPORT', label: t('registerSeekerNeedsOption1') },
              { value: 'CONSULTATION', label: t('registerSeekerNeedsOption2') },
              { value: 'DISEASE_CONSULTATION', label: t('registerSeekerNeedsOption3') },
            ]}
            onChange={(e) => setSelectDisease(e.target.value === 'DISEASE_CONSULTATION')}
            required
          />
          {selectDisease && (
          <Dropdown
            id="dropdown-disease"
            label={t('registerSeekerDiseaseHeader')!}
            name="meetingNeedsDisease"
            options={[
              {
                value: 'ACUTE_CRISIS',
                label: t('registerSeekerDiseaseOption1'),
              },
              {
                value: 'OVERLOAD',
                label: t('registerSeekerDiseaseOption2'),
              },
              {
                value: 'DEPRESSION',
                label: t('registerSeekerDiseaseOption3'),
              },
              {
                value: 'ADDICTION',
                label: t('registerSeekerDiseaseOption4'),
              },
              {
                value: 'BURNOUT',
                label: t('registerSeekerDiseaseOption5'),
              },
              {
                value: 'FEAR',
                label: t('registerSeekerDiseaseOption6'),
              },
            ]}
            multiple
            required
          />
          )}
          <RadioList
            id="radiolist-meetingPreference"
            name="meetingPreferenceMeeting"
            label={t('registerSeekerMeetingHeader')!}
            options={[
              { value: 'IN_PERSON', label: t('registerSeekerMeetingHeaderOption1') },
              { value: 'VIRTUAL', label: t('registerSeekerMeetingHeaderOption2') },
            ]}
            required
          />
        </FormularStep>
      </FormularStepper>
    </div>
  );
};

export default RegisterSeekerPage;

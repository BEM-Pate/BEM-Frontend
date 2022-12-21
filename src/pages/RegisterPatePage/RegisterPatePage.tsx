import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './RegisterPatePage.module.scss';
import FormularStepper from '../../components/FormularStepper/FormularStepper';
import FormularStep from '../../components/FormularStepper/FormularStep';
import Dropdown from '../../components/Dropdown/Dropdown';
import Textfield from '../../components/Textfield/Textfield';
import RadioList from '../../components/RadioList/RadioList';
import FileInput from '../../components/FileInput/FileInput';
import Textarea from '../../components/Textarea/Textarea';
import CheckList from '../../components/CheckList/CheckList';

const RegisterPatePage = () => {
  const { t } = useTranslation();

  const [selectDisease, setSelectDisease] = useState(false);
  const [meetingRegion, setMeetingRegion] = useState(false);

  return (
    <div className={classNames(styles.RegisterPatePage)}>
      <FormularStepper
        postUrl="/user/register/pate"
        postDataStructure={({
          email,
          firstName,
          lastName,
          password,
          languages,
          helpOffers,
          meetingPreferenceMeeting,
          experienceText,
          motivationText,
          helpOffersDiseases,
          preferredDates,
          avatar,
        }) => {
          console.log(avatar);
          return ({
            email,
            firstName,
            lastName,
            password,
            meetingPreference: {
              support: helpOffers,
              diseaseConsultation: Array.isArray(helpOffersDiseases)
                ? helpOffersDiseases
                : [helpOffersDiseases],
              meeting: meetingPreferenceMeeting,
              location: 'Berlin',
              time: Array.isArray(preferredDates)
                ? preferredDates
                : [preferredDates],
            },
            processBEM: 'DONE',
            bemInformation: {
              diseases: Array.isArray(helpOffersDiseases)
                ? helpOffersDiseases
                : [helpOffersDiseases],
              occupation: [
                'PHYSICAL',
              ],
              languages: Array.isArray(languages || [])
                ? languages || []
                : [languages],
            },
            experience: experienceText,
            motivation: motivationText,
          });
        }}
        postDataLabels={{
          email: t('labelEMail'),
          firstName: t('labelFirstName'),
          lastName: t('labelLastName'),
          password: t('labelPassword'),
        }}
      >
        <FormularStep title={t('registerPateStep1Title')!}>
          <Dropdown
            options={[
              {
                value: 'ACUTE_CRISIS',
                label: t('registerPateDiseaseOption1'),
              },
              {
                value: 'OVERLOAD',
                label: t('registerPateDiseaseOption2'),
              },
              {
                value: 'DEPRESSION',
                label: t('registerPateDiseaseOption3'),
              },
              {
                value: 'ADDICTION',
                label: t('registerPateDiseaseOption4'),
              },
              {
                value: 'BURNOUT',
                label: t('registerPateDiseaseOption5'),
              },
              {
                value: 'FEAR',
                label: t('registerPateDiseaseOption6'),
              },
            ]}
            id="dropdown-experience"
            name="diseaseExperience"
            label={t('registerPateDiseaseExperience')!}
            required
          />
          <Dropdown
            options={[
              { value: 'JOB_1', label: 'Job 1' },
              { value: 'JOB_2', label: 'Job 2' },
              { value: 'JOB_3', label: 'Job 3' },
            ]}
            id="dropdown-job"
            name="job"
            label={t('registerPateJob')!}
            required
          />
          <CheckList
            options={[
              { value: 'ENGLISH', label: 'Englisch' },
              { value: 'TURKISH', label: 'Türkisch' },
              { value: 'POLISH', label: 'Polnisch' },
            ]}
            id="checklist-languages"
            name="languages"
            label={t('registerPateLanguages')!}
          />
        </FormularStep>
        <FormularStep title={t('registerPateStep2Title')!}>
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
          <FileInput
            id="fileinput-avatar"
            name="avatar"
            label={t('registerPateAvatar')!}
            required
          />
        </FormularStep>
        <FormularStep title={t('registerPateStep3Title')!}>
          <RadioList
            id="radiolist-offers"
            name="helpOffers"
            label={t('registerPateHelpOffers')!}
            options={[
              { value: 'CASE_SUPPORT', label: t('registerPateHelpOffersOption1') },
              { value: 'CONSULTATION', label: t('registerPateHelpOffersOption2') },
              { value: 'DISEASE_CONSULTATION', label: t('registerPateHelpOffersOption3') },
            ]}
            onChange={(e) => setSelectDisease(e.target.value === 'DISEASE_CONSULTATION')}
            required
          />
          {selectDisease && (
            <Dropdown
              id="dropdown-disease"
              label={t('registerPateHelpOffersDiseases')!}
              name="helpOffersDiseases"
              options={[
                {
                  value: 'ACUTE_CRISIS',
                  label: t('registerPateDiseaseOption1'),
                },
                {
                  value: 'OVERLOAD',
                  label: t('registerPateDiseaseOption2'),
                },
                {
                  value: 'DEPRESSION',
                  label: t('registerPateDiseaseOption3'),
                },
                {
                  value: 'ADDICTION',
                  label: t('registerPateDiseaseOption4'),
                },
                {
                  value: 'BURNOUT',
                  label: t('registerPateDiseaseOption5'),
                },
                {
                  value: 'FEAR',
                  label: t('registerPateDiseaseOption6'),
                },
              ]}
              multiple
              required
            />
          )}
          <Dropdown
            options={[
              { value: 'CERTIFICATE_1', label: t('registerPateCertificateOption1') },
              { value: 'CERTIFICATE_2', label: t('registerPateCertificateOption2') },
              { value: 'CERTIFICATE_3', label: t('registerPateCertificateOption3') },
            ]}
            id="dropdown-certificate"
            label={t('registerPateCertificateType')!}
            required
          />
          <FileInput
            id="fileinput-certificate"
            name="certificateFile"
            label={t('registerPateCertificateFile')!}
          />
        </FormularStep>
        <FormularStep>
          <Textarea
            id="textarea-experience"
            name="experienceText"
            label={t('registerPateExperienceText')!}
            required
          />
          <Textarea
            id="textarea-motivation"
            name="motivationText"
            label={t('registerPateMotivationText')!}
            required
          />
        </FormularStep>
        <FormularStep>
          <RadioList
            id="radiolist-meetingPreference"
            name="meetingPreferenceMeeting"
            label={t('registerPateMeetingHeader')!}
            options={[
              { value: 'VIRTUAL', label: t('registerPateMeetingHeaderOption1') },
              { value: 'IN_PERSON', label: t('registerPateMeetingHeaderOption2') },
            ]}
            onChange={(e) => setMeetingRegion(e.target.value === 'IN_PERSON')}
            required
          />
          {meetingRegion && (
          <Dropdown
            options={[]}
            id="dropdown-meetingRegion"
            name="meetingRegion"
          />
          )}
          <CheckList
            options={[
              { value: 'MONDAY', label: 'Montag' },
              { value: 'TUESDAY', label: 'Dienstag' },
              { value: 'WEDNESDAY', label: 'Mittwoch' },
              { value: 'THURSDAY', label: 'Donnerstag' },
              { value: 'FRIDAY', label: 'Freitag' },
              { value: 'SATURDAY', label: 'Samstag' },
              { value: 'SUNDAY', label: 'Sonntag' },
            ]}
            id="dropdown-date"
            name="preferredDates"
            label={t('registerPatePreferredDates')!}
            required
          />
        </FormularStep>
      </FormularStepper>
    </div>
  );
};

export default RegisterPatePage;

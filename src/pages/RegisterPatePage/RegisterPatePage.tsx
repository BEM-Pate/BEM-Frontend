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

const RegisterPatePage = () => {
  const { t } = useTranslation();

  const [selectDisease, setSelectDisease] = useState(false);

  return (
    <div className={classNames(styles.RegisterPatePage)}>
      <FormularStepper postUrl="" postDataStructure={(e) => e} postDataLabels={{}}>
        <FormularStep title={t('registerPateStep1Title')!}>
          <Dropdown
            options={[
              { value: 'NONE', label: '- none -' },
            ]}
            id="dropdown-experience"
            label={t('registerPateDiseaseExperience')!}
            required
          />
          <Dropdown
            options={[
              { value: 'NONE', label: '- none -' },
            ]}
            id="dropdown-job"
            label={t('registerPateJob')!}
            required
          />
          <Dropdown
            options={[
              { value: 'NONE', label: '- none -' },
              { value: 'ENGLISH', label: 'Englisch' },
            ]}
            id="dropdown-languages"
            label={t('registerPateLanguages')!}
            required
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
          <FileInput id="fileinput-avatar" label={t('registerPateAvatar')!} required />
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
          <Dropdown options={[]} id="dropdown-certificate" label={t('registerPateCertificateType')!} required />
          <FileInput
            id="fileinput-certificate"
            label={t('registerPateCertificateFile')!}
          />
        </FormularStep>
        <FormularStep>
          <Textarea
            id="textarea-experience"
            label={t('registerPateExperienceText')!}
            required
          />
          <Textarea
            id="textarea-motivation"
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
              { value: 'IN_PERSON', label: t('registerPateMeetingHeaderOption1') },
              { value: 'VIRTUAL', label: t('registerPateMeetingHeaderOption2') },
            ]}
            required
          />
          <Dropdown
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
            label={t('registerPatePreferredDates')!}
            multiple
            required
          />
        </FormularStep>
      </FormularStepper>
    </div>
  );
};

export default RegisterPatePage;

import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './RegisterSeekerPage.module.scss';
import FormularStepper from '../../components/FormularStepper/FormularStepper';
import FormularStep from '../../components/FormularStepper/FormularStep';
import Textfield from '../../components/Textfield/Textfield';
import { API_ADDRESS } from '../../helpers/env';
import Dropdown from '../../components/Dropdown/Dropdown';
import TileSelect from '../../components/TileSelect/TileSelect';
import genderMale from '../../images/icons/ui/gender_male.svg';
import genderFemale from '../../images/icons/ui/gender_female.svg';
import genderDivers from '../../images/icons/ui/gender_divers.svg';

interface LandingPageProps {
  children?: React.ReactNode;
}

const RegisterSeekerPage = (props: LandingPageProps) => {
  const { children } = props;

  const { t } = useTranslation();
  return (
    <div className={classNames(styles.RegisterAffectedPage)}>
      {children}
      <FormularStepper
        postUrl={`${API_ADDRESS}/user/register/seeker`}
        postDataStructure={() => ({})}
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
          <Textfield type="text" id="textfield-firstName" name="firstName" label={t('labelFirstName')!} required />
          <Textfield type="text" id="textfield-lastName" name="lastName" label={t('labelLastName')!} required />
        </FormularStep>
        <FormularStep title={t('registerSeekerStatus')!}>
          <Dropdown
            options={[
              { value: '18TO29', label: '18-29' },
              { value: '30TO39', label: '30-39' },
              { value: '40TO49', label: '40-49' },
              { value: '50TO59', label: '50-59' },
              { value: '60PLUS', label: '60 und älter' },
            ]}
            id="dropdown-age"
          />
        </FormularStep>
        <FormularStep title="">
          <TileSelect
            id="tile-select-gender"
            options={[
              { value: 'MALE', label: 'Male', icon: genderMale },
              { value: 'FEMALE', label: 'Female', icon: genderFemale },
              { value: 'DIVERS', label: 'Divers', icon: genderDivers },
            ]}
          />
        </FormularStep>
      </FormularStepper>
    </div>
  );
};

export default RegisterSeekerPage;

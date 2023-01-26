import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterUserPage.module.scss';
import FormularStepper from '../../components/FormularStepper/FormularStepper';
import FormularStep from '../../components/FormularStepper/FormularStep';
import Textfield from '../../components/Textfield/Textfield';
import { API_ADDRESS } from '../../helpers/env';
import Dropdown from '../../components/Dropdown/Dropdown';
import TileSelect from '../../components/TileSelect/TileSelect';
import genderMale from '../../images/icons/ui/gender_male.svg';
import genderFemale from '../../images/icons/ui/gender_female.svg';
import genderDivers from '../../images/icons/ui/gender_divers.svg';
import Validators from '../../helpers/validators';
import FileInput from '../../components/FileInput/FileInput';

interface Props {
  userData: any;
  setUserData: (s: any) => void;
  children?: React.ReactNode;
}

const RegisterUserPage = (props: Props) => {
  const { userData, setUserData, children } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [userFirstName, setUserFirstName] = useState<string>();
  const [userLastName, setUserLastName] = useState<string>();
  const [userAgeRange, setUserAgeRange] = useState<string>();
  const [userGender, setUserGender] = useState<any>();
  const [userLanguages, setUserLanguages] = useState<string[]>();
  const [userOccupation, setUserOccupation] = useState<string>();
  const [userAvatar, setUserAvatar] = useState<File>();

  const registerUser = useCallback(async () => {
    if (!userData || !userAvatar) return;

    try {
      const avatarData = new FormData();
      avatarData.append('avatar', userAvatar, userAvatar.name);

      const registerUserResult = await axios.post(`${API_ADDRESS}/user/register/normalUser`, {
        firstName: userFirstName,
        lastName: userLastName,
        ageRange: userAgeRange,
        gender: userGender.value,
        languages: userLanguages,
        occupation: userOccupation,
      }, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });

      if (!(registerUserResult.status === 200 || registerUserResult.status === 201)) {
        // Registering userData was not successful
        return;
      }

      const avatarResult = await axios.post(`${API_ADDRESS}/user/avatar`, avatarData, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (avatarResult.status !== 200) {
        // Setting user avatar was not successful
      }

      const newUserData = {
        account: registerUserResult.data.user,
        token: userData.token,
      };

      setUserData(newUserData);
      navigate('/');
    } catch (err) {
      console.error('failed', err);
    }
  }, [
    userData,
    userFirstName,
    userLastName,
    userGender,
    userAgeRange,
    userLanguages,
    userOccupation,
    userAvatar,
  ]);

  return (
    <div className={classNames(styles.RegisterAffectedPage)}>
      {children}
      <FormularStepper
        dataLabels={{
          email: t('labelEMail'),
          firstName: t('labelFirstName'),
          lastName: t('labelLastName'),
          password: t('labelPassword'),
          inProgress: t('registerSeekerStatus'),
          meetingNeeds: t('registerSeekerNeeds'),
          meetingNeedsDisease: t('labelDiseaseProfile'),
          meetingPreference: t('registerSeekerMeetingHeader'),
        }}
        dataFields={{
          firstName: userFirstName,
          lastName: userLastName,
          ageRange: userAgeRange,
          gender: userGender,
          languages: userLanguages,
          occupation: userOccupation,
        }}
        submitAction={() => registerUser()}
      >
        <FormularStep
          title={t('registerSeekerHeader')!}
          validation={[
            { value: userFirstName, validation: [Validators.isString, Validators.isNotEmpty] },
            { value: userLastName, validation: [Validators.isString, Validators.isNotEmpty] },
          ]}
        >
          <Textfield
            type="text"
            id="textfield-firstName"
            name="firstName"
            label={t('labelFirstName')!}
            onChange={setUserFirstName}
            required
          />
          <Textfield
            type="text"
            id="textfield-lastName"
            name="lastName"
            label={t('labelLastName')!}
            onChange={setUserLastName}
            required
          />
        </FormularStep>
        <FormularStep
          title="Altersgruppe"
          validation={[
            { value: userAgeRange, validation: [Validators.isString, Validators.isNotEmpty] },
          ]}
        >
          <Dropdown
            id="dropdown-age"
            label="Alter"
            options={[
              { value: '18TO29', label: '18-29' },
              { value: '30TO39', label: '30-39' },
              { value: '40TO49', label: '40-49' },
              { value: '50TO59', label: '50-59' },
              { value: '60PLUS', label: '60 und älter' },
            ]}
            onChange={setUserAgeRange}
            required
          />
        </FormularStep>
        <FormularStep
          title="Geschlecht"
          validation={[
            { value: userGender, validation: [Validators.isObject] },
          ]}
        >
          <TileSelect
            id="tile-select-gender"
            label="Geschlecht"
            options={[
              { value: 'MALE', label: 'Male', icon: genderMale },
              { value: 'FEMALE', label: 'Female', icon: genderFemale },
              { value: 'DIVERSE', label: 'Divers', icon: genderDivers },
            ]}
            onChange={setUserGender}
          />
        </FormularStep>
        <FormularStep
          title="Beruf"
          validation={[
            { value: userOccupation, validation: [Validators.isString, Validators.isNotEmpty] },
          ]}
        >
          <Dropdown
            id="dropdown-occupation"
            label="Berufsfeld"
            options={[
              { value: 'AGRICULTURE_FORESTRY_FISHING', label: 'Land- und Forstwirtschaft, Fischerei' },
              { value: 'MINING_QUARRYING', label: 'Bergbau und Gewinnung von Steinen und Erden' },
              { value: 'MANUFACTURING_INDUSTRY', label: 'Verarbeitendes Gewerbe' },
              { value: 'ENERGY_SUPPLY', label: 'Energieversorgung' },
              { value: 'WATER_SUPPLY', label: 'Wasserversorgung' },
              { value: 'WASTE_SEWAGE', label: 'Abwasser- und Abfallentsorgung und Beseitigung von Umweltverschmutzungen' },
              { value: 'CONSTRUCTION', label: 'Baugewerbe' },
              { value: 'TRADE', label: 'Handel' },
              { value: 'REPAIR_VEHICLES', label: 'Instandhaltung und Reparatur von Fahrzeugen' },
              { value: 'TRANSPORT_STORAGE', label: 'Verkehr und Lagerei' },
              { value: 'HOTEL_RESTAURANT', label: 'Gastgewerbe' },
              { value: 'INFORMATION_COMMUNICATION', label: 'Information und Kommunikation' },
              { value: 'FINANCIAL_INSURANCE', label: 'Erbringung von Finanz- und Versicherungsdienstleistungen' },
              { value: 'REAL_ESTATE_HOUSING', label: 'Grundstücks- und Wohnungswesen' },
              { value: 'FREELANCE_SCIENCE_TECHNICAL', label: 'Erbringung von freiberuflichen, wissenschaftlichen und technischen Dienstleistungen' },
              { value: 'ECONOMIC_SERVICE', label: 'Erbringung von sonstigen wirtschaftlichen Dienstleistungen' },
              { value: 'PUBLIC_ADMINISTRATION_DEFENSE', label: 'Öffentliche Verwaltung, Verteidigung' },
              { value: 'SOCIAL_INSURANCE', label: 'Sozialversicherung' },
              { value: 'EDUCATION', label: 'Erziehung und Unterricht' },
              { value: 'HEALTH_SOCIAL_WORK', label: 'Gesundheits- und Sozialwesen' },
              { value: 'ARTS_ENTERTAINMENT_RECREATION', label: 'Kunst, Unterhaltung und Erholung' },
              { value: 'OTHER_SERVICE_ACTIVITIES', label: 'Erbringung von sonstigen Dienstleistungen' },
              { value: 'HOUSEHOLDS_ACTIVITIES', label: 'Private Haushalte mit Hauspersonal; Herstellung von Waren und Erbringung von Dienstleistungen durch private Haushalte für den Eigenbedarf ohne ausgeprägten Schwerpunkt' },
              { value: 'OFFSHORE', label: 'Exterritoriale Organisationen und Körperschaften' },
            ]}
            onChange={setUserOccupation}
            required
          />
        </FormularStep>
        <FormularStep
          title="Sprache"
          validation={[
            { value: userLanguages, validation: [Validators.isArray, Validators.isNotEmpty] },
          ]}
        >
          <Dropdown
            id="dropdown-languages"
            label="Meine Sprachen"
            options={[
              { value: 'DE', label: 'Deutsch' },
              { value: 'EN', label: 'Englisch' },
            ]}
            onChange={setUserLanguages}
            multiple
            required
          />
        </FormularStep>
        <FormularStep title="Avatar">
          <FileInput
            id="fileinput-avatar"
            onChange={setUserAvatar}
          />
        </FormularStep>
      </FormularStepper>
    </div>
  );
};

export default RegisterUserPage;

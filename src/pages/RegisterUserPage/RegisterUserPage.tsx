import React, {useCallback, useEffect, useState} from 'react';
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
import {useZustand} from "../../zustand/store";
import {FormOption} from "../../components/FormularStepper/FormularTypes";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import getFlagFromCountry from "../../util/getFlagFromCountry";

interface Props {
  redirectOnSuccess: string;
}
const RegisterUserPage = (props: Props) => {
  const { redirectOnSuccess } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userData = useZustand((state) => state.user);
  const setUserData = useZustand((state) => state.setUser);
  const token = useZustand((state) => state.token);

  const [userFirstName, setUserFirstName] = useState<string>();
  const [userLastName, setUserLastName] = useState<string>();
  const [userAgeRange, setUserAgeRange] = useState<string>();
  const [userGender, setUserGender] = useState<string>();
  const [userLanguages, setUserLanguages] = useState<string[]>();
  const [userOccupation, setUserOccupation] = useState<string>();
  const [userAvatar, setUserAvatar] = useState<File>();

  const [ageranges, setAgeranges] = useState<FormOption[]>([]);
  const [genders, setGenders] = useState<FormOption[]>([]);
  const [languages, setLanguages] = useState<FormOption[]>([]);
  const [occupations, setOccupations] = useState<FormOption[]>([]);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const [
          a,
          g,
          l,
          o,
        ] = await Promise.all([
          ((await axios.get(`${API_ADDRESS}/get/enums/ageranges`)).data as string[]),
          ((await axios.get(`${API_ADDRESS}/get/enums/genders`)).data as string[]),
          ((await axios.get(`${API_ADDRESS}/get/enums/languages`)).data as string[]),
          ((await axios.get(`${API_ADDRESS}/get/enums/occupations`)).data as string[]),
        ]);

        setAgeranges(a.map((s) => ({
          value: s,
          label: t(`enum_ageranges_${s}`),
        } as FormOption)));

        setGenders(g.map((s) => ({
          value: s,
          label: t(`enum_genders_${s}`),
          icon: s === 'MALE' ? genderMale : s === 'FEMALE' ? genderFemale : genderDivers,
        } as FormOption)));

        setLanguages(l.map((s) => ({
          value: s,
          label: `${getFlagFromCountry(s)} ${t(`enum_languages_${s}`)}`,
        } as FormOption)));

        setOccupations(o.map((s) => ({
          value: s,
          label: t(`enum_occupations_${s}`),
        } as FormOption)));
      } catch (e) {
        console.error(e);
      }
    }
    init();
  }, [t]);

  const registerUser = useCallback(async () => {
    if (!userData) return;

    try {
      const registerUserResult = await axios.post(`${API_ADDRESS}/user/register/normalUser`, {
        firstName: userFirstName,
        lastName: userLastName,
        ageRange: userAgeRange,
        gender: userGender,
        languages: userLanguages,
        occupation: userOccupation,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!(registerUserResult.status === 200 || registerUserResult.status === 201)) {
        // Registering userData was not successful
        console.error(registerUserResult);
        return;
      }

      if (userAvatar) {
        const avatarData = new FormData();
        avatarData.append('avatar', userAvatar, userAvatar.name);
        const avatarResult = await axios.post(`${API_ADDRESS}/user/avatar`, avatarData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (avatarResult.status !== 200) {
          // Setting user avatar was not successful
        }
      }

      const newUserData = {
        account: registerUserResult.data.user,
        token: userData.token,
      };

      setUserData(newUserData);
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
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
    setUserData,
    token,
  ]);

  return (
    <div className={classNames(styles.RegisterUserPage)}>
      <FormularStepper
        dataLabels={{
          firstName: t('labelFirstName'),
          lastName: t('labelLastName'),
          ageRange: t('enum_ageranges'),
          gender: t('enum_genders'),
          languages: t('enum_languages'),
          occupation: t('enum_occupations'),
        }}
        dataFields={{
          firstName: userFirstName,
          lastName: userLastName,
          ageRange: t(`enum_ageranges_${userAgeRange}`),
          gender: t(`enum_genders_${userGender}`),
          languages: userLanguages?.map(
            (language) => `${getFlagFromCountry(language)} ${t(`enum_languages_${language}`)}`,
          ).join(', '),
          occupation: t(`enum_occupations_${userOccupation}`),
        }}
        submitAction={registerUser}
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
          title={t('enum_ageranges')!}
          validation={[
            { value: userAgeRange, validation: [Validators.isString, Validators.isNotEmpty] },
          ]}
        >
          <Dropdown
            id="dropdown-age"
            label={t('labelAge')!}
            options={ageranges}
            onChange={setUserAgeRange}
            required
          />
        </FormularStep>
        <FormularStep
          title={t('enum_genders')!}
          validation={[
            { value: userGender, validation: [Validators.isString, Validators.isNotEmpty] },
          ]}
        >
          <TileSelect
            id="tile-select-gender"
            label={t('enum_genders')!}
            options={genders}
            onChange={setUserGender}
          />
        </FormularStep>
        <FormularStep
          title={t('labelJob')!}
          validation={[
            { value: userOccupation, validation: [Validators.isString, Validators.isNotEmpty] },
          ]}
        >
          <Dropdown
            id="dropdown-occupation"
            label={t('enum_occupations')!}
            options={occupations}
            onChange={setUserOccupation}
            required
          />
        </FormularStep>
        <FormularStep
          title={t('appLanguage')!}
          validation={[
            { value: userLanguages, validation: [Validators.isArray, Validators.isNotEmpty] },
          ]}
        >
          <Dropdown
            id="dropdown-languages"
            label={t('labelMyLanaguae')!}
            options={languages}
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
      <ModalWindow
        isVisible={submitSuccess}
        type="success"
        headline="Sie wurden verifiziert!"
        text={t('modalWindowSuccsess')!}
        onClick={() => navigate(redirectOnSuccess)}
      />
    </div>
  );
};

export default RegisterUserPage;

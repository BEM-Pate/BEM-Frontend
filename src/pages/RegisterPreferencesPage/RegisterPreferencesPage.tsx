import React, {useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import styles from "./RegisterPreferencesPage.module.scss";
import FormularStepper from "../../components/FormularStepper/FormularStepper";
import FormularStep from "../../components/FormularStepper/FormularStep";
import Dropdown from "../../components/Dropdown/Dropdown";
import {FormOption} from "../../components/FormularStepper/FormularTypes";
import axios from "axios";
import {API_ADDRESS} from "../../helpers/env";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useZustand} from "../../zustand/store";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import CheckboxList from "../../components/CheckboxList/CheckboxList";
import Validators from "../../helpers/validators";
import Button from "../../components/Button/Button";

interface Props {
  redirectOnSuccess: string;
}

const RegisterPreferencesPage = (props: Props) => {
  const { redirectOnSuccess } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userData = useZustand((state) => state.user);
  const setUserData = useZustand((state) => state.setUser);
  const token = useZustand((state) => state.token);

  const [userSupport, setUserSupport] = useState<string[]>();
  const [userDiseaseConsultation, setUserDiseaseConsultation] = useState<string[]>();
  const [userMeeting, setUserMeeting] = useState<string[]>();
  const [userLocation, setUserLocation] = useState<string>();

  const [supports, setSupports] = useState<FormOption[]>([]);
  const [diseases, setDiseases] = useState<FormOption[]>([]);
  const [meetings, setMeetings] = useState<FormOption[]>([]);
  const [locations, setLocations] = useState<FormOption[]>([]);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const [
          sup,
          d,
          m,
        ] = await Promise.all([
          ((await axios.get(`${API_ADDRESS}/get/enums/supports`)).data as string[]),
          ((await axios.get(`${API_ADDRESS}/get/enums/diseases`)).data as string[]),
          ((await axios.get(`${API_ADDRESS}/get/enums/meetings`)).data as string[]),
        ]);

        setSupports(sup.map((s) => ({
          value: s,
          label: t(`enum_supports_${s}`),
        } as FormOption)));
        setDiseases(d.map((s) => ({
          value: s,
          label: t(`enum_diseases_${s}`),
        } as FormOption)));
        setMeetings(m.map((s) => ({
          value: s,
          label: t(`enum_meetings_${s}`),
        } as FormOption)));
        setLocations([
          'BW',
          'BV',
          'BE',
          'BB',
          'HB',
          'HH',
          'HE',
          'NI',
          'MV',
          'NW',
          'RP',
          'SL',
          'SN',
          'ST',
          'SH',
          'TH',
        ].map((value) => ({ value: value, label: t(`enum_regions_${value}`)})));
      } catch (e) {
        console.error(e);
      }
    }
    init();
  }, [t]);

  const registerPreferences = useCallback(async () => {
    if (!userData) return;

    try {
      const userMeetingPreferenceData: any = {
        support: userSupport,
        diseaseConsultation: userDiseaseConsultation,
        meeting: userMeeting,
      };

      if (userMeeting?.includes('IN_PERSON')) {
        userMeetingPreferenceData.location = userLocation;
      }

      const registerPreferencesResult = await axios.post(`${API_ADDRESS}/user/register/normalUser/meetingPreference`, userMeetingPreferenceData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!(registerPreferencesResult.status === 200 || registerPreferencesResult.status === 201)) {
        // Registering userData was not successful
        console.error(registerPreferencesResult);
        return;
      }

      const newUserData = {
        account: registerPreferencesResult.data.user,
        token: userData.token,
      };

      setUserData(newUserData);
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
    }
  }, [
    userData,
    userSupport,
    userDiseaseConsultation,
    userMeeting,
    userLocation,
    token,
    setUserData,
  ]);

  return (
    <div className={classNames(styles.RegisterPreferencesPage)}>
      <FormularStepper
        dataLabels={{
          support: t(`enum_supports`),
          diseaseConsultation: t(`enum_diseases`),
          meeting: t(`enum_meetings`),
          location: t(`labelLocations`),
        }}
        dataFields={{
          support: userSupport?.map(
            (support) => t(`enum_supports_${support}`),
          ).join(', '),
          diseaseConsultation: userDiseaseConsultation?.map(
            (disease) => t(`enum_diseases_${disease}`),
          ).join(', '),
          meeting: userMeeting?.map(
            (meeting) => t(`enum_meetings_${meeting}`),
          ).join(', '),
          location: userLocation,
        }}
        submitAction={registerPreferences}
      >
        <FormularStep
          title={t('registerPreferencesNeed')}
          validation={[
            { value: userSupport, validation: [Validators.isArray, Validators.isNotEmpty] },
            { value: userDiseaseConsultation, validation: userSupport?.includes('DISEASE_CONSULTATION') ? [Validators.isArray, Validators.isNotEmpty] : [Validators.isArray] },
          ]}
        >
          <CheckboxList
            id="radio-list-support"
            name="support"
            label={t('enum_supports')!}
            options={supports}
            onChange={setUserSupport}
          />
          <Dropdown
            id="dropdown-disease"
            name="disease"
            label={t('enum_diseases')!}
            options={diseases}
            onChange={setUserDiseaseConsultation}
            disabled={!userSupport?.includes('DISEASE_CONSULTATION')}
            multiple
          />
        </FormularStep>
        <FormularStep
          title={t('registerPreferencesMeet')}
          validation={[
            { value: userMeeting, validation: [Validators.isArray, Validators.isNotEmpty] },
            { value: userLocation, validation: userMeeting?.includes('IN_PERSON') ? [Validators.isString, Validators.isNotEmpty] : [] },
          ]}
        >
          <CheckboxList
            id="radio-list-meeting"
            name="meeting"
            label={t('enum_meetings')!}
            options={meetings}
            onChange={setUserMeeting}
          />
          <Dropdown
            id="dropdown-location"
            options={locations}
            onChange={setUserLocation}
            disabled={!userMeeting?.includes('IN_PERSON')}
          />
        </FormularStep>
      </FormularStepper>
      <ModalWindow
        isVisible={submitSuccess}
        type="success"
        headline={t('registerPreferencesModalWindowHeader')!}
        text={t('registerPreferencesModalWindowText')!}
      >
        <Button
          onClick={() => navigate(redirectOnSuccess)}
        >
          Los gehts!
        </Button>
        <Button
          styling="outline"
          onClick={() => navigate('/dashboard/settings/profile')}
        >
          Zu meinem Profil
        </Button>
      </ModalWindow>
    </div>
  );
}

export default RegisterPreferencesPage;

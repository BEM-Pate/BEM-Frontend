import FormularStepper from "../../components/FormularStepper/FormularStepper";
import FormularStep from "../../components/FormularStepper/FormularStep";
import RadioList from "../../components/RadioList/RadioList";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useZustand} from "../../zustand/store";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import React, {useCallback, useEffect, useState} from "react";
import Button from "../../components/Button/Button";
import CheckboxList from "../../components/CheckboxList/CheckboxList";
import Validators from "../../helpers/validators";
import Dropdown from "../../components/Dropdown/Dropdown";
import axios from "axios";
import {API_ADDRESS} from "../../helpers/env";
import {FormOption} from "../../components/FormularStepper/FormularTypes";
import Textarea from "../../components/Textarea/Textarea";

interface Props {
  redirectOnSuccess: string;
}

const RegisterPatePage = (props: Props) => {
  const { redirectOnSuccess } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userData = useZustand((state) => state.user);
  const setUserData = useZustand((state) => state.setUser);
  const token = useZustand((state) => state.token);

  const [userKOCrit, setUserKOCrit] = useState<string>();
  const [userSupport, setUserSupport] = useState<string[]>();
  const [userDiseaseConsultation, setUserDiseaseConsultation] = useState<string[]>();
  const [userMeeting, setUserMeeting] = useState<string[]>();
  const [userLocation, setUserLocation] = useState<string>();
  const [userExperience, setUserExperience] = useState<string>();
  const [userMotivation, setUserMotivation] = useState<string>();

  const [userHasCertificate, setUserHasCertificate] = useState<string>();

  const [supports, setSupports] = useState<FormOption[]>([]);
  const [diseases, setDiseases] = useState<FormOption[]>([]);
  const [meetings, setMeetings] = useState<FormOption[]>([]);
  const [locations, setLocations] = useState<FormOption[]>([]);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [showKOCrit, setShowKOCrit] = useState(false);

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

  const checkKOCrit = useCallback(() => {
    if (userKOCrit === 'YES') {
      return true;
    }
    setShowKOCrit(true);
    return false;
  }, [userKOCrit]);

  const registerPate = useCallback(async () => {
    if (!userData) return;

    try {
      const userMeetingPreferenceData: any = {
        support: userSupport,
        diseaseConsultation: userDiseaseConsultation,
        meeting: userMeeting,
        experience: userExperience,
        motivation: userMotivation,
      };

      if (userMeeting?.includes('IN_PERSON')) {
        userMeetingPreferenceData.location = userLocation;
      }

      const registerPreferencesResult = await axios.post(`${API_ADDRESS}/user/register/pate`, userMeetingPreferenceData, {
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
    userExperience,
    userMotivation,
    token,
    setUserData,
  ]);

  return (
    <>
      <FormularStepper
        dataLabels={{
          support: t(`enum_supports`),
          diseaseConsultation: t(`enum_diseases`),
          meeting: t(`enum_meetings`),
          location: t(`labelLocations`),
          experience: 'Erfahrung',
          motivation: 'Motivation',
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
          experience: userExperience,
          motivation: userMotivation,
        }}
        submitAction={registerPate}
      >
        <FormularStep
          title="Haben Sie bereits einen BEM-Prozess durchlaufen?"
          validation={[
            { value: userKOCrit, validation: [Validators.isString, Validators.isNotEmpty] },
          ]}
          nextStepAction={checkKOCrit}
        >
          <RadioList
            options={[
              { value: 'YES', label: 'Ja' },
              { value: 'NO', label: 'Nein' },
            ]}
            id="radiolist-bem-process-finished"
            name="bemProcessFinished"
            onChange={setUserKOCrit}
            required
          />
        </FormularStep>
        <FormularStep
          title="Was können Sie anbieten?"
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
            required
          />
          <Dropdown
            id="dropdown-disease"
            name="disease"
            label={t('enum_diseases')!}
            options={diseases}
            onChange={setUserDiseaseConsultation}
            disabled={!userSupport?.includes('DISEASE_CONSULTATION')}
            multiple
            required
          />
        </FormularStep>
        <FormularStep
          title="Wie möchten Sie sich mit BEM-Paten oder anderen BEM-Berechtigten austauschen?"
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
            required
          />
          <Dropdown
            id="dropdown-location"
            label={t(`enum_regions`)!}
            options={locations}
            onChange={setUserLocation}
            disabled={!userMeeting?.includes('IN_PERSON')}
            required={userMeeting?.includes('IN_PERSON')}
          />
        </FormularStep>
        <FormularStep
          title="Sind Sie Erfahrungsexpertin mit Zertifizierung?"
        >
          <RadioList
            id="radio-list-hasCertificate"
            name="hasCertificate"
            options={[
              { value: 'NO', label: 'Nein' },
              { value: 'YES', label: 'Ja' },
            ]}
            onChange={setUserHasCertificate}
          />
          <Dropdown
            id="dropdown-certificateType"
            label={t('enum_certificates')!}
            options={[
              { value: 'a', label: 'Begleiter/in für psychosoziale Gesundheit'},
              { value: 'b', label: 'EX-IN'},
              { value: 'c', label: 'Peers@Work'},
              { value: 'd', label: 'Andere'},
            ]}
            disabled={userHasCertificate === 'NO'}
            required={userHasCertificate === 'YES'}
          />
          <Button disabled={userHasCertificate === 'NO'}>
            Zertifikat hochladen
          </Button>
        </FormularStep>
        <FormularStep
          title="Was sind Ihre Erfahrungen in Bezug auf BEM und psychische Erkrankungen?"
          validation={[
            { value: userExperience, validation: [Validators.isString, Validators.isNotEmpty] },
          ]}
        >
          <Textarea
            id="textarea-experience"
            label="Meine Erfahrungen"
            onChange={setUserExperience}
            required
          />
        </FormularStep>
        <FormularStep
          title="Was motiviert Sie, BEM-Pate zu werden?"
          validation={[
            { value: userMotivation, validation: [Validators.isString, Validators.isNotEmpty] },
          ]}
        >
          <Textarea
            id="textarea-motivation"
            label="Meine Motivation"
            onChange={setUserMotivation}
            required
          />
        </FormularStep>
      </FormularStepper>

      <ModalWindow
        isVisible={showKOCrit}
        type="warning"
        headline="Sie können leider kein BEM-Pate werden!"
        text="Denn dazu muss man bereits selbst erfolgreich einen BEM-Prozess durchlaufen haben. Sie können aber eine Selbsthilfegruppe gründen."
      >
        <Button
          onClick={() => navigate('/dashboard/groups')}
        >
          Selbsthilfegruppe Gründen
        </Button>
        <Button
          styling="outline"
          onClick={() => setShowKOCrit(false)}
        >
          Zurück
        </Button>
      </ModalWindow>

      <ModalWindow
        isVisible={submitSuccess}
        type="success"
        headline={"Sie wurden registriert!"}
        text={"Ihr Profil ist eingerichtet und Sie sind als BEM-Pate in der Suche auffindbar. Sie können auch eine Selbsthilfegruppe gründen."}
        onClick={() => navigate(redirectOnSuccess)}
      />
    </>
  )
};

export default RegisterPatePage;

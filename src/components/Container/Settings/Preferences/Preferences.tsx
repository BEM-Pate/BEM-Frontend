import axios from "axios";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../../helpers/api";
import { API_ADDRESS } from "../../../../helpers/env";
import useModal from "../../../../helpers/useModal";
import Button from "../../../Button/Button";
import CheckboxList from "../../../CheckboxList/CheckboxList";
import Dropdown from "../../../Dropdown/Dropdown";
import { FormOption } from "../../../FormularStepper/FormularTypes";
import Headline from "../../../Headline/Headline";
import LanguageDropdown from "../../../LanguageDropdown/LanguageDropdown";
import ModalWindow from "../../../ModalWindow/ModalWindow";
import styles from "./Preferences.module.scss";

interface Props {
  userData: any;
}

const Preferences = (props: Props) => {
  const { userData } = props;
  const navigate = useNavigate();

  const [userAttributes, setUserAttributes] = useState<any>();

  const [locations, setLocations] = useState<FormOption[]>([]);
  const [meetings, setMeetings] = useState<FormOption[]>([]);
  const [supports, setSupports] = useState<FormOption[]>([]);


  const [updatedLocations, setUpdatedLocations] = useState<string>("");
  const [updatedMeetings, setUpdatedMeetings] = useState<string[]>([]);
  const [updatedSupports, setUpdatedSupports] = useState<string[]>([]);

  const [pageUrl, setPageUrl] = useState<string>("");

  const { isVisible, toggleModal } = useModal();

  const { t } = useTranslation();

  useEffect(() => {
    const init = async () => {
      const data = await API.getBaseUserData(userData.token);

      try {
        const [sup, m] = await Promise.all([
          (
            await axios.get(`${API_ADDRESS}/get/enums/supports`)
          ).data as string[],
          (
            await axios.get(`${API_ADDRESS}/get/enums/meetings`)
          ).data as string[],
        ]);

        setSupports(
          sup.map(
            (s) =>
              ({
                value: s,
                label: t(`enum_supports_${s}`),
              } as FormOption)
          )
        );
        setMeetings(
          m.map(
            (s) =>
              ({
                value: s,
                label: t(`enum_meetings_${s}`),
              } as FormOption)
          )
        );
        setLocations(
          [
            "BW",
            "BV",
            "BE",
            "BB",
            "HB",
            "HH",
            "HE",
            "NI",
            "MV",
            "NW",
            "RP",
            "SL",
            "SN",
            "ST",
            "SH",
            "TH",
          ].map((value) => ({
            value: value,
            label: t(`enum_regions_${value}`),
          }))
        );
      } catch (e) {
        console.error(e);
      }

      setUserAttributes(data);
    };
    init();
  }, [userData, t]);

  const handleClicks = () => {
    window.location.href = `${pageUrl}`;
  };

  const updateUserData = useCallback(() => {
    try {
      axios
        .put(
          `${API_ADDRESS}/user/userdata`,
          {
            meetingPreference: {
              support: updatedSupports,
              meeting: updatedMeetings,
              location: updatedLocations,
            },
          },
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${userData.token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res));
    } catch (err) {
      console.error(err);
    }
  }, [
    updatedSupports,
    updatedMeetings,
    updatedLocations,
    userData
  ]);

  return (
    <div className={classNames(styles.Preferences)}>
      <div className={classNames(styles.PreferencesHeader)}>
      <Button icon styling="back" onClick={() => {navigate(-1); updateUserData()}}></Button>
        <Headline headline="h1" styling="page">
          {t('labelSettings')}
        </Headline>
       
      </div>
      <div className={classNames(styles.PreferencesSection)}>
        <Headline headline="h2" styling="caps">
          {t('labelVisibility')}
        </Headline>
        <Dropdown
          options={locations}
          id="locations"
          label="Locations"
          defaultValue={["BW"]}
          placeholder={`${t(`enum_regions_${userAttributes?.meetingPreference.location}`)}`}
          onChange={setUpdatedLocations}
        ></Dropdown>
      </div>
      <div className={classNames(styles.PreferencesSection)}>
        <Headline headline="h2" styling="caps">
          {t('labelMeeting')}
        </Headline>
        <CheckboxList
          id="meetings"
          options={meetings}
          label="Meetings"
          onChange={setUpdatedMeetings}
          defaultValue={userAttributes?.meetingPreference.meeting}
        ></CheckboxList>
        <Dropdown
          options={supports}
          id="supports"
          label={t('labelOffer')!}
          placeholder={`${t(`enum_supports_${userAttributes?.meetingPreference.support[0]}`)}`}
          onChange={setUpdatedSupports}
        ></Dropdown>
      </div>
      <div className={classNames(styles.PreferencesSection)}>
        <Headline headline="h2" styling="caps">
          {t('labelPrivacy')}
        </Headline>
        <Button styling="setting">{t('labelNotifcation')}</Button>
        <Button
          styling="setting"
          onClick={() => {
            setPageUrl("https://www.bempsy.de/de/datenschutz");
            toggleModal();
          }}
        >
          {t('labelPrivacy')}
        </Button>
      </div>
      <div className={classNames(styles.PreferencesSection)}>
        <Headline headline="h2" styling="caps">
          {t('labelAboutApp')}
        </Headline>
        <LanguageDropdown />
      </div>
      <div>
        <Headline headline="h2" styling="caps">
          {t('preferencesPageMoreInfo')}
        </Headline>
        <Button onClick={toggleModal} styling="setting">
          {t('labelTermOfUse')}
        </Button>
        <Button
          styling="setting"
          onClick={() => {
            setPageUrl("https://www.bempsy.de/de/impressum");
            toggleModal();
          }}
        >
          Impressum
        </Button>
        <Button
          styling="setting"
          onClick={() => {
            setPageUrl("https://www.bempsy.de/de/bem-faq");
            toggleModal();
          }}
        >
          {t('labelAboutBEM')}
        </Button>
      </div>
      <ModalWindow
        isVisible={isVisible}
        type="warning"
        headline={t('modalPreferencesLeave')!}
        text={pageUrl}
      >
        <Button styling="outline" onClick={() => handleClicks()}>
          {t('labelOpenLink')}
        </Button>

        <Button onClick={toggleModal}>{t('labelStayHere')}</Button>
      </ModalWindow>
    </div>
  );
};

export default Preferences;

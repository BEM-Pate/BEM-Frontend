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
          Einstellungen
        </Headline>
       
      </div>
      <div className={classNames(styles.PreferencesSection)}>
        <Headline headline="h2" styling="caps">
          Sichtbarkeit
        </Headline>
        <Dropdown
          options={locations}
          id="locations"
          label="Locations"
          defaultValue={["BW"]}
          onChange={setUpdatedLocations}
        ></Dropdown>
      </div>
      <div className={classNames(styles.PreferencesSection)}>
        <Headline headline="h2" styling="caps">
          treffen / austausch
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
          label="Ich biete"
          onChange={setUpdatedSupports}
        ></Dropdown>
      </div>
      <div className={classNames(styles.PreferencesSection)}>
        <Headline headline="h2" styling="caps">
          Privatsphäre
        </Headline>
        <Button styling="setting">Benachrichtigungen</Button>
        <Button
          styling="setting"
          onClick={() => {
            setPageUrl("https://www.bempsy.de/de/datenschutz");
            toggleModal();
          }}
        >
          Datenschutz
        </Button>
      </div>
      <div className={classNames(styles.PreferencesSection)}>
        <Headline headline="h2" styling="caps">
          app
        </Headline>
        <LanguageDropdown />
      </div>
      <div>
        <Headline headline="h2" styling="caps">
          weitere Infos
        </Headline>
        <Button onClick={toggleModal} styling="setting">
          Nutzungsbedingungen
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
          Über BEMpsy
        </Button>
      </div>
      <ModalWindow
        isVisible={isVisible}
        type="warning"
        headline="You are about to leave this website!"
        text={pageUrl}
      >
        <Button styling="outline" onClick={() => handleClicks()}>
          Neuen Link abrufen
        </Button>

        <Button onClick={toggleModal}>Ich bleib hier!</Button>
      </ModalWindow>
    </div>
  );
};

export default Preferences;

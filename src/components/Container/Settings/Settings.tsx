import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Settings.module.scss";
import Headline from "../../Headline/Headline";
import API from "../../../helpers/api";
import Button from "../../Button/Button";
import placeholder from "../../../images/default.png";
import { useNavigate } from "react-router-dom";
import { PateData, UserData } from "../../../util/types";
import profilePercentage from "../../../helpers/profilePercentage";
import languages from "../../../images/icons/ui/languages.svg";
import settings from "../../../images/icons/ui/settings_outline.svg";
import account from "../../../images/icons/ui/account.svg";
import LanguageDropdown from "../../LanguageDropdown/LanguageDropdown";

interface Props {
  userData: any;
}

const Settings = (props: Props) => {
  const { userData } = props;
  const navigate = useNavigate();
  const [userAttributes, setUserAttributes] = useState<PateData | UserData>();
  const [imageData, setImageData] = useState<any>(placeholder);

  useEffect(() => {
    const getUserData = async () => {
      const data = await API.getBaseUserData(userData.token);
      if (data.baseUserData.role === "pate") {
        setUserAttributes(data as PateData);
      } else if (data.baseUserData.role === "normal_user") {
        setUserAttributes(data as UserData);
      }
    };
    getUserData();
  }, [userData.token]);

  useEffect(() => {
    if (userAttributes) {
      const setUserAvatar = async () => {
        const userAvatar = await API.getUserAvatar(
          userAttributes.baseUserData.account
        );
        setImageData(userAvatar);
      };
      setUserAvatar();
    }
  }, [userAttributes]);

  console.log(userData.token)

  return (
    <div className={classNames(styles.Settings)}>
      <div className={classNames(styles.SettingsHeader)}>
        <img src={imageData} alt="profile_pic"></img>
        <Headline
          className={classNames(styles.SettingsHeaderHeadlineName)}
          headline="h2"
        >{`${userAttributes?.baseUserData.firstName} ${userAttributes?.baseUserData.lastName}`}</Headline>
        <Headline
          className={classNames(styles.SettingsHeaderHeadlineLocation)}
          headline="h2"
        >
          {userAttributes?.meetingPreference.location}
        </Headline>
        <div className={classNames(styles.SettingsHeaderProfile)}>
          <div className={classNames(styles.SettingsHeaderProfileStatus)}>
            <span>{`${profilePercentage(userAttributes!)}%`}</span>
            <p>{profilePercentage(userAttributes!) === 100 ? "Ihr Profil ist vollständig!" : "Vervollständigen Sie Ihr Profil." }</p>
          </div>
          <Button onClick={() => navigate("/dashboard/settings/profile")}>Profil ändern</Button>
        </div>
      </div>
     <div className={classNames(styles.SettingsButtons)}>
     <Button styling='setting' onClick={() => navigate("/dashboard/settings/account")}>
      <div>
        <img src={account} alt="arrow"></img>
        <>Mein Konto</>
      </div>
     </Button>
     <Button styling='setting' onClick={() => navigate("/dashboard/settings/language")}>
      <div>
        <img src={languages} alt="arrow"></img>
        <>Meine Sprachen</>
      </div>
     </Button>
     <Button styling='setting' onClick={() => navigate("/dashboard/settings/edit")}>
      <div>
        <img src={settings} alt="arrow"></img>
        <>Einstellungen</>
      </div>
     </Button>
     </div>
     <LanguageDropdown ></LanguageDropdown>
    </div>
  );
};

export default Settings;

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
import logoutIcon from "../../../images/icons/ui/logout.svg";
import { useZustand } from "../../../zustand/store";
import { useTranslation } from "react-i18next";

interface Props {
  userData: any;
}

const Settings = (props: Props) => {
  const { userData } = props;
  const navigate = useNavigate();
  const [userAttributes, setUserAttributes] = useState<PateData | UserData>();
  const {t} = useTranslation();

  

  const [imageData, setImageData] = useState<any>(placeholder);
  const logout = useZustand((state) => state.logout);

  useEffect(() => {
    const getUserData = async () => {
      const data = await API.getBaseUserData(userData?.token);
      if (data.baseUserData.role === "pate") {
        setUserAttributes(data as PateData);
      } else if (data.baseUserData.role === "normal_user") {
        setUserAttributes(data as UserData);
      }
    };
    getUserData();
  }, [userData?.token]);

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

  const logoutUser = () => {
      logout();
      navigate('/login');
  };

  return (
    <div className={classNames(styles.Settings)}>
      <div className={classNames(styles.SettingsHeader)}>
        <img src={imageData} alt="profile_pic"></img>
        <Headline
          className={classNames(styles.SettingsHeaderHeadlineName)}
          headline="h2"
        >{`${userAttributes?.baseUserData?.firstName || userData?.baseUserData?.firstName} ${userAttributes?.baseUserData?.lastName || userData?.baseUserData?.lastName}`}</Headline>
        <Headline
          className={classNames(styles.SettingsHeaderHeadlineLocation)}
          headline="h2"
        >
          {userAttributes?.meetingPreference.location && t(`enum_regions_${userAttributes?.meetingPreference.location}`)}
        </Headline>
        <div className={classNames(styles.SettingsHeaderProfile)}>
          <div className={classNames(styles.SettingsHeaderProfileStatus)}>
            <div><span>{`${profilePercentage(userAttributes!)}%`}</span></div>
            <p>{profilePercentage(userAttributes!) === 100 ? t('settingPage1') : t('settingPage2') }</p>
          </div>
          <Button onClick={() => navigate("/dashboard/settings/profile")}>{t('settingPage3')}</Button>
        </div>
      </div>
     <div className={classNames(styles.SettingsButtons)}>
     <Button styling='setting' onClick={() => navigate("/dashboard/settings/account")}>
      <div>
        <img src={account} alt="arrow"></img>
        <>{t('settingAccount')}</>
      </div>
     </Button>
     <Button styling='setting' onClick={() => navigate("/dashboard/settings/languages")}>
      <div>
        <img src={languages} alt="arrow"></img>
        <>{t('settingLanguage')}</>
      </div>
     </Button>
     <Button styling='setting' onClick={() => navigate("/dashboard/settings/edit")}>
      <div>
        <img src={settings} alt="arrow"></img>
        <>{t('settingSettings')}</>
      </div>
     </Button>
     <Button styling='setting' onClick={() => logoutUser()}>
      <div>
        <img src={logoutIcon} alt="arrow"></img>
        <>{t('settingLogout')}</>
      </div>
     </Button>
     </div>
    </div>
  );
};

export default Settings;

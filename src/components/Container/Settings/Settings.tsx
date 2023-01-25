import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Settings.module.scss";
import { API_ADDRESS } from "../../../helpers/env";
import Headline from "../../Headline/Headline";
import API from "../../../helpers/api";
import Button from "../../Button/Button";
import LanguageDropdown from "../../LanguageDropdown/LanguageDropdown";
import placeholder from "../../../images/default.png";
import { useNavigate } from "react-router-dom";
import { PateData, UserData } from "../../../util/types";
import profilePercentage from "../../../helpers/profilePercentage";

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

  console.log(profilePercentage(userAttributes!));

  return (
    <div className={classNames(styles.Settings)}>
      <div className={classNames(styles.SettingsHeader)}>
        <img src={imageData} alt="profile_pic"></img>
        <Headline className={classNames(styles.SettingsHeaderHeadlineName)} headline="h2">{`${userAttributes?.baseUserData.firstName} ${userAttributes?.baseUserData.lastName}`}</Headline>
        <Headline className={classNames(styles.SettingsHeaderHeadlineLocation)} headline="h2">{userAttributes?.meetingPreference.location}</Headline>
      </div>
      <Button onClick={() => navigate("/login")}>Logout</Button>
    </div>
  );
};

export default Settings;

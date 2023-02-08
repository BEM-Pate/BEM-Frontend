import React, { useCallback, useEffect, useState } from "react";
import API from "../../../../helpers/api";
import { availableLanguages } from "../../../../translation/i18n";
import styles from "./Languages.module.scss";

import GB from "../../../../images/icons/flags/GB.svg";
import DE from "../../../../images/icons/flags/DE.svg";
import TR from "../../../../images/icons/flags/TR.svg";
import FR from "../../../../images/icons/flags/FR.svg";
import ES from "../../../../images/icons/flags/ES.svg";
import PL from "../../../../images/icons/flags/PL.svg";
import UA from "../../../../images/icons/flags/UA.svg";
import classNames from "classnames";
import check from "../../../../images/icons/ui/check.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../../Button/Button";
import Headline from "../../../Headline/Headline";
import axios from "axios";
import { API_ADDRESS } from "../../../../helpers/env";

interface Props {
  userData: any;
}

function getFlag(countryCode: string) {
  switch (countryCode) {
    case "GB" || "EN":
      return GB;
    case "DE":
      return DE;
    case "TR":
      return TR;
    case "FR":
      return FR;
    case "ES":
      return ES;
    case "PL":
      return PL;
    case "UA":
      return UA;
    default:
      return DE;
  }
}

const Languages = (props: Props) => {
  const { userData } = props;
  const navigate = useNavigate();

  const [userAttributes, setUserAttributes] = useState<any>();
  const [languages, setLanguages] = useState<any>();

  const [updatedLanguages, setUpdatedLanguages] = useState<string[]>([]);

  const handleChange = (clickedValue: string) => {
    const newState = updatedLanguages?.includes(clickedValue)
      ? updatedLanguages.filter((s) => s !== clickedValue)
      : [...updatedLanguages, clickedValue];

    setUpdatedLanguages(newState);
  };

  useEffect(() => {
    const init = async () => {
      const response = await API.getBaseUserData(userData.token);
      const languages = await API.getEnums("languages");
      setUserAttributes(response);
      setLanguages(languages);
      setUpdatedLanguages(response.baseUserData.languages);
    };
    init();
  }, [userData]);

  const updateLanguage = useCallback(() => {
    try {
      axios
        .put(
          `${API_ADDRESS}/user/userdata`,
          {
            baseUserData: {
              languages: updatedLanguages,
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
  }, [updatedLanguages, userData]);

  return (
    <div className={classNames(styles.Languages)}>
      <div className={classNames(styles.LanguagesHeader)}>
        <Button
          icon
          styling="back"
          onClick={() => {
            navigate(-1);
            updateLanguage();
          }}
        ></Button>
        <Headline headline="h1" styling="page">
          Languages
        </Headline>
      </div>
      <div className={classNames(styles.LanguagesList)}>
      {languages?.map((language: any, index: any) => {
        return (
          <button
            key={index}
            name={language}
            className={classNames(
              styles.LanguagesButton,
              updatedLanguages?.includes(language)
                ? styles.LanguagesButtonActive
                : ""
            )}
            onClick={(e: any) => handleChange(e.target.name)}
          >
            <div className={classNames(styles.LanguagesButtonDetails)}>
              <img src={getFlag(language)} alt={language}></img>
              <p>{language}</p>
            </div>
            <div className={classNames(styles.LanguagesButtonCheck)}>
              {updatedLanguages?.includes(language) && <img src={check} alt="check"></img>}
            </div>
          </button>
        );
      })}
      </div>
    </div>
  );
};

export default Languages;

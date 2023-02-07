import React, { useEffect, useState } from "react";
import API from "../../../../helpers/api";
import { availableLanguages } from "../../../../translation/i18n";
import styles from "./Languages.module.scss";

import EN from "../../../../images/icons/flags/EN.svg";
import DE from "../../../../images/icons/flags/DE.svg";
import TU from "../../../../images/icons/flags/TU.svg";
import FR from "../../../../images/icons/flags/FR.svg";
import ES from "../../../../images/icons/flags/ES.svg";
import PL from "../../../../images/icons/flags/PL.svg";
import UR from "../../../../images/icons/flags/UR.svg";
import classNames from "classnames";
import check from "../../../../images/icons/ui/check.svg";

interface Props {
  userData: any;
}

function getFlag(countryCode: string) {
  switch (countryCode) {
    case "EN":
      return EN;
    case "DE":
      return DE;
    case "TU":
      return TU;
    case "FR":
      return FR;
    case "ES":
      return ES;
    case "PL":
      return PL;
    case "UR":
      return UR;
    default:
      return DE;
  }
}

const Languages = (props: Props) => {
  const { userData } = props;
  const [userAttributes, setUserAttributes] = useState<any>();
  const [languages, setLanguages] = useState<any>();
  const [userLanguages, setUserLanguages] = useState<string[]>([]);

  const [values, setValues] = useState<string[]>([]);

  const handleChange = (clickedValue: string) => {
    const newState = values?.includes(clickedValue)
      ? values.filter((s) => s !== clickedValue)
      : [...values, clickedValue];

    setValues(newState);
  };

  useEffect(() => {
    const init = async () => {
      const response = await API.getBaseUserData(userData.token);
      const languages = await API.getEnums("languages");
      setUserAttributes(response);
      setLanguages(languages);
      setValues(response.baseUserData.languages);
    };
    init();
  }, [userData]);

  console.log(values);

  return (
    <div className={classNames(styles.Languages)}>
      {languages?.map((language: any, index: any) => {
        return (
          <button
            key={index}
            name={language}
            className={classNames(
              styles.LanguagesButton,
              values?.includes(language) ? styles.LanguagesButtonActive : ""
            )}
            onClick={(e: any) => handleChange(e.target.name)}
          >
            <div className={classNames(styles.LanguagesButtonDetails)}>
              <img src={getFlag(language)} alt={language}></img>
              <p>{language}</p>
            </div>
            <div>{ values?.includes(language) ? <img src={check} alt="check"></img> : "" }</div>
          </button>
        );
      })}
    </div>
  );
};

export default Languages;

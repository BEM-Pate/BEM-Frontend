import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import styles from "./LanguageDropdown.module.scss";
import { availableLanguages } from "../../translation/i18n";
import { FormOption } from "../FormularStepper/FormularTypes";
import Dropdown from "../Dropdown/Dropdown";

const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>();
  const [languages] = useState<FormOption[]>((availableLanguages.map((item) => ({
    value: item,
    label: item,
  } as FormOption))));

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n])

  return (
    <div>
      <Dropdown id="languages" options={languages} onChange={setLanguage} label={`${t("appLanguage")}`}></Dropdown>
    </div>
  );
};

export default LanguageDropdown;

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import styles from "./LanguageDropdown.module.scss";
import { availableLanguages} from "../../translation/i18n";
import Dropdown from "../Dropdown/Dropdown";

interface Props {
  className?: any | undefined;
}

const LanguageDropdown = (props: Props) => {
  const { t, i18n } = useTranslation();
  const { className } = props;

  const [language, setLanguage] = useState<string>();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n])

  return (
    <div className={classNames(styles.LanguageDropdown, className)}>
      <Dropdown id="languages" options={availableLanguages} onChange={setLanguage} placeholder={`${t("appLanguage")}`}></Dropdown>
    </div>
  );
};

export default LanguageDropdown;

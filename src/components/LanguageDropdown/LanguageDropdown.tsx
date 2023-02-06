import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import styles from "./LanguageDropdown.module.scss";
import { availableLanguages } from "../../translation/i18n";

const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (item: string) => {
    i18n.changeLanguage(item);
  };

  return (
    <div>
      <hr />
      <Dropdown
        show={dropdownOpen}
        onToggle={() => setDropdownOpen(!dropdownOpen)}
      >
        <DropdownButton
          title={selectedOption || t("appLanguage")}
          defaultValue={i18n.language}
          menuVariant="dark"
          variant="secondary"
        >
          {availableLanguages.map((item) => (
            <Dropdown.Item key={item} onClick={() => handleChange(item)} >
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Dropdown>
      <hr />
    </div>
  );
};

export default LanguageDropdown;

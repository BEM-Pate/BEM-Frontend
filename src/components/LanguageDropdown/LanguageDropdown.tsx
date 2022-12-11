import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import styles from './LanguageDropdown.module.scss';
import Logo from '../../images/icons/translation/icon_german.png';
import { availableLanguages } from '../../translation/i18n';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  return (
    <div className={classNames(styles.Position)}>
      <div className="dropdown">

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><a className="dropdown-item" href="#">Action</a></li>
          <li><a className="dropdown-item" href="#">Another action</a></li>
          <li><a className="dropdown-item" href="#">Something else here</a></li>
        </ul>
        <select
          defaultValue={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="btn dropdown-toggle"
        >
          {availableLanguages.map((language, country_code) => (
            <option key={language}>
              <li><a>{language}</a></li>
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default LanguageDropdown;

/**
 * const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  return (
    <div className={classNames(styles.Position)}>
      <select
        defaultValue={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {availableLanguages.map((language) => (
          <option key={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropdown;
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import styles from './LanguageDropdown.module.scss';
import { availableLanguages } from '../../translation/i18n';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  return (
    <div className={classNames(styles.Position)}>
      <select
        defaultValue={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="btn dropdown-toggle"
      >
        {availableLanguages.map((language) => (
          <option key={language}>
            <li>{language}</li>
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropdown;

import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './LandingPage.module.scss';
import Button from '../../components/Button/Button';
import { availableLanguages } from '../../translation/i18n';

interface LandingPageProps {
  children?: React.ReactNode
}

const LandingPage = (props: LandingPageProps) => {
  const { children } = props;
  const { t, i18n } = useTranslation();
  return (
    <div className={classNames(styles.LandingPage)}>

      landing page
      <Link to="/register/affected">Register Affected</Link>
      <Link to="/register/mentor">Register Mentor</Link>
      {children}
      <Button>Text</Button>
      <h1>{t('appLanguage')}</h1>
      <select defaultValue={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
        {availableLanguages.map((language) => (
          <option key={language}>{language}</option>
        ))}
      </select>
      <Button>
        {t('buttonNext')}
      </Button>
    </div>
  );
};

export default LandingPage;

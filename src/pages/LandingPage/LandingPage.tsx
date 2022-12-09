import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './LandingPage.module.scss';
import Button from '../../components/Button/Button';
import { availableLanguages } from '../../translation/i18n';

interface LandingPageProps {
  children?: React.ReactNode;
}
const DATA = [
  {
    title: 'Bem-Pate finden',
    ref: '/register/affected',
  },
  {
    title: 'Bem-Pate werden',
    ref: '/register/mentor',
  },
  {
    title: 'Selbsthilfegruppe finden',
    ref: '/register/supportGroup',
  },
  {
    title: 'Selbsthilfegruppe gründen',
    ref: '/register/createSupportGroup',
  },
  {
    title: 'Videos',
    ref: '/register/video',
  },
];
const LandingPage = (props: LandingPageProps) => {
  const { children } = props;
  const { t, i18n } = useTranslation();
  return (
    <div className={classNames(styles.LandingPage)}>
      <div>
        <h2>Willkommen beim BEMpsy Selbsthilfe-Portal.</h2>
        <p>
          Ein Austausch- und Vermittlungsportal für alle BEM-Berechtigten mit
          psychischen Beeinträchtigungen.
        </p>
        <h2>Was möchtest du tun?</h2>
      </div>
      {DATA.map((item) => (
        <div className={classNames(styles.landingPageButton)}>
          <Link to={item.ref}>
            <Button>
              {item.title}
            </Button>
          </Link>
        </div>
      ))}
      {children}
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

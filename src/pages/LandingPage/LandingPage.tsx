import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './LandingPage.module.scss';
import Button from '../../components/Button/Button';
import Headline from '../../components/Headline/Headline';

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.LandingPage)}>
      <div>
        <Headline headline="h2">Willkommen beim BEMpsy Selbsthilfe-Portal.</Headline>
        <p>
          Ein Austausch- und Vermittlungsportal für alle BEM-Berechtigten mit
          psychischen Beeinträchtigungen.
        </p>
        <Headline headline="h3">Was möchtest du tun?</Headline>
      </div>
      <div className={styles.LandingPageButtons}>
        <Link to="/register/seeker" className={classNames(styles.LandingPageButton, styles.LandingPageButtonIndigo)}>
          Bem-Pate finden
        </Link>
        <Link to="/register/pate" className={classNames(styles.LandingPageButton, styles.LandingPageButtonMagenta)}>
          BEM-Pate werden
        </Link>
        <span className={classNames(styles.LandingPageOrLabel)}>oder</span>
        <Link to="/register/video" className={classNames(styles.LandingPageButton, styles.LandingPageButtonOrange)}>
          Betroffene erzählen (Videos)
        </Link>
        <Link to="/login" className={classNames(styles.LandingPageLink)}>
          Mit bestehendem Account anmelden
        </Link>
      </div>
      <Button>
        {t('buttonNext')}
      </Button>
    </div>
  );
};

export default LandingPage;

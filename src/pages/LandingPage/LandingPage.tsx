import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './LandingPage.module.scss';
import Headline from '../../components/Headline/Headline';

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.LandingPage)}>
      <div>
        <Headline headline="h2">{t('landingPageWelcome')}</Headline>
        <p>{t('landingPageIntroduction')}</p>
        <Headline headline="h3">{t('landingPageCTA')}</Headline>
      </div>
      <div className={styles.LandingPageButtons}>
        <Link to="/register/seeker" className={classNames(styles.LandingPageButton, styles.LandingPageButtonIndigo)}>
          {t('landingPageLinkFindPate')}
        </Link>
        <Link to="/register/pate" className={classNames(styles.LandingPageButton, styles.LandingPageButtonMagenta)}>
          {t('landingPageLinkBecomePate')}
        </Link>
        <span className={classNames(styles.LandingPageOrLabel)}>{t('landingPageLinkOrLabel')}</span>
        <Link to="/register/video" className={classNames(styles.LandingPageButton, styles.LandingPageButtonOrange)}>
          {t('landingPageLinkVideos')}
        </Link>
        <Link to="/login" className={classNames(styles.LandingPageLink)}>
          {t('landingPageLinkLogin')}
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './LandingPage.module.scss';
import Headline from '../../components/Headline/Headline';
import becomePate from '../../images/icons/landingpage/become-pate.svg';
import createGroup from '../../images/icons/landingpage/create-group.svg';
import findGroup from '../../images/icons/landingpage/find-group.svg';
import Button from '../../components/Button/Button';

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
        <Link to="/onboardingseeker" className={classNames(styles.LandingPageButton)}>
          <img src={findGroup} alt="Find a Group" />
          <span>{t('landingPageLinkFindPate')}</span>
        </Link>
        <Link to="/onboardingpate" className={classNames(styles.LandingPageButton)}>
          <img src={becomePate} alt="Become a Pate" />
          <span>{t('landingPageLinkBecomePate')}</span>
        </Link>
        <Link to="/onboardingshg" className={classNames(styles.LandingPageButton)}>
          <img src={becomePate} alt="Become a Pate" />
          <span>{t('landingPageLinkBecomePate')}</span>
        </Link>
        <Button styling="outline" className={classNames(styles.LandingPageButton)} disabled>
          <img src={createGroup} alt="Create a Group" />
          <span>{t('landingPageLinkVideos')}</span>
        </Button>
        <hr />
        <Link to="/login" className={classNames(styles.LandingPageLink)}>
          {t('labelLogin')}
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

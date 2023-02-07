import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './LandingPage.module.scss';
import Headline from '../../components/Headline/Headline';
import becomePate from '../../images/icons/landingpage/become-pate.svg';
import createGroup from '../../images/icons/landingpage/create-group.svg';
import findGroup from '../../images/icons/landingpage/find-group.svg';

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.LandingPage)}>
      <div>
        <Headline headline="h3" className={styles.LandingPageHeadline}>{t('landingPageCTA')}</Headline>
      </div>
      <div className={styles.LandingPageButtons}>
        <Link to="/dashboard/search" className={classNames(styles.LandingPageButton)}>
          <img src={findGroup} alt="Find a Group" />
          <span>{t('landingPageLinkFindPate')}</span>
        </Link>
        <Link to="/register/pate" className={classNames(styles.LandingPageButton)}>
          <img src={becomePate} alt="Become a Pate" />
          <span>{t('landingPageLinkBecomePate')}</span>
        </Link>
        <Link to="/dashboard/groups" className={classNames(styles.LandingPageButton)}>
          <img src={createGroup} alt="Create a Group" />
          <span>{t('landingPageLinkCreateSHG')}</span>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

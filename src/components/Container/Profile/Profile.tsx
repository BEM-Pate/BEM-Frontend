import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './Profile.module.scss';
import Button from '../../Button/Button';
import logo from '../../../images/default.png';

const Profile = () => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.Profile)}>
      <p className={classNames(styles.ProfileHeader)}>
        {t('profilePageYourProfile')}
      </p>
      <a
        href="/dashboard/editprofile"
        className={classNames(styles.ProfileEdit)}
      >
        <button>{t('labelEdit')}</button>
      </a>

      <hr />
      <div className={classNames(styles.ProfilePanel)}>
        <img
          src={logo}
          alt="logo"
          className={classNames(styles.ProfileImage)}
        />

        <hr />
        <div className={classNames(styles.ProfileDataField)}>
          <p className={classNames(styles.ProfileHeader)}>
            {t('profilePageYourData')}
          </p>
          <p className={classNames(styles.ProfileDataText)}>
            {t('labelFirstName')}
          </p>
          <p>Klaus</p>
          <p className={classNames(styles.ProfileDataText)}>
            {t('labelLastName')}
          </p>
          <p>Heinrich</p>
          <p className={classNames(styles.ProfileDataText)}>{t('labelBio')}</p>
          <p>
            Ich bin Klaus Heinrich, 55 Jahre alt und komme aus Berlin Ich bin
            Klaus Heinrich, 55 Jahre alt und komme aus BerlinIch bin Klaus
            Heinrich, 55 Jahre alt und komme aus BerlinIch bin Klaus Heinrich,
            55 Jahre alt und komme aus Berlin
          </p>
          <p className={classNames(styles.ProfileDataText)}>
            {t('labelDiseaseProfile')}
          </p>
          <p>Krankheitsbild/er</p>
        </div>

        <hr />
        <div className={classNames(styles.ProfileButtonGroup)}>
          <Button>
            {' '}
            <h3>{t('labelBecomeMentor')}</h3>
            {' '}
          </Button>
          <Button>
            {' '}
            <h3>{t('profilePageDeleteProfile')}</h3>
            {' '}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

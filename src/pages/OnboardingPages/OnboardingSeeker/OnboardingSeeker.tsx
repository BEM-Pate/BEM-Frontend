import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './OnboardingSeeker.module.scss';
import Button from '../../../components/Button/Button';
import placeholder from '../../../images/logo.svg';

const OnboardingSeeker = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={classnames(styles.imageContainer)}>
        <img
          src={placeholder}
          className={classnames(styles.imageContainerimage)}
          alt="Placeholder"
        />
      </div>

      <div className={classnames(styles.textContainer)}>
        <h1 className={classnames(styles.textContainerheader)}>
          {t('onboardingPageSeekerHeader')}
        </h1>
        <p>{t('onboardingPageSeekerDescription')}</p>
      </div>
      <div className={classnames(styles.buttonContainer)}>
        <Link to="/register/seeker">
          <Button type="reset">
            {t('labelRegister')}
          </Button>
        </Link>
      </div>
      <hr />
      <Link to="/login" className={classnames(styles.LoginContainertext)}>
        <p>{t('labelLogin')}</p>
      </Link>
    </div>
  );
};
export default OnboardingSeeker;

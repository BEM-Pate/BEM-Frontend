import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import placeholder from '../../../images/logo.svg';
import Button from '../../../components/Button/Button';
import styles from './OnboardingPate.module.scss';

const OnboardingPate = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={classnames(styles.imageContainer)}>
        <img
          src={placeholder}
          className={classnames(styles.imageContainerimage)}
          alt="placeholder"
        />
      </div>
      <div className={classnames(styles.textContainer)}>
        <h1 className={classnames(styles.textContainerheader)}>
          {t('onboardingPateHeader')}
        </h1>
        <p>{t('onboardingPateDescription')}</p>
      </div>
      <div className={classnames(styles.buttonContainer)}>
        <Link to="/register/pate">
          <Button>{t('labelRegister')}</Button>
        </Link>
      </div>
      <hr />
      <Link to="/login" className={classnames(styles.LoginContainertext)}>
        <p>{t('labelLogin')}</p>
      </Link>
    </div>
  );
};
export default OnboardingPate;

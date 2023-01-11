import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import placeholder from '../../../images/logo.svg';
import Button from '../../../components/Button/Button';
import styles from './OnboardingSHG.module.scss';

const OnboardingSHG = () => {
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
          {t('onboardingSHGHeader')}
        </h1>
      </div>

      <div className={classnames(styles.buttonContainer)}>
        <Button className={classnames(styles.buttonContainerbutton)}>{t('labelRegister')}</Button>
      </div>
      <hr />
      <Link to="/login" className={classnames(styles.LoginContainertext)}>
        <p>{t('labelLogin')}</p>
      </Link>
    </div>
  );
};
export default OnboardingSHG;

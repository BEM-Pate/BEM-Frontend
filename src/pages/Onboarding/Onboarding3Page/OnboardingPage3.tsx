import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import image_circle from '../../../images/icons/ui/circleImage.png';
import Button from '../../../components/Buttons/Button';
import ButtonSecondary from '../../../components/Buttons/ButtonSecondary/ButtonSecondary';
import styles from './OnboardingPage3.module.scss';

const OnboardingPage3 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={classnames(styles.imageContainer)}>
        <img
          src={image_circle}
          className={classnames(styles.imageContainerimage)}
        />
      </div>
      <div className={classnames(styles.textContainer)}>
        <h1 className={classnames(styles.textContainerheader)}>
          {t('onboardingPage3Header')}
        </h1>
      </div>

      <div className={classnames(styles.buttonContainer)}>
        Í
        <Link to="/onboardingseeker">
          <Button>{t('labelNext')}</Button>
        </Link>
        <ButtonSecondary>{t('labelRegister')}</ButtonSecondary>
        <hr />
        <p>{t('loginPageHeadline')}</p>
        <Link to="/login">
          <p>{t('labelLogin')}</p>
        </Link>
      </div>
    </div>
  );
};
export default OnboardingPage3;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import image_woman2 from '../../../images/icons/ui/image_womanCutted.png';
import Button from '../../../components/Buttons/Button';
import ButtonSecondary from '../../../components/Buttons/ButtonSecondary/ButtonSecondary';
import styles from './OnboardingPage2.module.scss';

const OnboardingPage2 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={classnames(styles.imageContainer)}>
        <img
          src={image_woman2}
          className={classnames(styles.imageContainerimage)}
        />
      </div>
      <div className={classnames(styles.textContainer)}>
        <h1 className={classnames(styles.textContainerheader)}>
          {t('onboardingPage2Header')}
        </h1>
        <p>{t('onboardingPage2Description')}</p>
      </div>
      <div className={classnames(styles.buttonContainer)}>
        <Link to="/onboardinggroup">
          <Button>{t('labelNext')}</Button>
        </Link>
        <Link to="/register/pate">
          <ButtonSecondary>{t('labelRegister')}</ButtonSecondary>
        </Link>
      </div>
    </div>
  );
};
export default OnboardingPage2;

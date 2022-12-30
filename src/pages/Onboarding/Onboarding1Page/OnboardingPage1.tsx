import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import image_man from '../../../images/icons/ui/image_man.png';
import image_woman from '../../../images/icons/ui/image_woman.png';
import styles from './OnboardingPage1.module.scss';
import Button from '../../../components/Buttons/Button';
import ButtonSecondary from '../../../components/Buttons/ButtonSecondary/ButtonSecondary';

const OnboardingPage1 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={classnames(styles.imageContainer)}>
        <img src={image_man} />
        <img
          src={image_woman}
          className={classnames(styles.imageContainerimage)}
        />
      </div>

      <div className={classnames(styles.textContainer)}>
        <h1 className={classnames(styles.textContainerheader)}>
          {t('onboardingPage1Header')}
        </h1>
        <p>{t('onboardingPage1Description')}</p>
      </div>
      <div className={classnames(styles.buttonContainer)}>
        <Link to="/onboardingpate">
          <Button>{t('labelNext')}</Button>
        </Link>
        <Link to="/register/seeker">
          <ButtonSecondary>{t('labelRegister')}</ButtonSecondary>
        </Link>
      </div>
    </div>
  );
};
export default OnboardingPage1;

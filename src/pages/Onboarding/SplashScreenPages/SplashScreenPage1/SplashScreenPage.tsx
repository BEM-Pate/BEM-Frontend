/* eslint-disable @typescript-eslint/space-infix-ops */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './SplashScreenPage.module.scss';
import bemLogo from '../../../../images/icons/ui/bemlogo.png';

const SplashScreen = () => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.containerbackgroundImage)}>
        <div className={classNames(styles.containermain)}>
          <img src={bemLogo} className={classNames(styles.containerbemLogo)} />
          <h1 className={classNames(styles.containertext)}>{t('splashscreenHeader')}</h1>
        </div>
      </div>
    </div>
  );
};
export default SplashScreen;

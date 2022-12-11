import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './Groups.module.scss';

const Groups = () => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.Groups)}>{t('GroupsHeader')}</div>
  );
};
export default Groups;

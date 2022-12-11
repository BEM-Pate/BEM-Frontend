import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './DashboardPage.module.scss';
import BottomNavigtionBar from '../../components/BottomNavigationBar/BottomNavigtionBar';

const DashboardPage = () => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.Dashboard)}>
      <Outlet />
      <BottomNavigtionBar />
    </div>
  );
};
export default DashboardPage;

import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import styles from './DashboardPage.module.scss';
import LandingPage from '../LandingPage/LandingPage';

const DashboardPage = () => (
  <div className={classNames(styles.Dashboard)}>
    <Outlet />
    <LandingPage />
  </div>
);

export default DashboardPage;

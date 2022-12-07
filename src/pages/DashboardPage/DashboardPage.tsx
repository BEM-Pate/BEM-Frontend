import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import styles from './DashboardPage.module.scss';
import BottomNavigtionBar from '../../components/BottomNavigationBar/BottomNavigtionBar';

const DashboardPage = () => (
  <div className={classNames(styles.Dashboard)}>
    <Outlet />
    <BottomNavigtionBar />
  </div>
);

export default DashboardPage;

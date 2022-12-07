import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import styles from './DashboardPage.module.scss';
import BottomNavigtionBar from '../../components/BottomNavigationBar/BottomNavigtionBar';
import TopNavigationBar from '../../components/TopNavigationBar/TopNavigationBar';

const DashboardPage = () => (
  <div className={classNames(styles.Dashboard)}>
    <TopNavigationBar />
    <Outlet />
    <BottomNavigtionBar />
  </div>
);

export default DashboardPage;

import React from 'react';
import classNames from 'classnames';

import styles from './TopNavigationBar.module.scss';
import logo from '../../images/logo.svg';

const TopNavigationBar = () => (
  <header className={classNames(styles.Navigation)}>
    <img src={logo} alt="logo" />
  </header>
);

export default TopNavigationBar;

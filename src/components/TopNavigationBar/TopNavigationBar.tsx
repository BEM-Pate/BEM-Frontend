import React from 'react';
import classNames from 'classnames';

import styles from './TopNavigationBar.module.scss';
import logo from '../../images/logo.svg';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';

const TopNavigationBar = () => (
  <header className={classNames(styles.Navigation)}>
    <img src={logo} alt="logo" />
    <LanguageDropdown />
  </header>
);

export default TopNavigationBar;

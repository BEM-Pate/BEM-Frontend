import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import styles from './TopNavigationBar.module.scss';
import logo from '../../images/logo.svg';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';

const TopNavigationBar = () => (
  <header className={classNames(styles.Navigation)}>

    <Link to="/"><img src={logo} alt="logo" /></Link>
    <LanguageDropdown />
  </header>
);

export default TopNavigationBar;

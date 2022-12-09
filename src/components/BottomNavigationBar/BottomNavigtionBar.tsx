import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './BottomNavigtionBar.module.scss';

import messages from '../../images/icons/navigation/chat_filled.svg';
import search from '../../images/icons/navigation/person_search_filled.svg';
import groups from '../../images/icons/navigation/groups_filled.svg';
import profile from '../../images/icons/navigation/account_outlined.svg';

const BottomNavigtionBar = () => (
  <nav className={classNames(styles.Navigation)}>
    <ul>
      <li>
        <NavLink to="/dashboard/messages" className={({ isActive }) => (isActive ? classNames(styles.Link, styles.ActiveLink) : styles.Link)}>
          <img src={messages} alt="messages" />
          <span>Messages</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/search" className={({ isActive }) => (isActive ? classNames(styles.Link, styles.ActiveLink) : styles.Link)}>
          <img src={search} alt="search" />
          <span>search</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/groups" className={({ isActive }) => (isActive ? classNames(styles.Link, styles.ActiveLink) : styles.Link)}>
          <img src={groups} alt="groups" />
          <span>groups</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile" className={({ isActive }) => (isActive ? classNames(styles.Link, styles.ActiveLink) : styles.Link)}>
          <img src={profile} alt="profile" />
          <span>profile</span>
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default BottomNavigtionBar;

import React from 'react';
import classNames from 'classnames';
import { NavLink, Route } from 'react-router-dom';
import styles from './BottomNavigtionBar.module.scss';

import messages from '../../images/icons/navigation/messages.svg';
import search from '../../images/icons/navigation/search.svg';
import groups from '../../images/icons/navigation/groups.svg';
import settings from '../../images/icons/navigation/settings.svg';
import ChatRoom from '../Container/Messages/Chatroom';

const BottomNavigtionBar = () => (
  <nav className={classNames(styles.Navigation)}>
    <ul>
      <li className={classNames(styles.Elements)}>
        <NavLink to="/dashboard/search" className={({ isActive }) => (isActive ? classNames(styles.Link, styles.ActiveLink) : styles.Link)}>
          <img src={search} alt="search" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/messages" className={({ isActive }) => (isActive ? classNames(styles.Link, styles.ActiveLink) : styles.Link)}>
          <img src={messages} alt="messages" />
        </NavLink>
      </li>
   

      <li>
        <NavLink to="/dashboard/groups" className={({ isActive }) => (isActive ? classNames(styles.Link, styles.ActiveLink) : styles.Link)}>
          <img src={groups} alt="groups" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/settings" className={({ isActive }) => (isActive ? classNames(styles.Link, styles.ActiveLink) : styles.Link)}>
          <img src={settings} alt="settings" />
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default BottomNavigtionBar;

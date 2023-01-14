import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './DashboardPage.module.scss';
import BottomNavigtionBar from '../../components/BottomNavigationBar/BottomNavigtionBar';
import { socket, useZustand } from '../../zustand/store';

const DashboardPage = () => {
  const route = useZustand(state => state.route)
  const location = useLocation()
  const setChatRoom = useZustand(state => state.setChatroom)
  useEffect(() => {
    socket.on('new-message', ({ roomId, messageObj }) => {
      console.log('heheh')
      setChatRoom(roomId, messageObj)
    })

    return () => {
      socket.off('new-message')
    }
  }, [])

  return (<div className={classNames(styles.Dashboard)}
    style={{ height: '100%' }}
  >
    <Outlet />
    {!location.pathname.includes('chat') && <BottomNavigtionBar />}
  </div>
  )
};

export default DashboardPage;

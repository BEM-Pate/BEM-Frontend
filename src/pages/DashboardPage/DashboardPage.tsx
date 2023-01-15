import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './DashboardPage.module.scss';
import BottomNavigtionBar from '../../components/BottomNavigationBar/BottomNavigtionBar';
import { initiliazeSocket, socket, SOCKET_URL, useZustand } from '../../zustand/store';
import { io } from 'socket.io-client'

const DashboardPage = () => {
  const route = useZustand(state => state.route)
  const location = useLocation()
  const setChatRoom = useZustand(state => state.pushMessageToChatRoom)
  const chatRooms = useZustand(state => state.chatrooms)
  const socketConfig = useZustand(state => state.socketConfig)
  const setSeen =useZustand(state=>state.setSeen)

  useEffect(() => {
    if (!socket) return
    if (chatRooms?.length === 0) return

    socket.removeAllListeners()

    for (const chatroom of chatRooms) {
      console.log('joining chatroom')
      socket.emit('join-chatroom', { roomId: chatroom._id })
    }

    socket.on('new-message', ({ roomId, messageObj }) => {
      setChatRoom(roomId, messageObj)
    })

    socket.on('client-message-seen', (room)=>{
      console.log('client-message-seen')
      setSeen(room._id, room)
    })


  }, [chatRooms, socket])

  useEffect(() => {
    if (socketConfig && !socket) {
      initiliazeSocket(socketConfig)
    }

  }, [socketConfig])


  return (<div className={classNames(styles.Dashboard)}
    style={{ height: '100%' }}
  >
    <Outlet />
    {!location.pathname.includes('chat') && <BottomNavigtionBar />}
  </div>
  )
};

export default DashboardPage;

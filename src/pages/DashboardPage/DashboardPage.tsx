import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './DashboardPage.module.scss';
import BottomNavigtionBar from '../../components/BottomNavigationBar/BottomNavigtionBar';
import { initializeSocket, socket, SOCKET_URL, useZustand } from '../../zustand/store';
import { io } from 'socket.io-client'

const DashboardPage = () => {
  const location = useLocation()
  const [fetchPendingContacts, setChatRoom, chatRooms, socketConfig, setSeen, setOnlineUsersInRooms, onlineUsersInRooms] = useZustand((state) =>
    [state.fetchPendingContacts, state.pushMessageToChatRoom, state.chatrooms, state.socketConfig, state.setSeen, state.setOnlineUsersInRooms, state.onlineUsersInRooms])

  useEffect(() => {
    if (!socket) return
    // if (chatRooms?.length === 0) return

    socket.removeAllListeners()
    socket.on('connect', () => {
        console.log('socket connected')
    })

    if(chatRooms?.length > 0) {
      for (const chatroom of chatRooms) {
        console.log('joining chatroom')
        socket.emit('join-chatroom', { roomId: chatroom._id })
        socket.emit('check-available-status-in-room', { roomId: chatroom._id })
      }
    }

    socket.on('new-message', ({ roomId, messageObj }) => {
      setChatRoom(roomId, messageObj)
    })

    socket.on('available-clients', (data) => {
      setOnlineUsersInRooms(data)
    })

    socket.on('client-message-seen', (room) => {
      setSeen(room._id, room)
    })

    socket.on('user-disconnected', (data) => {
      console.log(`user is offline: ${data.userId}}`) 
      let usersInRoom = onlineUsersInRooms[data.roomId]
      const availableClients = usersInRoom.filter((id: any) => id !== data.userId)
      setOnlineUsersInRooms({ availableClients, roomId: data.roomId })
    })

    socket.on('notify-contact-request', (data) => {
      console.log("notify triggered")
        fetchPendingContacts()
      console.log(data)
    })

  }, [chatRooms, socket])

  useEffect(() => {
    if (socketConfig && !socket) {
      initializeSocket(socketConfig)
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

import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {Outlet, useLocation} from 'react-router-dom';
import styles from './DashboardPage.module.scss';
import BottomNavigtionBar from '../../components/BottomNavigationBar/BottomNavigtionBar';
import {getSocket, initiliazeSocket, socket, SOCKET_URL, useZustand} from '../../zustand/store';
import {Modal} from "react-bootstrap";
import Button from "../../components/Button/Button";
import request_chat from "../../images/icons/ui/request_chat.svg";
import {useNavigate} from "react-router";

const DashboardPage = () => {
    const location = useLocation()
    const [fetchPendingContacts, fetchChatroom, setChatRoom, chatRooms, socketConfig, setSeen, setOnlineUsersInRooms, onlineUsersInRooms, setRoute] = useZustand((state) =>
        [state.fetchPendingContacts,state.fetchChatroom, state.pushMessageToChatRoom, state.chatrooms, state.socketConfig, state.setSeen, state.setOnlineUsersInRooms, state.onlineUsersInRooms, state.setCurrentRoute])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [pate, setPate] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) return

        console.log("socket set!")
        socket.removeAllListeners()
        if(chatRooms.length>0) {
            for (const chatroom of chatRooms) {
                console.log('joining chatroom')
                socket.emit('join-chatroom', {roomId: chatroom._id})
                socket.emit('check-available-status-in-room', {roomId: chatroom._id})
            }
        }
        socket.on("connect", () => {
            console.log("socket server connected")
            })

        socket.on('new-message', ({roomId, messageObj}) => {
            setChatRoom(roomId, messageObj)
        })

        socket.on('available-clients', (data) => {
            setOnlineUsersInRooms(data)
        })

        socket.on('client-message-seen', (room) => {
            setSeen(room._id, room)
        })

        socket.on('user-disconnected', (data) => {
            console.log(`user is offline: ${data.userId}`)
            // let usersInRoom = onlineUsersInRooms[data.roomId]
            // const availableClients = usersInRoom.filter((id: any) => id !== data.userId)
            // setOnlineUsersInRooms({availableClients, roomId: data.roomId})
            socket?.emit('check-available-status-in-room', {roomId: data.roomId})
        })

        socket.on('user-connected', (data) => {
            if(chatRooms.length === 0) return
            for (const chatroom of chatRooms) {
                // const chatroomId = chatroom._id
                // if (onlineUsersInRooms[chatroomId] && !onlineUsersInRooms[chatroomId].includes(data.account)) {
                //     let availableClients = onlineUsersInRooms[chatroomId]
                //     availableClients.push(data.account)
                //     setOnlineUsersInRooms({availableClients, roomId: chatroomId})
                // }
                socket?.emit('check-available-status-in-room', {roomId: chatroom._id})
            }
        })

        socket.on('notify-contact-request', (data) => {
            console.log("notify triggered")
            fetchPendingContacts()
            console.log(data)
        })

        socket.on('new-pate-matched', (data) => {
            console.log('new-pate-matched')
            fetchChatroom()
            setPate(data.pate)
            handleShow()
        })

        socket.on('new-chatroom',() => {
            console.log('new-chatroom')
            fetchChatroom()
        })

    }, [chatRooms, socket])

    useEffect(() => {
        if (socketConfig && !socket) {
            initiliazeSocket(socketConfig)
        }


    }, [socketConfig])


    return (<div className={classNames(styles.Dashboard)}
                 style={{height: '100%'}}
        >
            <Outlet/>
            {!location.pathname.includes('chat') && <BottomNavigtionBar/>}

            <Modal caria-labelledby="example-custom-modal-styling-title" show={show} onHide={handleClose} size="lg"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Herzlichen Glückwunsch, it's a MATCH !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Du bist nun in Verbindung
                        mit {pate?.firstName} {pate?.lastName}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={classNames(styles.ModalButton)} onClick={handleClose}>
                        Schließen
                    </Button>
                    <Button
                        className={classNames(styles.ModalButton)}
                        onClick={() => {
                            navigate(`/dashboard/chatroom/${pate?.account}`)
                            setRoute(`/dashboard/chatroom/${pate?.account}`)
                            handleClose()
                        }}>
                        <img src={request_chat} alt="add_friend"/>
                        <span> Hallo sagen</span>
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
};

export default DashboardPage;

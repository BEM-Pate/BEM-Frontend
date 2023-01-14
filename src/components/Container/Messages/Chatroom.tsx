import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useZustand, socket } from '../../../zustand/store';
import ActiveChat from './ActiveChat';
import LandingChat from './LandingChat';
import io from 'socket.io-client';
import { Socket } from 'dgram';
const HARD_CORDED_TOKEN_USER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2MwNmU2YTYxYjA2YmQ0NTU4YjFiM2UiLCJpYXQiOjE2NzM2ODU4MjAsImV4cCI6MTY3Mzc3MjIyMH0.bkYCL7TFAp-PHKlNr0pn-eqnCpG12zdJZJZK_Vbs858'


export default function ChatRoom() {
    let { id } = useParams()

    let [chatRooms, contacts, setChatRoom] = useZustand(state => [state.chatrooms, state.contacts, state.setChatroom])

    let targetedUser = contacts.find((contact: any) => contact._id === id)
    let pickedChatRoom = chatRooms.find((chatroom: any) => chatroom.participants.includes(id))


    useEffect(() => {
        if (chatRooms.length === 0) return

        if (socket.connected) {
            for (const chatroom of chatRooms) {
                socket.emit('join-chatroom', { roomId: chatroom._id })
            }
        }

    }, [chatRooms])

    useEffect(() => {
        socket.on('new-message', ({ roomId, messageObj }) => {
            setChatRoom(roomId, messageObj)
        })

        return () => { socket.off('new-message') }
    }, [])


    return <>
        <div
            style={{
                width: '100%',
                height: '100%',

            }}
        >
            {pickedChatRoom?.messages.length === 0 ?
                <LandingChat
                    targetedUser={targetedUser}
                    conversation={pickedChatRoom}
                />
                : <ActiveChat
                    targetedUser={targetedUser}
                    conversation={pickedChatRoom}

                />
            }
        </div>
    </>

}
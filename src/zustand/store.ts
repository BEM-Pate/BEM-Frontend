import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import io, { Socket } from 'socket.io-client';

interface store {
    user: null | any,
    logIn: () => void,
    contacts: null | any,
    chatrooms: null | any,
    fetchChatroom: () => void,
    fetchContacts: (userIds: string[]) => Promise<void>,
    token: null | string,
    setCurrentRoute: (route: string) => void,
    route: null | string,
    pushMessageToChatRoom: (chatroomId: string, messageObj: any) => void,
    setUser: (user: any) => void,
    socketConfig: null | {
        path?: string,
        extraHeaders: {
            Authorization: string
        }
    },
    setSeen: (chatroomId: string, messageId: string) => void,
}



const BASE_URL = `http://141.45.146.171/api`
// const USER_IDs = ['63c06e6a61b06bd4558b1b3e', '63c06ed361b06bd4558b1b55']
// const HARD_COREs = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2MwNmU2YTYxYjA2YmQ0NTU4YjFiM2UiLCJpYXQiOjE2NzM2ODU4MjAsImV4cCI6MTY3Mzc3MjIyMH0.bkYCL7TFAp-PHKlNr0pn-eqnCpG12zdJZJZK_Vbs858',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2MwNmVkMzYxYjA2YmQ0NTU4YjFiNTUiLCJpYXQiOjE2NzM2ODU4ODAsImV4cCI6MTY3Mzc3MjI4MH0.gKdb3RTefJUXFH5pHiNNsryiijdHClOa-uOkLNYNNxI']

// const index = 1
// const USER_ID = USER_IDs[index]
// const HARD_CORDED_TOKEN_USER = HARD_COREs[index]

export const SOCKET_URL =
    `http://141.45.146.171`
    // ||
    // `http://localhost:3001`

export let socket: null | Socket = null

export const initiliazeSocket = (
    socketConfig: any
) => {
    console.log('initializing socket')
    socket = io(SOCKET_URL, socketConfig)
}



export const useZustand = create<store>()(
    persist(
        (set, get, props) => ({
            user: null,
            token: null,
            socketConfig: null,
            logIn: () => {

                set({ user: { name: 'test' } })
            },
            setUser: (user: any) => {
                set({ user })
                set({
                    socketConfig: {
                        path: '/api/socket.io',

                        extraHeaders: {
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                })
            },
            contacts: [],
            chatrooms: [],
            fetchChatroom: () => {
                axios.get(`${BASE_URL}/chat/rooms`, {
                    headers: {
                        Authorization: `Bearer ${get().user?.token}`
                    }
                }).then((res) => {
                    let participants: any[] = []

                    for (const chatroom of res.data) {
                        participants.push(...chatroom.participants)
                    }
                    set({ chatrooms: res.data })
                    get().fetchContacts(participants)
                })
            },
            fetchContacts: async (userIds: string[]) => {
                const users: any[] = []
                for (const userId of userIds) {
                    const user = (await axios.get(`${BASE_URL}/user/userdata/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${get().user?.token}`
                        }
                    })).data
                    users.push(user)
                }

                set({ contacts: users.filter((user) => user._id !== get().user.account._id) })
            },
            setCurrentRoute: (route: string) => {
                set({ route })
            },

            pushMessageToChatRoom: (chatRoomId: string, messageObject: any) => {
                const targetIndex = get().chatrooms.findIndex((chatroom: any) => chatroom._id === chatRoomId)
                let chatrooms = get().chatrooms
                chatrooms[targetIndex].messages.push(messageObject)
                set({ chatrooms })
            },
            setSeen: (chatRoomId: string, chatroom: any) => {
                const targetIndex = get().chatrooms.findIndex((chatroom: any) => chatroom._id === chatRoomId)
                let chatrooms = get().chatrooms
                chatrooms[targetIndex] = chatroom
                set({ chatrooms })
            },
            route: null
        }),
        {
            name: 'bear-store',
            getStorage: () => localStorage,
        }
    )
)


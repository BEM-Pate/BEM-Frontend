import { create } from 'zustand'
import { persist, StateStorage } from 'zustand/middleware'
import axios from 'axios'

import { Socket } from 'socket.io-client'
import io from 'socket.io-client';

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
    setChatroom: (chatroomId: string, messageObj: any) => void,
}



const BASE_URL = `http://141.45.146.171/api`
const USER_IDs = ['63c06e6a61b06bd4558b1b3e','63c06ed361b06bd4558b1b55']
const HARD_COREs = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2MwNmU2YTYxYjA2YmQ0NTU4YjFiM2UiLCJpYXQiOjE2NzM2ODU4MjAsImV4cCI6MTY3Mzc3MjIyMH0.bkYCL7TFAp-PHKlNr0pn-eqnCpG12zdJZJZK_Vbs858',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2MwNmVkMzYxYjA2YmQ0NTU4YjFiNTUiLCJpYXQiOjE2NzM2ODU4ODAsImV4cCI6MTY3Mzc3MjI4MH0.gKdb3RTefJUXFH5pHiNNsryiijdHClOa-uOkLNYNNxI']

const index = 1
const USER_ID = USER_IDs[index]
const HARD_CORDED_TOKEN_USER = HARD_COREs[index]

const SOCKET_URL = `http://141.45.146.171`

export const socket = io(SOCKET_URL, {
    path: '/api/socket.io',
    extraHeaders: {
        Authorization: `Bearer ${HARD_CORDED_TOKEN_USER}`
    }
});

socket.on('connect', () => {
    console.log('connected')
})



export const useZustand = create<store>()(
    persist(
        (set, get, props) => ({
            user: null,
            token: null,
            logIn: () => {

                set({ user: { name: 'test' } })




            },
            contacts: null,
            chatrooms: null,
            fetchChatroom: () => {
                axios.get(`${BASE_URL}/chat/rooms`, {
                    headers: {
                        Authorization: `Bearer ${HARD_CORDED_TOKEN_USER}`
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
                            Authorization: `Bearer ${HARD_CORDED_TOKEN_USER}`
                        }
                    })).data
                    users.push(user)
                }
                set({ contacts: users.filter((user) => user._id !== USER_ID) })
            },
            setCurrentRoute: (route: string) => {
                set({ route })
            },

            setChatroom: (chatRoomId: string, messageObject: any) => {
                const targetIndex = get().chatrooms.findIndex((chatroom: any) => chatroom._id === chatRoomId)
                let chatrooms = get().chatrooms
                chatrooms[targetIndex].messages.push(messageObject)
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


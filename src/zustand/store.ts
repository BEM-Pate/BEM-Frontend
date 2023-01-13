import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

interface store {
    user: null | any,
    logIn: () => void,
    contacts: null | any,
    chatrooms: null | any,
    fetchChatroom: () => void,
    fetchContacts: (userIds: string[]) => Promise<void>,
    token: null | string,
}

const BASE_URL = `http://141.45.146.171/api`
const HARD_CORDED_TOKEN_USER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2MwNmU2YTYxYjA2YmQ0NTU4YjFiM2UiLCJpYXQiOjE2NzM1NTU1ODksImV4cCI6MTY3MzY0MTk4OX0.2-b4eEGZLGu5dyrIIyNO00ocwzO5eVDgMSR-irjIsKQ'
const USER_ID = '63c06e6a61b06bd4558b1b3e'

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
            }
        }),
        {
            name: 'bear-store',
            getStorage: () => localStorage,
        }
    )
)
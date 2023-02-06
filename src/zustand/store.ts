import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import io, { Socket } from 'socket.io-client';

interface store {
    user: null | any,
    contacts: null | any,
    newContactRequestLength: number,
    newUnseenMessageLength: () => number,
    setNewUnseenMessageLength: () => void,
    pendingContacts: null | any,
    chatrooms: null | any,
    fetchChatroom: () => void,
    fetchContacts: (userIds: string[]) => Promise<void>,
    fetchPendingContacts: () => void,
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
    onlineUsersInRooms: null | any,
    setOnlineUsersInRooms: (onlineUsers: any) => void,
    notifications: null | any[];
    addNotification: (message: string, type: 'success' | 'warning' | 'error') => void,
    resetNotifications: () => void,
}



const BASE_URL = `http://141.45.146.171/api`
// const BASE_URL = `http://localhost:5000`

export const SOCKET_URL =
    `http://141.45.146.171`
    // ||
    // `http://localhost:5000`

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
            pendingContacts: null,
            newContactRequestLength: 0,
            newUnseenMessageLength: () =>{
                let counter = 0;
                for (let i = 0; i < get().chatrooms?.length; i++) {
                    get().chatrooms[i].messages.forEach((msg: any) => {
                        const isMeInSeeen = msg.seen?.find((user: any) => user.userId === get().user._id);
                        if (!isMeInSeeen && msg.sender !== get().user._id) {
                            counter++;
                        }
                    })
                }
                return counter
            },
            setNewUnseenMessageLength: () => {
            },
            setUser: (data: any) => {
                console.log(data)
                set({ user: {...data.account, token: data.token} })
                set({token: data.token})
                set({
                    socketConfig: {
                        path: '/api/socket.io',
                        extraHeaders: {
                            Authorization: `Bearer ${data.token}`
                        }
                    }
                })
                get().fetchChatroom()
            },
            contacts: [],
            chatrooms: [],
            fetchChatroom: () => {
                axios.get(`${BASE_URL}/chat/rooms`, {
                    headers: {
                        Authorization: `Bearer ${get().token}`
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
                    })).data
                    users.push(user)
                }

                set({ contacts: users.filter((user) => user._id !== get().user._id) })
            },
            fetchPendingContacts: () => {
                console.log('fetching pending contacts')
                axios.get(`${BASE_URL}/match/get-pending-contact`, {
                    headers: {
                        Authorization: `Bearer ${get().token}`
                    }
                }).then((res) => {
                    set({ pendingContacts: res.data.pendingContact})
                    set({ newContactRequestLength: res.data.pendingContact.length })
                })
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
            route: null,
            onlineUsersInRooms: [],
            setOnlineUsersInRooms: (obj: any) => {
                const {roomId, availableClients} = obj
                let onlineUsersInRooms = get().onlineUsersInRooms;
                onlineUsersInRooms[roomId] = availableClients
                set({ onlineUsersInRooms: onlineUsersInRooms })
                console.log(get().onlineUsersInRooms)
            },
            notifications: [],
            addNotification: (message: string, type: 'success' | 'warning' | 'error') => {
                const id = Date.now();
                let notifications = get().notifications;
                if (notifications !== null) {
                    notifications.push({ id, message, type });
                } else {
                    notifications = [{ id, message, type }];
                }
                set({ notifications });

                setTimeout(() => {
                    let notifications1 = get().notifications;
                    if (notifications1 !== null) {
                        set({ notifications: notifications1.filter((n) => n.id !== id) });
                    }
                }, 3000);
            },
            resetNotifications: () => {
                set({ notifications: [] });
            }
        }),
        {
            name: 'bear-store',
            getStorage: () => sessionStorage,
        }
    )
)
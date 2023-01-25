import { useParams } from 'react-router-dom';
import { useZustand } from '../../../zustand/store';
import ActiveChat from './ActiveChat';
import LandingChat from './LandingChat';

export default function ChatRoom() {
    let { id } = useParams()

    let [chatRooms, contacts] = useZustand(state => [state.chatrooms, state.contacts, state.pushMessageToChatRoom])

    let targetedUser = contacts.find((contact: any) => contact._id === id)
    let pickedChatRoom = chatRooms.find((chatroom: any) => chatroom.participants.includes(id))
    console.log(pickedChatRoom)
    return <>
        <div className="Chatroom"
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            {pickedChatRoom?.message === null  || pickedChatRoom?.messages.length === 0 ?
                <LandingChat
                    targetedUser={targetedUser}
                    room={pickedChatRoom}
                />
                : <ActiveChat
                    targetedUser={targetedUser}
                    room={pickedChatRoom}

                />
            }
        </div>
    </>
}
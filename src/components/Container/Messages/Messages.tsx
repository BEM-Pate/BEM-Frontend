import classNames from 'classnames';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from "react-router-dom";
import styles from './Messages.module.scss';

import {useZustand} from '../../../zustand/store';


const Messages = () => {

    const navigate = useNavigate();

    const [chatrooms, fetchChatroom, contacts, setRoute] = useZustand((state) => [state.chatrooms, state.fetchChatroom, state.contacts, state.setCurrentRoute]);
    useEffect(() => {
            fetchChatroom();
        },
        []
    )

    const {t} = useTranslation();
    return (
        <div className={classNames(styles.Messages)}>
            <h1 className={classNames(styles.MessagesHeader)}>
                {t('messagesPageHeader')}
            </h1>
            <h4 className={classNames(styles.MessagesSubheader)}>
                {t('messagesPageSubHeader')}
            </h4>
            <div className={classNames(styles.MessagesContainerContacts)}>

                {contacts?.map((user: any) => {
                    const userData = user.baseUserData;
                    const b64 = btoa(
                        userData.avatar.data.data.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '')
                    )
                    const contentType = userData.avatar.contentType;
                    return (
                        <div style={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100px',
                                height: '100px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }

                        }>
                            <img
                                src={`data:${contentType};base64,${b64}`}
                                alt="PatePicture"
                                className={classNames(styles.MessagesProfilePictures)}
                                onClick={() => {
                                    navigate(`/dashboard/chatroom/${user._id}`)
                                    setRoute(`/dashboard/chatroom/${user._id}`)
                                }}
                            />
                            {/*<h1>{userData.firstName}</h1>*/}
                        </div>
                    )
                })}


            </div>
            <h4 className={classNames(styles.MessagesSubheader)}>
                {t('messagesPageMessages')}
            </h4>
            <div className={classNames(styles.MessagesContainerMessages)}>
                <div className="msgContainer" style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>

                    {
                        contacts?.map((user: any) => {
                                    const userData = user.baseUserData;
                                    const b64 = btoa(
                                        userData.avatar.data.data.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '')
                                    )
                                    const contentType = userData.avatar.contentType;
                                    const chatRoom = chatrooms?.find((chatroom: any) => chatroom.participants.includes(user._id))
                                    const lastMessage = chatRoom?.messages[chatRoom.messages.length - 1]
                                    const firstName = userData.firstName;
                                    const lastName = userData.lastName;
                                    const time = new Date(lastMessage?.time)
                                    const todayDate = new Date();
                                    const isToday = todayDate.getDate() === time.getDate()
                                    console.log(time)
                                    console.log(lastMessage)
                                    return (
                                        <div className="msgContainer__msg" style={{
                                            borderBottom: '1px solid rgba(34,23,42, .08)',
                                            display: 'flex',
                                            // justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            flexGrow: 1,

                                        }}
                                        >
                                            <img
                                                src={`data:${contentType};base64,${b64}`}
                                                alt="PatePicture"
                                                className={classNames(styles.MessagesProfilePicturesMsgGroup)}
                                            />
                                            <div className="msgContainer__msg__content" style={{}}>
                                                <div className="msgContainer__msg__content__header" style={{   }}>
                                                   <b> {firstName} {lastName} </b>


                                                </div>
                                                <div className="msgContainer__msg__content__body" style={{display: 'flex'}}>
                                                    {lastMessage ? lastMessage.text: 'No messages yet'}
                                                    <span style={{marginLeft:'auto'}} className={classNames(styles.MessagesTime)}>{time ? (time.getHours()+":"+time.getMinutes()): ''} {!isToday? (time.getDate() +"."+ ("0" + time.getMonth() + 1).slice(-2)):'' }</span>
                                                </div>

                                            </div>
                                        </div>

                                    )

                        })

                    }
                </div>
            </div>
        </div>
    );
};

export default Messages;

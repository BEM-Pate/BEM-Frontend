import classNames from 'classnames';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from "react-router-dom";
import styles from './Messages.module.scss';
import {useZustand} from '../../../zustand/store';

const Messages = () => {

    const navigate = useNavigate();

    const [me, chatrooms, fetchChatroom, contacts, setRoute, onlineUsersInRooms] = useZustand((state) => [state.user, state.chatrooms, state.fetchChatroom, state.contacts, state.setCurrentRoute, state.onlineUsersInRooms])
    useEffect(() => {
            fetchChatroom();
        },
        []
    )
    // sort by last message time
    chatrooms.sort((a: any, b: any) => {
        const aTime = new Date(a.messages[a.messages.length - 1]?.time).getTime();

        const bTime = new Date(b.messages[b.messages.length - 1]?.time).getTime();
        // if(aTime && bTime) {
            if (aTime > bTime) return -1;
            if (aTime < bTime) return 1;
        // }
        return 0;
    })


    const checkIfUserIsOnline = (userData: any) => {
        for (const room in onlineUsersInRooms) {
            if(onlineUsersInRooms.hasOwnProperty(room)){
                if (onlineUsersInRooms[room].includes(userData.account)) {
                    return true;
                }
            }
        }
        return false;
    }

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
                    const userData = user.baseUserData

                    const b64 = btoa(
                        userData.avatar.data.data.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '')
                    )
                    let isUserOnline = checkIfUserIsOnline(userData);

                    const contentType = userData?.avatar.contentType;
                    return (
                        <div className="avatar-container" style={
                            {
                                width: '100px',
                                height: '100px',
                                position: 'relative',
                                cursor: 'pointer',
                            }

                        }>
                            <img
                                style={{height:"100%", width:"100%", borderRadius:"16px"} }
                                src={`data:${contentType};base64,${b64}`}
                                alt="PatePicture"
                                className={classNames(styles.MessagesProfilePictures)}
                                onClick={() => {
                                    navigate(`/dashboard/chatroom/${user._id}`)
                                    setRoute(`/dashboard/chatroom/${user._id}`)
                                }}
                            />
                           <div className="status_cirle"style={{
                                width: '20px', height: '20px', borderRadius: '50%', backgroundColor: isUserOnline? '#1dbf73': 'grey',border:"2px solid white",
                                position: 'absolute', bottom: '0', right: '0', transition: "background .3s"
                            }}/>
                        </div>
                    )
                })}


            </div>
            {/*<h4 className={classNames(styles.MessagesSubheader)}>*/}
            {/*    {t('messagesPageMessages')}*/}
            {/*</h4>*/}
            <div className={classNames(styles.MessagesContainerMessages)}>
                <div className="msgContainer" style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>

                    {
                        chatrooms?.map((chatRoom: any) => {
                            if(chatRoom.messages.length > 0) {
                                let participants = chatRoom.participants;
                                let userId = participants.find((participant: any) => participant !== me._id);
                                const user = contacts?.find((user: any) => user._id === userId);
                                const userData = user?.baseUserData;
                                const b64 = btoa(
                                    userData?.avatar?.data?.data.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '')
                                )
                                const contentType = userData?.avatar?.contentType;

                                let isUserOnline = checkIfUserIsOnline(userData);

                                let unSeenMsgLength = 0;
                                chatRoom?.messages.forEach((msg: any) => {
                                    const isMeInSeeen = msg.seen?.find((user: any) => user.userId === me._id);
                                    if (!isMeInSeeen && msg.sender !== me._id) {
                                        unSeenMsgLength++;
                                    }
                                })

                                const lastMessage = chatRoom?.messages[chatRoom.messages.length - 1]
                                const firstName = userData?.firstName;
                                const lastName = userData?.lastName;
                                const time = new Date(lastMessage?.time)
                                const todayDate = new Date();
                                const isToday = todayDate.getDate() === time.getDate()

                                return (
                                    <div className="msgContainer__msg" style={{
                                        borderBottom: '1px solid rgba(34,23,42, .08)',
                                        display: 'flex',
                                        gap: '10px',
                                        alignItems: 'center',
                                        width: '100%',
                                        padding: '10px'
                                    }}
                                         onClick={() => {
                                             navigate(`/dashboard/chatroom/${user._id}`)
                                             setRoute(`/dashboard/chatroom/${user._id}`)
                                         }}
                                    >
                                        <div className="msgContainer__msg__avatar" style={{
                                            height: '50px',
                                            width: '50px',
                                            position: 'relative',
                                            cursor: 'pointer',
                                        }} >
                                            <img
                                                style={{height:"100%", width:"100%", borderRadius:"50%"} }
                                                src={`data:${contentType};base64,${b64}`}
                                                alt="PatePicture"
                                                className={classNames(styles.MessagesProfilePictures)}
                                            />
                                            <div className="status_cirle"style={{
                                                width: '20px', height: '20px', borderRadius: '50%', backgroundColor: isUserOnline? '#1dbf73': 'grey',border:"2px solid white",
                                                position: 'absolute', bottom: '0', right: '0', transition: "background .3s"
                                            }}/>
                                        </div>

                                        <div className="msgContainer__msg__content" style={{flex: "1", overflow:"hidden"}}>
                                            <div className="msgContainer__msg__content__header"
                                                 style={{display: 'flex'}}>
                                                <b style={{fontSize: 'large'}}> {firstName} {lastName} </b>

                                                {unSeenMsgLength > 0 && <span style={
                                                    {
                                                        display: 'inline-flex',
                                                        height: '25px',
                                                        width: '25px',
                                                        backgroundColor: '#98C8BC',
                                                        borderRadius: '50%',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginLeft: 'auto'
                                                    }}>
                                                {unSeenMsgLength}
                                            </span>}


                                            </div>
                                            <div className="msgContainer__msg__content__body"
                                                 style={{display: 'flex'}}>
                                                <div className="preview__msg" style={{
                                                    width: '85%',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    ...(unSeenMsgLength > 0 ? {fontWeight: 'bold'} : {fontWeight: 'normal'})
                                                }}>
                                                    {lastMessage ? lastMessage.text : ''}
                                                </div>
                                                <span style={{marginLeft: 'auto', color: "#9EA3AE"}}
                                                      className={classNames(styles.MessagesTime)}>{time ? ((time.getHours() < 10 ? '0' : '')+time.getHours() + ":" + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()) : ''} {!isToday ? (time.getDate() + "." + ("0" + time.getMonth() + 1).slice(-2)) : ''}</span>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        })
                        }
                        </div>
                        </div>
                        </div>
                        );
                    };

                        export default Messages;





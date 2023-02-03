import BackHeader from "./BackHeader"
import ChatBox from "./ChatBox"
import {useEffect, useRef, useState} from "react";
import {socket, useZustand} from "../../../zustand/store";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useTranslation } from "react-i18next";

export default function ActiveChat({room, targetedUser}: { room: any, targetedUser: any }) {
    const [show, setShow] = useState(false);
    const [targetedMessage, setTargetedMessage] = useState<any>(null)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const me = useZustand(state => state.user)
    const elementRef = useRef(null)
    
    const lastMessage = room.messages[room.messages.length - 1]
    
    const { t } = useTranslation();


    useEffect(() => {
        console.log('')
        //@ts-ignore
        elementRef?.current?.scrollIntoView()
    }, [room.messages.length, lastMessage.seen.length])


    useEffect(() => {
        if (socket && lastMessage) {
            for (const message of room.messages) {
                if (!message?.seen?.find((obj: any) => obj.userId === me._id)) {
                    console.log('set server seen');
                    socket!.emit('server-message-seen', {roomId: room._id})
                    break;
                }
            }
        }
    }, [socket, lastMessage])

    const objects = []
    for (let i = 0; i < room.messages.length; i++) {
        const message = room.messages[i]
        const date = new Date(message.time)

        if (i === 0) {
            objects.push(<div

            >


                <div
                    style={{
                        textAlign: 'center',
                        color: '#E4EFEC',
                        opacity: 0.5,
                        fontSize: '14px',
                        margin: '0 0 20px 0'
                    }}
                >
                    {(date.getHours() < 10 ? '0' : '')}{date.getHours()}:{(date.getMinutes() < 10 ? '0' : '')}{date.getMinutes()} {date.getDate()}.{("0" + date.getMonth() + 1).slice(-2)}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: targetedUser._id === message.sender ? 'start' : 'end',


                    }}

                >
                    <div
                        style={{
                            alignContent: 'center',
                            verticalAlign: 'middle',
                            wordBreak: 'break-all',
                            whiteSpace: 'normal',
                            padding: '12px 20px 12px 24px',
                            backgroundColor: targetedUser._id === message.sender ? '#738F88' : '#98C8BC99',
                            maxWidth: '100%',
                            borderRadius: targetedUser._id === message.sender ? '24px 24px 24px 0px' : '24px 24px 0px 24px',
                            margin: '10px 0'
                        }}
                        onClick={() => {
                            handleShow()
                            setTargetedMessage(message)
                        }}
                    >
                        {message.text}
                        {
                            messageStatus(message, me)
                        }
                    </div>
                </div>
            </div>)
        } else {
            const previousDate = new Date(room.messages[i - 1].time)
            // if difference greater than 1 hour 
            objects.push(<div className={"messageContainer"}>

                {
                    date.getTime() - previousDate.getTime() > 3600000 &&
                    <div
                        style={{
                            textAlign: 'center',
                            color: '#E4EFEC',
                            opacity: 0.5,
                            fontSize: '14px',
                            margin: '0 0 20px 0'

                        }}
                    >
                        {date.getHours() < 10 ? "0" : ""}{date.getHours()}:{date.getMinutes() < 10 ? "0" : ""}{date.getMinutes()} {date.getDate()}.{("0" + date.getMonth() + 1).slice(-2)}
                    </div>
                }
                <div
                    style={{
                        display: 'flex',
                        justifyContent: targetedUser._id === message.sender ? 'start' : 'end',
                    }}

                >
                    <div
                        style={{
                            alignContent: 'center',
                            verticalAlign: 'middle',
                            wordBreak: 'break-all',
                            whiteSpace: 'normal',
                            padding: '12px 20px 12px 24px',
                            backgroundColor: targetedUser._id === message.sender ? '#738F88' : '#98C8BC99',
                            maxWidth: '100%',
                            borderRadius: targetedUser._id === message.sender ? '24px 24px 24px 0px' : '24px 24px 0px 24px',
                            margin: '10px 0'

                        }}
                        onClick={() => {
                            handleShow()
                            setTargetedMessage(message)
                        }}
                    >

                        {message.text}
                        {
                            messageStatus(message, me)
                        }

                    </div>
                </div>
                <div ref={elementRef}/>
            </div>)


        }
    }


    return <div style={{
        width: '100%',
        height: '100%',

        backgroundColor: '#63837B',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',

    }}>
        <BackHeader
            targetedUser={targetedUser}
        />

        {/* <h1>{baseUserData.firstName} {baseUserData.lastName}</h1> */}


        <div
            style={{
                flex: 1,
                padding: '0 24px 24px 24px',
                overflowY: 'scroll'
            }}
        >
            {objects}
        </div>
        <div
            style={{
                padding: '0 24px 24px 24px',
            }}
        >

            <ChatBox conversation={room}/>
        </div>
        <Modal caria-labelledby="example-custom-modal-styling-title" show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Message Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display:'flex', alignItems:"center", padding: "5px"}}>
                    <svg
                        style={{width: "25px"}}
                        width="25" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.66669 4.99984L5.00002 8.33317L11.6667 1.6665" stroke="black" stroke-width="1.5"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {/*TODO : Hasan*/}
                    {t('activeChatDelivered')}: <span style={{marginLeft: "auto"}}>{getTime(targetedMessage?.seen[0]?.date)}</span>
                </div>
                {checkValidDate(new Date(targetedMessage?.seen[1]?.date)) &&

                <div style={{display:'flex', alignItems:"center", padding: "5px", borderTop: "1px solid rgba(34, 23, 42, 0.08)"}}>
                    <svg
                        style={{width: "25px"}}
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_218_3343)">
                            <path d="M4.66669 7.99984L8.00002 11.3332L14.6667 4.6665" stroke="black" stroke-width="1.5"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7.99998 7.99984L11.3333 4.6665M1.33331 7.99984L4.66665 11.3332L1.33331 7.99984Z"
                                  stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_218_3343">
                                <rect width="16" height="16" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    {/*TODO : Hasan*/}
                    {t('activeChatRead')}: <span style={{marginLeft: "auto"}}>{getTime(targetedMessage?.seen[1]?.date)}</span></div>

                }
                </Modal.Body>
        </Modal>


    </div>
}

const messageStatus = (message: any, me: any) => {
    if (
        message.sender === me._id
        &&
        message.seen.find((obj: any) => {
            return obj.userId !== me._id
        })
    ) {
        return <svg
            style={{width: "25px"}}
            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_218_3343)">
                <path d="M4.66669 7.99984L8.00002 11.3332L14.6667 4.6665" stroke="white" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.99998 7.99984L11.3333 4.6665M1.33331 7.99984L4.66665 11.3332L1.33331 7.99984Z"
                      stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_218_3343">
                    <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    } else if (
        message.sender === me._id
        &&
        !message.seen.find((obj: any) => {
            return obj.userId !== me._id
        })
    ) {
        return <svg
            style={{width: "25px"}}
            width="25" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.66669 4.99984L5.00002 8.33317L11.6667 1.6665" stroke="white" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    }

    return ''
}

const getTime = (time: any) => {
    const date = new Date(time)
    if(checkValidDate(date)) {
        return (date.getHours() < 10 ? "0": "")+date.getHours() + ":"+ (date.getMinutes() < 10 ? "0": "") + date.getMinutes() + " " + date.getDate() + "." + ("0" + date.getMonth() + 1).slice(-2)+ "." +date.getFullYear()
    } else {
        return "Not delivered"
    }
}

const checkValidDate= (date: any) => {
    // @ts-ignore
    return date instanceof Date && !isNaN(date);
}
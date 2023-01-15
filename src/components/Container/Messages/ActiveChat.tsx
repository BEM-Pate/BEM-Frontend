import BackHeader from "./BackHeader"
import ChatBox from "./ChatBox"
import {useEffect, useRef} from "react";

export default function ActiveChat({ conversation, targetedUser }: { conversation: any, targetedUser: any }) {
    const baseUserData = targetedUser.baseUserData
    const elementRef = useRef(null)
    useEffect(() => {
        //@ts-ignore
        elementRef.current.scrollIntoView()

    }, [conversation.messages.length])


    const objects = []

    for (let i = 0; i < conversation.messages.length; i++) {
        const message = conversation.messages[i]
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
                    {date.getHours()}:{date.getMinutes()} {date.getDate()}.{("0" + date.getMonth() + 1).slice(-2)}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: targetedUser._id === message.sender ? 'start' : 'end',


                    }}

                >
                    <p
                        style={{
                            padding: '12px 24px 12px 24px',
                            backgroundColor: targetedUser._id === message.sender ? '#738F88' : '#98C8BC99',
                            maxWidth: '60%',
                            borderRadius: targetedUser._id === message.sender ? '24px 24px 24px 0px' : '24px 24px 0px 24px',


                        }}
                    >
                        {message.text}
                    </p>
                </div>
            </div>)
        } else {
            const previousDate = new Date(conversation.messages[i - 1].time)
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
                        {date.getHours()}:{date.getMinutes()} {date.getDate()}.{("0" + date.getMonth() + 1).slice(-2)}
                    </div>
                }
                <div
                    style={{
                        display: 'flex',
                        justifyContent: targetedUser._id === message.sender ? 'start' : 'end',


                    }}

                >
                    <p
                        style={{
                            padding: '12px 24px 12px 24px',
                            backgroundColor: targetedUser._id === message.sender ? '#738F88' : '#98C8BC99',
                            maxWidth: '60%',
                            borderRadius: targetedUser._id === message.sender ? '24px 24px 24px 0px' : '24px 24px 0px 24px',


                        }}
                    >
                        {message.text}
                    </p>
                </div>
                <div ref={elementRef} />
            </div>)



        }


    }


    return <div style={{
        width: '100%',
        height: '100%',

        backgroundColor: '#63837B',
        color: 'white',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'column',

    }}  >
        <BackHeader
            targetedUser={targetedUser}
        ></BackHeader>

        {/* <h1>{baseUserData.firstName} {baseUserData.lastName}</h1> */}


        <div
            style={{
                flex: 1,
                padding: '0 24px 24px 24px',
                overflow:'scroll'
            }}
        >
            {objects}
        </div>
        <div
            style={{
                padding: '0 24px 24px 24px',
            }}
        >

            <ChatBox conversation={conversation}></ChatBox>
        </div>
    </div>
}

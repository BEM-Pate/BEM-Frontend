import { useNavigate } from "react-router-dom";
import BackHeader from "./BackHeader";
import ChatBox from "./ChatBox";
import {useZustand} from "../../../zustand/store";

export default function LandingChat({ room, targetedUser }: { room: any, targetedUser: any }) {
    const baseUserData = targetedUser.baseUserData
    const {onlineUsersInRooms} = useZustand(state => state)

    const b64 = btoa(
        baseUserData.avatar.data.data.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '')
    )
    const checkIfUserIsOnline = (userData: any) => {
        for (const room in onlineUsersInRooms) {
            if(onlineUsersInRooms.hasOwnProperty(room)){
                if (onlineUsersInRooms[room].includes(userData?.account)) {
                    return true;
                }
            }
        }
        return false;
    }

    const contentType = baseUserData.avatar.contentType;

    const firstMeet = new Date(room.createdAt)
    const now = new Date()

    const diffInMs = now.getTime() - firstMeet.getTime()

    // get diffInMs in minutes
    const diffInMinutes = Math.round(diffInMs / 60000)
    const diffInHours = Math.round(diffInMs / 3600000)
    const diffInDays = Math.round(diffInMs / 86400000)

    let displayDiff = ''

    if (diffInMinutes < 60) {
        displayDiff = `${diffInMinutes} Minuten`
    } else if (diffInHours < 24) {
        displayDiff = `${diffInHours} Stunden`
    } else {
        if (diffInDays === 1) {
            displayDiff = `${diffInDays} Tag`
        } else {
            displayDiff = `${diffInDays} Tage`
        }
    }


    return <>
        <div
            style={{
                textAlign: 'center',
                height: '100%',
                // alignItems: 'center',
                // justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
                backgroundColor: '#63837B',

            }}
        >
            <BackHeader
                targetedUser={targetedUser} room={room}
            />

            <div style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                    <div
                        style={{
                            justifyContent: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '24px',
                        }}
                    >


                    <div
                        style={{
                            fontSize: '24px'

                        }}
                    >
                        Sie sind verbunden mit <b
                            style={{
                                color: '#98c8bd',
                            }}
                        >
                            {baseUserData.firstName}
                        </b>
                    </div>

                    <div
                        style={{
                            color: 'white',
                            opacity: 0.7,
                            fontSize: '14px',
                        }}
                    >
                        {displayDiff} her
                    </div>

                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '24px',
                    marginBottom: '40px',
                }}>
                    <div
                        style={{
                            borderRadius: '50%',
                            width: '110px',
                            height: '110px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            border: '4px solid #98C8BC',
                        }}
                    >
                        <img
                            src={`data:${contentType};base64,${b64}`}
                            alt="PatePicture"
                            style={{
                                width: '90px',
                                height: '90px',
                                borderRadius: '50%',


                            }}
                            onClick={() => {
                            }}
                        />
                        <div className="status_cirle" style={{
                            position: 'absolute', bottom: "-10px", right:'40px',
                            width: '20px', height: '20px', borderRadius: '50%', backgroundColor: checkIfUserIsOnline(baseUserData)? '#1dbf73': 'grey',border:"2px solid white", transition: "background .3s"
                        }}/>
                    </div>



                </div>

                <div
                    style={{
                        margin: '0 60px',
                    }}
                >
                    Wissen, wenn <label
                        style={{
                            color: '#98c8bd',
                        }}
                    >
                        {baseUserData.firstName}
                    </label> deine Nachricht gelesen hat
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: '5px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#83ACA2',
                        borderRadius: '32px',
                        width: '250px',
                        margin: '10px auto',
                        padding: '4px 12px 4px 8px'
                    }}>

                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_218_3343)">
                            <path d="M4.66669 7.99984L8.00002 11.3332L14.6667 4.6665" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7.99998 7.99984L11.3333 4.6665M1.33331 7.99984L4.66665 11.3332L1.33331 7.99984Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_218_3343">
                                <rect width="16" height="16" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>

                    <span>Lesebestätigung erhalten</span>
                </div>
            </div>

            <div
                style={{
                    flexBasis: '40%',
                    display: 'flex',
                    justifyContent: 'end',
                    flexDirection: 'column',
                    width: '100%',
                    padding: '0 24px 24px',
                }}
            >
                <ChatBox conversation={room}/>
            </div>
        </div>
    </>
}
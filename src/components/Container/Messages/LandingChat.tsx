import { useNavigate } from "react-router-dom";
import BackHeader from "./BackHeader";
import ChatBox from "./ChatBox";
import {useZustand} from "../../../zustand/store";
import styles from "./LandingChat.module.scss";
import classNames from "classnames";


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
        <div className={classNames(styles.LandingChat)}>
            <BackHeader/>

            <div className={classNames(styles.LandingChatBackHeader)}>
                    <div className={classNames(styles.LandingChatBackHeaderContent)}>


                    <div className={classNames(styles.LandingChatBackHeaderFont)}>
                        Sie sind verbunden mit <b
                            className={classNames(styles.LandingChatBackHeaderFontColor)}
                        >
                            {baseUserData.firstName}
                        </b>
                    </div>

                    <div className={classNames(styles.LandingChatBackHeaderText)}>
                        {displayDiff} her
                    </div>

                </div>
                <div className={classNames(styles.LandingChatContent)}>
                    <div className={classNames(styles.LandingChatContentProfilePicture)}
                    >
                        <img
                            src={`data:${contentType};base64,${b64}`}
                            alt="PatePicture"
                            className={classNames(styles.LandingChatContentProfilePictureImages)}
                            onClick={() => {
                            }}
                        />
                        <div className={classNames(styles.LandingChatContentProfilePictureStatusCircle)} style={{
                            backgroundColor: checkIfUserIsOnline(baseUserData)? '#1dbf73': 'grey'}}/>
                    </div>



                </div>

                <div className={classNames(styles.LandingChatBackHeaderDescription)}
                >
                    Wissen, wenn <label
                    className={classNames(styles.LandingChatBackHeaderDescriptionLabel)}
                    >
                        {baseUserData.firstName}
                    </label> deine Nachricht gelesen hat
                </div>

                <div className={classNames(styles.LandingChatBackHeaderCircle)}>

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

            <div className={classNames(styles.LandingChatBackHeaderInput)}
            >
                <ChatBox conversation={room}/>
            </div>
        </div>
    </>
}

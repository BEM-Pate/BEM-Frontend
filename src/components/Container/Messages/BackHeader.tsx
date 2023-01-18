import { useNavigate } from "react-router-dom";
import {useZustand} from "../../../zustand/store";


export default function BackHeader({ targetedUser }: { targetedUser?: any }) {
    const {onlineUsersInRooms} = useZustand(state => state)
    const userData = targetedUser?.baseUserData
    const navigate = useNavigate()

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
    return <>
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '10px 1rem',
                alignItems: 'center'
            }}
        >
            <svg
                onClick={() => {
                    navigate(-1)

                }}
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.08" x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="white"/>
                <g clip-path="url(#clip0_287_2370)">
                    <path d="M23 14L17 20L23 26" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                    <clipPath id="clip0_287_2370">
                        <rect width="24" height="24" fill="white" transform="translate(8 8)"/>
                    </clipPath>
                </defs>
            </svg>

            <div className="header__user___name__container"
                style={{
                    visibility: targetedUser ? 'visible' : 'hidden',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className="header__user__name"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}

                >
                    <h1 style={{margin:"0"}}>{userData?.firstName} {userData?.lastName}</h1>
                    <div className="status_cirle"style={{
                        width: '20px', height: '20px', borderRadius: '50%', backgroundColor: checkIfUserIsOnline(userData)? '#1dbf73': 'grey',border:"2px solid white", transition: "background .3s"
                    }}/>
                </div>
                <div
                    style={{opacity: checkIfUserIsOnline(userData) ? 1 : 0.5}}
                    className="header__user__status">
                    {checkIfUserIsOnline(userData) ? 'online' : 'offline'}
                </div>

            </div>


            <div
                style={{
                    visibility: targetedUser ? 'visible' : 'hidden',
                    width: '40px',
                    height: '40px',
                }}
            >

            </div>


        </div>
    </>
}
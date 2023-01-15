import { useNavigate } from "react-router-dom";


export default function BackHeader({ targetedUser }: { targetedUser?: any }) {
    const userData = targetedUser?.baseUserData
    const navigate = useNavigate()
    return <>
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0 24px 0 10px',
            }}
        >
            <svg
                style={{ marginBottom: '35px' }}
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

            <div
                style={{
                    visibility: targetedUser ? 'visible' : 'hidden',
                }}
            >
                <h1>{userData?.firstName}</h1>
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
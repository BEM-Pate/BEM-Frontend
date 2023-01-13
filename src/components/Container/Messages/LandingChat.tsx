import { useNavigate } from "react-router-dom";
import BackHeader from "./BackHeader";
import ChatBox from "./ChatBox";

export default function LandingChat({ conversation, targetedUser }: { conversation: any, targetedUser: any }) {
    const baseUserData = targetedUser.baseUserData
    const b64 = btoa(
        baseUserData.avatar.data.data.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '')
    )

    const contentType = baseUserData.avatar.contentType;

    const firstMeet = new Date(conversation.createdAt)
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
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
                backgroundColor: '#63837B',

            }}
        >
            <div>
                <div

                >
                    <BackHeader></BackHeader>

                    <div
                        style={{
                            justifyContent: 'start',
                            display: 'flex',
                            marginLeft: '24px',
                        }}
                    >

                    </div>

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
                            border: '2px solid #98C8BC',
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
                    </div>


                </div>

                <div
                    style={{
                        margin: '0 50px 0 50px',
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
            </div>
            <div    
                style={{
                    flexBasis: '40%',
                    display: 'flex',
                    justifyContent: 'end',
                    flexDirection: 'column',
                    width: '100%',
                    padding: '0 24px 0 24px',
                }}
            >
                <ChatBox />
            </div>
        </div>
    </>
}
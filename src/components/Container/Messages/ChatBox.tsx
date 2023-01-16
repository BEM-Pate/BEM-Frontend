import { useEffect, useState } from "react"
import { useZustand, socket } from "../../../zustand/store"


export default function ChatBox({ conversation }: { conversation: any }) {

    const [message, setMessage] = useState('')
    const [setChatRoom] = useZustand(state => [state.pushMessageToChatRoom])
    // const [chatRoom, setChatRoom] = useState<any>(conversation)


    // useEffect(() => {
    //     socket.on('new-message', ({ roomId, messageObj }) => {
    //         setChatRoom(roomId, messageObj)
    //     })

    //     return () => {
    //         console.log('deleting')
    //         socket.off('new-message') }
    // }, [])

    return (<div
        style={{
            position: 'relative',
            width: '100%',
            height: '48px',
            display: 'flex',
        }}
    >
            <div   style={{
                position: 'absolute',
                // top: '-20px',
                // right: '-20px',
                cursor: 'pointer',
                color: 'white',
                fill: '#98C8BC',
                width: '50px',
                marginLeft: '290px'
            }}>
            <svg
                onClick={(e) => {
                if (message.trim() !== '') {
                    setMessage('')
                    console.log('sending mafucking message')
                    socket?.emit('send-message', { roomId: conversation._id, message })
                }
            }}

                width="100%" height="100%" viewBox="35 27 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_2_2394)">
                    <rect x="40" y="32" width="48" height="48" rx="24" fill="#98C8BC"/>
                </g>
                <path d="M71.8628 48.1515C71.446 47.7237 70.8291 47.5643 70.2538 47.7321L56.84 51.6328C56.2331 51.8014 55.8029 52.2854 55.687 52.9003C55.5687 53.5261 55.9822 54.3205 56.5224 54.6527L60.7166 57.2305C61.1468 57.4948 61.702 57.4285 62.058 57.0695L66.8608 52.2368C67.1026 51.9851 67.5027 51.9851 67.7445 52.2368C67.9862 52.48 67.9862 52.8743 67.7445 53.126L62.9333 57.9595C62.5765 58.3177 62.5098 58.8755 62.7724 59.3084L65.3352 63.5446C65.6353 64.048 66.1522 64.3332 66.7191 64.3332C66.7858 64.3332 66.8608 64.3332 66.9275 64.3248C67.5777 64.2409 68.0946 63.7963 68.2864 63.1672L72.263 49.7705C72.4381 49.2001 72.2797 48.5793 71.8628 48.1515Z" fill="white"/>
                <defs>
                    <filter id="filter0_d_2_2394" x="0" y="0" width="128" height="128" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="8"/>
                        <feGaussianBlur stdDeviation="20"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.294118 0 0 0 0 0.0862745 0 0 0 0 0.298039 0 0 0 0.2 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2394"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2394" result="shape"/>
                    </filter>
                </defs>
            </svg>
            </div>


        <input type={'text'}
            style={{
                backgroundColor: '#FFFFFF',
                height: 48,
                borderRadius: '80px',
                fontSize: '16px',
                paddingLeft: '10px',
                width: '100%',
                outline: 'none',
                borderWidth: '0px',
            }}
            value={message}
            onKeyPress={(e) => {
                if (message.trim() !== '' && e.key === 'Enter') {
                    setMessage('')
                    console.log('sending mafucking message')
                    console.log(socket?.id)

                    socket?.emit('send-message', { roomId: conversation._id, message })

                }
            }}
            onChange={(e) => {
                setMessage(e.target.value)
            }}

        >

        </input>
    </div>)

}
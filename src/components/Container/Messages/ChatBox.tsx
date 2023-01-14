import { useEffect, useState } from "react"
import { useZustand, socket } from "../../../zustand/store"


export default function ChatBox({ conversation }: { conversation: any }) {

    const [message, setMessage] = useState('')
    const [setChatRoom] = useZustand(state => [state.setChatroom])
    // const [chatRoom, setChatRoom] = useState<any>(conversation)


   

    return (<div
        style={{
            position: 'relative',
            width: '100%',
            height: '48px',
        }}
    >
        <label
            style={{
                position: 'absolute',
                top: '5px',
                right: '8px',
                cursor: 'pointer',
            }}
        >
            <svg height="40px" width="40px"
                style={{
                    transform: 'rotate(135deg)',
                    color: 'white',
                    fill: '#98C8BC',

                }}
                onClick={(e) => {
                    if (message.trim() !== '') {
                        setMessage('')
                        console.log('sending mafucking message')
                        socket.emit('send-message', { roomId: conversation._id, message })
                    }
                }}
                version="1.1" id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path d="M256,0C114.623,0,0,114.616,0,256s114.623,256,256,256c141.391,0,256-114.616,256-256S397.391,0,256,0z M378.268,287.116c0,8.666-7.028,15.68-15.68,15.68h-89.334l10.898,46.623c1,4.312-0.71,8.798-4.332,11.348 c-3.61,2.551-8.421,2.638-12.131,0.24l-131.913-95.225c-3.145-2.276-5-5.913-5-9.783s1.855-7.514,5-9.783l131.913-95.231 c3.71-2.399,8.521-2.305,12.131,0.246c3.622,2.55,5.333,7.036,4.332,11.348l-10.898,46.623h89.334c8.652,0,15.68,7.014,15.68,15.68 V287.116z"></path> </g> </g></svg>

        </label>
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
                    console.log(socket.id)

                    socket.emit('send-message', { roomId: conversation._id, message })

                }
            }}
            onChange={(e) => {
                setMessage(e.target.value)
            }}

        >

        </input>
    </div>)

}
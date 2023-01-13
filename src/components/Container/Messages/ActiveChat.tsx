
export default function ActiveChat({ conversation, targetedUser }: { conversation: any, targetedUser: any }) {
    const baseUserData = targetedUser.baseUserData

    const objects = []

    for (let i = 0; i < conversation.messages.length; i++) {
        const message = conversation.messages[i]
        const date = new Date(message.time)

        if (i === 0) {
            objects.push(<div

            >


                <h4>
                    {date.getHours()}:{date.getMinutes()} {date.getDate()}.{("0" + date.getMonth() + 1).slice(-2)}
                </h4>
                <p
                    style={{
                        // backgroundColor: targetedUser._id === message.sender ? 'red' : 'blue',
                        textAlign: targetedUser._id === message.sender ? 'left' : 'right',

                    }}
                >
                    {message.text}
                </p>
            </div>)
        } else {
            const previousDate = new Date(conversation.messages[i - 1].time)
            // if difference greater than 1 hour 
            objects.push(<div

            >
                {
                    date.getTime() - previousDate.getTime() > 3600000 &&
                    <h4>
                        {date.getHours()}:{date.getMinutes()} {date.getDate()}.{("0" + date.getMonth() + 1).slice(-2)}
                    </h4>
                }
                <p
                    style={{
                        // backgroundColor: targetedUser._id === message.sender ? 'red' : 'blue',
                        textAlign: targetedUser._id === message.sender ? 'left' : 'right',


                    }}
                >
                    {message.text}
                </p>
            </div>)



        }


    }


    return <div style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',

    }}  >
        <h1>{baseUserData.firstName} {baseUserData.lastName}</h1>
        {objects}
    </div>
}
import React, { useEffect, useState } from "react";
import './../css/backgroud.css'

const Lobby = ({socket, username, room}) => {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        socket.on("receive_message", (messageDataRecived) => {
            setMessageList((list) => [...list, messageDataRecived]);
        })
    }, [socket])

    return(
        <div>
            <div>
                <h2>AAAAAAAA</h2>
            </div>
            <div>
                {messageList.map((messageContent) => {
                    return (
                        <div className="message" id={username === messageContent.author ? "you" : "other"}>
                        <div>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{messageContent.time}</p>
                            <p id="author">{messageContent.author}</p>
                        </div>
                        </div>
                    </div>
                    );
                })}
            </div>
            <div>
            <input type="text" value={currentMessage} placeholder="SCRIVIIIII!!!!" keypress={(event) => { event.key === "Enter" && sendMessage() }} onChange={(event) => {setCurrentMessage(event.target.value)}}/>
            <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Lobby;
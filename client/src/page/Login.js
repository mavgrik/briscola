import './../css/login.css'
import React, { useState } from 'react'
import io from 'socket.io-client'
import Lobby from './Lobby'
import './../css/backgroud.css'

const socket = io.connect('http://localhost:666')

const Login = () => {
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false);

    const join = () => {
        if (username !== "" && room !== "") {

            socket.emit("join_room", room)
            setShowChat(true);

        }
    }

    return (
        <div>
            {!showChat ? (
            <div className="login">
                <h1>Accedi:</h1>
                <input type="text" placeholder="nickname" onChange={(event) => {setUsername(event.target.value)}}/>
                <input type="text" placeholder="stanza" onChange={(event) => {setRoom(event.target.value)}}/>
                <button className="confirm" onClick={join}>Conferma</button>
            </div>
            ) : (
                <Lobby socket={socket} username={username} room={room}/>
            )}   
            <div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </div>
    )
}
  
export default Login
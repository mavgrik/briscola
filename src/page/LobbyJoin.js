import React, { useState } from 'react'
import Lobby from './Lobby'
import './../css/lobbyjoin.css'
import { useSearchParams } from "react-router-dom"

const Login = ({firestore, auth}) => {
    const [searchParams] = useSearchParams()
    const [room, setRoom] = useState(searchParams.get("room"))
    const [roomNull, setRoomNull] = useState(room === null || room === "")

    const join = () => {
        if (room !== null && room !== "") {
            setRoomNull(false)
        }
    }

    return (
        <div>
            {roomNull ? (
                <div>
                    <div className="room">
                        <h1>Inserisci il codice della stanza:</h1>
                        <input className="room-input" type="text" placeholder="stanza" onChange={(event) => {setRoom(event.target.value)}}/>
                        <button className="room-confirm" onClick={join}>Conferma</button>
                    </div>

                    <div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>
                </div>
            ) : (
                <Lobby room={room} firestore={firestore} auth={auth}/>
            )}
        </div>
    )
}
  
export default Login
import React, {useRef, useState} from "react"
import {collection, serverTimestamp, addDoc, query, orderBy, limit} from 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import './../css/lobby.css'

const Lobby = ({room, firestore, auth}) => {
    const dummy = useRef()
    const messagesRef = collection(firestore, 'messages')
    const q = query(messagesRef, orderBy('createdAt'), limit(25))

    const [messages] = useCollectionData(q, {idField: 'id'})
  
    const [formValue, setFormValue] = useState('')
  
    const sendMessage = async (e) => {
      e.preventDefault()

      const {uid} = auth.currentUser
  
      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        room: room,
        uid,
      })
  
      setFormValue('')
      dummy.current.scrollIntoView({ behavior: 'smooth' })
    }
  
    return (
      <div>
        <main>
    
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    
          <span ref={dummy}></span>
    
        </main>
    
        <form onSubmit={sendMessage}>
    
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
    
          <button type="submit" disabled={!formValue}>🕊️</button>
    
        </form>
      </div>
    )
}

function ChatMessage(props, auth) {
    const { text, uid } = props.message
  
    const messageClass = uid === auth.currentUser ? 'sent' : 'received'
  
    return (
      <div>
        <div className={`message ${messageClass}`}>
          <p>{text}</p>
        </div>
      </div>
    )
  }

export default Lobby
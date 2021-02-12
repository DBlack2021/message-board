import React, { useState } from 'react'
import styles from '../../../styles/Message.module.css'
import firebase from 'firebase/app'
import { db, auth } from '../../../utils/db/index'
import { useAuthState } from 'react-firebase-hooks/auth'

//this component will be the area where users submit messages - if logged in it will send, if not it will prompt them to log in
export default function SubmitMessage() {

  const [message, setMessage] = useState("");
  const [user] = useAuthState(auth);

  const  submitMessage = async () => {
    if(user) {
      //submit the message and write to the DB
      const data = {
        authorName: user.displayName,
        createdAt: new Date(),
        edited: false,
        text: message,
        uid: user.uid,
      }
      const res = await db.collection('messages').doc().set(data);
      window.location.reload(false);
    } else {
      //prompt them to log in and then submit message again
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '10px' }}>
      <textarea style={{ width: '100%', height: '50px', resize: 'none' }} maxLength="75" value={message} onChange={handleChange}/>
      <button style={{ width: '50%' }} onClick={submitMessage}>Submit Message</button>
    </div>
  )
}

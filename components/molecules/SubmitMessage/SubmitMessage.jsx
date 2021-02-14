import React, { useState } from 'react'
import styles from '../../../styles/SubmitMessage.module.css'
import firebase from 'firebase/app'
import { db, auth } from '../../../utils/db/index'
import { useAuthState } from 'react-firebase-hooks/auth'

//this component will be the area where users submit messages - if logged in it will send, if not it will prompt them to log in
export default function SubmitMessage() {
  const MAX_CHARS = 140;
  const [message, setMessage] = useState("");
  const [user] = useAuthState(auth);

  const submitMessage = async () => {
    if(user) {
      if(message.length == 0 || !message.replace(/\s/g, '').length || !message.replace(/ ឵឵/g, '').length) {
        alert("Please submit a message!")
      } else {
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
      }
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
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '10px', maxHeight: '100%' }}>
      <h3 className={styles.title}>Submit A Message:</h3>
      <textarea className={styles.input} value={message} onChange={handleChange}/>
      <button className={styles.button} onClick={submitMessage} disabled={message.length > MAX_CHARS}>Submit Message</button>
      <h6 className={styles.title}>{MAX_CHARS - message.length} characters remaining...</h6>
    </div>
  )
}

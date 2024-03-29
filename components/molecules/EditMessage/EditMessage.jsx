import React, { useState, useEffect } from 'react'
import styles from '../../../styles/SubmitMessage.module.css'
import { db } from '../../../utils/db/index'

export default function EditMessage({ id, isComment }) {
  const MAX_CHARS = 140;
  const [message, setMessage] = useState(""); //make initial state the original message

  useEffect(async () => {
    const data = await (await db.collection(isComment ? 'comments' : 'messages').doc(id).get()).data()
    setMessage(data.text);
  }, [])

  const editMessage = async () => {
    const res = await db.collection(isComment ? 'comments' : 'messages').doc(id).update({
      text: message,
      edited: true
    });
    window.location.reload(false);
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '10px', maxHeight: '100%' }}>
      <h3 className={styles.title}>Edit Your {isComment ? 'Comment' : 'Message'}:</h3>
      <textarea className={styles.input} value={message} onChange={handleChange}/>
      <button className={styles.button} onClick={editMessage} disabled={message.length > MAX_CHARS}>Submit</button>
      <h6 className={styles.title}>{MAX_CHARS - message.length} characters remaining...</h6>
    </div>
  )
}

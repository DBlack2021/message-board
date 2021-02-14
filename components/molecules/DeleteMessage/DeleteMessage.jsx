import React, { useState, useEffect } from 'react'
import styles from '../../../styles/SubmitMessage.module.css'
import { db } from '../../../utils/db/index'

export default function DeleteMessage({ id, close }) {

  const [message, setMessage] = useState("")

  useEffect(async () => {
    const docRef = await db.collection('messages').doc(id).get();
    setMessage(docRef.data().text);
  }, [])
  

  const deleteMessage = async () => {
    const res = await db.collection('messages').doc(id).delete();
    window.location.reload(false);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '10px', maxHeight: '100%' }}>
      <h3 className={styles.title}>Are you sure you'd like to delete this message?</h3>
      <h4>"{message}"</h4>
      <div style={{ display: 'flex' }}>
        <button onClick={deleteMessage}>Yes</button>
        <button onClick={close}>No</button>
      </div>
    </div>
  )
}

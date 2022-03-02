import React, { useState, useEffect } from 'react'
import styles from '../../../styles/SubmitMessage.module.css'
import { db } from '../../../utils/db/index'

export default function DeleteMessage({ id, close, isComment }) {

  const [message, setMessage] = useState("")

  useEffect(async () => {
    const data = await(await db.collection(isComment ? 'comments' : 'messages').doc(id).get()).data();
    setMessage(data.text);
  }, [])
  

  const deleteMessage = async () => {
    const res = await db.collection(isComment ? 'comments' : 'messages').doc(id).delete();
    window.location.reload(false);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '10px', maxHeight: '100%' }}>
      <h3 className={styles.title}>Are you sure you'd like to delete this {isComment ? 'comment' : 'message'}?</h3>
      <h4 style={{ textAlign: 'center' }}>"{message}"</h4>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={deleteMessage} style={{ width: '50px', height: '30px', backgroundColor: 'green', fontSize: '16px', border: 'none', cursor: 'pointer' }}>Yes</button>
        <button onClick={close} style={{ width: '50px', height: '30px', backgroundColor: 'red', fontSize: '16px', border: 'none', cursor: 'pointer' }}>No</button>
      </div>
    </div>
  )
}

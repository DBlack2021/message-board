import React from 'react'
import styles from '../../../styles/MessageGrid.module.css'
import Message from '../../atoms/Message/Message'

export default function MessageGrid({ messages }) { //messages is an array of message objects
  return (
    <div className={styles.gridContainer}>
      {JSON.parse(messages).map(message => (
        <div key={message.uid} className={styles.messageContainer}>
          <Message uid={message.uid} text={message.text} edited={message.edited} /> {/* Eventually, authorName will be changed to getting the data via id */}
        </div>
      ))}
    </div>
  )
}

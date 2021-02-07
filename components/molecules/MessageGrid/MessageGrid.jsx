import React from 'react'
import styles from '../../../styles/MessageGrid.module.css'
import Message from '../../atoms/Message/Message'

export default function MessageGrid({ messages }) { //messages is an array of message objects
  return (
    <div className={styles.gridContainer}>
      {messages.map(message => (
        <div className={styles.messageContainer}>
          <Message key={message.authorId} author={message.authorId} name={message.authorName} messageContent={message.message} /> {/* Eventually, authorName will be changed to getting the data via id */}
        </div>
      ))}
    </div>
  )
}

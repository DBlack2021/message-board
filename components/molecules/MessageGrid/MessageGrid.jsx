import React from 'react'
import styles from '../../../styles/MessageGrid.module.css'
import messageStyles from '../../../styles/Message.module.css'
import Message from '../../atoms/Message/Message'
import SubmitMessage from '../SubmitMessage/SubmitMessage'
import { useRouter } from 'next/router'

export default function MessageGrid({ messages }) {
  const router = useRouter();
  return (
    <div className={styles.gridContainer}>
      {router.pathname == '/' && //if we're on the homepage (since MessageGrid is used on profile pages but we dont want message submission elsewhere)
        <div className={[messageStyles.container, styles.submitBox].join(' ')}>
          <SubmitMessage />
        </div>
      }
      {JSON.parse(messages).map(message => (
        <div key={message.id} className={styles.messageContainer}>
          <Message 
          photoURL={message.photoURL} 
          id={message.id} 
          uid={message.uid} 
          text={message.text} 
          edited={message.edited} 
          authorName={message.authorName}
          isComment={false}
          commentPage = {false}
          />
        </div>
      ))}
    </div>
  )
}

import React from 'react'
import styles from '../../../styles/Message.module.css'

export default function Message({ uid: authorId, text: message, edited }) {

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{authorId} says...</h3> {/* TODO: Change {name} to a link to a profile using next links (author.id) */}
      <p className={styles.message}>{message}</p>
      {edited &&
        <p>(edited)</p>
      }
    </div>
  )
}

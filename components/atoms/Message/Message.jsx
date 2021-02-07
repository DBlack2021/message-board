import React from 'react'
import styles from '../../../styles/Message.module.css'

export default function Message({ author, name, messageContent }) {

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{name} says...</h3> {/* TODO: Change {name} to a link to a profile using next links (author.id) */}
      <p className={styles.message}>{messageContent}</p>
    </div>
  )
}

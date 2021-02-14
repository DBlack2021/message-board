import React from 'react'
import Link from 'next/link'
import styles from '../../../styles/Message.module.css'
import { db, auth } from '../../../utils/db/index'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

export default function Message({ id: messageId, uid: authorId, text: message, edited, authorName }) {

  const [user] = useAuthState(auth);

  return (
    <div className={styles.container}>
      
      { user && user.uid == authorId &&
          <div className={styles.edit}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </div>
      }

      <div className={styles.titleContainer}>
        <Link href={`/${authorId}`}>
          <a>
            <h3 className={styles.title}>{authorName}</h3>
          </a>
        </Link>
        <h3 style={{ margin: '0 0 0 0.25em' }}>says...</h3>
      </div>
      
      <p className={styles.message}>{message}</p>
      {edited &&
        <p>(edited)</p>
      }
    </div>
  )
}

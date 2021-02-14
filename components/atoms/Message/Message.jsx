import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/Message.module.css'
import { db, auth } from '../../../utils/db/index'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Modal } from '@material-ui/core'
import EditMessage from '../EditMessage/EditMessage'

export default function Message({ id: messageId, uid: authorId, text: message, edited, authorName }) {

  const [user] = useAuthState(auth);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className={styles.container}>
      
      { user && user.uid == authorId &&
        <>
          <div className={styles.edit}>
            <FontAwesomeIcon onClick={() => setEditing(true)} icon={faPencilAlt} />
          </div>

          <div className={styles.trash}>
            <FontAwesomeIcon onClick={() => setDeleting(true)} icon={faTrashAlt} />
          </div>
        </>
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

      <Modal onClose={() => setEditing(false)} className={styles.modal} open={editing}>
        <EditMessage id={messageId} />
      </Modal>

      <Modal onClose={() => setDeleting(false)} className={styles.modal} open={deleting}>
        <EditMessage id={messageId} />
      </Modal>

    </div>
  )
}

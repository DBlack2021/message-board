import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/Message.module.css'
import { auth } from '../../../utils/db/index'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt, faComment } from '@fortawesome/free-solid-svg-icons'
import { Modal } from '@material-ui/core'
import EditMessage from '../../molecules/EditMessage/EditMessage'
import DeleteMessage from '../../molecules/DeleteMessage/DeleteMessage'

export default function Message({ id: messageId, uid: authorId, text: message, edited, authorName, isComment = false }) {
  const [user] = useAuthState(auth);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const titleCase = (str) => {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  return (
    <div className={styles.container}>
      
      { user && user.uid == authorId &&
          <div className={styles.edit}>
            <FontAwesomeIcon onClick={() => setEditing(true)} icon={faPencilAlt} />
          </div>
      }
      
      { user && user.uid == authorId &&
          <div className={styles.trash}>
            <FontAwesomeIcon onClick={() => setDeleting(true)} icon={faTrashAlt} />
          </div>
      }

      { user && user.uid == authorId ?
        <div className={styles.commentloggedin}>
          <Link href={`/message/${messageId}`}>
            <FontAwesomeIcon icon={faComment} />
          </Link>
        </div>
        :
        <div className={styles.commentnotloggedin}>
          {isComment ? 
            <Link href={`/message/${messageId}`}>
              <FontAwesomeIcon icon={faComment} />
            </Link>
            :
            <FontAwesomeIcon icon={faComment} />}
        </div>
      }
      
      
      <div className={styles.titleContainer}>
        <Link href={`/${authorId}`}>
          <a>
            <h3 className={styles.title}>{titleCase(authorName)}</h3>
          </a>
        </Link>
        <h3 style={{ margin: '0 0 0 0.25em' }}>{isComment ? "commented..." : "says..."}</h3>
      </div>
      
      <p className={styles.message}>{message}</p>

      <Modal onClose={() => setEditing(false)} className={styles.modal} open={editing}>
        <EditMessage id={messageId} />
      </Modal>

      <Modal onClose={() => setDeleting(false)} className={styles.modal} open={deleting}>
        <DeleteMessage id={messageId} close={() => setDeleting(false)}/>
      </Modal>

    </div>
  )
}

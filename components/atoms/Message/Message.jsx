import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/Message.module.css'
import { auth } from '../../../utils/db/index'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt, faComment, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Modal } from '@material-ui/core'
import EditMessage from '../../molecules/EditMessage/EditMessage'
import DeleteMessage from '../../molecules/DeleteMessage/DeleteMessage'

export default function Message({ id: messageId, uid: authorId, text: message, edited, authorName, isComment = false, commentPage = false, parentId, parentIsComment }) {
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
      
      {/* TODO: Back button for comments */}
      {/* TODO: Figure out how to handle routing for link */}
      { isComment && commentPage &&
        <div className={styles.back}>
          <Link href={`/${parentIsComment ? 'comment' : 'message'}/${parentId}`}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>
      }

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
            <Link href={`/${isComment ? 'comment' : 'message'}/${messageId}`}>
              <FontAwesomeIcon icon={faComment} />
            </Link>
          </div>
          :
          <div className={styles.commentnotloggedin}>
              <Link href={`/${isComment ? 'comment' : 'message'}/${messageId}`}>
                <FontAwesomeIcon icon={faComment} />
              </Link>
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

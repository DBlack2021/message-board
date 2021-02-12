import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../../../styles/Message.module.css'
import { db } from '../../../utils/db/index'

export default function Message({ uid: authorId, text: message, edited, authorName }) {

  return (
    <div className={styles.container}>
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
import React, { useState } from 'react'
import Message from '../../atoms/Message/Message';
import firebase from 'firebase/app';
import { db, auth } from '../../../utils/db/index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

export default function MessageWithComents({ id, message }) {

  const MAX_CHARS = 100;
  const [comment, setComment] = useState("");
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState([]);


  useEffect(async () => {
    const entries = await db.collection('comments').where("parent", "==", id).orderBy('createdAt', 'desc').limit(51).get(); //50 messages and then the 1 because there's an empty space :)
    setComments(entries.docs.map(doc => doc.data()));
    console.log(entries.docs.map(doc => doc.data()));
  }, [])
  

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const submitComment = async () => {
    if(comment.length == 0 || !comment.replace(/\s/g, '').length || !comment.replace(/ ឵឵/g, '')) {
      alert("Please submit a comment!");
    } else {
      // submit the comment and write to db
      const data = {
        authorName: user.displayName,
        parent: id,
        text: comment,
        uid: user.uid,
      }

      const res = await db.collection('messages').doc().set(data);
      window.location.reload(false);
    }
  }

  return (
    <div>
      <Message 
          photoURL={message.photoURL} 
          id={id} 
          uid={message.uid} 
          text={message.text} 
          edited={message.edited} 
          authorName={message.authorName} />
      
      { /* Text box to add a comment */ }
      <div className="comment-box">
        <textarea value={comment} onChange={handleChange} placeholder="Add a comment..."></textarea>
        <button className="comment-button" disabled={comment.length > MAX_CHARS} onClick={submitComment}>Comment</button>
      </div>

      {/* <Comments comments={comments} /> */}
    </div>
  )
}

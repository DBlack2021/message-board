import React, { useState } from 'react'
import Message from '../../atoms/Message/Message';
import firebase from 'firebase/app';
import { db, auth } from '../../../utils/db/index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

export default function MessageWithComents({ id, message, isComment, commentPage, parentIsComment }) {

  const MAX_CHARS = 100;
  const [comment, setComment] = useState("");
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState([]);


  useEffect(async () => {
    const entries = await db.collection('comments').where("parent", "==", id).orderBy('createdAt', 'desc').limit(51).get(); //50 messages and then the 1 because there's an empty space :)
    setComments(entries.docs.map(entry => ({
      id: entry.id,
      ...entry.data()
    })));
  }, [])
  

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const submitComment = async () => {
    if(user) {
      if(comment.length == 0 || !comment.replace(/\s/g, '').length || !comment.replace(/ ឵឵/g, '')) {
        alert("Please submit a comment!");
      } else {
        // submit the comment and write to db
        const data = {
          authorName: user.displayName,
          parent: id,
          text: comment,
          uid: user.uid,
          createdAt: new Date()
        }
  
        const res = await db.collection('comments').doc().set(data);
        window.location.reload(false);
      }
    } else {
      //prompt them to log in and then submit message again
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
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
          authorName={message.authorName}
          isComment={isComment} 
          commentPage={commentPage}
          parentId={message.parent}
          parentIsComment={parentIsComment}    
      />
      
      { /* Text box to add a comment */ }
      <div className="comment-box">
        <textarea value={comment} onChange={handleChange} placeholder="Add a comment..."></textarea>
        <h6>
          {MAX_CHARS - comment.length} characters left
        </h6>
        <button className="comment-button" disabled={comment.length > MAX_CHARS} onClick={submitComment}>Comment</button>
        <button className="comment-button" onClick={() => setComment("")}>Clear</button>
      </div>

      { /* List of comments */ }
      <div className="comment-list">
        {comments.map(comment => (
          <Message
            key={comment.id}
            id={comment.id}
            uid={comment.uid}
            text={comment.text}
            edited={comment.edited}
            authorName={comment.authorName}
            isComment={true}
            commentPage={false}
            parentId={comment.parent}
            parentIsComment={true}
          />
        ))}
      </div>
    </div>
  )
}

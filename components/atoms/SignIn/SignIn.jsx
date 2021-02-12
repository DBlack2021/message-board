import React from 'react'
import firebase from "firebase/app";
import { auth } from '../../../utils/db/index';

export default function SignIn() {
  
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div>
      <button onClick={signInWithGoogle}>Log In</button>
    </div>
  )
}

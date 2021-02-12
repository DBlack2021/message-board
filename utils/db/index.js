import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDwhtbghBxMO04iew-j8LcQ6oY9d-ydr_E",
    authDomain: "message-board-1cd62.firebaseapp.com",
    projectId: "message-board-1cd62",
    storageBucket: "message-board-1cd62.appspot.com",
    messagingSenderId: "177882724356",
    appId: "1:177882724356:web:691733c4272f7d908e1d51"
  });
}else {
  firebase.app(); // if already initialized, use that one
}

export const db = firebase.firestore();
export const auth = firebase.auth();
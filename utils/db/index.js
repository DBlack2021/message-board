import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDnYWlY-viNBWjQkQLR9mZISkl_yEM17rk",
    authDomain: "message-board-3b38a.firebaseapp.com",
    projectId: "message-board-3b38a",
    storageBucket: "message-board-3b38a.appspot.com",
    messagingSenderId: "248319017404",
    appId: "1:248319017404:web:4c81fa6ce11dccff6fabb9",
    measurementId: "G-TG7C86E047"
  });
}else {
  firebase.app(); // if already initialized, use that one
}

export const db = firebase.firestore();
export const auth = firebase.auth();
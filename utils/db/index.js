import firebase from "firebase/app";
import 'firebase/firestore';
require('dotenv').config();

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSSAGING_SENDER_ID,
    appId: process.env.APP_ID
  });
}else {
  firebase.app(); // if already initialized, use that one
}

export default firebase.firestore();
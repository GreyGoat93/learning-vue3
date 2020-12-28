import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPkdiCNBw1cCxmEIwjWcMWCnH7M6ze864",
    authDomain: "learning-vue--greygoat93.firebaseapp.com",
    databaseURL: "https://learning-vue--greygoat93-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "learning-vue--greygoat93",
    storageBucket: "learning-vue--greygoat93.appspot.com",
    messagingSenderId: "559300842603",
    appId: "1:559300842603:web:147b9f5f886a8c7f77cd2e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
export const chatsRef = db.ref("chats");

export default firebase;
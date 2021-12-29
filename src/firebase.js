import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDXXHXKOgxqKEWxvN_a6iSbNZU50ju_FPw",
	authDomain: "clone-89a9b.firebaseapp.com",
	projectId: "clone-89a9b",
	storageBucket: "clone-89a9b.appspot.com",
	messagingSenderId: "353855195867",
	appId: "1:353855195867:web:49288aad27e7885ed49afe",
	measurementId: "G-H12NCRQZRJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

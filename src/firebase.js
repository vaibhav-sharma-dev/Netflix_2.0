import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebaseConfig from "./firebaseData";


const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth};
export default db
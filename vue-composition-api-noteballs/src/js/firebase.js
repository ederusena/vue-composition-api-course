import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDkc6r35NriAtdH46xCgTeGyQshhUm9gl4",
  authDomain: "noteballs-eb9bd.firebaseapp.com",
  projectId: "noteballs-eb9bd",
  storageBucket: "noteballs-eb9bd.appspot.com",
  messagingSenderId: "47863833994",
  appId: "1:47863833994:web:8ddc277c0210d2d4b45473"
}

initializeApp(firebaseConfig)

const db = getFirestore()

export default db
import { initializeApp } from "firebase/app";


export const firebaseConfig = {
  apiKey: "AIzaSyAL8y23-Ya8rbTU2cloIL3UC0umg2kNAv8",
  authDomain: "hello-react-firebase-5c889.firebaseapp.com",
  projectId: "hello-react-firebase-5c889",
  storageBucket: "hello-react-firebase-5c889.firebasestorage.app",
  messagingSenderId: "109152922503",
  appId: "1:109152922503:web:741c4c5f776a6d47dec122",
  measurementId: "G-J0KD17E54R",
  // databaseURL:"https://hello-react-firebase-5c889-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig)

import { createContext, useContext } from "react";
import { firebaseConfig } from "../firebase";
import { getAuth ,createUserWithEmailAndPassword, signOut  } from "firebase/auth";
import { getDatabase,set, ref } from "firebase/database";
import { initializeApp } from "firebase/app";

export const FirebaseContext = createContext(null)

export const useFirebase =()=> useContext(FirebaseContext)

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

export const FirebaseProvider = ({children})=>{ 
    const signinUserWithEmailAndPassword = (email,password)=>{
        return(
            createUserWithEmailAndPassword(auth,email,password)
        )
    }
    
    const putData =(key,data)=> (set(ref(db,key), data))
    
    const signOutUser = (auth) => signOut(auth)
    

    return(
        <FirebaseContext.Provider value={{signinUserWithEmailAndPassword, putData,signOutUser}}>
            {children}
        </FirebaseContext.Provider>
    )
}

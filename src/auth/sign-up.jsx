import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { app } from '../firebase'
import { getFirestore } from 'firebase/firestore'



const db = getFirestore(app)

function Signup() {
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')



    const auth = getAuth(app)
    const createUser = ()=>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((res)=>alert("Successfully Signedup"))
    .catch((err)=>{
        const errorMessage = err.message
        alert(errorMessage)
    })
    }

    const signOutUser = ()=> {
      console.log('Current user is: ', auth.currentUser);
      console.log("Auth: ",auth);
      
      signOut(auth)
      .then((res)=>console.log('Signed out now current user is: ', auth.currentUser))
      .catch((err)=>err.code)
      alert('clicked')
    }
  return (
    <div>
      <h1>Signup Form</h1>
        <label htmlFor="email">Email</label>
        <input type="email" id='email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={createUser}>create user</button>
        <button onClick={signOutUser}>Signout</button>
    </div>
  )
}

export default Signup
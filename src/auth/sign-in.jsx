import React, { useState } from "react";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

function Signin() {
  const auth = getAuth(app)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signinUser = ()=>{
    signInWithEmailAndPassword(auth,email,password)
    .then((res)=>alert("Logged in"))
    .catch((err)=>alert(err.message))
  }
  return (
    <div>
      <h1>Signin Form</h1>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={signinUser}>Signin</button>
    </div>
  );
}

export default Signin;

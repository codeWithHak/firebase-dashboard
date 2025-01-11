import { useState } from "react";
import { FirebaseContext, useFirebase } from "../context/FirebaseContext";


function Signup (){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    // const firebase = useContext(FirebaseContext)
    const firebase = useFirebase()
    console.log('Firebase',firebase);
    
    const handleNewUser = ()=>{
        firebase.signinUserWithEmailAndPassword(email,password).then((res)=>alert(res.user.email))
        .catch((err)=>alert(err))
    }
    const handleSignout = ()=>{
        firebase.signOutUser().then((res)=>alert(res.user.email,"Signedout"))
    }
    return(
        <div>
            <h1>Context Signup</h1>
            <label htmlFor="email">Username</label>
            <input type="text" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleNewUser}>Signup COntext</button>
            <button onClick={handleSignout}>Signout COntext</button>
        </div>
    )
}
export default Signup
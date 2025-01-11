import './App.css'
import Signin from './auth/sign-in'
import Signup from './auth/sign-up'
import { FirebaseProvider } from './context/FirebaseContext'
import SignupForm from './experient_lab/auth'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import LoginForm from './experient_lab/login'
import Dashboard from './experient_lab/dashboard'

function App() {
  
  return (
    <BrowserRouter>
   <Routes>
   <Route path='/' element={<SignupForm/>}/>
   <Route path='/login' element={<LoginForm/>}/>
   <Route path='/dashboard' element={<Dashboard/>}/>
   </Routes>
    </BrowserRouter>
  )
}

export default App


// Putting data in realtime

// import './App.css'
// import { getDatabase, set, ref } from "firebase/database";
// import { app } from './firebase';


// const db = getDatabase(app)


// function App() {
//   const putData = ()=>{
//     set(ref(db,'user/huzair'),{
//       name:"huzair",
//       id:1,
//     });
//   };
//   return (
//     <>
//       <div>Hello Firebase</div> 
//       <button onClick={putData}>Put Data</button>
//     </>
//   )
// }

// export default App

// Algorithm
// 1- Get data in an input and store in firestore - no auth, data will be - name, phone number, email,password
// 2- Add auth on input, to signup user
// 3- Redirect to login page
// 4- if log in then redirect to dashboard page where he can set his pfp an other details as well, try asking the pfp at signup page if possible
// 5- user can write posts
// 6 every post has a tag and can be filtered with that tag
// Use cloudinary for images, firebase image store is paid


import { Mail, Lock, User, Phone } from 'lucide-react'
import { useState } from 'react'
import { getFirestore, collection, addDoc, query } from 'firebase/firestore'
import { app } from '../firebase'
import { getAuth,createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile} from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'



export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export default function SignupForm() {
    const [username,setUsername] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    

    const handleGoogleSignIn = ()=>{
       signInWithPopup(auth,provider)
        .then((result)=>{
            navigate('/dashboard')   
             
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user
            console.log("Result Credential:", credential);
            console.log("Token:", token);
            console.log("User:",user);
            console.log("Result",result);
            addDoc(collection(db,'Google Authorized Users'),{
                username:user.displayName,
                email:user.email,
                photo:user.photoURL,
                uid:user.uid
            }).then((res)=>console.log('Data Stores In DB').catch((err)=>console.log(err)
            )
            )  
                                                                   
        })
        .catch((err)=>{
            const credential = GoogleAuthProvider.credentialFromError(err)
            console.log("Err Credential:",err);
            
        })
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        
        if (!username || !email || !password || !phoneNumber){
            alert('Please fill all the fields')
            return{

            }
        }

        createUserWithEmailAndPassword(auth,email,password)
        .then((res)=>{
          const user = res.user
          updateProfile(user,{
            displayName:username
          })    
          alert('Signedin Successfully')
          navigate('/login')
          addDoc(collection(db,'users'),{
          username:username,
          phoneNumber:phoneNumber,
          email:email,
          password:password
        })
        .then((ref)=>console.log("Doc ID:", ref))
        
    }).catch((err)=>alert(err.code))
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-[90%] md:w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create an Account</h2>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
              Username
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:!border-indigo-500 py-3"
                placeholder="Your Name"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">
              Phone Number
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-3"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e)=>setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute   inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-3"
                placeholder="you@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-3"
                placeholder="••••••••"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSubmit}  
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-6">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={handleGoogleSignIn}  
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_13183_10121)">
                  <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"/>
                  <path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"/>
                  <path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"/>
                  <path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"/>
                </g>
                <defs>
                  <clipPath id="clip0_13183_10121">
                    <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
          </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  )
}
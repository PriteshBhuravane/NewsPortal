import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../firebase/setup'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export default function SignUp() {


    const navigate = useNavigate()

    const googleSignin =async()=>{
      try {
        signInWithPopup(auth,googleProvider)
        .then(() => navigate('/'))
    .catch((error) => console.log(error));
    } catch (error) {
        console.log(err)
    }
        
    }

  return (
    <>
    <Navbar/>
    <div className=" bg-slate-950 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-gray-800 p-10 rounded-lg shadow-lg">
        <h6 className="text-4xl font-bold text-white mb-8 text-center">Signup Form</h6>
        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              required
            />
          </div>
          
          <button
          onClick={googleSignin}
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
          >
            Sigp In
          </button>
        
        </form>
      </div>
    </div>
    </>
  )
}

import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { FaApple } from 'react-icons/fa'
import Footer from '@/components/Footer'
import Button from '@/components/Button'

function page() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#171717]">
        <a href="/" className="flex items-center top-2 left-2 absolute">
          <img src="/boomit-white.png" alt="Boomit Logo" className="w-16 h-16 object-contain" />
        </a>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="Red Hat Display text-7xl font-extrabold pb-7 text-white">BoomIt!</h1>
            <p className="Poppins text-white"><span className="font-semibold">Welcome to BoomIt!</span></p>
            <p className="Poppins text-white">Sign up and start sending and receiving files.</p>
          </div>
          <div className="min-w-[400px] max-w-sm w-full Poppins">
            <form className="flex flex-col gap-5 mb-6">
              <div className="relative w-full">
                <input type="text" className="block py-4 px-3 w-full text-sm text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-white peer placeholder:opacity-0" placeholder="Name" required />
                <label className="pointer-events-none absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-[#171717] px-1">Name</label>
              </div>
              <div className="relative w-full">
                <input type="email" className="block py-4 px-3 w-full text-sm text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-white peer placeholder:opacity-0" placeholder="Email" required />
                <label className="pointer-events-none absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-[#171717] px-1">Email</label>
              </div>
              <div className="relative w-full">
                <input type="password" className="block py-4 px-3 w-full text-sm text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-white peer placeholder:opacity-0" placeholder="Password" required />
                <label className="pointer-events-none absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-[#171717] px-1">Password</label>
              </div>
              <Button type="submit" className="bg-white text-black hover:bg-transparent hover:text-white hover:outline outline-white" full>Sign Up</Button>
            </form>
            <p className="text-center text-gray-300 text-xs mt-6">By creating an account, you agree to our <a href="/terms" className="text-gray-300 font-semibold hover:underline">Terms of Service</a> and <a href="/privacy" className="text-gray-300 font-semibold hover:underline">Privacy and Cookie Statement</a>.</p>
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-400" />
                <span className="mx-3 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-400" />
            </div>
            <div className="flex flex-col gap-3">
              <Button full border group textSize="text-base" dark className="hover:bg-white hover:text-black" icon={() => <FaGoogle size={20} className="transition-colors group-hover:text-black text-white" />}>Sign Up with Google</Button>
              <Button full border group textSize="text-base" dark className="hover:bg-white hover:text-black" icon={() => <FaApple size={24} className="transition-colors group-hover:text-black text-white" />}>Sign Up with Apple</Button>
            </div>
            <p className="text-center text-gray-300 text-sm mt-6">Do you already have an account? <a href="/login" className="text-white font-semibold hover:underline">Log In</a>.</p>
          </div>
        </div>
      </div>
      <Footer />      
    </>
  )
}

export default page
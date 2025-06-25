"use client";
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { FaApple } from 'react-icons/fa'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/");
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <a href="/" className="flex items-center top-2 left-2 absolute">
          <img src="/boomit-black.png" alt="Boomit Logo" className="w-16 h-16 object-contain" />
        </a>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="Red Hat Display text-7xl font-extrabold pb-7">BoomIt!</h1>
            <p className="Poppins"><span className="font-semibold">Log In</span> to continue with your <span className="font-semibold">BoomIt!</span> account.</p>
          </div>
          <div className="min-w-[400px] max-w-sm w-full Poppins">
            <form className="flex flex-col gap-5 mb-6" onSubmit={handleSubmit}>
              <div className="relative w-full">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="block py-4 px-3 w-full text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black peer placeholder:opacity-0" placeholder="Email" required />
                <label className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1">Email</label>
              </div>
              <div className="relative w-full">
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="block py-4 px-3 w-full text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black peer placeholder:opacity-0" placeholder="Password" required />
                <label className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1">Password</label>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button
                type="submit"
                dark
                className={`hover:bg-white hover:text-black hover:outline outline-black ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                full
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  'Log In'
                )}
              </Button>
            </form>
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="mx-3 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            <div className="flex flex-col gap-3">
              <Button full border group textSize="text-base" className="hover:bg-[#171717] hover:text-white" icon={() => <FaGoogle size={20} className="transition-colors group-hover:text-white text-black" />}>Log In with Google</Button>
              <Button full border group textSize="text-base" className="hover:bg-[#171717] hover:text-white" icon={() => <FaApple size={24} className="transition-colors group-hover:text-white text-black" />}>Log In with Apple</Button>
            </div>
            <p className="text-center text-gray-500 text-sm mt-6">Don't have an account? <a href="/register" className="text-black font-semibold hover:underline">Sign up</a>.</p>
          </div>
        </div>
      </div>
      <Footer />      
    </>
  )
}

export default page
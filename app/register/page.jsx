"use client";
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { FaApple } from 'react-icons/fa'
import Footer from '@/components/Footer'
import Button from '@/components/Button'

function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text); 
      } catch (err) {
        throw new Error("Invalid JSON response received.");
      }

      if (!res.ok) throw new Error(data.message || "Registration failed");
      setSuccess("Registration successful! You can now log in.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [receiverEmail, setReceiverEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [fileSuccess, setFileSuccess] = useState("");

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setFileError("");
    setFileSuccess("");

    if (!file) {
      setFileError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("receiverEmail", receiverEmail);
    formData.append("subject", subject);
    formData.append("message", message);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "File upload failed");
      }

      setFileSuccess("File uploaded successfully!");
    } catch (err) {
      setFileError(err.message);
    }
  };

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
            <form className="flex flex-col gap-5 mb-6" onSubmit={handleSubmit}>
              <div className="relative w-full">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="block py-4 px-3 w-full text-sm text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-white peer placeholder:opacity-0" placeholder="Name" required />
                <label className="pointer-events-none absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-[#171717] px-1">Name</label>
              </div>
              <div className="relative w-full">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="block py-4 px-3 w-full text-sm text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-white peer placeholder:opacity-0" placeholder="Email" required />
                <label className="pointer-events-none absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-[#171717] px-1">Email</label>
              </div>
              <div className="relative w-full">
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="block py-4 px-3 w-full text-sm text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-white peer placeholder:opacity-0" placeholder="Password" required />
                <label className="pointer-events-none absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-[#171717] px-1">Password</label>
              </div>
              {error && <div className="text-red-400 text-sm">{error}</div>}
              {success && <div className="text-green-400 text-sm">{success}</div>}
              <Button
                type="submit"
                className={`bg-white text-black hover:bg-transparent hover:text-white hover:outline outline-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                full
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  'Sign Up'
                )}
              </Button>
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleFileSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Send a File</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Receiver Email</label>
            <input
              type="email"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          {fileError && <p className="text-red-500 text-sm mb-4">{fileError}</p>}
          {fileSuccess && <p className="text-green-500 text-sm mb-4">{fileSuccess}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send File
          </button>
        </form>
      </div>
    </>
  )
}

export default page
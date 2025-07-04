"use client"

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FileTransfer from '@/components/FileTransfer'

function page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex flex-1 items-center justify-center">
        <FileTransfer />
      </main>
      <Footer/>
    </div>
  );
}

export default page
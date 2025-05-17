import React from 'react'

function Footer() {
  return (
    <div className="relative">
      <footer className="w-full fixed bottom-0 left-0 flex justify-between items-center px-8 py-3 border-t border-gray-200 text-gray-500 text-sm poppins">
        <div>
          ©2025 BoomIt! All rights reserved.
        </div>
        <div className="flex gap-4">
          <p className="hover:underline cursor-pointer">Privacy</p>
          <p className="hover:underline cursor-pointer">Terms</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
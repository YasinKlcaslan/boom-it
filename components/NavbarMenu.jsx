"use client"
import React, { useState } from 'react'

function NavbarMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center gap-1 top-2 right-2 absolute">
      <div className="flex gap-2 p-3 items-center h-16">
        <a href="/login" className="px-3 py-2 flex items-center justify-center px-5 rounded-md bg-white text-black font-semibold text-sm outline outline-[#171717] transition-colors hover:bg-[#171717] hover:text-white">Login</a>
        <a href="/register" className="px-3 py-2 flex items-center justify-center px-5 rounded-md bg-[#171717] text-white font-semibold text-sm outline outline-[#171717] transition-colors hover:bg-white hover:text-[#171717]">Sign Up</a>
      </div>
      <div className="h-16 flex items-center justify-center px-3 bg-transparent cursor-pointer relative right-3"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <span className="material-symbols-outlined text-[#171717]">
          menu
        </span>
        {menuOpen && (
          <div className="flex flex-col absolute top-15 right-0 w-32 bg-white border border-gray-100 rounded-xl z-50 animate-fade-in">
            <a href="/about" className="px-3 py-2 text-semibold text-[#171717] hover:outline rounded-xl">About Us</a>
            <a href="/privacy" className="px-3 py-2 text-semibold text-[#171717] hover:outline rounded-xl">Privacy</a>
            <a href="/terms" className="px-3 py-2 text-semibold text-[#171717] hover:outline rounded-xl">Terms</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarMenu

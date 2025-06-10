"use client"
import React from 'react'
import NavbarMenu from './NavbarMenu'

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between">
      <div className="flex items-center">
        <a href="/" className="flex items-center top-2 left-2 absolute">
          <img src="/boomit-black.png" alt="Boomit Logo" className="w-16 h-16 object-contain" />
        </a>
      </div>
      <NavbarMenu />
    </nav>
  );
}

export default Navbar
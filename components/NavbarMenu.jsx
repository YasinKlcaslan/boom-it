"use client"
import { useSession, signOut } from 'next-auth/react';

function NavbarMenu({ onTransfersClick, isModalOpen }) {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-1 top-2 right-2 absolute z-50">
      <div className="flex gap-2 p-3 items-center h-16">
        {session ? (
          <>
            <span className={`px-3 py-2 flex items-center justify-center px-5 rounded-md font-semibold text-sm transition-colors ${
              isModalOpen 
                ? 'bg-[#171717] text-white outline outline-white' 
                : 'bg-white text-black outline outline-[#171717]'
            }`}>{session.user.name}</span>
            <button 
              onClick={onTransfersClick}
              className={`px-3 py-2 flex items-center justify-center px-5 rounded-md font-semibold text-sm transition-colors ${
                isModalOpen 
                  ? 'bg-[#171717] text-white outline outline-white hover:bg-white hover:text-[#171717] hover:outline-[#171717]' 
                  : 'bg-white text-black outline outline-[#171717] hover:bg-[#171717] hover:text-white'
              }`}
            >
              Transfers
            </button>
            <button
              onClick={() => signOut()}
              className={`px-3 py-2 flex items-center justify-center px-5 rounded-md font-semibold text-sm transition-colors ${
                isModalOpen 
                  ? 'bg-white text-[#171717] outline outline-[#171717] hover:bg-[#171717] hover:text-white hover:outline-white' 
                  : 'bg-[#171717] text-white outline outline-[#171717] hover:bg-white hover:text-[#171717]'
              }`}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="px-3 py-2 flex items-center justify-center px-5 rounded-md bg-white text-black font-semibold text-sm outline outline-[#171717] transition-colors hover:bg-[#171717] hover:text-white">Login</a>
            <a href="/register" className="px-3 py-2 flex items-center justify-center px-5 rounded-md bg-[#171717] text-white font-semibold text-sm outline outline-[#171717] transition-colors hover:bg-white hover:text-[#171717]">Sign Up</a>
          </>
        )}
      </div>
    </div>
  );
}

export default NavbarMenu

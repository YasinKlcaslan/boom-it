"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import NavbarMenu from './NavbarMenu'
import SuccessModal from './SuccessModal'

function Navbar() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleModalOpen = async () => {
    setModalVisible(true);
    if (session && transfers.length === 0) {
      setLoading(true);
      try {
        const response = await fetch('/api/transfers');
        if (response.ok) {
          const data = await response.json();
          setTransfers(data.transfers || []);
        }
      } catch (error) {
        console.error('Error fetching transfers:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleModalClose = () => setModalVisible(false);

  return (
    <nav className="w-full flex items-center justify-between relative z-50">
      <div className="flex items-center">
        <a href="/" className="flex items-center top-2 left-2 absolute z-50">
          <img src="/boomit-black.png" alt="Boomit Logo" className="w-16 h-16 object-contain" />
        </a>
      </div>
      
      <NavbarMenu onTransfersClick={handleModalOpen} isModalOpen={isModalVisible} />
      
      <SuccessModal 
        isVisible={isModalVisible} 
        onClose={handleModalClose} 
        transfers={transfers}
        loading={loading}
      />
    </nav>
  );
}

export default Navbar
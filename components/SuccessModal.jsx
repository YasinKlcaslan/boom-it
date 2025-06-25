import React from 'react';
import FileTransfer from './FileTransfer';

const SuccessModal = ({ isVisible, transfers, onClose, loading }) => {
  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 z-30">
        <div className="absolute inset-0 bg-white bg-opacity-20">
          <div className="transform scale-95 origin-left opacity-60 h-full overflow-hidden">
            <div className="min-h-screen flex flex-col">
              <div className="flex items-center justify-center flex-1 pl-8">
                <div className="max-w-md w-full">
                  <FileTransfer />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
        ></div>
      </div>
      
      <div className={`fixed top-0 right-0 h-full w-1/2 bg-[#171717] shadow-2xl z-40 transition-all duration-700 ease-out rounded-l-3xl ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="h-full flex flex-col font-['Poppins']">
          <div className="flex items-center justify-between p-6 pt-20 border-b border-gray-600">
            <h2 className="text-2xl font-semibold text-white font-['Poppins']">Transfers</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined animate-spin text-4xl text-gray-800 mb-4 block">progress_activity</span>
                <p className="text-gray-600 font-['Poppins']">Loading transfers...</p>
              </div>
            ) : transfers && transfers.length > 0 ? (
              <div className="space-y-4">
                {transfers.map((transfer, index) => (
                  <div key={transfer.id || index} className="bg-white rounded-lg p-4 border border-gray-300 hover:shadow-lg hover:bg-gray-50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-black font-['Poppins']">{transfer.name || transfer.fileName || 'Unknown File'}</h3>
                          <p className="text-sm text-gray-600 font-['Poppins']">{new Date(transfer.createdAt || transfer.date).toLocaleDateString('tr-TR')}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-white font-['Poppins']">
                        Completed
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm font-['Poppins']">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sender:</span>
                        <span className="text-black font-medium">{transfer.senderEmail || transfer.sender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Receiver:</span>
                        <span className="text-black font-medium">{transfer.receiverEmail || transfer.receiver}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">File Size:</span>
                        <span className="text-black">{transfer.size ? `${(transfer.size / (1024 * 1024)).toFixed(2)} MB` : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sent at:</span>
                        <span className="text-black">{new Date(transfer.createdAt || transfer.date).toLocaleTimeString('tr-TR')}</span>
                      </div>
                      {transfer.subject && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subject:</span>
                          <span className="text-black">{transfer.subject}</span>
                        </div>
                      )}
                      {transfer.message && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Message:</span>
                          <span className="text-black text-sm max-w-xs text-right">{transfer.message}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-black mb-2 font-['Poppins']">No transfers yet</h3>
                <p className="text-gray-600 font-['Poppins']">Start sending files to see your transfers here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;

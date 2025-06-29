import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import FileInput from './FileInput';
import SuccessModal from './SuccessModal';

function FileTransfer() {
  const { data: session } = useSession();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [selectedFolders, setSelectedFolders] = React.useState([]);
  const [receiverEmail, setReceiverEmail] = React.useState('');
  const [senderEmail, setSenderEmail] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [receiverEmailError, setReceiverEmailError] = React.useState('');
  const [senderEmailError, setSenderEmailError] = React.useState('');
  const [fileError, setFileError] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transfers, setTransfers] = useState([]);
  const [transfersLoading, setTransfersLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      setSenderEmail(session.user.email);
    }
  }, [session]);

  const fetchTransfers = async () => {
    if (!session?.user?.email) return;
    
    setTransfersLoading(true);
    try {
      const response = await fetch('/api/transfers');
      if (response.ok) {
        const data = await response.json();
        setTransfers(data.transfers || []);
      } else {
        console.error('Failed to fetch transfers');
        setTransfers([]);
      }
    } catch (error) {
      console.error('Error fetching transfers:', error);
      setTransfers([]);
    } finally {
      setTransfersLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, [session]);

  const handleGenerate = async () => {
    if (selectedFiles.length === 0) {
      setFileError('Please select files to generate.');
      return;
    }

    setIsLoading(true);
    setFileError('');
    setErrorMessage('');

    try {
      // First, perform AI analysis
      await handleAIAnalysis();
      
      setHasGenerated(true);
    } catch (error) {
      console.error('Generate error:', error);
      setErrorMessage('An error occurred during generation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setFileError('Please select files to upload.');
      return;
    }

    if (!receiverEmail.trim()) {
      setReceiverEmailError('Recipient email is required.');
      return;
    }

    if (!senderEmail.trim()) {
      setSenderEmailError('Your email is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(receiverEmail)) {
      setReceiverEmailError('Please enter a valid email address.');
      return;
    }
    if (!emailRegex.test(senderEmail)) {
      setSenderEmailError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setFileError('');
    setReceiverEmailError('');
    setSenderEmailError('');
    setErrorMessage('');

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append('file', file));
      formData.append('receiverEmail', receiverEmail);
      formData.append('senderEmail', senderEmail);
      formData.append('subject', title);
      formData.append('message', message);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        const firstFile = responseData.files?.[0];
        setUploadedFileInfo({ 
          name: firstFile?.name || 'Files uploaded', 
          size: firstFile?.size || 0,
          downloadUrl: firstFile?.downloadUrl
        });
        setIsModalVisible(true);
        setSelectedFiles([]);
        setReceiverEmail('');
        setTitle('');
        setMessage('');
        setHasGenerated(false);
      } else {
        setErrorMessage('Failed to upload files.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage('An error occurred during file upload.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIAnalysis = async () => {
    if (selectedFiles.length === 0) {
      setFileError('Select files to analyze.');
      return;
    }

    if (!isLoading) {
      setIsAnalyzing(true);
    }
    setFileError('');
    setErrorMessage('');

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append('file', file));

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisData(data);

      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error occurred during AI analysis.');
        throw new Error(errorData.error || 'AI analysis failed');
      }
    } catch (error) {
      console.error('AI analysis error:', error);
      setErrorMessage('Error occurred during AI analysis.');
      throw error; 
    } finally {
      if (!isLoading) {
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-96 flex flex-col gap-4">
      <FileInput
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        setSelectedFolders={setSelectedFolders}
      />
      {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}

      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <input
            type="email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            className="block py-4 px-3 w-full text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black peer placeholder:opacity-0"
            placeholder="Email to"
            required
          />
          <label className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1">Email to</label>
          {receiverEmailError && <p className="text-red-500 text-sm mt-1">{receiverEmailError}</p>}
        </div>
        <div className="relative w-full">
          <input
            type="email"
            value={senderEmail}
            onChange={(e) => !session?.user?.email && setSenderEmail(e.target.value)}
            className={`block py-4 px-3 w-full text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black peer placeholder:opacity-0 ${session?.user?.email ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            placeholder="Your Email"
            disabled={!!session?.user?.email}
            required
          />
          <label className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1">Your email</label>
          {senderEmailError && <p className="text-red-500 text-sm mt-1">{senderEmailError}</p>}
        </div>
        <div className="relative w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block py-4 px-3 w-full text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black peer placeholder:opacity-0"
            placeholder="Title"
          />
          <label className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1">Title</label>
        </div>
        <div className="relative w-full">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="block py-4 px-3 w-full text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black peer placeholder:opacity-0 resize-none"
            placeholder="Message"
            rows={2}
          />
          <label className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1">Message</label>
        </div>
        
        {analysisData && hasGenerated && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-2">
            <h4 className="font-semibold text-sm text-gray-800 mb-2">AI Analysis Results:</h4>
            {analysisData.analysis?.files && analysisData.analysis.files.map((result, index) => (
              <div key={index} className="text-xs text-gray-600 mb-1">
                <span className="font-medium">{result.fileName}:</span> 
                <span className={`ml-1 px-2 py-1 rounded text-xs ${
                  result.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                  result.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {result.riskLevel || 'unknown'} risk
                </span>
                <span className="ml-1">({result.detectedType || result.fileType || 'unknown'})</span>
              </div>
            ))}
          </div>
        )}
        
        <button
          onClick={hasGenerated ? handleUpload : handleGenerate}
          className={`px-3 py-2 flex items-center justify-center px-5 rounded-md bg-white text-black font-semibold text-sm outline outline-[#171717] transition-colors hover:bg-[#171717] hover:text-white w-full mt-2 cursor-pointer ${isLoading || isAnalyzing || selectedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading || isAnalyzing || selectedFiles.length === 0}
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2 material-symbols-outlined">progress_activity</span>
              {hasGenerated ? 'Uploading...' : 'Generating...'}
            </>
          ) : isAnalyzing ? (
            <>
              <span className="animate-spin mr-2 material-symbols-outlined">progress_activity</span>
              AI Analyzing...
            </>
          ) : (
            hasGenerated ? 'Continue' : 'Generate'
          )}
        </button>
        
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      </div>
      
      <SuccessModal
        isVisible={isModalVisible}
        transfers={transfers}
        loading={transfersLoading}
        uploadedFile={uploadedFileInfo}
        onClose={() => {
          setIsModalVisible(false);
          setUploadedFileInfo(null);
        }}
      />
    </div>
  );
}

export default FileTransfer;

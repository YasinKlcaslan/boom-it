import React from 'react';
import { ZipFiles } from './zipFiles';

function FileInput({ selectedFiles, setSelectedFiles, setSelectedFolders }) {
  const fileInputRef = React.useRef(null);
  const folderInputRef = React.useRef(null);
  const [zipping, setZipping] = React.useState(false);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFolderClick = () => {
    folderInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length === 0) return;
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const handleFolderChange = async (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length === 0) return;
    setZipping(true);
    let zipName = 'archive';
    if (newFiles[0] && newFiles[0].webkitRelativePath) {
      const parts = newFiles[0].webkitRelativePath.split('/');
      zipName = parts[0] || 'archive';
    }
    const zippedFile = await ZipFiles(newFiles, zipName);
    setSelectedFiles(prev => [...prev, zippedFile]);
    setSelectedFolders([]);
    setZipping(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {zipping && (
        <div className="border border-[#171717] text-[#171717] px-3 py-2 rounded mb-2 text-center font-semibold animate-pulse">
          Your folder is zipping...
        </div>
      )}

      <div className="flex flex-row gap-3 mb-2">
        <button type="button" onClick={handleFileClick} className="px-3 py-2 flex flex-col items-center justify-center rounded-md bg-white text-black font-semibold text-sm outline outline-[#171717] transition-colors hover:bg-[#171717] hover:text-white w-1/2 group cursor-pointer">
          <span className="flex items-center justify-center text-black text-2xl mb-1 material-symbols-outlined group-hover:text-white transition-colors">attach_file</span>
          Add files
        </button>
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
        <button type="button" onClick={handleFolderClick} className="px-3 py-2 flex flex-col items-center justify-center rounded-md bg-white text-black font-semibold text-sm outline outline-[#171717] transition-colors hover:bg-[#171717] hover:text-white w-1/2 group cursor-pointer">
          <span className="flex items-center justify-center text-black text-2xl mb-1 material-symbols-outlined group-hover:text-white transition-colors">folder</span>
          Add folders
        </button>
        <input ref={folderInputRef} type="file" webkitdirectory="true" directory="true" multiple className="hidden" onChange={handleFolderChange} />
      </div>

      {selectedFiles.length > 0 && (
        <div className="bg-white border border-[#171717] rounded-lg px-3 py-1 text-sm text-[#171717] flex flex-col max-h-40 overflow-y-auto transition-colors">
          {selectedFiles.map((file, i) => (
            <React.Fragment key={file.name + i}>
              <div className="flex items-center gap-3 group py-2 px-1 rounded hover:bg-gray-100 transition-all">
                <span className="truncate flex-1 font-medium">{file.name}</span>
                <span className="text-gray-500 text-xs ml-2 whitespace-nowrap">{(file.size / 1024).toFixed(1)} KB</span>
                <button type="button" className="flex items-center justify-center w-6 h-6 rounded-full text-[#171717] hover:text-red-500 transition-colors" onClick={() => setSelectedFiles(selectedFiles.filter((_, idx) => idx !== i))}>
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
              {i !== selectedFiles.length - 1 && <hr className="my-1 border-gray-200" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileInput;

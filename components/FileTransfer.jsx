import React from 'react';
import FileInput from './FileInput';

function FileTransfer() {
  const [selected, setSelected] = React.useState('');
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [selectedFolders, setSelectedFolders] = React.useState([]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-96 flex flex-col gap-4 ">
      <FileInput
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        selectedFolders={selectedFolders}
        setSelectedFolders={setSelectedFolders}
      />
      
      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <input type="email" className="block py-4 px-3 w-full text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black peer placeholder:opacity-0" placeholder="Email to" required />
          <label className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1">Email to</label>
        </div>
        <div className="relative w-full">
          <input type="email" className="block py-4 px-3 w-full text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black peer placeholder:opacity-0" placeholder="Your Email" required />
          <label className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1">Your email</label>
        </div>
        <div className="relative w-full">
          <input type="text" className="block py-4 px-3 w-full text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black peer placeholder:opacity-0" placeholder="Title" />
          <label className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1">Title</label>
        </div>
        <div className="relative w-full">
          <textarea className="block py-4 px-3 w-full text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black peer placeholder:opacity-0 resize-none" placeholder="Message" rows={2} />
          <label className="pointer-events-none absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-4 origin-[0] peer-focus:left-4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white px-1">Message</label>
        </div>
        <div className="flex flex-row items-center justify-center gap-6 mt-2">
          <label className="flex items-center gap-2 text-sm h-full justify-center items-center cursor-pointer select-none">
            <input type="checkbox" className="accent-[#171717] hidden" checked={selected === 'qr'} onChange={() => setSelected(selected === 'qr' ? '' : 'qr')}/>
            <span className="material-symbols-outlined"> {selected === 'qr' ? 'check_circle' : 'radio_button_unchecked'}</span>
            Create QR
          </label>
          <label className="flex items-center gap-2 text-sm h-full justify-center items-center cursor-pointer select-none">
            <input type="checkbox" className="accent-[#171717] hidden" checked={selected === 'link'} onChange={() => setSelected(selected === 'link' ? '' : 'link')}/>
            <span className="material-symbols-outlined">{selected === 'link' ? 'check_circle' : 'radio_button_unchecked'}</span>
            Create Link
          </label>
        </div>
        <button className="px-3 py-2 flex items-center justify-center px-5 rounded-md bg-white text-black font-semibold text-sm outline outline-[#171717] transition-colors hover:bg-[#171717] hover:text-white w-full mt-2 cursor-pointer">Continue</button>
      </div>
    </div>
  );
}

export default FileTransfer;

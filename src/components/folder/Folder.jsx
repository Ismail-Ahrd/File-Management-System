/* import React from 'react';

function Folder({ name, onClick }) {
  return (
    <div className="flex items-center px-4 py-2 bg-white rounded-md shadow-md cursor-pointer hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M0 5a1 1 0 0 1 1-1h7l2 2h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5z" />
      </svg>
      <p className="text-gray-700">{name}</p>
    </div>
  );
}

export default Folder; */

import React from 'react';

function Folder({ name, onClick }) {
  return (
    <div onClick={onClick} className="w-40 h-40 flex flex-col items-center justify-center bg-white rounded-md shadow-md border border-gray-300 cursor-pointer hover:border-gray-500 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M0 5a1 1 0 0 1 1-1h7l2 2h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5z" />
      </svg>
      <p className="text-gray-700 text-lg mt-2">{name}</p>
    </div>
  );
}

export default Folder;




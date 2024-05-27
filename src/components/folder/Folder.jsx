import { Tooltip } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaFolder } from "react-icons/fa";
import Actions from '../file/actions';

function Folder({ name, onClick, setChanged, documentType }) {
  const [hidden, setHidden] = useState(false)
  const truncateName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...';
    }
    return name;
  };
  return (
    <Tooltip
        placement="bottom-start"
        classNames={{
          base: "border border-white rounded-lg ",
          content: "bg-gray-500 text-white"
        }}
        content={
          <div className="px-1 py-2">
            <div className="text-small font-bold ">{name}</div>
            <div className="text-tiny">This is a custom tooltip content</div>
          </div>
        }  
        hidden={hidden}
      >
        <div onClick={onClick} className="w-40 h-40 relative flex flex-col items-center justify-center bg-white rounded-md shadow-md border border-gray-300 cursor-pointer hover:border-gray-500 hover:bg-gray-100">
          <FaFolder className="text-[#6B7280] text-7xl"/>
          <p className="text-gray-700 text-lg mt-2">{truncateName(name, 14)}</p>
          <Actions setHidden={setHidden} setChanged={setChanged} name={name} type={documentType}/>
        </div>
      </Tooltip>
  );
}

export default Folder;




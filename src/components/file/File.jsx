import { Tooltip } from "@nextui-org/react";
import { FaFileAlt } from "react-icons/fa";
import Actions from "./actions";
import { useState } from "react";

function File({ name, onClick, icon, size, setChanged,documentType }) {
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
            <div className="text-tiny">Size: {size}KB</div>
          </div>
        }
        hidden={hidden}  
      >
        <div onClick={onClick} className="w-40 h-40 relative flex flex-col items-center justify-center bg-white rounded-md shadow-md border border-gray-300 cursor-pointer hover:border-gray-500 hover:bg-gray-100">
          {icon}
          <p className="text-gray-700 text-lg mt-2">{truncateName(name, 14)}</p>
          <Actions setHidden={setHidden} name={name} setChanged={setChanged} type={documentType}/>
        </div>
      </Tooltip>
    );
}
  
export default File;

  

import { FaFileAlt } from "react-icons/fa";

function File({ name, onClick }) {
    return (
      <div onClick={onClick} className="w-40 h-40 flex flex-col items-center justify-center bg-white rounded-md shadow-md border border-gray-300 cursor-pointer hover:border-gray-500 hover:bg-gray-100">
        <FaFileAlt className="text-[#6B7280] text-7xl"/>
        <p className="text-gray-700 text-lg mt-2">{name}</p>
      </div>
    );
}
  
export default File;

  

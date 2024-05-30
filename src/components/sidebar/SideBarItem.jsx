import React from 'react';

export default function SideBarItem({ name, icon, active, setActive, click }) {
  const activeClasses = active ? 'bg-purple-200 text-black' : 'text-gray-700';

  return (
    <div 
        className={`flex items-center gap-2 pl-7 py-2 ${activeClasses} w-[100%] hover:bg-purple-200 text-black hover:cursor-pointer`} 
        onClick={() => {
          setActive(name)
          click()
        }}
    >
      <div className="text-lg">{icon}</div>
      <p className={`text-base`}>{name}</p>
    </div>
  );
}

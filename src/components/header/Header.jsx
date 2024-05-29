import React, { useState } from 'react';
import { Input } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import { useAuth } from '../../contexts/AuthContext';
import AvatarDropdown from '../avatar/Avatar';

export default function Header({ setSearchValue, searchValue }) {
  const { currentUser, userLoggedIn } = useAuth();

  return (
    <nav className=' ps-10 pe-14 bg-white min-h-16 flex items-center justify-between fixed top-0 z-10 md:w-[82.10%]'>
      <div className="w-[500px] border">
        <Input
          radius="none"
          type="text"
          placeholder="Search"
          startContent={<IoIosSearch className='text-2xl text-gray-600'/>}
          value={searchValue}
          onChange={(e)=>setSearchValue(e.target.value)}
        //   onValueChange={handleSearchInputChange} // Update the search input change handler
          classNames={{
            input: "text-base",
            inputWrapper: [
              "h-[45px]"
            ],
          }}
        />
      </div>
      <div>
        <AvatarDropdown />
      </div>
    </nav>
  );
}

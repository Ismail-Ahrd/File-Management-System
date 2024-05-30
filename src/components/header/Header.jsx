import React, { useState } from 'react';
import { Input } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import { useAuth } from '../../contexts/AuthContext';
import AvatarDropdown from '../avatar/Avatar';

export default function Header({ setSearchValue, searchValue, hasInput }) {
  const { currentUser, userLoggedIn } = useAuth();

  return (
    <nav className='bg-white min-h-16 flex items-center justify-between fixed top-0 right-0 px-10 z-10 md:w-[82.10%]'>
      {
        hasInput ?
        <>
          <div className="w-[400px] border">
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
                  "h-[35px]"
                ],
              }}
            />
          </div>
          <div>
            <AvatarDropdown />
          </div>
        </>
        :
        <div className='ms-auto'>
          <AvatarDropdown />
        </div>
      }
    </nav>
  );
}

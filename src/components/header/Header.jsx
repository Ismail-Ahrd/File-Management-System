import React, { useState } from 'react'
import {Input} from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AvatarDropdown from '../avatar/Avatar';


export default function Header() {
  const { currentUser, userLoggedIn } = useAuth()
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate()  
  return (
    <nav className='pt-3 ps-10 pe-14 flex items-center justify-between'>
        <div className="w-[500px] border">
            <Input
                radius="none"
                type="text"
                placeholder="Search"
                startContent={<IoIosSearch className='text-2xl text-gray-600'/>}
                value={searchValue}
                onValueChange={setSearchValue}
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
  )
}

import React, { useState } from 'react'
import { BiHomeAlt2 } from "react-icons/bi"
import { VscFileSubmodule } from "react-icons/vsc"
import { ImFilesEmpty } from "react-icons/im";

import SideBarItem from './SideBarItem'
import { Link, useNavigate } from 'react-router-dom'
import StorageProgress from '../progress/StorageProgress'
import { useAuth } from '../../contexts/AuthContext';
import { encrypt } from '../../utils/crypto';

export default function SideBar({setFilter, filter}) {
  const first = filter === "folder" ? "Folders" : filter === "file" ? "Files" : filter === "all" ? "Home" : ""
  const [active, setActive] = useState(first)
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  

  return (
    <div className='fixed w-60 border-r-purple-500 border-r-1 h-screen flex flex-col justify-between pt-5 bg-white pb-4'>
        <div className='flex flex-col gap-4'>
          <Link to="/" className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-purple-500 mb-1'>
              LOGO
          </Link>
          <SideBarItem 
              name="Home"
              icon={<BiHomeAlt2 />}
              active={active === "Home"}
              setActive={(link) => setActive(link)}
              click={() => {
                setFilter("all")
                navigate(`/dashboard/${encrypt(currentUser.uid)}`)
              }}
          />
          <SideBarItem 
              className="w-[90%]"
              name="Folders"
              icon={<VscFileSubmodule />}
              active={active == "Folders"}
              setActive={(link) => setActive(link)}
              click={() => {
                setFilter("folder")
                navigate(`/dashboard/${encrypt(currentUser.uid)}`)
              }}
          />
          <SideBarItem 
              className="w-[90%]"
              name="Files"
              icon={<ImFilesEmpty />}
              active={active == "Files"}
              setActive={(link) => setActive(link)}
              click={() => {
                setFilter("file")
                navigate(`/dashboard/${encrypt(currentUser.uid)}`)
              }}
          />
        </div>
        <div>
          <StorageProgress />
        </div>
    </div>
  )
}

import React, { useState } from 'react'
import { BiHomeAlt2 } from "react-icons/bi"
import { VscFileSubmodule } from "react-icons/vsc"
import SideBarItem from './SideBarItem'
import { Link } from 'react-router-dom'

export default function SideBar() {
  const [active, setActive] = useState("Home")
  

  return (
    <div className='w-60 border-r-gray-400 border-r-1 h-screen flex flex-col gap-3 pt-5'>
        <Link to="/" className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            LOGO
        </Link>
        <SideBarItem 
            name="Home"
            icon={<BiHomeAlt2 />}
            active={active === "Home"}
            setActive={(link) => setActive(link)}
        />
        <SideBarItem 
            className="w-[90%]"
            name="All files"
            icon={<VscFileSubmodule />}
            active={active == "All files"}
            setActive={(link) => setActive(link)}
        />
    </div>
  )
}

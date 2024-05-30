import React from 'react'
import {Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';
import { doSignOut } from '../../firebase/auth';
import { useAuth } from '../../contexts/AuthContext';

export default function AvatarDropdown() {
  const { currentUser, userLoggedIn } = useAuth()
  const navigate = useNavigate()   
  console.log(currentUser.displayName)
  return (
    <Dropdown placement="bottom-end">
        <DropdownTrigger>
            <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={userLoggedIn ? currentUser.displayName : null}
                size="md"
                src={userLoggedIn ? currentUser.photoURL : null}
            />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as {userLoggedIn ? currentUser.displayName : null}</p>
                <p className="font-semibold">{userLoggedIn ? currentUser.email : null}</p>
            </DropdownItem>
           
            <DropdownItem  key="profile" onPress={() => navigate("/dashboard/profile")}>Profile</DropdownItem>

            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => {
                doSignOut().then(() => {
                    navigate('/')
                })
            }}>
                Log Out
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}

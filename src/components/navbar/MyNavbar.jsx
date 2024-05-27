import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Image} from "@nextui-org/react";
import AvatarDropdown from "../avatar/Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { encrypt } from "../../utils/crypto";

export default function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { userLoggedIn, currentUser } = useAuth();

//   useEffect(() => {
//     setCurrent(pathname);
//   }, [pathname])

  const menuItems = [
    "Later",
  ];

  return (
    <Navbar className="" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent >
        <NavbarBrand >
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse text-purple-500">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white pl-8">LOGO</span>
            </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem> 
          <Link className="text-purple-500" href="#" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem> 
          <Link className="text-purple-500" href="#project">
            Project
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link className="text-purple-500" href="#team" >
            Team
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-purple-500" href="#contact">
            Contact
          </Link>
        </NavbarItem>
        {
            userLoggedIn ?
            <>
                <Link to={`/dashboard/${encrypt(currentUser.uid)}`} className="text-purple-500">
                    Dashboard
                </Link>
                <AvatarDropdown />
            </>
            :
            <>
                <Link to="/login" className="text-purple-500">
                    Login
                </Link>
                <Link to="/register" className="text-purple-500">
                    Sign up
                </Link>
            </>
        }
      </NavbarContent>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden "
        />
        <NavbarMenu className="">
          {menuItems.map((item, index) => (
            <NavbarMenuItem  key={`${item}-${index}`}>
              <Link 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-full text-purple-500 mt-5"
                href={"#"+item.toLowerCase()}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
    </Navbar>
  );
}
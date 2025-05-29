import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";


function AppBar() {
    return (
        <div>
            <div>
                <div className="flex sticky top-0 right-0 z-50 items-center justify-between  px-2 py-2 bg-blue-500">
                    <div className="p-2 items-center w-28 ml-2 ">
                        <img className="" src="src/assets/Paytm_logo.png" alt="paytm_logo" />
                    </div>
                    <div className="justify-stretch">
                       
                        <Menu as="div" className="relative ml-3  ">
                            <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2">
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src="/src/assets/user.jpeg"
                                    alt="user_Profile" />
                            </MenuButton>
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">

                                <MenuItem>
                                    {({ active }) => (
                                        <a href="#"
                                            className={`block px-4 py-2 text-sm ${active ? "bg-gray-100 " : "text-gray-700"
                                                }`}>Your Profile</a>
                                    )}
                                </MenuItem>
                                {({ active }) => (
                                    <a href="#"
                                        className={`block px-4 py-2  text-sm ${active ? "bg-gray-100" : "text-gray-700"}`}>Settings</a>

                                )}
                                <MenuItem>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : "text-gray-700"
                                                }`}
                                        >
                                            Sign out
                                        </a>
                                    )}
                                </MenuItem>
                            </MenuItems>

                        </Menu>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AppBar;

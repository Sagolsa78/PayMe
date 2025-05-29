import React from "react";
import { LuFacebook } from "react-icons/lu";
import { GrInstagram } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";


function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 ">company</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text blue-400">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text blue-400">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text blue-400">
                                    Press
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text blue-400">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 ">Products</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="# " className="hover:text-blue-400">
                                    Payments
                                </a>
                            </li>
                            <li>
                                <a href="# " className="hover:text-blue-400">
                                    Banking
                                </a>
                            </li>
                            <li>
                                <a href="# " className="hover:text-blue-400">
                                    Investments
                                </a>
                            </li>
                            <li>
                                <a href="# " className="hover:text-blue-400">
                                    Insurance
                                </a>
                            </li>

                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 ">Learn</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-blue-400">
                                    Guides
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-400">
                                    Blogs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-400">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-400">
                                    Developers
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 ml-2"> Connect</h3>
                        <div className="flex space-4 ">
                            <a href="# " className="hover:text-blue-400 p-1">
                                <LuFacebook className="w-6 h-6" />
                            </a>
                            <a href="# " className="hover:text-blue-400 p-1">
                                <GrInstagram className="w-6 h-6" />
                            </a>
                            <a href="# " className="hover:text-blue-400 p-1">
                                <BsTwitterX className="w-6 h-6" />
                            </a>
                            <a href="# " className="hover:text-blue-400 p-1">
                                <SiLinkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t  border-gray-700 text-center">
                    <p>&copy;{new Date().getFullYear()} Paytm Clone. Allrights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;

import React from "react";
import {useNavigate} from "react-router-dom";

import { User, ShoppingCart } from "lucide-react"



function Header() {

const navigate=useNavigate();
    return <div>
        <div className="bg-white  shadow-sm">
            <div className="container mx-auto  px-4 py-4 flex items-center justify-between">
                <a href="/" className="text-3xl font-extrabold text-blue-700">PayTm Clone</a>

                <nav className="hidden md:flex space-x-6">

                    <a href="#" className="text-gray-800 font-bold hover:text-blue-600">Paytm for Customers</a>

                    <a href="#" className="text-gray-800 font-bold hover:text-blue-600">Paytm for Buisness</a>

                    <a href="#" className="text-gray-800 font-bold hover:text-blue-600">Invester Relations</a>

                    <a href="#" className="text-gray-800 font-bold hover:text-blue-600">Company</a>

                    <a href="#" className="text-gray-800 font-bold hover:text-blue-600">Career</a>
                </nav>
                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block">
     
                        <button onClick={() => { navigate("/signup") }}
                            className='px-4 py-2 text-sm rounded-md font-semibold text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]'>Sign
                            up
                        </button>
                        <button onClick={() => { navigate("/signin") }}
                            className='px-4 py-2 text-sm rounded-md font-semibold ml-2 text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]'>Signin
                        </button>

                    </div>
                   
                    <button varient="ghost" size="icon">
                        <ShoppingCart size={20} />
                    </button>

                </div>

            </div>
        </div>
    </div>
}

export default Header;
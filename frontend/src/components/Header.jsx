import React from "react";

import { Search, User, ShoppingCart } from "lucide-react"

function Header(){
    return <div>
        <div className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <a href="/" className="text-2xl font-bold text-blue-600">PayTm</a>

                <nav className="hidden md:flex space-x-6">

                    <a href="#" className="text-gray-600 hover:text-blue-600">Paytm for Customers</a>

                    <a href="#" className="text-gray-600 hover:text-blue-600">Paytm for Buisness</a>

                    <a href="#" className="text-gray-600 hover:text-blue-600">Invester Relations</a>

                    <a href="#" className="text-gray-600 hover:text-blue-600">Company</a>

                    <a href="#" className="text-gray-600 hover:text-blue-600">Career</a>
                </nav>
                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block">
                        <input type="search" placeholder="Search..." className="pl-10"></input>

                        <Search className="absolute left-3 top-1/2 transform-translate-y-1/2 text-gray-400" size={18}></Search>

                    </div>
                    <button variant="ghost " size="icon">
                        <User size={20}/>
                    </button>
                    <button varient="ghost" size="icon">
                        <ShoppingCart size={20}/>
                    </button>

                </div>

            </div>
        </div>
    </div>
}

export default Header;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();


  

  async function apicall() {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
    
      });
      localStorage.setItem("token", response.data.token);
      alert("Signin successful");
      navigate('/dashboard')
    } catch (error) {
        console.log(error)
      console.error("Error while signing in:", error);
      alert("Failed to sign in. Please try again.");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await apicall();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Logo Section */}
          <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-20"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center relative z-10"
            >
              <img
                className="mx-auto w-32 mb-6"
                src="/src/assets/Paytm_logo.png"
                alt="Company Logo"
              />
              <h1 className="text-3xl font-bold text-white mb-2">Welcome</h1>
              <p className="text-white text-lg">
                Join us and enjoy exclusive benefits!
              </p>
            </motion.div>
          </div>

          {/* Right Side - Form Section */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create an Account</h2>
            <p className="text-gray-600 mb-6">Enter your details to register</p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
               
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isLoading ? "Signing in..." : "Signin"}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                By signing up, you agree to our{" "}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Terms and Conditions
                </a>
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Signup
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;

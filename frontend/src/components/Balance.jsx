import React ,{useState}from 'react';
import axios from "axios"
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';




function Balance() {
  const [UserBalance, setUserBalance] = useState('');


  async function Refresh(){
    const usertoken =localStorage.getItem("token");
    console.log("user token",usertoken);
    // try{
      const response=await axios.get("http://localhost:3000/api/v1/account/balance",{
        headers:{
          Authorization:`Bearer ${usertoken}`
        }
      });

      console.log(response.data);
      setUserBalance(response.data.balance);

    // }catch(err){
    //   console.error("got error in a axios request ",err.messsage);


    // }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 ">
     
     
      <div className="flex justify-between items-center mb-4">
        <div className=" text-xl font-semibold mb-4 ">Wallet Balance</div>
        <div className="bg-blue-400 w-28 text-center rounded-md text-white font-serif py-1 cursor-pointer"
        onClick={Refresh}>
          Refresh
        </div>
      </div>

      {/* Balance Display */}
      <div className="text-3xl font-bold text-gray-900 mb-4">Rs {UserBalance}</div>

      {/* Action Buttons
      <div className="flex space-x-4">
        <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          <ArrowUpIcon className="h-5 w-5 mr-2" />
          Add Money
        </button>
        <button className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
          <ArrowDownIcon className="h-5 w-5 mr-2" />
          Send Money
        </button>
      </div> */}
      
    </div>
  );
}

export default Balance;

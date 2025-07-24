import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';


export const useWallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState([]);
  const [userInfo,setUserInfo]=useState({firstname:"" ,lastname:""});



  const fetchBalance = useCallback(async () => {
    try {
      const usertoken = localStorage.getItem("token");

      if (!usertoken) {
        console.warn("No user token found.");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${usertoken}`
        }
      });


      setBalance(response.data.balance);
      setUserId(response.data.userId)
      setUserInfo({
        firstname:response.data.firstname,
        lastname:response.data.lastname
      })
    
      toast.success("Balance Updated");
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast.error("Unable to Fetch Balance,Try after some time")
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      const usertoken = localStorage.getItem('token')

      if (!usertoken) {
        console.warn("No user token found.");
        return;
      }

      const newTransactions = await axios.get(`http://localhost:3000/api/v1/account/transactions`, {
        headers: {
          Authorization: `Bearer ${usertoken}`
        }
      })
      setTransactions(newTransactions.data.transactions);
      console.log("useris", newTransactions.data.transactions);


    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, []);




  const refreshData = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchBalance(), fetchTransactions(

    )]);
    setRefreshing(false);
  }, [fetchBalance, fetchTransactions]);



  const sendMoney = useCallback(async (recipientId, amount, note) => {

    try {
      const usertoken = localStorage.getItem('token')
      const transaction = await axios.post("http://localhost:3000/api/v1/account/transfer",
        {
          to: recipientId,
          amount: amount,
          
        },
        {
          headers: {
            Authorization: `Bearer ${usertoken}`
          }
        }
      );

      // Update balance
      fetchBalance();
      //update transction
      fetchTransactions();


      toast.success("transaction successfull");

      return transaction;

    } catch (error) {
      console.error("Transfer Failed:", error.response ? error.response.data : error);
      toast.error("Transfer Failed. Check the console for more details.");
    }
  }, []);

  const searchUsers = useCallback(async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${query}`);
      return response.data.user;



    } catch (error) {
      console.error("User search failed:", error);
      toast.error("Unable to search users");
      return [];
    }
  }, []);
useEffect(() => {
  let mounted = false;

  const loadInitialData = async () => {
    if (!mounted) {
      mounted = true;
      setLoading(true);
      await Promise.all([fetchBalance(), fetchTransactions()]);
      setLoading(false);
    }
  };

  loadInitialData();
}, []);


  // // // Auto-refresh balance every transaction
  // useEffect(() => {
  //   // const interval = setInterval(fetchBalance, 30000);
  //   // return () => clearInterval(interval);
  // }, [fetchBalance]);

  return {
    balance,
    userId,
    userInfo,
    transactions,
    loading,
    refreshing,
    refreshData,
    sendMoney,
    searchUsers
  };
};
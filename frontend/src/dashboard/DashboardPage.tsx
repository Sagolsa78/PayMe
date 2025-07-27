import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Plus,
  Send,
  Smartphone,
  Zap,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../contex/ThemeProvider.jsx';
import { useWallet } from '../hooks/useWallet.js';
import BalanceCard from './BalanceCard.jsx';
import UserSearch from './UserSearch.jsx';
import SendMoneyModal from './SendMoneyModal.jsx';
import TransactionHistory from './TransactionHistory.jsx';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const Navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { balance, userInfo,transactions, loading, refreshing, refreshData, sendMoney, searchUsers } = useWallet();

  const quickActions = [
    { icon: Send, label: 'Send Money', color: 'from-blue-500 to-blue-600', action: () => setShowSendModal(true) },
    { icon: Plus, label: 'Add Money', color: 'from-green-500 to-green-600', action: () => { } },
    { icon: Smartphone, label: 'Recharge', color: 'from-purple-500 to-purple-600', action: () => { } },
    { icon: Zap, label: 'Pay Bills', color: 'from-orange-500 to-orange-600', action: () => { } }
  ];


  const capitalize=(str)=>
    str ? str.charAt(0).toUpperCase()+ str.slice(1).toLowerCase():"";



  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowSendModal(true);
  };

  const handleSendMoney = async (recipientId, amount, note) => {
    await sendMoney(recipientId, amount, note);
    setShowSendModal(false);
    setSelectedUser(null);
  };

  const handleCloseSendModal = () => {
    setShowSendModal(false);
    setSelectedUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please log in to access your dashboard
          </p>
          <button
            onClick={() => window.location.href = '/signin'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Signin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              onClick={() => { Navigate("/") }} className="flex items-center hover:cursor-pointer space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PayMe
              </span>
            </div>

            {/* Desktop Header Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {isDark ? <Moon className='w-5 h-5' /> : <Sun className='w-5 h-5' />}
              </motion.button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    U
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  User
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  localStorage.removeItem("token");
                  Navigate( '/signin');
                }}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      U
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    User
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      Navigate('/signin');
                    }}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome & Balance Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome back{userInfo.firstname ||userInfo.lastname?`, ${capitalize(userInfo.firstname)} ${capitalize(userInfo.lastname)}`:""}!👋
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Your wallet is ready for seamless transactions
                </p>
              </div>

              <BalanceCard
                balance={balance}
                refreshing={refreshing}
                onRefresh={refreshData}
              />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={action.action}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-all group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* User Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Send Money to Anyone
              </h2>
              <UserSearch onUserSelect={handleUserSelect} searchUsers={searchUsers} />
            </motion.div>

            {/* Transaction History */}
            <TransactionHistory transactions={transactions} loading={loading} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Monthly Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                This Month
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Money Sent</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">₹18,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Money Received</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">₹32,100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Bills Paid</span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">₹5,200</span>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 dark:text-white">Net Balance</span>
                    <span className="font-bold text-green-600 dark:text-green-400">+₹8,450</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Our support team is available 24/7 to assist you with any questions.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Send Money Modal */}
      <SendMoneyModal
        isOpen={showSendModal}
        onClose={handleCloseSendModal}
        selectedUser={selectedUser}
        onSendMoney={handleSendMoney}
        balance={balance}
      />
    </div>
  );
};

export default DashboardPage;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, RefreshCw, TrendingUp, ArrowUpRight } from 'lucide-react';

const BalanceCard = ({ balance, refreshing, onRefresh }) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatBalance = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-blue-100 mb-1">
              Wallet Balance
            </h2>
            <div className="flex items-center space-x-3">
              <span className="text-3xl md:text-4xl font-bold">
                {showBalance ? formatBalance(balance) : '₹••••••'}
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <motion.button
            onClick={onRefresh}
            disabled={refreshing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <RefreshCw className={`w-6 h-6 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">Refresh</span>
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-sm text-blue-100">This Month</span>
            </div>
            <div className="text-xl font-semibold">+₹32,100</div>
            <div className="text-xs text-green-300">+12% from last month</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <ArrowUpRight className="w-4 h-4 text-orange-300" />
              <span className="text-sm text-blue-100">Spent</span>
            </div>
            <div className="text-xl font-semibold">₹18,450</div>
            <div className="text-xs text-orange-300">+8% from last month</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 text-center">
          <p className="text-blue-100 text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;
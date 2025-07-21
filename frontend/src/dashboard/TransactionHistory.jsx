import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  Zap,
  CreditCard,
  Tv,
  Filter,
  Calendar,
  Search
} from 'lucide-react';

const TransactionHistory = ({ transactions, loading }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getTransactionIcon = (type) => {
    switch ((type || '').toLowerCase()) {
      case 'mobile recharge':
      case 'dth recharge':
        return Smartphone;
      case 'electricity bill':
        return Zap;
      case 'upi transfer':
      case 'money sent':
      case 'money received':
        return CreditCard;
      default:
        return CreditCard;
    }
  };


  //   const filteredTransactions = transactions.filter(transaction => {
  //   const matchesFilter =
  //     filter === 'all' ||
  //     (filter === 'sent' && transaction.amount < 0) ||
  //     (filter === 'received' && transaction.amount > 0) ||
  //     (filter === 'bills' &&
  //       (transaction.type?.includes('Bill') || transaction.type?.includes('Recharge')));

  //   const matchesSearch =
  //     (transaction.recipient?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
  //     (transaction.type?.toLowerCase() || '').includes(searchTerm.toLowerCase());

  //   return matchesFilter && matchesSearch;


  // });\
  const isFirstTransaction = transactions.length === 1;
  const firstTransaction = transactions[transactions.length - 1];
  const restTransactions = transactions.slice(0, -1);

  const filteredRest = restTransactions.filter(transaction => {
    if (!transaction || typeof transaction !== 'object') return false;

    const matchesFilter =
      filter === 'all' ||
      (filter === 'sent' && transaction.amount < 0) ||
      (filter === 'received' && transaction.amount > 0) ||
      (filter === 'bills' &&
        (transaction.type?.toLowerCase().includes('bill') || transaction.type?.toLowerCase().includes('recharge')));

    const matchesSearch =
      (transaction.recipient?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (transaction.type?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const filteredTransactions = isFirstTransaction
    ? transactions
    : [firstTransaction, ...filteredRest];




  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'sent', label: 'Sent' },
    { value: 'received', label: 'Received' },
    { value: 'bills', label: 'Bills & Recharge' }
  ];

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

// console.log("hello",transactions)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Transaction History
        </h2>

        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search transactions..."
              className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-white"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => {
            if (!transaction) return null;
            const Icon = getTransactionIcon(transaction.type || '');
            const isPositive = transaction.amount > 0;

            return (
              <motion.div
                key={transaction._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPositive
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : 'bg-red-100 dark:bg-red-900/20'
                    } group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${isPositive
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                      }`} />
                  </div>

                  {/* Transaction Details */}
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {transaction.type}

                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {transaction.userId?.firstname ??"unknown user"} • {transaction.time}
                    </p>
                    {transaction.note && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        "{transaction.note}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Amount */}
                  <div className="text-right">
                    <p className={`font-semibold ${isPositive
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                      }`}>
                      {isPositive ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <p className={`text-xs ${transaction.status === 'completed'
                      ? 'text-green-600 dark:text-green-400'
                      : transaction.status === 'pending'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                      }`}>
                      {transaction.status}
                    </p>
                  </div>

                  {/* Direction Arrow */}
                  <div className={`p-2 rounded-full ${isPositive
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : 'bg-red-100 dark:bg-red-900/20'
                    } group-hover:scale-110 transition-transform`}>
                    {isPositive ? (
                      <ArrowDownLeft className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No transactions found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {searchTerm ? `No results for "${searchTerm}"` : 'No transactions match the selected filter'}
            </p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredTransactions.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all font-medium"
        >
          Load More Transactions
        </motion.button>
      )}
    </motion.div>
  );
};

export default TransactionHistory;
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

const transactions = [
  { id: 1, type: 'received', amount: 500, from: 'John Doe', date: '2023-04-15' },
  { id: 2, type: 'sent', amount: 200, to: 'Jane Smith', date: '2023-04-14' },
  { id: 3, type: 'received', amount: 1000, from: 'Bob Johnson', date: '2023-04-13' },
  { id: 4, type: 'sent', amount: 50, to: 'Alice Brown', date: '2023-04-12' },
];

function TransactionHistory() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
              {transaction.type === 'received' ? (
                <ArrowDownIcon className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <ArrowUpIcon className="h-5 w-5 text-red-500 mr-2" />
              )}
              <div>
                <p className="font-medium">
                  {transaction.type === 'received' ? transaction.from : transaction.to}
                </p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <p className={`font-semibold ${
              transaction.type === 'received' ? 'text-green-500' : 'text-red-500'
            }`}>
              {transaction.type === 'received' ? '+' : '-'}₹{transaction.amount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;


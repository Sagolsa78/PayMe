import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Phone, X } from 'lucide-react';

const UserSearch = ({ onUserSelect, searchUsers }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const searchWithDelay = async () => {
      if (query.trim().length < 2) {
        setUsers([]);
        setShowResults(false);
        return;
      }

      setLoading(true);
      try {
        const results = await searchUsers(query);
        setUsers(results);
        setShowResults(true);
        console.log(users)
      } catch (error) {
        console.error('Search error:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchWithDelay, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, searchUsers]);

  const handleUserSelect = (user) => {
    onUserSelect(user);
    setQuery('');
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery('');
    setUsers([]);
    setShowResults(false);
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users by name..."
          className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-80 overflow-y-auto"
          >
            {loading ? (
              <div className="p-4 text-center">
                <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Searching...</p>
              </div>
            ) : users.length > 0 ? (
              <div className="py-2">
                {users.map((user) => (
                  <motion.button
                    key={user._id}
                    onClick={() => handleUserSelect(user)}
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {user.firstname ? user.firstname[0].toUpperCase() : user.lastname[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {user.firstname +" "+ user.lastname}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {user.username}
                      </p>
                    </div>
                    <User className="w-5 h-5 text-gray-400" />
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center">
                <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  No users found for "{query}"
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserSearch;
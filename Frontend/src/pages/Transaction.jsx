// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ArrowUpRight,
//   ArrowDownRight,
//   Search,
//   Filter,
//   Plus,
//   ChevronRight
// } from 'lucide-react';
// import { fetchTransactions } from '../store/slices/financialSlice';
// import TransactionForm from '../components/TransactionForm';

// const Transaction = () => {
// //   const dispatch = useDispatch();
// //   const transactions = useSelector(state => state.financial.transactions);
// //   const loading = useSelector(state => state.financial.loading);
  
//   const [showForm, setShowForm] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
  
// //   useEffect(() => {
// //     dispatch(fetchTransactions());
// //   }, [dispatch]);
  
//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory === 'All' || transaction.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });
  
//   const categories = ['All', ...new Set(transactions.map(t => t.category))];
  
//   return (
//     <>
//       <div className="glass-card p-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//           <div>
//             <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
//               Recent Transactions
//             </h2>
//             <p className="text-sm text-secondary-500 dark:text-secondary-400">
//               Track your income and expenses
//             </p>
//           </div>
          
//           <button
//             onClick={() => setShowForm(true)}
//             className="button-primary flex items-center gap-2 self-start"
//           >
//             <Plus size={18} />
//             <span>Add Transaction</span>
//           </button>
//         </div>
        
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="relative flex-grow">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search transactions..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="input-field pl-10"
//             />
//           </div>
          
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="input-field md:w-48"
//           >
//             {categories.map(category => (
//               <option key={category} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>
        
//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
//           </div>
//         ) : filteredTransactions.length > 0 ? (
//           <div className="space-y-4">
//             {filteredTransactions.map((transaction) => (
//               <motion.div
//                 key={transaction.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-secondary-800 hover:bg-gray-50 dark:hover:bg-secondary-800/50"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className={`p-2 rounded-full ${
//                     transaction.amount > 0
//                       ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400'
//                       : 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400'
//                   }`}>
//                     {transaction.amount > 0 ? (
//                       <ArrowUpRight size={20} />
//                     ) : (
//                       <ArrowDownRight size={20} />
//                     )}
//                   </div>
                  
//                   <div>
//                     <h3 className="font-medium text-secondary-900 dark:text-white">
//                       {transaction.description}
//                     </h3>
//                     <div className="flex items-center gap-2 text-sm">
//                       <span className="text-secondary-500 dark:text-secondary-400">
//                         {new Date(transaction.date).toLocaleDateString()}
//                       </span>
//                       <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300">
//                         {transaction.category}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="text-right">
//                   <p className={`text-lg font-medium ${
//                     transaction.amount > 0
//                       ? 'text-success-600 dark:text-success-400'
//                       : 'text-error-600 dark:text-error-400'
//                   }`}>
//                     {transaction.amount > 0 ? '+' : ''}
//                     ${Math.abs(transaction.amount).toFixed(2)}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-secondary-500 dark:text-secondary-400">
//               No transactions found
//             </p>
//           </div>
//         )}
//       </div>
      
//       <AnimatePresence>
//         {showForm && (
//           <TransactionForm onClose={() => setShowForm(false)} />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Transaction;
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Plus,
  ArrowDownLeft,
} from 'lucide-react';
import TransactionForm from '../components/TransactionForm';
import { i } from 'framer-motion/m';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toggle, setToggle] = useState(false);

  const id = localStorage.getItem('id');
  // Fetch transactions directly from API
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL_3}/api/v1/transaction/user/${id}`)
        console.log(res.data);
        setTransactions(res.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [toggle]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch =
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || transaction.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(transactions.map(t => t.category))];

  return (
    <>
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              Recent Transactions
            </h2>
            <p className="text-sm text-secondary-500 dark:text-secondary-400">
              Track your income and expenses
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="button-primary flex items-center gap-2 self-start"
          >
            <Plus size={18} />
            <span>Add Transaction</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field md:w-48"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredTransactions.length > 0 ? (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-secondary-800 hover:bg-gray-50 dark:hover:bg-secondary-800/50"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === "CREDIT"
                      ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400'
                      : 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400'
                  }`}>
                    {transaction.type==="DEBIT"? (
                      <ArrowUpRight size={20} />
                    ) : (
                      <ArrowDownLeft size={20} />
                    )}
                  </div>

                  <div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-secondary-500 dark:text-secondary-400">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300">
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-lg font-medium ${
                    transaction.type === "CREDIT"
                      ? 'text-success-600 dark:text-success-400'
                      : 'text-error-600 dark:text-error-400'
                  }`}>
                    {transaction.type === "DEBIT" ? '-' : ''}
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary-500 dark:text-secondary-400">
              No transactions found
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <TransactionForm onClose={() => setShowForm(false)} toggle={toggle} setToggle={setToggle}/>
        )}
      </AnimatePresence>
    </>
  );
};

export default Transaction;

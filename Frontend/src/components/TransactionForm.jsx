// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { motion } from 'framer-motion';
// import { X, Plus, DollarSign } from 'lucide-react';
// // import { addTransaction } from '../store/slices/financialSlice';
// // import { transactionCategories } from '../store/slices/financialSlice';

// const TransactionForm = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     type: 'DEBIT',
//     amount: '',
//     category: '',
//     description: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       const amount = formData.type === 'DEBIT' 
//         ? -Math.abs(parseFloat(formData.amount))
//         : Math.abs(parseFloat(formData.amount));
        
//     //   await dispatch(addTransaction({
//     //     ...formData,
//     //     amount
//     //   })).unwrap();
      
//       onClose();
//     } catch (error) {
//       console.error('Failed to add transaction:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 20 }}
//       className="fixed inset-0 z-50 flex items-center justify-center px-4"
//     >
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
//       <div className="relative w-full max-w-md glass-card p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
//             Add Transaction
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-800"
//           >
//             <X size={20} className="text-secondary-500 dark:text-secondary-400" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
//               Transaction Type
//             </label>
//             <div className="grid grid-cols-2 gap-2">
//               <label className="relative flex items-center justify-center">
//                 <input
//                   type="radio"
//                   name="type"
//                   value="DEBIT"
//                   checked={formData.type === 'DEBIT'}
//                   onChange={handleChange}
//                   className="sr-only"
//                 />
//                 <div className={`w-full py-2 px-4 text-sm font-medium rounded-lg text-center cursor-pointer transition-colors ${
//                   formData.type === 'DEBIT'
//                     ? 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400'
//                     : 'bg-gray-100 text-secondary-700 hover:bg-gray-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
//                 }`}>
//                   DEBIT
//                 </div>
//               </label>
//               <label className="relative flex items-center justify-center">
//                 <input
//                   type="radio"
//                   name="type"
//                   value="CREDIT"
//                   checked={formData.type === 'CREDIT'}
//                   onChange={handleChange}
//                   className="sr-only"
//                 />
//                 <div className={`w-full py-2 px-4 text-sm font-medium rounded-lg text-center cursor-pointer transition-colors ${
//                   formData.type === 'CREDIT'
//                     ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400'
//                     : 'bg-gray-100 text-secondary-700 hover:bg-gray-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
//                 }`}>
//                   CREDIT
//                 </div>
//               </label>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="amount" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
//               Amount
//             </label>
//             <div className="relative">
//               <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500" size={18} />
//               <input
//                 type="number"
//                 id="amount"
//                 name="amount"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 placeholder="0.00"
//                 step="0.01"
//                 min="0"
//                 required
//                 className="input-field pl-10"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="category" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
//               Category
//             </label>
//             <select
//               id="category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               className="input-field"
//             >
//               <option value="">Select category</option>
//               {transactionCategories[formData.type].map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
//               Description
//             </label>
//             <input
//               type="text"
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter description"
//               required
//               className="input-field"
//             />
//           </div>

//           <div className="pt-4">
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="button-primary w-full flex items-center justify-center gap-2"
//             >
//               {isLoading ? (
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               ) : (
//                 <>
//                   <Plus size={20} />
//                   <span>Add Transaction</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default TransactionForm;
import axios from 'axios';

import React, { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, DollarSign } from 'lucide-react';
import { parse } from 'postcss';

const transactionCategories = {
  CREDIT: ['Salary', 'Freelance', 'Other'],
  DEBIT: ['Groceries', 'Rent', 'Utilities', 'Investment','Entertainment', 'Other'],
};

const TransactionForm = ({ onClose , toggle,setToggle}) => {
  const [formData, setFormData] = useState({
    type: 'DEBIT',
    amount: '',
    category: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const id = localStorage.getItem('id');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const amount = parseFloat(formData.amount);

      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL_3}/api/v1/transaction`,{
          userId : id,
          ...formData,
          amount
        
      });

      console.log('Transaction added successfully:', response);
      console.log(response.data);
      setToggle(!toggle);
      if (response.status !== 200) {
        throw new Error('Failed to add transaction in response');
      }

      onClose();
    } catch (error) {
      console.error('Failed to add transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-md glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-800"
          >
            <X size={20} className="text-secondary-500 dark:text-secondary-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="type"
                  value="DEBIT"
                  checked={formData.type === 'DEBIT'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-full py-2 px-4 text-sm font-medium rounded-lg text-center cursor-pointer transition-colors ${
                  formData.type === 'DEBIT'
                    ? 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400'
                    : 'bg-gray-100 text-secondary-700 hover:bg-gray-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
                }`}>
                  DEBIT
                </div>
              </label>
              <label className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="type"
                  value="CREDIT"
                  checked={formData.type === 'CREDIT'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-full py-2 px-4 text-sm font-medium rounded-lg text-center cursor-pointer transition-colors ${
                  formData.type === 'CREDIT'
                    ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400'
                    : 'bg-gray-100 text-secondary-700 hover:bg-gray-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
                }`}>
                  CREDIT
                </div>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500" size={18} />
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select category</option>
              {transactionCategories[formData.type].map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

        

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="button-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <Plus size={20} />
                  <span>Add Transaction</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default TransactionForm;

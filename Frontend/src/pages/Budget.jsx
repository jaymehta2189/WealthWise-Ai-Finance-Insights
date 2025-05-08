// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";
// import {
//   Plus,
//   DollarSign,
//   Wallet,
//   TrendingDown,
//   ArrowUpRight,
//   ArrowDownRight,
//   MoreHorizontal,
//   Calendar,
//   Tag,
//   ChevronRight,
//   Filter,
//   Sliders,
//   Search,
// } from "lucide-react";

// const containerVariant = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariant = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 260,
//       damping: 20,
//     },
//   },
// };

// // Sample data
// const monthlyBudget = [
//   { category: "Housing", budget: 2000, spent: 1950, color: "#3379ff" },
//   { category: "Food", budget: 600, spent: 580, color: "#db8722" },
//   { category: "Transport", budget: 400, spent: 385, color: "#1db678" },
//   { category: "Entertainment", budget: 300, spent: 290, color: "#f99707" },
//   { category: "Shopping", budget: 400, spent: 420, color: "#f83b4c" },
//   { category: "Healthcare", budget: 200, spent: 150, color: "#86a5c2" },
// ];

// const recentTransactions = [
//   {
//     id: 1,
//     description: "Grocery Shopping",
//     amount: -156.32,
//     category: "Food",
//     date: "2025-06-15",
//   },
//   {
//     id: 2,
//     description: "Monthly Rent",
//     amount: -1950.0,
//     category: "Housing",
//     date: "2025-06-01",
//   },
//   {
//     id: 3,
//     description: "Gas Station",
//     amount: -45.67,
//     category: "Transport",
//     date: "2025-06-14",
//   },
//   {
//     id: 4,
//     description: "Netflix Subscription",
//     amount: -15.99,
//     category: "Entertainment",
//     date: "2025-06-10",
//   },
//   {
//     id: 5,
//     description: "Online Shopping",
//     amount: -89.99,
//     category: "Shopping",
//     date: "2025-06-13",
//   },
// ];

// const Budget = () => {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showBudgetForm, setShowBudgetForm] = useState(false);

//   const totalBudget = monthlyBudget.reduce((sum, item) => sum + item.budget, 0);
//   const totalSpent = monthlyBudget.reduce((sum, item) => sum + item.spent, 0);
//   const remainingBudget = totalBudget - totalSpent;

//   return (
//     <motion.div
//       variants={containerVariant}
//       initial="hidden"
//       animate="visible"
//       className="space-y-6"
//     >
//       {/* Page Header */}
//       <motion.div
//         variants={itemVariant}
//         className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//       >
//         <div>
//           <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
//             Budget Planner
//           </h1>
//           <p className="text-secondary-500 dark:text-secondary-400">
//             Track and manage your monthly expenses
//           </p>
//         </div>
//         <button
//           className="button-primary flex items-center gap-2"
//           onClick={() => setShowBudgetForm(true)}
//         >
//           <Plus size={20} />
//           <span>Add New Budget</span>
//         </button>
//       </motion.div>

//       {/* Budget Overview Cards */}
//       <motion.div
//         variants={itemVariant}
//         className="grid grid-cols-1 md:grid-cols-3 gap-4"
//       >
//         {showBudgetForm && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white dark:bg-secondary-900 p-6 rounded-lg w-full max-w-md shadow-lg">
//               <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
//                 Add New Budget
//               </h2>
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   // Handle submission logic
//                   setShowBudgetForm(false);
//                 }}
//               >
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
//                     Category
//                   </label>
//                   <input
//                     type="text"
//                     className="input-field w-full"
//                     placeholder="e.g. Education"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
//                     Budget Amount
//                   </label>
//                   <input
//                     type="number"
//                     className="input-field w-full"
//                     placeholder="e.g. 500"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
//                     Start Date
//                   </label>
//                   <input type="date" className="input-field w-full" required />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
//                     End Date
//                   </label>
//                   <input type="date" className="input-field w-full" required />
//                 </div>

//                 <div className="flex justify-end gap-2">
//                   <button
//                     type="button"
//                     className="button-secondary"
//                     onClick={() => setShowBudgetForm(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="button-primary">
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <div className="glass-card p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-2 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
//               <Wallet size={24} />
//             </div>
//             <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
//               Monthly Budget
//             </span>
//           </div>
//           <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
//           ₹{totalBudget.toLocaleString()}
//           </h3>
//           <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
//             Total budget for this month
//           </p>
//         </div>

//         <div className="glass-card p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-2 rounded-full bg-warning-50 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400">
//               <TrendingDown size={24} />
//             </div>
//             <span className="text-xs font-medium px-2 py-1 rounded-full bg-warning-50 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400">
//               Spent
//             </span>
//           </div>
//           <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
//           ₹{totalSpent.toLocaleString()}
//           </h3>
//           <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
//             Total spent this month
//           </p>
//         </div>

//         <div className="glass-card p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-2 rounded-full bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400">
//               <DollarSign size={24} />
//             </div>
//             <span className="text-xs font-medium px-2 py-1 rounded-full bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400">
//               Remaining
//             </span>
//           </div>
//           <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
//           ₹{remainingBudget.toLocaleString()}
//           </h3>
//           <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
//             Left to spend this month
//           </p>
//         </div>
//       </motion.div>

//       {/* Budget Distribution */}
//       <motion.div
//         variants={itemVariant}
//         className="grid grid-cols-1 lg:grid-cols-3 gap-6"
//       >
//         <div className="glass-card p-6 lg:col-span-2">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
//               Budget Distribution
//             </h2>
//             <select className="text-sm border border-gray-200 rounded-md px-2 py-1 dark:bg-secondary-800 dark:border-secondary-700">
//               <option>This Month</option>
//               <option>Last Month</option>
//               <option>Last 3 Months</option>
//             </select>
//           </div>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={monthlyBudget}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="category" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="budget" name="Budget" fill="#3379ff" />
//                 <Bar dataKey="spent" name="Spent" fill="#86a5c2" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="glass-card p-6">
//           <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">
//             Spending by Category
//           </h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={monthlyBudget}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={80}
//                   paddingAngle={2}
//                   dataKey="spent"
//                 >
//                   {monthlyBudget.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="grid grid-cols-2 gap-2 mt-4">
//             {monthlyBudget.map((category, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <div
//                   className="w-3 h-3 rounded-full"
//                   style={{ backgroundColor: category.color }}
//                 />
//                 <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">
//                   {category.category}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </motion.div>

//       {/* Recent Transactions */}
//       <motion.div variants={itemVariant} className="glass-card p-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//           <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
//             Recent Transactions
//           </h2>
//           <div className="flex gap-2">
//             <div className="relative flex-grow md:w-64">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search transactions..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="input-field pl-10"
//               />
//             </div>
//             <button className="button-secondary flex items-center gap-2">
//               <Filter size={18} />
//               <span className="hidden sm:inline">Filter</span>
//             </button>
//             <button className="button-secondary flex items-center gap-2">
//               <Sliders size={18} />
//               <span className="hidden sm:inline">Sort</span>
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-100 dark:border-secondary-800">
//                 <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
//                   Description
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
//                   Category
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
//                   Date
//                 </th>
//                 <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
//                   Amount
//                 </th>
//                 <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentTransactions.map((transaction) => (
//                 <tr
//                   key={transaction.id}
//                   className="border-b border-gray-100 dark:border-secondary-800 hover:bg-gray-50 dark:hover:bg-secondary-800/50"
//                 >
//                   <td className="py-3 px-4">
//                     <span className="font-medium text-secondary-900 dark:text-white">
//                       {transaction.description}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
//                       {transaction.category}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <span className="text-secondary-500 dark:text-secondary-400">
//                       {new Date(transaction.date).toLocaleDateString()}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-right">
//                     <span
//                       className={`font-medium ${
//                         transaction.amount < 0
//                           ? "text-error-600 dark:text-error-400"
//                           : "text-success-600 dark:text-success-400"
//                       }`}
//                     >
//                       ₹{Math.abs(transaction.amount).toFixed(2)}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-right">
//                     <button className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300">
//                       <MoreHorizontal size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Budget;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';
// import { Bar, Doughnut } from 'react-chartjs-2';
// import DatePicker from 'react-datepicker';
// import { Wallet, ArrowDownLeft, DollarSign, Plus, BarChart, X } from 'lucide-react';
// import 'react-datepicker/dist/react-datepicker.css';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_4;
// const USER_ID = localStorage.getItem('id');

// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//   }).format(amount);
// };

// const formatDateForApi = (date) => {
//   if (!date) return null;
//   return `${date.toISOString().split('T')[0]}T00:00:00`;
// };

// const createBudget = async (budgetData) => {
//   try {
//     console.log('Creating budget...', budgetData);
//     const response = await axios.post(`${import.meta.env.VITE_APP_API_URL_4}/api/v1/budget`, budgetData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating budget:', error);
//     throw error;
//   }
// };

// const getBudgetSummary = async () => {
//   try {
//     console.log('Fetching budget summary...', USER_ID);
//     const response = await axios.get(`${import.meta.env.VITE_APP_API_URL_4}/api/v1/budget/${USER_ID}/summary`);
//     console.log('Budget Summary:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching budget summary:', error);
//     throw error;
//   }
// };

// const BudgetSummaryCard = ({ icon, title, amount, subtitle, textColor }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <div className={textColor}>{icon}</div>
//         <div className="text-sm text-gray-500">{title}</div>
//       </div>
//       <div className={`text-3xl font-bold ${textColor} mb-1`}>
//         {formatCurrency(amount)}
//       </div>
//       <div className="text-sm text-gray-500">{subtitle}</div>
//     </div>
//   );
// };

// const BudgetDistributionChart = ({ budgetSummary }) => {
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           display: true,
//           color: '#edf2f7',
//           drawBorder: false,
//         },
//         ticks: {
//           color: '#718096',
//         },
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           color: '#718096',
//         },
//       },
//     },
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         backgroundColor: 'white',
//         titleColor: '#4a5568',
//         bodyColor: '#4a5568',
//         borderColor: '#e2e8f0',
//         borderWidth: 1,
//         padding: 12,
//         displayColors: false,
//         callbacks: {
//           label: function (context) {
//             let label = context.dataset.label || '';
//             if (label) label += ': ';
//             if (context.parsed.y !== null) {
//               label += formatCurrency(context.parsed.y);
//             }
//             return label;
//           },
//         },
//       },
//     },
//     barPercentage: 0.6,
//     categoryPercentage: 0.7,
//   };

//   const labels = budgetSummary.map(item => item.category);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Budget',
//         data: budgetSummary.map(item => item.decidedBudget || 0),
//         backgroundColor: '#3b82f6',
//         borderRadius: 4,
//       },
//       {
//         label: 'Spent',
//         data: budgetSummary.map(item => item.totalSpends || 0),
//         backgroundColor: '#93c5fd',
//         borderRadius: 4,
//       },
//     ],
//   };

//   return (
//     <div className="h-64">
//       <Bar options={options} data={data} />
//     </div>
//   );
// };

// const SpendingByCategory = ({ budgetSummary }) => {
//   const categoryColors = ['#3b82f6', '#f97316', '#10b981', '#f43f5e', '#8b5cf6', '#94a3b8'];
//   const categories = budgetSummary.map(item => item.category);
//   const spendingData = budgetSummary.map(item => item.totalSpends || 0);
//   const backgroundColors = categories.map((_, index) => categoryColors[index % categoryColors.length]);

//   const data = {
//     labels: categories,
//     datasets: [
//       {
//         data: spendingData,
//         backgroundColor: backgroundColors,
//         borderWidth: 0,
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const options = {
//     cutout: '70%',
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         backgroundColor: 'white',
//         titleColor: '#4a5568',
//         bodyColor: '#4a5568',
//         borderColor: '#e2e8f0',
//         borderWidth: 1,
//         padding: 12,
//         displayColors: true,
//         callbacks: {
//           label: function (context) {
//             const label = context.label || '';
//             const value = context.raw;
//             const total = context.dataset.data.reduce((a, b) => a + b, 0);
//             const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
//             return `${label}: ${formatCurrency(value)} (${percentage}%)`;
//           },
//         },
//       },
//     },
//     maintainAspectRatio: false,
//   };

//   const legends = categories.map((category, index) => (
//     <div key={category + index} className="flex items-center text-sm mb-2">
//       <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: backgroundColors[index] }}></div>
//       <span>{category}</span>
//     </div>
//   ));

//   return (
//     <div className="flex flex-col h-full">
//       <div className="h-48 relative">
//         <Doughnut data={data} options={options} />
//       </div>
//       <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">{legends}</div>
//     </div>
//   );
// };

// const AddBudgetModal = ({ isOpen, onClose, onBudgetAdded }) => {
//   const [category, setCategory] = useState('');
//   const [amount, setAmount] = useState('');
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const userId = localStorage.getItem('id');

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!category || !amount || !startDate || !endDate) {
//       alert('Please fill all fields');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const budgetData = {
//         userId,
//         startMonth: formatDateForApi(startDate),
//         endMonth: formatDateForApi(endDate),
//         categoryLimits: {
//           [category]: parseFloat(amount),
//         },
//       };

//       await createBudget(budgetData);
//       setCategory('');
//       setAmount('');
//       setStartDate(null);
//       setEndDate(null);
//       onBudgetAdded();
//       onClose();
//     } catch (error) {
//       console.error('Error creating budget:', error);
//       alert('Failed to create budget. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-800">Add New Budget</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
//             <X size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="category" className="block text-gray-700 mb-2">Category</label>
//             <input
//               type="text"
//               id="category"
//               placeholder="e.g. Education"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="amount" className="block text-gray-700 mb-2">Budget Amount</label>
//             <input
//               type="number"
//               id="amount"
//               placeholder="e.g. 500"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="startDate" className="block text-gray-700 mb-2">Start Date</label>
//             <DatePicker
//               selected={startDate || null}
//               onChange={(date) => setStartDate(date)}
//               dateFormat="MM/dd/yyyy"
//               placeholderText="Select start date"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="endDate" className="block text-gray-700 mb-2">End Date</label>
//             <DatePicker
//               selected={endDate || null}
//               onChange={(date) => setEndDate(date)}
//               dateFormat="MM/dd/yyyy"
//               placeholderText="Select end date"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors duration-200"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
//             >
//               {isSubmitting ? 'Saving...' : 'Save'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const Budget = () => {
//   const [budgetSummary, setBudgetSummary] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const totalBudget = Array.isArray(budgetSummary)
//     ? budgetSummary.reduce((sum, item) => sum + (item.decidedBudget || 0), 0)
//     : 0;

//   const totalSpent = Array.isArray(budgetSummary)
//     ? budgetSummary.reduce((sum, item) => sum + (item.totalSpends || 0), 0)
//     : 0;

//   const remaining = totalBudget - totalSpent;

//   const fetchBudgetData = async () => {
//     setLoading(true);
//     try {
//       const data = await getBudgetSummary();
//       console.log('Budget Summary:', data);
//       setBudgetSummary(data);
//     } catch (err) {
//       setError('Failed to load budget data. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBudgetData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Budget Planner</h1>
//             <p className="text-gray-600">Track and manage your monthly expenses</p>
//           </div>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
//           >
//             <Plus size={18} className="mr-2" />
//             Add New Budget
//           </button>
//         </div>

//         {/* {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 relative">
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )} */}

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <BudgetSummaryCard icon={<Wallet size={24} />} title="Monthly Budget" amount={totalBudget} subtitle="Total budget for this month" textColor="text-blue-600" />
//           <BudgetSummaryCard icon={<ArrowDownLeft size={24} />} title="Spent" amount={totalSpent} subtitle="Total spent this month" textColor="text-orange-500" />
//           <BudgetSummaryCard icon={<DollarSign size={24} />} title="Remaining" amount={remaining} subtitle="Left to spend this month" textColor="text-green-600" />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
//           <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-lg font-semibold text-gray-800">Budget Distribution</h2>
//               <div className="relative">
               

//               </div>
//             </div>

//             {loading ? (
//               <div className="h-64 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//               </div>
//             ) : budgetSummary.length > 0 ? (
//               <BudgetDistributionChart budgetSummary={budgetSummary} />
//             ) : (
//               <div className="h-64 flex flex-col items-center justify-center text-gray-500">
//                 <BarChart size={48} className="mb-4 opacity-30" />
//                 <p>No budget data available</p>
//                 <button onClick={() => setIsModalOpen(true)} className="mt-4 text-blue-500 hover:text-blue-700">Add your first budget</button>
//               </div>
//             )}
//           </div>

//           {/* <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-800 mb-6">Spending by Category</h2>
//             {loading ? (
//               <div className="h-64 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//               </div>
//             ) : budgetSummary.length > 0 ? (
//               <SpendingByCategory budgetSummary={budgetSummary} />
//             ) : (
//               <div className="h-64 flex flex-col items-center justify-center text-gray-500">
//                 <DollarSign size={48} className="mb-4 opacity-30" />
//                 <p>No spending data available</p>
//               </div>
//             )}
//           </div> */}
//         </div>
//       </div>

//       <AddBudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBudgetAdded={fetchBudgetData} />
//     </div>
//   );
// };

// export default Budget;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import { Wallet, ArrowDownLeft, DollarSign, Plus, BarChart, X, Trash2 } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// API functions
const createBudget = async (budgetData) => {
  try {
    console.log('Creating budget...', budgetData);
    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL_4}/api/v1/budget`, budgetData);
    return response.data;
  } catch (error) {
    console.error('Error creating budget:', error);
    throw error;
  }
};

const getBudgetSummary = async () => {
  const userId = localStorage.getItem('id') || 'u1';
  try {
    console.log('Fetching budget summary...', userId);
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL_4}/api/v1/budget/${userId}/summary`);
    console.log('Budget Summary:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching budget summary:', error);
    throw error;
  }
};

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDateForApi = (date) => {
  if (!date) return null;
  return `${date.toISOString().split('T')[0]}T00:00:00`;
};

// Components
const BudgetSummaryCard = ({ icon, title, amount, subtitle, textColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className={textColor}>{icon}</div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
      <div className={`text-3xl font-bold ${textColor} mb-1`}>
        {formatCurrency(amount)}
      </div>
      <div className="text-sm text-gray-500">{subtitle}</div>
    </div>
  );
};

const BudgetDistributionChart = ({ budgetSummary }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#edf2f7',
          drawBorder: false,
        },
        ticks: {
          color: '#718096',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#718096',
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#4a5568',
        bodyColor: '#4a5568',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    barPercentage: 0.6,
    categoryPercentage: 0.7,
  };

  const labels = budgetSummary.map(item => item.category);

  const data = {
    labels,
    datasets: [
      {
        label: 'Budget',
        data: budgetSummary.map(item => item.decidedBudget || 0),
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
      {
        label: 'Spent',
        data: budgetSummary.map(item => item.totalSpends || 0),
        backgroundColor: '#93c5fd',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="h-64">
      <Bar options={options} data={data} />
    </div>
  );
};

const AddBudgetModal = ({ isOpen, onClose, onBudgetAdded }) => {
  const [categoryItems, setCategoryItems] = useState([
    { name: '', amount: '' }
  ]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddCategory = () => {
    setCategoryItems([...categoryItems, { name: '', amount: '' }]);
  };

  const handleRemoveCategory = (index) => {
    if (categoryItems.length === 1) return;
    const newItems = [...categoryItems];
    newItems.splice(index, 1);
    setCategoryItems(newItems);
  };

  const handleCategoryChange = (index, field, value) => {
    const newItems = [...categoryItems];
    newItems[index][field] = value;
    setCategoryItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert('Please select start and end dates');
      return;
    }

    const invalidEntry = categoryItems.some(item => !item.name || !item.amount);
    if (invalidEntry) {
      alert('Please fill in all category names and amounts');
      return;
    }

    setIsSubmitting(true);

    try {
      const categoryLimits = {};
      categoryItems.forEach(item => {
        categoryLimits[item.name] = parseFloat(item.amount);
      });

      const userId = localStorage.getItem('id') || 'u1';
      const budgetData = {
        userId,
        startMonth: formatDateForApi(startDate),
        endMonth: formatDateForApi(endDate),
        categoryLimits
      };

      await createBudget(budgetData);
      
      setCategoryItems([{ name: '', amount: '' }]);
      setStartDate(null);
      setEndDate(null);
      
      onBudgetAdded();
      onClose();
    } catch (error) {
      console.error('Error creating budget:', error);
      alert('Failed to create budget. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Budget</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 mb-2">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select start date"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="endDate" className="block text-gray-700 mb-2">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select end date"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700">Budget Categories</label>
              <button
                type="button"
                onClick={handleAddCategory}
                className="text-blue-500 hover:text-blue-700 flex items-center text-sm"
              >
                <Plus size={16} className="mr-1" />
                Add Category
              </button>
            </div>

            {categoryItems.map((item, index) => (
              <div key={index} className="flex space-x-2 mb-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Category name"
                    value={item.name}
                    onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={item.amount}
                    onChange={(e) => handleCategoryChange(index, 'amount', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {categoryItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(index)}
                    className="p-3 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
            >
              {isSubmitting ? 'Saving...' : 'Save Budget'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Budget() {
  const [budgetSummary, setBudgetSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalBudget = Array.isArray(budgetSummary)
    ? budgetSummary.reduce((sum, item) => sum + (item.decidedBudget || 0), 0)
    : 0;

  const totalSpent = Array.isArray(budgetSummary)
    ? budgetSummary.reduce((sum, item) => sum + (item.totalSpends || 0), 0)
    : 0;

  const remaining = totalBudget - totalSpent;

  const fetchBudgetData = async () => {
    setLoading(true);
    try {
      const data = await getBudgetSummary();
      setBudgetSummary(data);
    } catch (err) {
      setError('Failed to load budget data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Budget Planner</h1>
            <p className="text-gray-600">Track and manage your monthly expenses</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
          >
            <Plus size={18} className="mr-2" />
            Add New Budget
          </button>
        </div>

        {/* {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )} */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BudgetSummaryCard 
            icon={<Wallet size={24} />} 
            title="Monthly Budget" 
            amount={totalBudget} 
            subtitle="Total budget for this month" 
            textColor="text-blue-600" 
          />
          <BudgetSummaryCard 
            icon={<ArrowDownLeft size={24} />} 
            title="Spent" 
            amount={totalSpent} 
            subtitle="Total spent this month" 
            textColor="text-orange-500" 
          />
          <BudgetSummaryCard 
            icon={<DollarSign size={24} />} 
            title="Remaining" 
            amount={remaining} 
            subtitle="Left to spend this month" 
            textColor="text-green-600" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Budget Distribution</h2>
            </div>

            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : budgetSummary.length > 0 ? (
              <BudgetDistributionChart budgetSummary={budgetSummary} />
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-gray-500">
                <BarChart size={48} className="mb-4 opacity-30" />
                <p>No budget data available</p>
                <button onClick={() => setIsModalOpen(true)} className="mt-4 text-blue-500 hover:text-blue-700">Add your first budget</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddBudgetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onBudgetAdded={fetchBudgetData} 
      />
    </div>
  );
}

export default Budget;
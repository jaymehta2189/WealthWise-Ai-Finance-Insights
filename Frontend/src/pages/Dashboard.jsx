import React, { useEffect,useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  BarChart3,
  Banknote,
  TrendingUp,
  ChevronRight,
  AlertCircle,
  Check,
  ArrowDownLeft,
} from "lucide-react";
import axios from "axios";
import { s } from "framer-motion/m";
import { useNavigate } from "react-router-dom";
// Sample data
// const monthlySpending = [
//   { name: "Jan", amount: 3400 },
//   { name: "Feb", amount: 2900 },
//   { name: "Mar", amount: 3100 },
//   { name: "Apr", amount: 3500 },
//   { name: "May", amount: 2800 },
//   { name: "Jun", amount: 3200 },
//   { name: "Jul", amount: 3800 },
// ];

// const budgetCategories = [
//   { name: "Housing", value: 1500, color: "#3379ff" },
//   { name: "Food", value: 650, color: "#db8722" },
//   { name: "Transport", value: 350, color: "#1db678" },
//   { name: "Entertainment", value: 250, color: "#f99707" },
//   { name: "Others", value: 450, color: "#86a5c2" },
// ];

// const savingsGoals = [
//   { name: "Emergency", current: 5000, target: 10000 },
//   { name: "Vacation", current: 2500, target: 4000 },
//   { name: "Down Payment", current: 15000, target: 50000 },
// ];

const recentTransactions = [
  {
    id: 1,
    merchant: "Grocery Store",
    date: "2025-06-10",
    amount: -125.3,
    category: "Food",
  },
  {
    id: 2,
    merchant: "Amazon",
    date: "2025-06-08",
    amount: -84.75,
    category: "Shopping",
  },
  {
    id: 3,
    merchant: "Salary Deposit",
    date: "2025-06-01",
    amount: 3500.0,
    category: "Income",
  },
  {
    id: 4,
    merchant: "Gas Station",
    date: "2025-05-30",
    amount: -45.2,
    category: "Transport",
  },
  {
    id: 5,
    merchant: "Netflix",
    date: "2025-05-28",
    amount: -15.99,
    category: "Entertainment",
  },
];

// Animation variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const Dashboard = () => {
  // const creditScore = 745;
  // const creditScoreMax = 850;
  // const creditScorePercentage = (creditScore / creditScoreMax) * 100;
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  // console.log(currentMonth,"-",currentYear);
  const Month= currentMonth.toString().padStart(2, '0');
  const Year= currentYear.toString().padStart(4, '0');
  // console.log(`${Year}-${Month}`);

  const [monthlySpending, setMonthlySpending] = useState([{}]);
  const [budgetCategories, setBudgetCategories] = useState([{}]);
  const [recentTransactions, setRecentTransactions] = useState([{}]);
  const [investment, setInvestment] = useState({});
  const [monthlyExpenseChart, setMonthlyExpenseChart] = useState([{}]); 

  
  // Custom tooltip for charts


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [monthlySpendingRes, summaryRes, transactionsRes,investment] = await Promise.all([
          axios.get(`${import.meta.env.VITE_APP_API_URL_2}/api/v1/spending/${id}/all`),
          axios.get(`${import.meta.env.VITE_APP_API_URL_2}/api/v1/spending/${id}/summary/${Year}-${Month}`),
          axios.get(`${import.meta.env.VITE_APP_API_URL_3}/api/v1/transaction/user/${id}`),
          axios.get(`${import.meta.env.VITE_APP_API_URL_2}/api/v1/spending/${id}/investment`),
        ]);
  
        // Extract and set data
        setMonthlySpending(monthlySpendingRes.data);
        setBudgetCategories(
          Object.entries(summaryRes.data.byCategory).map(([name, value], index) => ({
            name,
            value: Math.abs(value), // if needed, to avoid negative values
            color: ["#3379ff", "#db8722", "#1db678", "#f99707", "#86a5c2"][index % 5],
          }))
        );
        console.log("investment",investment);  
        setRecentTransactions(transactionsRes.data);
        setInvestment(investment.data.value);

        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formattedMonthlySpending = monthlySpendingRes.data.map((item) => {
  const date = new Date(item.period); // e.g., "2025-05"
  const month = date.toLocaleString("en-US", { month: "short" }); // "May"
  return {
    name: month,
    amount: item.totalExpense,
  };
}).sort((a, b) => {
  return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
});
        
        setMonthlyExpenseChart(formattedMonthlySpending);

        console.log({
          monthlySpending: monthlySpendingRes.data,
          budgetCategories: summaryRes.data,
          recentTransactions: transactionsRes.data,
          investment: investment.data.value,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [id, Year, Month]); // Include Year and Month if they can change
  

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-secondary-800 p-2 rounded shadow-md border border-gray-100 dark:border-secondary-700">
          <p className="text-sm font-medium">{`${label}`}</p>
          <p className="text-sm text-primary-600 dark:text-primary-400">{`$${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Financial Dashboard
          </h1>
          <p className="text-secondary-500 dark:text-secondary-400">
          <span className="text-3xl ">👋</span> Welcome back, <span className="font-bold text-secondary-800 ">{localStorage.getItem('name')}</span> ! Here's your financial summary.
          </p>
        </div>
        {/* <button className="button-secondary flex items-center gap-2">
          <BarChart3 size={16} />
          <span>View Reports</span>
        </button> */}
      </div>

      {/* Quick Stats */}
      <motion.div
        variants={itemVariant}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <QuickStat
          title="Account Balance"
          value={`₹${monthlySpending[0].netSavings}`}
          isPositive={true}
          icon={<Wallet size={20} />}
          color="primary"
        />
        <QuickStat
          title="Monthly Spending"
          value={`₹${monthlySpending[0].totalExpense}`}
          change="-5.1%"
          isPositive={true}
          icon={<Banknote size={20} />}
          color="success"
        />
        {/* <QuickStat
          title="Credit Score"
          value={creditScore.toString()}
          change="+12 pts"
          isPositive={true}
          icon={<CreditCard size={20} />}
          color="accent"
        /> */}
        <QuickStat
          title="Investments"
          value={`₹${investment}`}
          change="+2.4%"
          isPositive={true}
          icon={<TrendingUp size={20} />}
          color="secondary"
        />
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Spending Trends */}
        <motion.div
          variants={itemVariant}
          className="glass-card p-5 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Spending Trends</h2>
            <select className="text-sm border border-gray-200 rounded-md px-2 py-1 dark:bg-secondary-800 dark:border-secondary-700">
              <option>Last 7 Months</option>
              <option>Last 12 Months</option>
              <option>YTD</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyExpenseChart}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id="colorSpending"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3379ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3379ff" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#3379ff"
                  fillOpacity={1}
                  fill="url(#colorSpending)"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Credit Score */}
        {/* <motion.div variants={itemVariant} className="glass-card p-5">
          <h2 className="card-title mb-4">Credit Score</h2>
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 mb-4">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  className="dark:stroke-secondary-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3379ff"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 45 * creditScorePercentage / 100} ${2 * Math.PI * 45 * (1 - creditScorePercentage / 100)}`}
                  strokeDashoffset={2 * Math.PI * 45 * 0.25}
                  className="transition-all duration-1000 ease-out"
                />
                <text
                  x="50"
                  y="45"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="bold"
                  fill="currentColor"
                  className="text-secondary-900 dark:text-white"
                >
                  {creditScore}
                </text>
                <text
                  x="50"
                  y="65"
                  textAnchor="middle"
                  fontSize="12"
                  fill="currentColor"
                  className="text-secondary-500 dark:text-secondary-400"
                >
                  Very Good
                </text>
              </svg>
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-secondary-500 dark:text-secondary-400">
                Score Range: 300-850
              </span>
            </div>
            <div className="mt-4 w-full space-y-3">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-success-500" />
                <span className="text-sm">On-time payment history</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-warning-500" />
                <span className="text-sm">Credit utilization slightly high</span>
              </div>
              <button className="button-secondary w-full mt-4 text-sm flex items-center justify-center gap-1">
                <span>View Credit Report</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Categories */}
        <motion.div variants={itemVariant} className="glass-card p-5">
          <h2 className="card-title mb-4">Budget Categories</h2>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {budgetCategories.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}

                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 flex-wrap mt-2">
            {budgetCategories.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-xs font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Savings Goals
        <motion.div variants={itemVariant} className="glass-card p-5">
          <h2 className="card-title mb-4">Savings Goals</h2>
          <div className="space-y-4">
            {savingsGoals.map((goal, index) => {
              const percentage = (goal.current / goal.target) * 100;
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-secondary-500 dark:text-secondary-400">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-secondary-700">
                    <div
                      className="bg-primary-600 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-secondary-500 dark:text-secondary-400">
                    <span>{percentage.toFixed(0)}% Complete</span>
                    <span>
                      {goal.name === 'Emergency' ? 'Target: 6 months expenses' : 
                        `Target: $${goal.target.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="button-secondary w-full mt-6 text-sm flex items-center justify-center gap-1">
            <span>Add New Goal</span>
            <ChevronRight size={16} />
          </button>
        </motion.div> */}

        {/* Recent Transactions */}
        <motion.div variants={itemVariant} className="glass-card p-5">
          <h2 className="card-title mb-4">Recent Transactions</h2>
          <div className="overflow-y-auto max-h-64 pr-1">
            <div className="space-y-2">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-secondary-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === "CREDIT"
                          ? "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400"
                          : 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400'
                      }`}
                    >
                      {transaction.type === "DEBIT" ? (
                        
                        <ArrowUpRight size={14} />
                      ) : (
                        <ArrowDownLeft size={14} />
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        transaction.type === "CREDIT"
                          ? "text-success-600 dark:text-success-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {transaction.type === "CREDIT" ? "" : "-"}₹
                      {Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      {new Date(transaction.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="button-secondary w-full mt-4 text-sm flex items-center justify-center gap-1" onClick={() => navigate("/transaction")}>
            <span>View All Transactions</span>
            <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const QuickStat = ({ title, value, change, isPositive, icon, color }) => {
  // Color map for different stat types
  const colorMap = {
    primary:
      "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400",
    success:
      "bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400",
    accent:
      "bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400",
    secondary:
      "bg-secondary-50 text-secondary-600 dark:bg-secondary-800 dark:text-secondary-400",
  };

  return (
    <motion.div whileHover={{ y: -4 }} className="glass-card p-5">
      <div className="flex justify-between items-start">
        <div className="space-y-1">

          <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400">
            {title}
          </p>
        
          <p className="text-2xl font-bold text-secondary-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className={`p-2 rounded-full ${colorMap[color]}`}>{icon}</div>
      </div>
      <div className="mt-4">
        <span
          className={`inline-flex items-center text-sm ${
            isPositive
              ? "text-success-600 dark:text-success-400"
              : "text-error-600 dark:text-error-400"
          }`}
        >
        </span>
      </div>
    </motion.div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  RefreshCcw,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";

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

// Sample data
const portfolioHistory = [
  { date: "2025-01", value: 25000 },
  { date: "2025-02", value: 27500 },
  { date: "2025-03", value: 26800 },
  { date: "2025-04", value: 29000 },
  { date: "2025-05", value: 31200 },
  { date: "2025-06", value: 32500 },
];

const investments = [
  {
    id: 1,
    name: "AAPL",
    fullName: "Apple Inc.",
    shares: 10,
    avgPrice: 150.25,
    currentPrice: 175.5,
    change: 2.5,
    value: 1755.0,
    type: "Stocks",
  },
  {
    id: 2,
    name: "GOOGL",
    fullName: "Alphabet Inc.",
    shares: 5,
    avgPrice: 2500.75,
    currentPrice: 2750.25,
    change: 1.8,
    value: 13751.25,
    type: "Stocks",
  },
  {
    id: 3,
    name: "VTI",
    fullName: "Vanguard Total Stock Market ETF",
    shares: 20,
    avgPrice: 200.5,
    currentPrice: 215.75,
    change: 0.9,
    value: 4315.0,
    type: "ETF",
  },
  {
    id: 4,
    name: "BTC",
    fullName: "Bitcoin",
    shares: 0.5,
    avgPrice: 35000.0,
    currentPrice: 42000.0,
    change: 4.2,
    value: 21000.0,
    type: "Crypto",
  },
];

const Investments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);
  const totalGain = investments.reduce(
    (sum, inv) => sum + (inv.currentPrice - inv.avgPrice) * inv.shares,
    0
  );
  const gainPercentage = (totalGain / (totalValue - totalGain)) * 100;

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div
        variants={itemVariant}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Investment Portfolio
          </h1>
          <p className="text-secondary-500 dark:text-secondary-400">
            Track and manage your investments
          </p>
        </div>
        <div className="flex gap-2">
          <button className="button-secondary flex items-center gap-2">
            <RefreshCcw size={18} />
            <span>Refresh</span>
          </button>
          <button className="button-primary flex items-center gap-2">
            <Plus size={18} />
            <span>Add Investment</span>
          </button>
        </div>
      </motion.div>

      {/* Portfolio Overview */}
      <motion.div
        variants={itemVariant}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
              <DollarSign size={24} />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
              Total Value
            </span>
          </div>
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
            ${totalValue.toLocaleString()}
          </h3>
          <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
            Current portfolio value
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-full bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400">
              Total Gain
            </span>
          </div>
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
            ${totalGain.toLocaleString()}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`flex items-center text-sm ${
                gainPercentage >= 0
                  ? "text-success-600 dark:text-success-400"
                  : "text-error-600 dark:text-error-400"
              }`}
            >
              {gainPercentage >= 0 ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}
              {Math.abs(gainPercentage).toFixed(2)}%
            </span>
            <span className="text-sm text-secondary-500 dark:text-secondary-400">
              All time
            </span>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-full bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400">
              <PieChartIcon size={24} />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400">
              Asset Allocation
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary-700 dark:text-secondary-300">
                Stocks
              </span>
              <span className="text-sm font-medium text-secondary-900 dark:text-white">
                65%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary-700 dark:text-secondary-300">
                ETFs
              </span>
              <span className="text-sm font-medium text-secondary-900 dark:text-white">
                25%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary-700 dark:text-secondary-300">
                Crypto
              </span>
              <span className="text-sm font-medium text-secondary-900 dark:text-white">
                10%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Portfolio Performance Chart */}
      <motion.div variants={itemVariant} className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
            Portfolio Performance
          </h2>
          <select className="text-sm border border-gray-200 rounded-md px-2 py-1 dark:bg-secondary-800 dark:border-secondary-700">
            <option>Last 6 Months</option>
            <option>YTD</option>
            <option>1 Year</option>
            <option>All Time</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioHistory}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3379ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3379ff" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-US", { month: "short" })
                }
              />
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip
                formatter={(value) => [
                  `$${value.toLocaleString()}`,
                  "Portfolio Value",
                ]}
                labelFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3379ff"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Investment List */}
      <motion.div variants={itemVariant} className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
            Investment Holdings
          </h2>
          <div className="flex gap-2">
            <div className="relative flex-grow md:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search investments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field"
            >
              <option>All</option>
              <option>Stocks</option>
              <option>ETF</option>
              <option>Crypto</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-secondary-800">
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                  Name
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                  Shares
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                  Avg Price
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                  Current Price
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                  Change
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                  Value
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <tr
                  key={investment.id}
                  className="border-b border-gray-100 dark:border-secondary-800 hover:bg-gray-50 dark:hover:bg-secondary-800/50"
                >
                  <td className="py-3 px-4">
                    <div>
                      <span className="font-medium text-secondary-900 dark:text-white">
                        {investment.name}
                      </span>
                      <span className="block text-xs text-secondary-500 dark:text-secondary-400">
                        {investment.fullName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-secondary-900 dark:text-white">
                      {investment.shares}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-secondary-900 dark:text-white">
                      ${investment.avgPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-secondary-900 dark:text-white">
                      ${investment.currentPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`flex items-center justify-end ${
                        investment.change >= 0
                          ? "text-success-600 dark:text-success-400"
                          : "text-error-600 dark:text-error-400"
                      }`}
                    >
                      {investment.change >= 0 ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                      {Math.abs(investment.change)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-medium text-secondary-900 dark:text-white">
                      ${investment.value.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Investments;

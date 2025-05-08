import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Plus,
  Calendar,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Edit2,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
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
const savingsGoals = [
  {
    id: 1,
    name: "Emergency Fund",
    targetAmount: 25000,
    currentAmount: 15000,
    deadline: "2025-12-31",
    priority: "High",
    category: "Emergency",
    monthlyContribution: 500,
    status: "on-track",
  },
  {
    id: 2,
    name: "Down Payment",
    targetAmount: 100000,
    currentAmount: 45000,
    deadline: "2026-06-30",
    priority: "High",
    category: "Housing",
    monthlyContribution: 2000,
    status: "on-track",
  },
  {
    id: 3,
    name: "New Car",
    targetAmount: 35000,
    currentAmount: 12000,
    deadline: "2025-09-30",
    priority: "Medium",
    category: "Vehicle",
    monthlyContribution: 1000,
    status: "behind",
  },
  {
    id: 4,
    name: "Vacation Fund",
    targetAmount: 8000,
    currentAmount: 6500,
    deadline: "2025-07-31",
    priority: "Low",
    category: "Travel",
    monthlyContribution: 300,
    status: "ahead",
  },
];

const Goals = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const totalSaved = savingsGoals.reduce(
    (sum, goal) => sum + goal.currentAmount,
    0
  );
  const totalTarget = savingsGoals.reduce(
    (sum, goal) => sum + goal.targetAmount,
    0
  );
  const monthlyTotal = savingsGoals.reduce(
    (sum, goal) => sum + goal.monthlyContribution,
    0
  );

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
            Savings Goals
          </h1>
          <p className="text-secondary-500 dark:text-secondary-400">
            Track and manage your financial goals
          </p>
        </div>
        <button className="button-primary flex items-center gap-2">
          <Plus size={20} />
          <span>Add New Goal</span>
        </button>
      </motion.div>

      {/* Goals Overview */}
      <motion.div
        variants={itemVariant}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
              <Target size={24} />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
              Total Progress
            </span>
          </div>
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
            ${totalSaved.toLocaleString()}
          </h3>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-secondary-700">
              <div
                className="bg-primary-600 h-2.5 rounded-full"
                style={{ width: `${(totalSaved / totalTarget) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-2">
              of ${totalTarget.toLocaleString()} total goal
            </p>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-full bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400">
              <DollarSign size={24} />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400">
              Monthly Contribution
            </span>
          </div>
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
            ${monthlyTotal.toLocaleString()}
          </h3>
          <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
            Total monthly savings
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-full bg-warning-50 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-warning-50 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400">
              Goal Status
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary-700 dark:text-secondary-300">
                On Track
              </span>
              <span className="text-sm font-medium text-success-600 dark:text-success-400">
                2
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary-700 dark:text-secondary-300">
                Behind
              </span>
              <span className="text-sm font-medium text-error-600 dark:text-error-400">
                1
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary-700 dark:text-secondary-300">
                Ahead
              </span>
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                1
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Goals List */}
      <motion.div variants={itemVariant} className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
            Active Goals
          </h2>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option>All</option>
              <option>Emergency</option>
              <option>Housing</option>
              <option>Vehicle</option>
              <option>Travel</option>
              <option>Education</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {savingsGoals.map((goal) => (
            <div
              key={goal.id}
              className="p-4 rounded-lg border border-gray-100 dark:border-secondary-800 hover:bg-gray-50 dark:hover:bg-secondary-800/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                        {goal.name}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          goal.priority === "High"
                            ? "bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400"
                            : goal.priority === "Medium"
                            ? "bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400"
                            : "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400"
                        }`}
                      >
                        {goal.priority} Priority
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-secondary-500 dark:text-secondary-400">
                        Target Amount
                      </span>
                      <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                        ${goal.targetAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-secondary-500 dark:text-secondary-400">
                        Current Amount
                      </span>
                      <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                        ${goal.currentAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-secondary-500 dark:text-secondary-400">
                        Monthly Contribution
                      </span>
                      <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                        ${goal.monthlyContribution.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-secondary-500 dark:text-secondary-400">
                        Target Date
                      </span>
                      <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                        {new Date(goal.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <div className="flex items-center gap-2">
                        {goal.status === "on-track" && (
                          <CheckCircle size={16} className="text-success-500" />
                        )}
                        {goal.status === "behind" && (
                          <AlertCircle size={16} className="text-error-500" />
                        )}
                        {goal.status === "ahead" && (
                          <TrendingUp size={16} className="text-primary-500" />
                        )}
                        <span
                          className={`font-medium ${
                            goal.status === "on-track"
                              ? "text-success-600 dark:text-success-400"
                              : goal.status === "behind"
                              ? "text-error-600 dark:text-error-400"
                              : "text-primary-600 dark:text-primary-400"
                          }`}
                        >
                          {(
                            (goal.currentAmount / goal.targetAmount) *
                            100
                          ).toFixed(1)}
                          % Complete
                        </span>
                      </div>
                      <span className="text-secondary-500 dark:text-secondary-400">
                        $
                        {(
                          goal.targetAmount - goal.currentAmount
                        ).toLocaleString()}{" "}
                        remaining
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-secondary-700">
                      <div
                        className={`h-2.5 rounded-full ${
                          goal.status === "on-track"
                            ? "bg-success-500"
                            : goal.status === "behind"
                            ? "bg-error-500"
                            : "bg-primary-500"
                        }`}
                        style={{
                          width: `${
                            (goal.currentAmount / goal.targetAmount) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tips and Recommendations */}
      <motion.div variants={itemVariant} className="glass-card p-6">
        <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
          Tips to Reach Your Goals Faster
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-primary-50 dark:bg-primary-900/30">
            <h3 className="font-medium text-primary-900 dark:text-primary-100 mb-2">
              Automate Your Savings
            </h3>
            <p className="text-sm text-primary-700 dark:text-primary-300">
              Set up automatic transfers to your savings accounts on payday to
              ensure consistent progress.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-success-50 dark:bg-success-900/30">
            <h3 className="font-medium text-success-900 dark:text-success-100 mb-2">
              Cut Unnecessary Expenses
            </h3>
            <p className="text-sm text-success-700 dark:text-success-300">
              Review your monthly subscriptions and eliminate ones you don't
              frequently use.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-warning-50 dark:bg-warning-900/30">
            <h3 className="font-medium text-warning-900 dark:text-warning-100 mb-2">
              Find Additional Income
            </h3>
            <p className="text-sm text-warning-700 dark:text-warning-300">
              Consider freelance work or selling unused items to boost your
              savings rate.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Goals;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Lightbulb,
  CalculatorIcon,
  ArrowRightCircle,
} from "lucide-react";
import axios from "axios";

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

// Generate consistent colors for categories
const generateColor = (index) => {
  const colors = [
    "#3379ff", // Blue
    "#1db678", // Green
    "#db8722", // Orange
    "#e63946", // Red
    "#6a4c93", // Purple
    "#1d3557", // Navy
    "#2a9d8f", // Teal
    "#f4a261", // Peach
    "#457b9d", // Steel Blue
    "#8d99ae", // Slate
  ];
  return colors[index % colors.length];
};

// Normalize category names
const normalizeCategory = (category) => {
  const normalized = category.toLowerCase();
  if (normalized === "groceries" || normalized === "grocery") return "groceries";
  if (normalized === "transport" || normalized === "transportation") return "transport";
  return normalized;
};

const Insights = () => {
  const [spendingData, setSpendingData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [insights, setInsights] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const id = localStorage.getItem("id") || "u1";

  const filteredInsights =
    activeCategory === "All"
      ? insights
      : insights.filter((insight) => insight.category === activeCategory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch spending data
        const spendingRes = await axios.get(
          `${import.meta.env.VITE_APP_API_URL_2 || 'http://localhost:8082'}/api/v1/spending/${id}/all`
        );
        const spendingData = spendingRes.data;

        // Get the most recent period for insights
        const latestPeriod = spendingData.reduce((latest, current) => {
          return !latest || current.period > latest ? current.period : latest;
        }, null);
        console.log("Latest period for insights:", latestPeriod);
        // Fetch insights for the latest period
        if (latestPeriod) {
          const insightsRes = await axios.get(
            `${import.meta.env.VITE_APP_API_URL_2 || 'http://localhost:8082'}/api/v1/spending/${id}/insights?period=${latestPeriod}`
          );
          
          // Transform insights data
          const formattedInsights = insightsRes.data.map((insight, index) => {
            let category = "General";
            let severity = "info";
            let iconBg = "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400";
            
            const lowerInsight = insight.toLowerCase();
            
            if (lowerInsight.includes("spending") || lowerInsight.includes("spent")) {
              category = "Spending";
              if (lowerInsight.includes("increased")) {
                severity = "warning";
                iconBg = "bg-warning-50 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400";
              } else if (lowerInsight.includes("decreased")) {
                severity = "success";
                iconBg = "bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400";
              }
            } else if (lowerInsight.includes("income")) {
              category = "Income";
              severity = lowerInsight.includes("increased") ? "success" : "warning";
              iconBg = severity === "success" 
                ? "bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400"
                : "bg-warning-50 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400";
            } else if (lowerInsight.includes("savings")) {
              category = "Savings";
              severity = lowerInsight.includes("increased") ? "success" : "warning";
              iconBg = severity === "success"
                ? "bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400"
                : "bg-warning-50 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400";
            }

            return {
              id: index + 1,
              title: insight,
              category,
              severity,
              icon: <Lightbulb size={20} />,
              iconBg,
            };
          });

          setInsights(formattedInsights);

          // Extract unique categories from insights
          const uniqueCategories = new Set(formattedInsights.map(insight => insight.category));
          setCategories(["All", ...Array.from(uniqueCategories)]);
        }

        // // Transform spending data for the chart
        // const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        // // Create a map of normalized categories
        // const categoryMap = new Map();
        // spendingData.forEach(entry => {
        //   Object.entries(entry.byCategory).forEach(([category, amount]) => {
        //     const normalizedCat = normalizeCategory(category);
        //     if (!categoryMap.has(normalizedCat)) {
        //       categoryMap.set(normalizedCat, category);
        //     }
        //   });
        // });

        // // Create color map for normalized categories
        // const newColorMap = {};
        // Array.from(categoryMap.keys()).forEach((category, index) => {
        //   newColorMap[category] = generateColor(index);
        // });
        // setColorMap(newColorMap);

        // // Transform data for chart
        // const transformedData = spendingData.map(entry => {
        //   const date = new Date(`${entry.period}-01`);
        //   const month = date.toLocaleString("en-US", { month: "short" });
          
        //   const result = { month };
          
        //   // Initialize all categories with 0
        //   categoryMap.forEach((_, normalizedCat) => {
        //     result[normalizedCat] = 0;
        //   });
          
        //   // Add values for existing categories
        //   Object.entries(entry.byCategory).forEach(([category, amount]) => {
        //     const normalizedCat = normalizeCategory(category);
        //     result[normalizedCat] = (result[normalizedCat] || 0) + Number(amount);
        //   });
          
        //   return result;
        // });

        // // Sort by month
        // const sortedData = transformedData.sort(
        //   (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        // );

        // setSpendingData(sortedData);

        // Create a map of normalized categories
const categoryMap = new Map();
spendingData.forEach(entry => {
  Object.entries(entry.byCategory).forEach(([category]) => {
    const normalizedCat = normalizeCategory(category);
    if (!categoryMap.has(normalizedCat)) {
      categoryMap.set(normalizedCat, category);
    }
  });
});

// Create color map
const newColorMap = {};
Array.from(categoryMap.keys()).forEach((category, index) => {
  newColorMap[category] = generateColor(index);
});
setColorMap(newColorMap);


// STEP 1: Convert and sort by real date
const sortedByDate = spendingData
  .map(entry => ({
    ...entry,
    dateObj: new Date(`${entry.period}-01`)
  }))
  .sort((a, b) => a.dateObj - b.dateObj);


// STEP 2: Take last 12 months only
const last12Months = sortedByDate.slice(-12);


// STEP 3: Transform for chart
const transformedData = last12Months.map(entry => {

  const month = entry.dateObj.toLocaleString("en-US", {
    month: "short",
    year: "numeric"
  }); // "Mar 2025"

  const result = {
    month,
    period: entry.period
  };

  // initialize all categories with 0
  categoryMap.forEach((_, normalizedCat) => {
    result[normalizedCat] = 0;
  });

  // add actual values
  Object.entries(entry.byCategory).forEach(([category, amount]) => {
    const normalizedCat = normalizeCategory(category);
    result[normalizedCat] =
      (result[normalizedCat] || 0) + Number(amount);
  });

  return result;
});


setSpendingData(transformedData);


        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRefreshData = () => {
    setLoading(true);
    const currentUserId = id;
    localStorage.setItem("id", currentUserId);
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Title */}
      <motion.div
        variants={itemVariant}
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Financial Insights
          </h1>
          <p className="text-secondary-500 dark:text-secondary-400">
            AI-powered suggestions to improve your financial health
          </p>
        </div>
        {/* <button 
          className="button-primary flex items-center gap-2 self-start"
          onClick={handleRefreshData}
        >
          <CalculatorIcon size={16} />
          <span>Run Financial Analysis</span>
        </button> */}
      </motion.div>

      {/* Error message */}
      {error && (
        <motion.div 
          variants={itemVariant}
          className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-md"
        >
          {error}
        </motion.div>
      )}

      {/* Loading state */}
      {loading && (
        <motion.div 
          variants={itemVariant}
          className="glass-card p-8 flex justify-center items-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </motion.div>
      )}

      {/* Insights Chart */}
      {!loading && !error && (
        <motion.div variants={itemVariant} className="glass-card p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Spending Breakdown</h2>
            <select className="text-sm border border-gray-200 rounded-md px-2 py-1 dark:bg-secondary-800 dark:border-secondary-700">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={spendingData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    border: "1px solid rgba(229, 231, 235, 1)",
                  }}
                  formatter={(value) => [`₹${value}`, ""]}
                />
                <Legend />
                {Object.keys(colorMap).map((category) => (
                  <Line
                    key={category}
                    type="monotone"
                    dataKey={category}
                    stroke={colorMap[category]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name={category.charAt(0).toUpperCase() + category.slice(1)}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Insight Categories */}
      {!loading && !error && categories.length > 1 && (
        <motion.div
          variants={itemVariant}
          className="flex overflow-x-auto py-2 gap-2 hide-scrollbar"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-secondary-700 hover:bg-gray-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      )}

      {/* Insights */}
      {!loading && !error && (
        <motion.div
          variants={containerVariant}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {filteredInsights.map((insight) => (
            <motion.div
              key={insight.id}
              variants={itemVariant}
              whileHover={{
                y: -4,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              className={`glass-card overflow-hidden border-l-4 ${
                insight.severity === "success"
                  ? "border-success-500"
                  : insight.severity === "warning"
                  ? "border-warning-500"
                  : "border-primary-500"
              }`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-full ${insight.iconBg}`}>
                    {insight.icon}
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300">
                    {insight.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {insight.title}
                </h3>

                {insight.description && (
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm mb-4">
                    {insight.description}
                  </p>
                )}

                {insight.actionText && (
                  <button className="flex items-center gap-1 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                    <span>{insight.actionText}</span>
                    <ArrowRightCircle size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Insights;
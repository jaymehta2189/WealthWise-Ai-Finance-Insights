

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Filter, Check, ArrowUpRight, ArrowDownRight, DollarSign, BarChart3, TrendingUp } from 'lucide-react';

// Dummy data to simulate API response
const dummySpendingData = [
  {
    userId: "u1",
    period: "2025-01",
    byCategory: {
      Food: 6500.0,
      Transport: 2800.0,
      Utilities: 450.0,
      Rent: 7000.0,
      Other: 280.0,
    },
    totalExpense: 17030.0,
    totalIncome: 68000.0,
    netSavings: 50970.0
  },
  {
    userId: "u1",
    period: "2025-02",
    byCategory: {
      Food: 6800.0,
      Transport: 2900.0,
      Utilities: 460.0,
      Rent: 7000.0,
      Other: 300.0,
    },
    totalExpense: 17460.0,
    totalIncome: 68500.0,
    netSavings: 51040.0
  },
  {
    userId: "u1",
    period: "2025-03",
    byCategory: {
      Food: 7000.0,
      Transport: 3000.0,
      Utilities: 500.0,
      Rent: 7150.0,
      Other: 300.0,
    },
    totalExpense: 17950.0,
    totalIncome: 70000.0,
    netSavings: 52050.0
  }
];

// Initial empty forecast data
const initialForecastData = {
  Food: { forecast: [] },
  Transport: { forecast: [] },
  Utilities: { forecast: [] },
  Rent: { forecast: [] },
  Other: { forecast: [] }
};

// Generate forecast data
const generateForecastData = (spendingData) => {
  const forecast = {
    Food: { forecast: [] },
    Transport: { forecast: [] },
    Utilities: { forecast: [] },
    Rent: { forecast: [] },
    Other: { forecast: [] }
  };

  // Get the last month's data
  const lastMonth = spendingData[spendingData.length - 1];
  const [year, month] = lastMonth.period.split('-').map(Number);

  // Generate 3 months of forecast
  Object.entries(lastMonth.byCategory).forEach(([category, amount]) => {
    for (let i = 1; i <= 3; i++) {
      let newMonth = month + i;
      let newYear = year;
      
      if (newMonth > 12) {
        newMonth = newMonth - 12;
        newYear += 1;
      }
      
      const newDate = `${newYear}-${String(newMonth).padStart(2, '0')}`;
      
      // Calculate new amount with some randomness
      let newAmount;
      if (category === 'Rent') {
        // Rent typically stays stable with occasional increases
        newAmount = Math.random() < 0.2 
          ? Math.round(amount * 1.05) // 5% rent increase
          : amount;
      } else {
        // Other categories get 2-5% random increase
        const increase = 1 + (Math.random() * 0.03 + 0.02);
        newAmount = Math.round(amount * increase);
      }
      
      forecast[category].forecast.push({
        date: newDate,
        amount: newAmount
      });
    }
  });
  
  return forecast;
};

function Forecast() {
  const [spendingData, setSpendingData] = useState([]);
  const [forecastData, setForecastData] = useState(initialForecastData);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isForecastLoading, setIsForecastLoading] = useState(false);

  // Category colors
  const categoryColors = {
    Food: '#F59E0B',
    Transport: '#3B82F6',
    Utilities: '#8B5CF6',
    Rent: '#EF4444',
    Other: '#6B7280'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSpendingData(dummySpendingData);
        
        const categories = Array.from(
          new Set(
            dummySpendingData.flatMap(item => 
              Object.keys(item.byCategory)
            )
          )
        );
        
        setAllCategories(categories);
        setSelectedCategories(categories.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerateForecast = async () => {
    setIsForecastLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate forecast data
      const newForecast = generateForecastData(spendingData);
      setForecastData(newForecast);
    } catch (error) {
      console.error('Error generating forecast:', error);
    } finally {
      setIsForecastLoading(false);
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const selectAllCategories = () => {
    setSelectedCategories([...allCategories]);
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const formatDate = (dateStr) => {
    const [year, month] = dateStr.split('-');
    return new Date(year, month - 1).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const prepareChartData = () => {
    if (!spendingData || spendingData.length === 0) return [];

    const sortedData = [...spendingData].sort((a, b) => 
      new Date(a.period) - new Date(b.period)
    );

    const combinedData = {};

    // Process historical data
    sortedData.forEach(item => {
      combinedData[item.period] = {
        period: item.period,
        formattedDate: formatDate(item.period),
        isHistorical: true,
        ...Object.fromEntries(
          Object.entries(item.byCategory).map(([category, value]) => 
            [`${category}_actual`, value]
          )
        )
      };
    });

    // Process forecast data
    Object.entries(forecastData).forEach(([category, forecast]) => {
      if (!forecast || !forecast.forecast) return;

      forecast.forecast.forEach(item => {
        if (!combinedData[item.date]) {
          combinedData[item.date] = {
            period: item.date,
            formattedDate: formatDate(item.date),
            isHistorical: false
          };
        }
        combinedData[item.date][`${category}_forecast`] = item.amount;
      });
    });

    return Object.values(combinedData).sort((a, b) => 
      new Date(a.period) - new Date(b.period)
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;

    const dataPoint = chartData.find(item => item.period === label);
    const isHistorical = dataPoint?.isHistorical;

    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
        <p className="font-medium text-gray-700 mb-2">{formatDate(label)}</p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => {
            const categoryName = entry.dataKey.split('_')[0];
            const isActual = entry.dataKey.includes('_actual');

            return (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600">
                    {categoryName}
                    <span className="text-xs ml-1 text-gray-400">
                      {isActual ? '(actual)' : '(forecast)'}
                    </span>
                  </span>
                </div>
                <span className="font-medium text-gray-800">
                  ${Number(entry.value).toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
          {isHistorical ? 'Historical data' : 'Includes forecast values'}
        </div>
      </div>
    );
  };

  const chartData = prepareChartData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  const latestData = spendingData[spendingData.length - 1];
  const previousData = spendingData[spendingData.length - 2];
  const percentChange = previousData
    ? ((latestData.totalExpense - previousData.totalExpense) / previousData.totalExpense) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-white shadow-sm mb-6">
        <div className="container mx-auto">
          <div className="px-6 py-4 border-b border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-800">Financial Dashboard</h1>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              <div>
                <h2 className="text-sm font-medium text-blue-100 mb-1">Overview for</h2>
                <p className="text-xl font-bold">{formatDate(latestData.period)}</p>
                
                <div className="mt-4 flex items-center gap-3">
                  <div className={`flex items-center ${percentChange > 0 ? 'text-red-300' : 'text-green-300'}`}>
                    {percentChange > 0 ? (
                      <ArrowUpRight size={16} className="mr-1" />
                    ) : (
                      <ArrowDownRight size={16} className="mr-1" />
                    )}
                    <span>{Math.abs(percentChange).toFixed(1)}%</span>
                    <span className="ml-1 text-xs opacity-70">vs last month</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                <div className="bg-blue-400 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-white bg-opacity-30 rounded-full p-1">
                      <DollarSign size={18} />
                    </div>
                    <p className="text-sm font-medium">Total Spending</p>
                  </div>
                  <p className="text-xl font-bold">
                    ${latestData.totalExpense.toLocaleString()}
                  </p>
                </div>
                
                <div className="bg-green-400 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-white bg-opacity-30 rounded-full p-1">
                      <DollarSign size={18} />
                    </div>
                    <p className="text-sm font-medium">Total Income</p>
                  </div>
                  <p className="text-xl font-bold">
                    ${latestData.totalIncome.toLocaleString()}
                  </p>
                </div>
                
                <div className="bg-purple-400 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-white bg-opacity-30 rounded-full p-1">
                      <DollarSign size={18} />
                    </div>
                    <p className="text-sm font-medium">Net Savings</p>
                  </div>
                  <p className="text-xl font-bold">
                    ${latestData.netSavings.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */}
      
      <main className="container mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            {/* Chart Header */}
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="text-blue-500" size={20} />
                <h2 className="text-xl font-semibold text-gray-800">Spending Analysis</h2>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Category Filter */}
                <div className="relative">
                  <button
                    onClick={() => document.getElementById('categoryDropdown').classList.toggle('hidden')}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Filter size={16} />
                    <span>Filter Categories</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-1">
                      {selectedCategories.length}
                    </span>
                  </button>

                  <div 
                    id="categoryDropdown"
                    className="hidden absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-3"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-700">Categories</h4>
                      <div className="flex gap-2">
                        <button 
                          onClick={selectAllCategories}
                          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Select All
                        </button>
                        <span className="text-gray-300">|</span>
                        <button 
                          onClick={clearAllCategories}
                          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                      {allCategories.map(category => (
                        <div 
                          key={category}
                          className="py-2 flex items-center justify-between hover:bg-gray-50 px-2 rounded cursor-pointer"
                          onClick={() => toggleCategory(category)}
                        >
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: categoryColors[category] }}
                            />
                            <span className="text-sm">{category}</span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            selectedCategories.includes(category)
                              ? 'bg-blue-500 border-0'
                              : 'border-gray-300'
                          }`}>
                            {selectedCategories.includes(category) && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerateForecast}
                  disabled={isForecastLoading}
                  className="px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600"
                >
                  {isForecastLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Generating Forecast...</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp size={16} />
                      <span>Generate 3-Month Forecast</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Chart Section */}
            {selectedCategories.length === 0 ? (
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 border-2 border-dashed border-gray-300">
                <div className="text-center p-6">
                  <p className="mb-4 text-lg">Select at least one category to view spending trends</p>
                  <p className="text-sm text-gray-400">Use the filter above to choose categories</p>
                </div>
              </div>
            ) : (
              <div style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="formattedDate" 
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${value}`}
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    
                    {/* Historical Data Lines */}
                    {selectedCategories.map((category) => (
                      <Line
                        key={`${category}_actual`}
                        type="monotone"
                        dataKey={`${category}_actual`}
                        name={category}
                        stroke={categoryColors[category]}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    ))}
                    
                    {/* Forecast Data Lines */}
                    {selectedCategories.map((category) => (
                      <Line
                        key={`${category}_forecast`}
                        type="monotone"
                        dataKey={`${category}_forecast`}
                        name={`${category} (Forecast)`}
                        stroke={categoryColors[category]}
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            
            <div className="text-xs text-gray-500 italic mt-2">
              * Solid lines represent historical data, dashed lines show forecasted values
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Forecast; 
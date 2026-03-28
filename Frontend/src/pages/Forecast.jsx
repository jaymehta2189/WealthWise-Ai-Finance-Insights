

// import React, { useState, useEffect } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';
// import { Filter, Check, ArrowUpRight, ArrowDownRight, DollarSign, BarChart3, TrendingUp } from 'lucide-react';

// // Dummy data to simulate API response
// const dummySpendingData = [
//   {
//     userId: "u1",
//     period: "2025-01",
//     byCategory: {
//       Food: 6500.0,
//       Transport: 2800.0,
//       Utilities: 450.0,
//       Rent: 7000.0,
//       Other: 280.0,
//     },
//     totalExpense: 17030.0,
//     totalIncome: 68000.0,
//     netSavings: 50970.0
//   },
//   {
//     userId: "u1",
//     period: "2025-02",
//     byCategory: {
//       Food: 6800.0,
//       Transport: 2900.0,
//       Utilities: 460.0,
//       Rent: 7000.0,
//       Other: 300.0,
//     },
//     totalExpense: 17460.0,
//     totalIncome: 68500.0,
//     netSavings: 51040.0
//   },
//   {
//     userId: "u1",
//     period: "2025-03",
//     byCategory: {
//       Food: 7000.0,
//       Transport: 3000.0,
//       Utilities: 500.0,
//       Rent: 7150.0,
//       Other: 300.0,
//     },
//     totalExpense: 17950.0,
//     totalIncome: 70000.0,
//     netSavings: 52050.0
//   }
// ];

// // Initial empty forecast data
// const initialForecastData = {
//   Food: { forecast: [] },
//   Transport: { forecast: [] },
//   Utilities: { forecast: [] },
//   Rent: { forecast: [] },
//   Other: { forecast: [] }
// };

// // Generate forecast data
// const generateForecastData = (spendingData) => {
//   const forecast = {
//     Food: { forecast: [] },
//     Transport: { forecast: [] },
//     Utilities: { forecast: [] },
//     Rent: { forecast: [] },
//     Other: { forecast: [] }
//   };

//   // Get the last month's data
//   const lastMonth = spendingData[spendingData.length - 1];
//   const [year, month] = lastMonth.period.split('-').map(Number);

//   // Generate 3 months of forecast
//   Object.entries(lastMonth.byCategory).forEach(([category, amount]) => {
//     for (let i = 1; i <= 3; i++) {
//       let newMonth = month + i;
//       let newYear = year;
      
//       if (newMonth > 12) {
//         newMonth = newMonth - 12;
//         newYear += 1;
//       }
      
//       const newDate = `${newYear}-${String(newMonth).padStart(2, '0')}`;
      
//       // Calculate new amount with some randomness
//       let newAmount;
//       if (category === 'Rent') {
//         // Rent typically stays stable with occasional increases
//         newAmount = Math.random() < 0.2 
//           ? Math.round(amount * 1.05) // 5% rent increase
//           : amount;
//       } else {
//         // Other categories get 2-5% random increase
//         const increase = 1 + (Math.random() * 0.03 + 0.02);
//         newAmount = Math.round(amount * increase);
//       }
      
//       forecast[category].forecast.push({
//         date: newDate,
//         amount: newAmount
//       });
//     }
//   });
  
//   return forecast;
// };

// function Forecast() {
//   const [spendingData, setSpendingData] = useState([]);
//   const [forecastData, setForecastData] = useState(initialForecastData);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);

//   // Category colors
//   const categoryColors = {
//     Food: '#F59E0B',
//     Transport: '#3B82F6',
//     Utilities: '#8B5CF6',
//     Rent: '#EF4444',
//     Other: '#6B7280'
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         setSpendingData(dummySpendingData);
        
//         const categories = Array.from(
//           new Set(
//             dummySpendingData.flatMap(item => 
//               Object.keys(item.byCategory)
//             )
//           )
//         );
        
//         setAllCategories(categories);
//         setSelectedCategories(categories.slice(0, 3));
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleGenerateForecast = async () => {
//     setIsForecastLoading(true);

//     try {
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Generate forecast data
//       const newForecast = generateForecastData(spendingData);
//       setForecastData(newForecast);
//     } catch (error) {
//       console.error('Error generating forecast:', error);
//     } finally {
//       setIsForecastLoading(false);
//     }
//   };

//   const toggleCategory = (category) => {
//     setSelectedCategories(prev =>
//       prev.includes(category)
//         ? prev.filter(c => c !== category)
//         : [...prev, category]
//     );
//   };

//   const selectAllCategories = () => {
//     setSelectedCategories([...allCategories]);
//   };

//   const clearAllCategories = () => {
//     setSelectedCategories([]);
//   };

//   const formatDate = (dateStr) => {
//     const [year, month] = dateStr.split('-');
//     return new Date(year, month - 1).toLocaleDateString('en-US', {
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const prepareChartData = () => {
//     if (!spendingData || spendingData.length === 0) return [];

//     const sortedData = [...spendingData].sort((a, b) => 
//       new Date(a.period) - new Date(b.period)
//     );

//     const combinedData = {};

//     // Process historical data
//     sortedData.forEach(item => {
//       combinedData[item.period] = {
//         period: item.period,
//         formattedDate: formatDate(item.period),
//         isHistorical: true,
//         ...Object.fromEntries(
//           Object.entries(item.byCategory).map(([category, value]) => 
//             [`${category}_actual`, value]
//           )
//         )
//       };
//     });

//     // Process forecast data
//     Object.entries(forecastData).forEach(([category, forecast]) => {
//       if (!forecast || !forecast.forecast) return;

//       forecast.forecast.forEach(item => {
//         if (!combinedData[item.date]) {
//           combinedData[item.date] = {
//             period: item.date,
//             formattedDate: formatDate(item.date),
//             isHistorical: false
//           };
//         }
//         combinedData[item.date][`${category}_forecast`] = item.amount;
//       });
//     });

//     return Object.values(combinedData).sort((a, b) => 
//       new Date(a.period) - new Date(b.period)
//     );
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (!active || !payload || payload.length === 0) return null;

//     const dataPoint = chartData.find(item => item.period === label);
//     const isHistorical = dataPoint?.isHistorical;

//     return (
//       <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
//         <p className="font-medium text-gray-700 mb-2">{formatDate(label)}</p>
//         <div className="space-y-1.5">
//           {payload.map((entry, index) => {
//             const categoryName = entry.dataKey.split('_')[0];
//             const isActual = entry.dataKey.includes('_actual');

//             return (
//               <div key={index} className="flex items-center justify-between gap-4">
//                 <div className="flex items-center gap-1.5">
//                   <div 
//                     className="w-2.5 h-2.5 rounded-full" 
//                     style={{ backgroundColor: entry.color }}
//                   />
//                   <span className="text-sm text-gray-600">
//                     {categoryName}
//                     <span className="text-xs ml-1 text-gray-400">
//                       {isActual ? '(actual)' : '(forecast)'}
//                     </span>
//                   </span>
//                 </div>
//                 <span className="font-medium text-gray-800">
//                   ${Number(entry.value).toLocaleString()}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//         <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
//           {isHistorical ? 'Historical data' : 'Includes forecast values'}
//         </div>
//       </div>
//     );
//   };

//   const chartData = prepareChartData();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
//           <p className="text-gray-500">Loading your financial data...</p>
//         </div>
//       </div>
//     );
//   }

//   const latestData = spendingData[spendingData.length - 1];
//   const previousData = spendingData[spendingData.length - 2];
//   const percentChange = previousData
//     ? ((latestData.totalExpense - previousData.totalExpense) / previousData.totalExpense) * 100
//     : 0;

//   return (
//     <div className="min-h-screen bg-gray-50">      
//       <main className="container mx-auto px-4 pb-12">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="p-6">
//             {/* Chart Header */}
//             <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
//               <div className="flex items-center gap-2">
//                 <BarChart3 className="text-blue-500" size={20} />
//                 <h2 className="text-xl font-semibold text-gray-800">Spending Analysis</h2>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 {/* Category Filter */}
//                 <div className="relative">
//                   <button
//                     onClick={() => document.getElementById('categoryDropdown').classList.toggle('hidden')}
//                     className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
//                   >
//                     <Filter size={16} />
//                     <span>Filter Categories</span>
//                     <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-1">
//                       {selectedCategories.length}
//                     </span>
//                   </button>

//                   <div 
//                     id="categoryDropdown"
//                     className="hidden absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-3"
//                   >
//                     <div className="flex justify-between items-center mb-3">
//                       <h4 className="font-medium text-gray-700">Categories</h4>
//                       <div className="flex gap-2">
//                         <button 
//                           onClick={selectAllCategories}
//                           className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
//                         >
//                           Select All
//                         </button>
//                         <span className="text-gray-300">|</span>
//                         <button 
//                           onClick={clearAllCategories}
//                           className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
//                         >
//                           Clear
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
//                       {allCategories.map(category => (
//                         <div 
//                           key={category}
//                           className="py-2 flex items-center justify-between hover:bg-gray-50 px-2 rounded cursor-pointer"
//                           onClick={() => toggleCategory(category)}
//                         >
//                           <div className="flex items-center gap-2">
//                             <div 
//                               className="w-3 h-3 rounded-full"
//                               style={{ backgroundColor: categoryColors[category] }}
//                             />
//                             <span className="text-sm">{category}</span>
//                           </div>
//                           <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
//                             selectedCategories.includes(category)
//                               ? 'bg-blue-500 border-0'
//                               : 'border-gray-300'
//                           }`}>
//                             {selectedCategories.includes(category) && (
//                               <Check size={12} className="text-white" />
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleGenerateForecast}
//                   disabled={isForecastLoading}
//                   className="px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600"
//                 >
//                   {isForecastLoading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
//                       <span>Generating Forecast...</span>
//                     </>
//                   ) : (
//                     <>
//                       <TrendingUp size={16} />
//                       <span>Generate 3-Month Forecast</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Chart Section */}
//             {selectedCategories.length === 0 ? (
//               <div className="h-80 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 border-2 border-dashed border-gray-300">
//                 <div className="text-center p-6">
//                   <p className="mb-4 text-lg">Select at least one category to view spending trends</p>
//                   <p className="text-sm text-gray-400">Use the filter above to choose categories</p>
//                 </div>
//               </div>
//             ) : (
//               <div style={{ height: '400px' }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart
//                     data={chartData}
//                     margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis 
//                       dataKey="formattedDate" 
//                       tick={{ fontSize: 12 }}
//                       tickMargin={10}
//                     />
//                     <YAxis 
//                       tickFormatter={(value) => `$${value}`}
//                       tick={{ fontSize: 12 }}
//                       tickMargin={10}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
                    
//                     {/* Historical Data Lines */}
//                     {selectedCategories.map((category) => (
//                       <Line
//                         key={`${category}_actual`}
//                         type="monotone"
//                         dataKey={`${category}_actual`}
//                         name={category}
//                         stroke={categoryColors[category]}
//                         strokeWidth={2}
//                         dot={{ r: 3 }}
//                         activeDot={{ r: 5 }}
//                       />
//                     ))}
                    
//                     {/* Forecast Data Lines */}
//                     {selectedCategories.map((category) => (
//                       <Line
//                         key={`${category}_forecast`}
//                         type="monotone"
//                         dataKey={`${category}_forecast`}
//                         name={`${category} (Forecast)`}
//                         stroke={categoryColors[category]}
//                         strokeDasharray="5 5"
//                         strokeWidth={2}
//                         dot={{ r: 3 }}
//                         activeDot={{ r: 5 }}
//                       />
//                     ))}
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
            
//             <div className="text-xs text-gray-500 italic mt-2">
//               * Solid lines represent historical data, dashed lines show forecasted values
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Forecast; 




import React, { useState, useEffect, useCallback } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  RefreshCw,
  BarChart3,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ChevronDown,
  Check,
  Info,
} from 'lucide-react';

// ─── Config ──────────────────────────────────────────────────────────────────
const SPENDING_API   = (id) => `http://localhost:8080/wealthwise/api/v1/spending/${id}/all`;
const FORECAST_API   = `http://localhost:8000/forecast`;
const USER_ID        = localStorage.getItem("id"); // Replace with auth context / prop

// ─── Colour palette — expands automatically for any category ─────────────────
const PALETTE = [
  '#6366f1','#f59e0b','#10b981','#ef4444','#3b82f6',
  '#ec4899','#14b8a6','#f97316','#8b5cf6','#84cc16',
];
const getCategoryColor = (() => {
  const cache = {};
  let idx = 0;
  return (cat) => {
    if (!cache[cat]) { cache[cat] = PALETTE[idx++ % PALETTE.length]; }
    return cache[cat];
  };
})();

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (v) => `₹${Number(v ?? 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const fmtPct = (v) => `${v >= 0 ? '+' : ''}${Number(v ?? 0).toFixed(1)}%`;

const formatMonthLabel = (dateStr) => {
  const [y, m] = (dateStr || '').split('-');
  if (!y || !m) return dateStr;
  return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
};

const TrendIcon = ({ dir, size = 14 }) => {
  if (dir === 'increasing') return <TrendingUp  size={size} className="text-red-400" />;
  if (dir === 'decreasing') return <TrendingDown size={size} className="text-emerald-400" />;
  return <Minus size={size} className="text-slate-400" />;
};


// ─── Sub-components ───────────────────────────────────────────────────────────

// Summary metric card
const MetricCard = ({ icon: Icon, label, value, sub, accent }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col gap-2">
    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
      <Icon size={14} style={{ color: accent }} />
      {label}
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    {sub && <p className="text-xs text-slate-500">{sub}</p>}
  </div>
);

// Category pill toggle
const CategoryPill = ({ cat, active, onClick }) => {
  const color = getCategoryColor(cat);
  return (
    <button
      onClick={() => onClick(cat)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
        active
          ? 'border-transparent text-white'
          : 'border-slate-600 text-slate-400 bg-transparent hover:border-slate-400'
      }`}
      style={active ? { backgroundColor: color + '33', borderColor: color, color } : {}}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: active ? color : '#64748b' }} />
      {cat}
    </button>
  );
};

// Model quality badge
const ModelBadge = ({ model, mape }) => {
  const quality = mape < 5 ? 'Excellent' : mape < 15 ? 'Good' : 'Fair';
  const colors  = { Excellent: 'text-emerald-400', Good: 'text-amber-400', Fair: 'text-red-400' };
  return (
    <span className={`text-xs font-mono ${colors[quality]}`}>
      {model === 'prophet' ? 'Prophet' : 'Linear'} · {quality} ({mape.toFixed(1)}% MAPE)
    </span>
  );
};

// Custom recharts tooltip
const CustomTooltip = ({ active, payload, label, separatorDate }) => {
  if (!active || !payload?.length) return null;
  const isForecast = label > separatorDate;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl min-w-[180px]">
      <p className="text-slate-300 font-semibold text-sm mb-2">{formatMonthLabel(label)}</p>
      <div className="flex items-center gap-1.5 mb-2">
        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${isForecast ? 'bg-indigo-900 text-indigo-300' : 'bg-slate-700 text-slate-300'}`}>
          {isForecast ? 'Forecast' : 'Actual'}
        </span>
      </div>
      {payload.map((entry, i) => {
        if (entry.dataKey.includes('_ci')) return null;
        const cat = entry.dataKey.replace('_actual', '').replace('_forecast', '');
        return (
          <div key={i} className="flex justify-between items-center gap-4 py-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-slate-400">{cat}</span>
            </div>
            <span className="text-xs font-semibold text-white">{fmt(entry.value)}</span>
          </div>
        );
      })}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
 function Forecast({ userId = USER_ID }) {
  const [spendingData,  setSpendingData]  = useState([]);
  const [forecastResult, setForecastResult] = useState(null);
  const [selectedCats,  setSelectedCats]  = useState([]);
  const [allCats,       setAllCats]       = useState([]);
  const [showCI,        setShowCI]        = useState(true);
  const [loadingData,   setLoadingData]   = useState(true);
  const [loadingFc,     setLoadingFc]     = useState(false);
  const [error,         setError]         = useState(null);
  const [filterOpen,    setFilterOpen]    = useState(false);

  // ── 1. Fetch spending history ──────────────────────────────────────────────
  useEffect(() => {
    const fetchSpending = async () => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await fetch(SPENDING_API(userId));
        console.log('Spending API response status:', res);
        if (!res.ok) throw new Error(`Spending API error: ${res.status}`);
        const data = await res.json();
        console.log('Fetched spending data:', data);
        // Sort chronologically
        const sorted = [...data].sort((a, b) => a.period.localeCompare(b.period));
        setSpendingData(sorted);

        // Derive all categories
        const cats = Array.from(
          new Set(sorted.flatMap(d => Object.keys(d.byCategory)))
        );
        setAllCats(cats);
        setSelectedCats(cats.slice(0, 4));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingData(false);
      }
    };
    fetchSpending();
  }, [userId]);

  // ── 2. Generate forecast from ML service ──────────────────────────────────
  const generateForecast = useCallback(async () => {
    if (!spendingData.length) return;
    setLoadingFc(true);
    setError(null);
    try {
      const payload = {
        userId,
        history: spendingData,
        periods: 3,
      };
      const res = await fetch(FORECAST_API, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || `Forecast API error: ${res.status}`);
      }
      const data = await res.json();
      setForecastResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingFc(false);
    }
  }, [spendingData, userId]);

  // ── 3. Build unified chart data ────────────────────────────────────────────
  const { chartData, separatorDate } = React.useMemo(() => {
    const map = {};

    // Historical actuals
    spendingData.forEach(d => {
      map[d.period] = { period: d.period, _type: 'actual' };
      Object.entries(d.byCategory).forEach(([cat, val]) => {
        map[d.period][`${cat}_actual`] = val;
      });
    });

    // Forecast values + CI bands
    if (forecastResult?.forecasts) {
      Object.entries(forecastResult.forecasts).forEach(([cat, catData]) => {
        if (cat === '__total__') return;
        catData.forecasts?.forEach(pt => {
          if (!map[pt.date]) map[pt.date] = { period: pt.date, _type: 'forecast' };
          map[pt.date][`${cat}_forecast`] = pt.forecast;
          map[pt.date][`${cat}_ci`]       = [pt.lower, pt.upper];
        });
      });
    }

    const sorted = Object.values(map).sort((a, b) => a.period.localeCompare(b.period));
    const lastActual = spendingData[spendingData.length - 1]?.period ?? '';
    return { chartData: sorted, separatorDate: lastActual };
  }, [spendingData, forecastResult]);

  // ── Toggle helpers ─────────────────────────────────────────────────────────
  const toggleCat = (cat) =>
    setSelectedCats(p => p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat]);

  const summary = forecastResult?.summary;

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loadingData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading your financial history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* ── Header ── */}
      <div className="border-b border-slate-800 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <Activity size={16} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Spending Forecast</h1>
            <p className="text-xs text-slate-500">{spendingData.length} months of history · {allCats.length} categories</p>
          </div>
        </div>

        <button
          onClick={generateForecast}
          disabled={loadingFc || !spendingData.length}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
        >
          {loadingFc
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Forecasting...</span></>
            : <><TrendingUp size={15} /><span>Generate 3-Month Forecast</span></>
          }
        </button>
      </div>

      <div className="px-6 py-6 space-y-6">

        {/* ── Error banner ── */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-950 border border-red-800 text-red-300 text-sm">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Something went wrong</p>
              <p className="text-red-400 text-xs mt-0.5">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-300">✕</button>
          </div>
        )}

        {/* ── Summary cards (only after forecast) ── */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              icon={Wallet}
              label="Avg Monthly (Last 3m)"
              value={fmt(summary.avg_monthly_expense_last_3m)}
              accent="#6366f1"
            />
            <MetricCard
              icon={BarChart3}
              label="Forecasted Avg Total"
              value={fmt(summary.forecasted_avg_total)}
              sub={`Next ${summary.forecasted_monthly_totals?.length ?? 3} months`}
              accent="#f59e0b"
            />
            <MetricCard
              icon={ArrowUpRight}
              label="Expected Savings"
              value={fmt(summary.expected_savings_next_month)}
              sub={`Income: ${fmt(summary.latest_income)}`}
              accent="#10b981"
            />
            <MetricCard
              icon={TrendingUp}
              label="Fastest Growing"
              value={summary.top_growing_categories?.[0]?.category ?? '—'}
              sub={fmtPct(summary.top_growing_categories?.[0]?.pct_change ?? 0) + ' avg MoM'}
              accent="#ef4444"
            />
          </div>
        )}

        {/* ── Chart card ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {/* Chart toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <BarChart3 size={16} className="text-indigo-400" />
              Spending Analysis
              {forecastResult && (
                <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full ml-1">
                  Forecast active
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* CI toggle */}
              {forecastResult && (
                <button
                  onClick={() => setShowCI(p => !p)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    showCI
                      ? 'bg-indigo-900/50 border-indigo-700 text-indigo-300'
                      : 'border-slate-700 text-slate-500 hover:border-slate-500'
                  }`}
                >
                  {showCI ? 'Hide' : 'Show'} Confidence Bands
                </button>
              )}

              {/* Category filter */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(p => !p)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-xs hover:border-slate-500 transition-all"
                >
                  <span>Categories</span>
                  <span className="bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {selectedCats.length}
                  </span>
                  <ChevronDown size={12} />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-20 p-2">
                    <div className="flex justify-between items-center px-2 py-1 mb-1">
                      <span className="text-xs text-slate-400 font-medium">Filter</span>
                      <div className="flex gap-2">
                        <button onClick={() => setSelectedCats([...allCats])} className="text-xs text-indigo-400 hover:text-indigo-300">All</button>
                        <span className="text-slate-600">·</span>
                        <button onClick={() => setSelectedCats([])} className="text-xs text-indigo-400 hover:text-indigo-300">None</button>
                      </div>
                    </div>
                    {allCats.map(cat => (
                      <div
                        key={cat}
                        onClick={() => toggleCat(cat)}
                        className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-800 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getCategoryColor(cat) }} />
                          <span className="text-sm text-slate-300">{cat}</span>
                        </div>
                        {selectedCats.includes(cat) && <Check size={13} className="text-indigo-400" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 px-5 py-3 border-b border-slate-800/50">
            {allCats.map(cat => (
              <CategoryPill
                key={cat}
                cat={cat}
                active={selectedCats.includes(cat)}
                onClick={toggleCat}
              />
            ))}
          </div>

          {/* Chart */}
          <div className="p-5">
            {selectedCats.length === 0 ? (
              <div className="h-72 flex items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl">
                Select at least one category above
              </div>
            ) : (
              <div style={{ height: 420 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      {selectedCats.map(cat => (
                        <linearGradient key={cat} id={`ci_${cat}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={getCategoryColor(cat)} stopOpacity={0.18} />
                          <stop offset="95%" stopColor={getCategoryColor(cat)} stopOpacity={0.02} />
                        </linearGradient>
                      ))}
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      dataKey="period"
                      tickFormatter={formatMonthLabel}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      axisLine={{ stroke: '#1e293b' }}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `₹${v >= 1000 ? (v/1000).toFixed(1)+'k' : v}`}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<CustomTooltip separatorDate={separatorDate} />}
                    />
                    <Legend
                      formatter={(value) => (
                        <span style={{ color: '#94a3b8', fontSize: 11 }}>{value}</span>
                      )}
                    />

                    {/* Separator between actual and forecast */}
                    {forecastResult && separatorDate && (
                      <ReferenceLine
                        x={separatorDate}
                        stroke="#334155"
                        strokeDasharray="4 4"
                        label={{ value: 'Forecast →', fill: '#475569', fontSize: 10, position: 'insideTopRight' }}
                      />
                    )}

                    {/* CI bands (forecast region) */}
                    {showCI && forecastResult && selectedCats.map(cat => (
                      <Area
                        key={`${cat}_ci`}
                        type="monotone"
                        dataKey={`${cat}_ci`}
                        fill={`url(#ci_${cat})`}
                        stroke="none"
                        legendType="none"
                        tooltipType="none"
                        activeDot={false}
                      />
                    ))}

                    {/* Historical lines */}
                    {selectedCats.map(cat => (
                      <Line
                        key={`${cat}_actual`}
                        type="monotone"
                        dataKey={`${cat}_actual`}
                        name={cat}
                        stroke={getCategoryColor(cat)}
                        strokeWidth={2}
                        dot={{ r: 3, fill: getCategoryColor(cat) }}
                        activeDot={{ r: 5 }}
                        connectNulls={false}
                      />
                    ))}

                    {/* Forecast lines */}
                    {forecastResult && selectedCats.map(cat => (
                      <Line
                        key={`${cat}_forecast`}
                        type="monotone"
                        dataKey={`${cat}_forecast`}
                        name={`${cat} (Forecast)`}
                        stroke={getCategoryColor(cat)}
                        strokeDasharray="5 4"
                        strokeWidth={2}
                        dot={{ r: 3, fill: getCategoryColor(cat), strokeDasharray: 0 }}
                        activeDot={{ r: 5 }}
                        legendType="none"
                        connectNulls={false}
                      />
                    ))}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
            <p className="text-xs text-slate-600 italic mt-2">
              Solid lines — historical · Dashed lines — forecast · Shaded bands — 90% confidence interval
            </p>
          </div>
        </div>

        {/* ── Per-category detail table (only after forecast) ── */}
        {forecastResult?.forecasts && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2">
              <Info size={15} className="text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-200">Per-Category Forecast Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-slate-800">
                    <th className="px-5 py-3 text-left font-medium">Category</th>
                    <th className="px-4 py-3 text-right font-medium">Last Actual</th>
                    <th className="px-4 py-3 text-right font-medium">Avg Historical</th>
                    {forecastResult.forecasts[Object.keys(forecastResult.forecasts).find(k => k !== '__total__')]?.forecasts?.map((_, i) => (
                      <th key={i} className="px-4 py-3 text-right font-medium">
                        Month +{i + 1}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right font-medium">Trend</th>
                    {/* <th className="px-5 py-3 text-right font-medium">Model</th> */}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(forecastResult.forecasts)
                    .filter(([k]) => k !== '__total__')
                    .sort(([, a], [, b]) => b.last_known_value - a.last_known_value)
                    .map(([cat, data]) => (
                      <tr key={cat} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getCategoryColor(cat) }} />
                            <span className="text-slate-200 font-medium">{cat}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-slate-300 font-mono">{fmt(data.last_known_value)}</td>
                        <td className="px-4 py-3 text-right text-slate-500 font-mono">{fmt(data.avg_historical)}</td>
                        {data.forecasts?.map((pt, i) => (
                          <td key={i} className="px-4 py-3 text-right font-mono">
                            <div className="text-slate-200">{fmt(pt.forecast)}</div>
                            <div className="text-xs text-slate-600">{fmt(pt.lower)}–{fmt(pt.upper)}</div>
                          </td>
                        ))}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1.5">
                            <TrendIcon dir={data.trend?.forecast_direction} />
                            <span className="text-xs text-slate-500">
                              {fmtPct(data.trend?.avg_monthly_change_pct)} MoM
                            </span>
                          </div>
                        </td>
                        {/* <td className="px-5 py-3 text-right">
                          <ModelBadge
                            model={data.metrics?.model_used}
                            mape={data.metrics?.mape ?? 0}
                          />
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Growth leaders (only after forecast) ── */}
        {summary?.top_growing_categories?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <ArrowUpRight size={15} className="text-red-400" />
                <h3 className="text-sm font-semibold text-slate-200">Fastest Growing</h3>
              </div>
              <div className="space-y-3">
                {summary.top_growing_categories.map(({ category, pct_change }) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getCategoryColor(category) }} />
                      <span className="text-sm text-slate-300">{category}</span>
                    </div>
                    <span className="text-sm font-semibold text-red-400">{fmtPct(pct_change)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <ArrowDownRight size={15} className="text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-200">Declining / Stable</h3>
              </div>
              <div className="space-y-3">
                {summary.top_shrinking_categories.map(({ category, pct_change }) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getCategoryColor(category) }} />
                      <span className="text-sm text-slate-300">{category}</span>
                    </div>
                    <span className="text-sm font-semibold text-emerald-400">{fmtPct(pct_change)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
 export default Forecast; 

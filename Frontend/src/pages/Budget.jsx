

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
const createBudget = async (budgetData ,togglebtn,setTogglebtn) => {
  try{
    if(togglebtn== true){
      try {
        console.log('Creating budget...', budgetData);
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL_4}/api/v1/budget`, budgetData);
        setTogglebtn(false);
        return response.data;
      } catch (error) {
        console.error('Error creating budget:', error);
        throw error;
      }
    }
    else{
      try {
        const id = localStorage.getItem('id');
        console.log('Updating budget...', budgetData);
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL_4}/api/v1/budget/${id}/edit`, budgetData);
        return response.data;
      } catch (error) {
        console.error('Error updating budget:', error);
        throw error;
      }
    }
 
} catch (error) {
  console.error('Error in budget  function:', error);
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

const AddBudgetModal = ({ isOpen, onClose, onBudgetAdded ,togglebtn ,setTogglebtn}) => {
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

      await createBudget(budgetData,togglebtn,setTogglebtn);
      
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
  const [togglebtn, setTogglebtn] = useState(false);

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
      console.log(data.length)
      setBudgetSummary(data);
      if(data.length === 0) {
       setTogglebtn(true);
      }
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
  const deleteBudget = async () => {
    const id = localStorage.getItem('id');
    if (!id) {
      alert('No budget to delete');
      return;
    }
    try {
      await axios.delete(`${import.meta.env.VITE_APP_API_URL_4}/api/v1/budget/${id}`);
      alert('Budget deleted successfully');
      // setTogglebtn(true);
      fetchBudgetData();
    } catch (error) {
      console.error('Error deleting budget:', error);
      alert('Failed to delete budget. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Budget Planner</h1>
            <p className="text-gray-600">Track and manage your monthly expenses</p>
          </div>
          { togglebtn ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
          >
            <Plus size={18} className="mr-2" />
            Add New Budget
          </button>
          ) : (
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
          >
            Edit Budget
          </button>
          )}
          {!togglebtn &&(
            <button
            onClick={deleteBudget}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
          >
            Delete Budget
          </button>
          )}
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
        togglebtn={togglebtn}
        setTogglebtn={setTogglebtn}
      />
    </div>
  );
}

export default Budget;
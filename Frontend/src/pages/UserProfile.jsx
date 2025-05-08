import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  DollarSign,
  Target,
  ChevronRight,
  PiggyBank,
  TrendingUp,
} from "lucide-react";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: 0,
    gender: "",
    occupation: "",
    monthlyIncome: 0,
    monthlyExpense: 0,
    savings: 0,
    investmentAvenues: [],
    financialGoals: [],
    financialLiteracyScore: 0,
    riskTolerance: "",
    consent: false,
  });

  const email = localStorage.getItem("email");
  const id = localStorage.getItem("id");

  const investmentOptions = [
    "Stocks",
    "Bonds",
    "Mutual Funds",
    "Real Estate",
    "Cryptocurrency",
    "Fixed Deposits",
    "Gold",
  ];

  const goalOptions = [
    "Emergency Fund",
    "Retirement",
    "Home Purchase",
    "Education",
    "Travel",
    "Starting a Business",
    "Debt Free",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here you would typically send the data to your backend
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL_1}/api/v1/users/register`,
      {
        id,
        email,
        ...formData,
      }
    );
    if (response.status === 201) {
      navigate("/dashboard");
    } else {
      alert("Error saving profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
              Complete Your Profile
            </h2>
            <p className="text-secondary-500 dark:text-secondary-400 mt-2">
              Help us personalize your financial journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                <User
                  size={20}
                  className="text-primary-600 dark:text-primary-400"
                />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
                >
                  Occupation
                </label>
                <div className="relative mt-1">
                  <Briefcase
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                    size={18}
                  />
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="pt-6 space-y-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                <DollarSign
                  size={20}
                  className="text-primary-600 dark:text-primary-400"
                />
                Financial Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="monthlyIncome"
                    className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
                  >
                    Monthly Income
                  </label>
                  <div className="relative mt-1">
                    <DollarSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                      size={18}
                    />
                    <input
                      type="number"
                      id="monthlyIncome"
                      name="monthlyIncome"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="monthlyExpense"
                    className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
                  >
                    Monthly Expenses
                  </label>
                  <div className="relative mt-1">
                    <DollarSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                      size={18}
                    />
                    <input
                      type="number"
                      id="monthlyExpense"
                      name="monthlyExpense"
                      value={formData.monthlyExpense}
                      onChange={handleInputChange}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="savings"
                    className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
                  >
                    Current Savings
                  </label>
                  <div className="relative mt-1">
                    <DollarSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                      size={18}
                    />
                    <input
                      type="number"
                      id="savings"
                      name="savings"
                      value={formData.savings}
                      onChange={handleInputChange}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Preferences */}
            <div className="pt-6 space-y-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                <TrendingUp
                  size={20}
                  className="text-primary-600 dark:text-primary-400"
                />
                Investment Preferences
              </h3>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  Select your preferred investment avenues
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {investmentOptions.map((option) => (
                    <label
                      key={option}
                      className="relative flex items-center p-4 rounded-lg border border-gray-200 dark:border-secondary-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-secondary-800/50"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-secondary-700 dark:bg-secondary-800"
                        checked={formData.investmentAvenues.includes(option)}
                        onChange={() =>
                          handleCheckboxChange("investmentAvenues", option)
                        }
                      />
                      <span className="ml-3 text-sm text-secondary-900 dark:text-white">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Goals */}
            <div className="pt-6 space-y-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                <Target
                  size={20}
                  className="text-primary-600 dark:text-primary-400"
                />
                Financial Goals
              </h3>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  Select your financial goals
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {goalOptions.map((goal) => (
                    <label
                      key={goal}
                      className="relative flex items-center p-4 rounded-lg border border-gray-200 dark:border-secondary-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-secondary-800/50"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-secondary-700 dark:bg-secondary-800"
                        checked={formData.financialGoals.includes(goal)}
                        onChange={() =>
                          handleCheckboxChange("financialGoals", goal)
                        }
                      />
                      <span className="ml-3 text-sm text-secondary-900 dark:text-white">
                        {goal}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                <PiggyBank
                  size={20}
                  className="text-primary-600 dark:text-primary-400"
                />
                Financial Literacy Score
              </h3>
              <div>
                <label
                  htmlFor="financialLiteracyScore"
                  className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                >
                  On a scale of 1–10, how financially literate are you?
                </label>
                <input
                  type="number"
                  id="financialLiteracyScore"
                  name="financialLiteracyScore"
                  value={formData.financialLiteracyScore}
                  onChange={handleInputChange}
                  className="input-field"
                  min="1"
                  max="10"
                  required
                />
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                <TrendingUp
                  size={20}
                  className="text-primary-600 dark:text-primary-400"
                />
                Risk Tolerance
              </h3>
              <div className="flex flex-col gap-2">
                {["Low", "Medium", "High"].map((level) => (
                  <label key={level} className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="riskTolerance"
                      value={level.toLowerCase()}
                      checked={formData.riskTolerance === level.toLowerCase()}
                      onChange={handleInputChange}
                      className="form-radio text-primary-600 dark:bg-secondary-800 dark:border-secondary-600"
                    />
                    <span className="text-sm text-secondary-900 dark:text-white">
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      consent: e.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-secondary-700 dark:bg-secondary-800"
                  required
                />
                <span className="text-sm text-secondary-700 dark:text-secondary-300">
                  I consent to the processing of my data for financial analysis
                  purposes.
                </span>
              </label>
            </div>

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="button-primary w-full flex items-center justify-center gap-2 py-2.5"
              >
                <span>Complete Profile</span>
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;

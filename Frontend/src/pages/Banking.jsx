import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building,
  Search,
  Star,
  DollarSign,
  ArrowRightCircle,
  Percent,
  Clock,
  Briefcase,
  CreditCard,
  Landmark,
  Filter,
  Check,
  Sliders,
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
const bankAccounts = [
  {
    id: 1,
    name: "Platinum Checking",
    bank: "Chase Bank",
    logo: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    type: "Checking",
    apy: 0.01,
    minDeposit: 1500,
    monthlyFee: 25,
    waivable: true,
    waiveCondition: "$5,000 minimum daily balance",
    atmFee: 0,
    overdraftFee: 34,
    onlineBanking: true,
    mobileBanking: true,
    features: [
      "No-fee international wire transfers",
      "3 non-Chase ATM fee waivers per month",
      "Interest earning checking",
    ],
  },
  {
    id: 2,
    name: "High-Yield Savings",
    bank: "Ally Bank",
    logo: "https://images.pexels.com/photos/5849559/pexels-photo-5849559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    type: "Savings",
    apy: 3.65,
    minDeposit: 0,
    monthlyFee: 0,
    waivable: false,
    waiveCondition: "",
    atmFee: 0,
    overdraftFee: 25,
    onlineBanking: true,
    mobileBanking: true,
    features: ["No minimum balance", "No monthly fees", "Unlimited deposits"],
  },
  {
    id: 3,
    name: "Premier Money Market",
    bank: "Capital One",
    logo: "https://images.pexels.com/photos/3158900/pexels-photo-3158900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    type: "Money Market",
    apy: 3.12,
    minDeposit: 10000,
    monthlyFee: 15,
    waivable: true,
    waiveCondition: "$15,000 minimum daily balance",
    atmFee: 0,
    overdraftFee: 35,
    onlineBanking: true,
    mobileBanking: true,
    features: [
      "Check writing privileges",
      "Debit card access",
      "Rate increases for higher balances",
    ],
  },
  {
    id: 4,
    name: "Student Checking",
    bank: "Bank of America",
    logo: "https://images.pexels.com/photos/6693658/pexels-photo-6693658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    type: "Checking",
    apy: 0.01,
    minDeposit: 0,
    monthlyFee: 0,
    waivable: false,
    waiveCondition: "",
    atmFee: 0,
    overdraftFee: 10,
    onlineBanking: true,
    mobileBanking: true,
    features: [
      "No monthly fees for students",
      "Free debit card replacement",
      "Access to financial education resources",
    ],
  },
  {
    id: 5,
    name: "CD Special",
    bank: "Discover Bank",
    logo: "https://images.pexels.com/photos/7821486/pexels-photo-7821486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    type: "CD",
    apy: 4.2,
    minDeposit: 2500,
    monthlyFee: 0,
    waivable: false,
    waiveCondition: "",
    atmFee: 0,
    overdraftFee: 0,
    onlineBanking: true,
    mobileBanking: true,
    features: [
      "12-month term",
      "No monthly fees",
      "FDIC insured up to $250,000",
    ],
  },
];

const creditCards = [
  {
    id: 101,
    name: "Premium Rewards Card",
    bank: "American Express",
    logo: "https://images.pexels.com/photos/9660556/pexels-photo-9660556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    type: "Travel",
    annualFee: 99,
    apr: "16.99% - 24.99%",
    introApr: "0% for 12 months",
    rewardsRate: "3% on travel, 2% on dining, 1% on everything else",
    welcomeBonus: "60,000 points after spending $3,000 in first 3 months",
    foreignTransaction: false,
    creditNeeded: "Excellent",
    features: [
      "Priority boarding",
      "Free checked bag",
      "Airport lounge access",
    ],
  },
  {
    id: 102,
    name: "Cash Back Mastercard",
    bank: "Chase",
    logo: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    type: "Cash Back",
    annualFee: 0,
    apr: "14.99% - 23.74%",
    introApr: "0% for 15 months",
    rewardsRate: "3% on groceries, 2% on gas, 1% on everything else",
    welcomeBonus: "$200 after spending $500 in first 3 months",
    foreignTransaction: true,
    creditNeeded: "Good to Excellent",
    features: ["No annual fee", "Cell phone protection", "Purchase protection"],
  },
  {
    id: 103,
    name: "Secured Credit Builder",
    bank: "Discover",
    logo: "https://images.pexels.com/photos/7821486/pexels-photo-7821486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    type: "Secured",
    annualFee: 0,
    apr: "22.99%",
    introApr: "None",
    rewardsRate: "1% cash back on all purchases",
    welcomeBonus: "None",
    foreignTransaction: true,
    creditNeeded: "Bad to Fair",
    features: [
      "No annual fee",
      "Reports to all 3 credit bureaus",
      "Path to unsecured card",
    ],
  },
];

const Banking = () => {
  const [activeTab, setActiveTab] = useState("accounts");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const accountTypes = ["All", "Checking", "Savings", "Money Market", "CD"];
  const cardTypes = [
    "All",
    "Cash Back",
    "Travel",
    "Business",
    "Student",
    "Secured",
  ];

  // Filter bank accounts based on search and type
  const filteredAccounts = bankAccounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.bank.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || account.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Filter credit cards based on search and type
  const filteredCards = creditCards.filter((card) => {
    const matchesSearch =
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.bank.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || card.type === selectedType;
    return matchesSearch && matchesType;
  });

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
            Banking Options
          </h1>
          <p className="text-secondary-500 dark:text-secondary-400">
            Compare and find the best financial products for your needs
          </p>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        variants={itemVariant}
        className="flex space-x-1 bg-gray-100 rounded-lg p-1 dark:bg-secondary-800"
      >
        <button
          onClick={() => {
            setActiveTab("accounts");
            setSelectedType("All");
          }}
          className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "accounts"
              ? "bg-white text-primary-700 shadow dark:bg-secondary-900 dark:text-primary-400"
              : "text-secondary-700 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-200"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Building size={16} />
            Bank Accounts
          </span>
        </button>
        <button
          onClick={() => {
            setActiveTab("cards");
            setSelectedType("All");
          }}
          className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "cards"
              ? "bg-white text-primary-700 shadow dark:bg-secondary-900 dark:text-primary-400"
              : "text-secondary-700 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-200"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <CreditCard size={16} />
            Credit Cards
          </span>
        </button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariant} className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
            />
            <input
              type="text"
              placeholder={`Search ${
                activeTab === "accounts" ? "bank accounts" : "credit cards"
              }...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative min-w-40">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-field appearance-none cursor-pointer pr-10"
              >
                {activeTab === "accounts"
                  ? accountTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))
                  : cardTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
              </select>
              <Filter
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none"
              />
            </div>

            <button className="button-secondary flex items-center gap-2">
              <Sliders size={16} />
              <span className="hidden sm:inline">More Filters</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Account or Card Listings */}
      <motion.div variants={containerVariant} className="space-y-4">
        {activeTab === "accounts" ? (
          filteredAccounts.length > 0 ? (
            filteredAccounts.map((account) => (
              <BankAccountCard key={account.id} account={account} />
            ))
          ) : (
            <div className="glass-card p-10 text-center">
              <p className="text-secondary-500 dark:text-secondary-400">
                No bank accounts match your search criteria.
              </p>
            </div>
          )
        ) : filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <CreditCardCard key={card.id} card={card} />
          ))
        ) : (
          <div className="glass-card p-10 text-center">
            <p className="text-secondary-500 dark:text-secondary-400">
              No credit cards match your search criteria.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const BankAccountCard = ({ account }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div variants={itemVariant} className="glass-card overflow-hidden">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={account.logo}
                alt={`${account.bank} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                {account.name}
              </h3>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                {account.bank}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300">
              {account.type}
            </span>
            {account.apy > 3.0 && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400">
                High APY
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="flex flex-col">
            <span className="text-sm text-secondary-500 dark:text-secondary-400 mb-1 flex items-center gap-1">
              <Percent size={14} />
              Annual Percentage Yield
            </span>
            <span className="text-xl font-bold text-primary-700 dark:text-primary-400">
              {account.apy.toFixed(2)}%
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-secondary-500 dark:text-secondary-400 mb-1 flex items-center gap-1">
              <DollarSign size={14} />
              Minimum Opening Deposit
            </span>
            <span className="text-xl font-bold text-secondary-900 dark:text-white">
              {account.minDeposit === 0
                ? "None"
                : `$${account.minDeposit.toLocaleString()}`}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-secondary-500 dark:text-secondary-400 mb-1 flex items-center gap-1">
              <Clock size={14} />
              Monthly Fee
            </span>
            <span className="text-xl font-bold text-secondary-900 dark:text-white">
              {account.monthlyFee === 0 ? "None" : `$${account.monthlyFee}`}
              {account.waivable && account.monthlyFee > 0 && (
                <span className="text-sm font-normal text-success-600 dark:text-success-400 ml-2">
                  (Waivable)
                </span>
              )}
            </span>
          </div>
        </div>

        {expanded && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-secondary-800">
            <h4 className="font-medium mb-2 text-secondary-900 dark:text-white">
              Key Features
            </h4>
            <ul className="space-y-2">
              {account.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="text-success-600 dark:text-success-400 mt-0.5"
                  />
                  <span className="text-secondary-700 dark:text-secondary-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {account.waivable && account.monthlyFee > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2 text-secondary-900 dark:text-white">
                  Fee Waiver Conditions
                </h4>
                <p className="text-secondary-700 dark:text-secondary-300">
                  {account.waiveCondition}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between mt-4 pt-4 border-t border-gray-100 dark:border-secondary-800">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm"
          >
            {expanded ? "Show less" : "Show more"}
          </button>

          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="button-secondary flex items-center gap-1 text-sm">
              <Star size={16} />
              <span>Compare</span>
            </button>
            <button className="button-primary flex items-center gap-1 text-sm">
              <span>Apply Now</span>
              <ArrowRightCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CreditCardCard = ({ card }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div variants={itemVariant} className="glass-card overflow-hidden">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={card.logo}
                alt={`${card.bank} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                {card.name}
              </h3>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                {card.bank}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300">
              {card.type}
            </span>
            {card.annualFee === 0 && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400">
                No Annual Fee
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="flex flex-col">
            <span className="text-sm text-secondary-500 dark:text-secondary-400 mb-1 flex items-center gap-1">
              <DollarSign size={14} />
              Annual Fee
            </span>
            <span className="text-xl font-bold text-secondary-900 dark:text-white">
              {card.annualFee === 0 ? "None" : `$${card.annualFee}`}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-secondary-500 dark:text-secondary-400 mb-1 flex items-center gap-1">
              <Percent size={14} />
              APR
            </span>
            <span className="text-xl font-bold text-secondary-900 dark:text-white">
              {card.apr}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-secondary-500 dark:text-secondary-400 mb-1 flex items-center gap-1">
              <Star size={14} />
              Welcome Bonus
            </span>
            <span className="text-xl font-bold text-primary-700 dark:text-primary-400">
              {card.welcomeBonus === "None"
                ? "None"
                : card.welcomeBonus.split(" ")[0]}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
            Rewards Rate
          </span>
          <span className="text-base text-secondary-900 dark:text-white">
            {card.rewardsRate}
          </span>
        </div>

        {expanded && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-secondary-800">
            <h4 className="font-medium mb-2 text-secondary-900 dark:text-white">
              Card Benefits
            </h4>
            <ul className="space-y-2">
              {card.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="text-success-600 dark:text-success-400 mt-0.5"
                  />
                  <span className="text-secondary-700 dark:text-secondary-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium mb-2 text-secondary-900 dark:text-white">
                  Intro APR
                </h4>
                <p className="text-secondary-700 dark:text-secondary-300">
                  {card.introApr}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-secondary-900 dark:text-white">
                  Credit Needed
                </h4>
                <p className="text-secondary-700 dark:text-secondary-300">
                  {card.creditNeeded}
                </p>
              </div>
            </div>

            {card.welcomeBonus !== "None" && (
              <div className="mt-4">
                <h4 className="font-medium mb-2 text-secondary-900 dark:text-white">
                  Welcome Bonus Details
                </h4>
                <p className="text-secondary-700 dark:text-secondary-300">
                  {card.welcomeBonus}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between mt-4 pt-4 border-t border-gray-100 dark:border-secondary-800">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm"
          >
            {expanded ? "Show less" : "Show more"}
          </button>

          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="button-secondary flex items-center gap-1 text-sm">
              <Star size={16} />
              <span>Compare</span>
            </button>
            <button className="button-primary flex items-center gap-1 text-sm">
              <span>Apply Now</span>
              <ArrowRightCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banking;

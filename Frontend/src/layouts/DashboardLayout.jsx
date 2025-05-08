import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Home,
  Lightbulb,
  Building,
  UserCircle,
  Menu,
  X,
  BellRing,
  LogOut,
  Search,
  Wallet,
  Target,
  TrendingUp,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // In a real app, add logout logic here
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    navigate("/login" , { replace: true });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/insights":
        return "Financial Insights";
      case "/banking":
        return "Banking Options";
      case "/budget":
        return "Budget Planner";
      case "/transaction":
        return "Transaction History";
      case "/investments":
        return "Investment Portfolio";
      case "/goals":
        return "Savings Goals";
      case "/profile":
        return "Profile Settings";
      default:
        return "WealthWise";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-secondary-950">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-30 w-64 flex-shrink-0 flex flex-col bg-white dark:bg-secondary-900 shadow-lg lg:static lg:shadow-none transform lg:transform-none transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-secondary-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3
              size={28}
              className="text-primary-600 dark:text-primary-400"
            />
            <h1 className="text-xl font-bold text-primary-900 dark:text-white">
              WealthWise
            </h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-800 lg:hidden"
          >
            <X
              size={20}
              className="text-secondary-500 dark:text-secondary-400"
            />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={closeSidebarOnMobile}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/insights"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={closeSidebarOnMobile}
              >
                <Lightbulb size={20} />
                <span>Insights</span>
              </NavLink>
            </li>
            <li>
              {/* <NavLink
                to="/banking"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarOnMobile}
              >
                <Building size={20} />
                <span>Banking</span>
              </NavLink> */}
            </li>
            <li>
              <NavLink
                to="/budget"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={closeSidebarOnMobile}
              >
                <Wallet size={20} />
                <span>Budget</span>
              </NavLink>
            </li>
            <li>
            <NavLink
                to="/transaction"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={closeSidebarOnMobile}
              >
                <TrendingUp size={20} />
                <span>Transaction</span>
              </NavLink>
            </li>
            <li>
            <NavLink
                to="/forecast"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={closeSidebarOnMobile}
              >
                <TrendingUp size={20} />
                <span>Forecast</span>
              </NavLink>
            </li>
            {/* <li>

              <NavLink
                to="/investments"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={closeSidebarOnMobile}
              >
                <TrendingUp size={20} />
                <span>Investments</span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/goals"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={closeSidebarOnMobile}
              >
                <Target size={20} />
                <span>Goals</span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={closeSidebarOnMobile}
              >
                <UserCircle size={20} />
                <span>Profile</span>
              </NavLink>
            </li> */}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-secondary-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-secondary-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 dark:text-secondary-300 dark:hover:bg-secondary-800/80 dark:hover:text-red-400"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-secondary-900 shadow-sm border-b border-gray-100 dark:border-secondary-800">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-800 lg:hidden"
              >
                <Menu
                  size={20}
                  className="text-secondary-500 dark:text-secondary-400"
                />
              </button>
              <h1 className="text-xl font-semibold text-secondary-900 dark:text-white">
                {getPageTitle()}
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              {/* <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg text-sm border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none dark:bg-secondary-800 dark:border-secondary-700 dark:text-white w-48 lg:w-64"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                />
              </div> */}

              {/* <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-800 relative">
                <BellRing
                  size={20}
                  className="text-secondary-500 dark:text-secondary-400"
                />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full"></span>
              </button> */}

              <ThemeToggle />

              <button className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-primary-400 flex items-center justify-center text-white font-semibold">
                  JD
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-secondary-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Smartphone,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  CheckCircle,
  HelpCircle,
  FileText,
  EyeOff,
  EyeIcon,
  CreditCard,
  Settings,
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

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto"
    >
      <motion.div variants={itemVariant}>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-secondary-500 dark:text-secondary-400 mt-1">
          Manage your account settings and preferences
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <motion.div
          variants={itemVariant}
          className="glass-card p-4 divide-y divide-gray-100 dark:divide-secondary-800 lg:col-span-1"
        >
          <nav className="space-y-1 pb-4">
            <button
              onClick={() => setActiveSection("profile")}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                activeSection === "profile"
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                  : "text-secondary-700 hover:bg-gray-50 dark:text-secondary-300 dark:hover:bg-secondary-800/80"
              }`}
            >
              <User size={20} />
              <span>Personal Information</span>
            </button>
            <button
              onClick={() => setActiveSection("security")}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                activeSection === "security"
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                  : "text-secondary-700 hover:bg-gray-50 dark:text-secondary-300 dark:hover:bg-secondary-800/80"
              }`}
            >
              <Shield size={20} />
              <span>Security</span>
            </button>
            <button
              onClick={() => setActiveSection("notifications")}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                activeSection === "notifications"
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                  : "text-secondary-700 hover:bg-gray-50 dark:text-secondary-300 dark:hover:bg-secondary-800/80"
              }`}
            >
              <Bell size={20} />
              <span>Notifications</span>
            </button>
            <button
              onClick={() => setActiveSection("payment")}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                activeSection === "payment"
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                  : "text-secondary-700 hover:bg-gray-50 dark:text-secondary-300 dark:hover:bg-secondary-800/80"
              }`}
            >
              <CreditCard size={20} />
              <span>Payment Methods</span>
            </button>
          </nav>

          <div className="pt-4">
            <button className="flex items-center gap-3 w-full p-3 rounded-lg text-left text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={itemVariant}
          className="glass-card p-6 lg:col-span-3"
        >
          {/* Personal Information */}
          {activeSection === "profile" && (
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">
                Personal Information
              </h2>

              <form className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue="John"
                      className="input-field"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      defaultValue="Doe"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500"
                      size={18}
                    />
                    <input
                      type="email"
                      id="email"
                      defaultValue="john.doe@example.com"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Smartphone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500"
                      size={18}
                    />
                    <input
                      type="tel"
                      id="phone"
                      defaultValue="(555) 123-4567"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="timezone"
                    className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                  >
                    Timezone
                  </label>
                  <select id="timezone" className="input-field">
                    <option>(UTC-08:00) Pacific Time (US & Canada)</option>
                    <option>(UTC-07:00) Mountain Time (US & Canada)</option>
                    <option>(UTC-06:00) Central Time (US & Canada)</option>
                    <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                    <option>(UTC+00:00) UTC</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" className="button-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === "security" && (
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">
                Security Settings
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                  Change Password
                </h3>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                    >
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500"
                        size={18}
                      />
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        className="input-field pl-10 pr-10"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 hover:text-secondary-600 dark:hover:text-secondary-300"
                        tabIndex={-1}
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <EyeIcon size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500"
                        size={18}
                      />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        className="input-field pl-10 pr-10"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 hover:text-secondary-600 dark:hover:text-secondary-300"
                        tabIndex={-1}
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <EyeIcon size={18} />
                        )}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                      Password must be at least 8 characters and include a
                      number and a special character.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="button-primary">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-secondary-800">
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                  Two-Factor Authentication
                </h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-secondary-800">
                  <div className="flex items-center gap-4">
                    <Shield
                      size={24}
                      className="text-primary-600 dark:text-primary-400"
                    />
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <button className="button-primary text-sm">Enable</button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-secondary-800 mt-6">
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                  Login Sessions
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-secondary-800">
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white">
                        Current Session
                      </p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">
                        Chrome on MacOS • IP: 192.168.1.4 • Last active: Just
                        now
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-secondary-800">
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white">
                        Mobile App
                      </p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">
                        iPhone 13 • IP: 172.16.0.2 • Last active: Yesterday at
                        3:42 PM
                      </p>
                    </div>
                    <button className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeSection === "notifications" && (
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">
                Notification Preferences
              </h2>

              <div className="space-y-6">
                <NotificationSetting
                  title="Financial Insights"
                  description="Get notified about new personalized insights and recommendations"
                  emailChecked={true}
                  pushChecked={true}
                />
                <NotificationSetting
                  title="Account Activity"
                  description="Receive notifications for logins, password changes, and security alerts"
                  emailChecked={true}
                  pushChecked={true}
                />
                <NotificationSetting
                  title="Budget Alerts"
                  description="Be notified when you're approaching or exceeding budget limits"
                  emailChecked={true}
                  pushChecked={true}
                />
                <NotificationSetting
                  title="Bill Reminders"
                  description="Get reminded about upcoming bill payments and due dates"
                  emailChecked={true}
                  pushChecked={false}
                />
                <NotificationSetting
                  title="Banking Opportunities"
                  description="Receive updates on better interest rates and banking offers"
                  emailChecked={false}
                  pushChecked={false}
                />
                <NotificationSetting
                  title="Educational Content"
                  description="Learn about financial concepts and strategies through our newsletter"
                  emailChecked={false}
                  pushChecked={false}
                />
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-secondary-800 mt-6">
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                  Email Frequency
                </h3>
                <div className="max-w-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="radio"
                      id="daily"
                      name="emailFrequency"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-secondary-700 dark:bg-secondary-800"
                    />
                    <label
                      htmlFor="daily"
                      className="text-secondary-900 dark:text-white"
                    >
                      Daily summary
                    </label>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="radio"
                      id="weekly"
                      name="emailFrequency"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-secondary-700 dark:bg-secondary-800"
                      defaultChecked
                    />
                    <label
                      htmlFor="weekly"
                      className="text-secondary-900 dark:text-white"
                    >
                      Weekly digest (recommended)
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="realtime"
                      name="emailFrequency"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-secondary-700 dark:bg-secondary-800"
                    />
                    <label
                      htmlFor="realtime"
                      className="text-secondary-900 dark:text-white"
                    >
                      Real-time notifications
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button type="submit" className="button-primary">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Payment Methods */}
          {activeSection === "payment" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
                  Payment Methods
                </h2>
                <button className="button-primary flex items-center gap-1 text-sm">
                  <span>Add Payment Method</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg border border-gray-200 dark:border-secondary-800">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-secondary-800">
                      <CreditCard
                        size={20}
                        className="text-primary-600 dark:text-primary-400"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white flex items-center gap-2">
                        •••• •••• •••• 4242
                        <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                          Default
                        </span>
                      </p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">
                        Visa • Expires 04/25
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-secondary-700 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-800">
                      <Settings size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg border border-gray-200 dark:border-secondary-800">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-secondary-800">
                      <CreditCard
                        size={20}
                        className="text-secondary-600 dark:text-secondary-400"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white">
                        •••• •••• •••• 5678
                      </p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">
                        Mastercard • Expires 12/24
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-secondary-700 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-800">
                      <Settings size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-secondary-800 mt-8 pt-6">
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                  Billing Address
                </h3>
                <form className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="addressLine1"
                        className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                      >
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        id="addressLine1"
                        defaultValue="123 Main Street"
                        className="input-field"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="addressLine2"
                        className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                      >
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        id="addressLine2"
                        defaultValue="Apt 4B"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        defaultValue="San Francisco"
                        className="input-field"
                      />
                    </div>
                    <div className="w-full sm:w-1/4">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                      >
                        State
                      </label>
                      <select id="state" className="input-field">
                        <option>CA</option>
                        <option>NY</option>
                        <option>TX</option>
                        <option>FL</option>
                        <option>IL</option>
                      </select>
                    </div>
                    <div className="w-full sm:w-1/4">
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5"
                      >
                        Zip Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        defaultValue="94103"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button type="submit" className="button-primary">
                      Update Billing Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Help Resources */}
      <motion.div
        variants={itemVariant}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle
              size={20}
              className="text-primary-600 dark:text-primary-400"
            />
            <h3 className="font-semibold text-secondary-900 dark:text-white">
              Need Help?
            </h3>
          </div>
          <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-3">
            Contact our support team for assistance with your account or
            services.
          </p>
          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium flex items-center gap-1">
            <span>View Support Options</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <FileText
              size={20}
              className="text-primary-600 dark:text-primary-400"
            />
            <h3 className="font-semibold text-secondary-900 dark:text-white">
              Documentation
            </h3>
          </div>
          <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-3">
            Learn more about how to use all the features and services available
            to you.
          </p>
          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium flex items-center gap-1">
            <span>Browse Documentation</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle
              size={20}
              className="text-primary-600 dark:text-primary-400"
            />
            <h3 className="font-semibold text-secondary-900 dark:text-white">
              Privacy & Terms
            </h3>
          </div>
          <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-3">
            Review our privacy policy, terms of service, and data practices.
          </p>
          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium flex items-center gap-1">
            <span>View Legal Documents</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const NotificationSetting = ({
  title,
  description,
  emailChecked,
  pushChecked,
}) => {
  const [email, setEmail] = useState(emailChecked);
  const [push, setPush] = useState(pushChecked);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-b border-gray-100 dark:border-secondary-800 last:border-0">
      <div>
        <h4 className="font-medium text-secondary-900 dark:text-white mb-1">
          {title}
        </h4>
        <p className="text-sm text-secondary-500 dark:text-secondary-400">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={email}
            onChange={() => setEmail(!email)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-secondary-700 dark:bg-secondary-800"
          />
          <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Email
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={push}
            onChange={() => setPush(!push)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-secondary-700 dark:bg-secondary-800"
          />
          <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Push
          </span>
        </label>
      </div>
    </div>
  );
};

export default Profile;

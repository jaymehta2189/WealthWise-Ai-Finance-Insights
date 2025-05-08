import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Lightbulb, CreditCard, Shield } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Left side - Brand & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-900 to-primary-600 text-white p-12 flex-col justify-between">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <BarChart3 size={32} className="text-white" />
            <h1 className="text-2xl font-bold">WealthWise</h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold mb-6">Smart financial decisions start here</h2>
            <p className="text-primary-100 text-lg mb-12">
              WealthWise uses AI to analyze your finances and provide personalized recommendations to help you save, spend, and invest smarter.
            </p>
            
            <div className="space-y-6">
              <FeatureItem 
                icon={<BarChart3 size={24} />}
                title="Personalized Insights"
                description="Get tailored financial recommendations based on your spending habits."
              />
              <FeatureItem 
                icon={<Lightbulb size={24} />}
                title="AI-Powered Advice"
                description="Receive smart tips to improve your financial health and achieve goals."
              />
              <FeatureItem 
                icon={<CreditCard size={24} />}
                title="Banking Options"
                description="Compare and find the best banking products for your needs."
              />
              <FeatureItem 
                icon={<Shield size={24} />}
                title="Security First"
                description="Your financial data is protected with bank-level encryption."
              />
            </div>
          </motion.div>
        </div>
        
        <div className="text-sm text-primary-100">
          © 2025 WealthWise. All rights reserved.
        </div>
      </div>
      
      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-12">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        
        <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
          <BarChart3 size={28} className="text-primary-600 dark:text-primary-400" />
          <h1 className="text-2xl font-bold text-primary-900 dark:text-white">WealthWise</h1>
        </div>
        
        <div className="flex flex-1 items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};



const FeatureItem= ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-start gap-4"
  >
    <div className="p-2 rounded-full bg-white/10">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-primary-100">{description}</p>
    </div>
  </motion.div>
);

export default AuthLayout;
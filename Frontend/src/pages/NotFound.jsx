import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-secondary-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full glass-card p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
            <AlertTriangle size={48} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Page not found</h1>
        <p className="text-secondary-600 dark:text-secondary-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="button-primary flex items-center justify-center gap-2"
          >
            <Home size={18} />
            <span>Go to Dashboard</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="button-secondary flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL_1}/api/v1/users/signin`, {
        email,
        password
      });
    console.log(response);
    if(response){
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('email', response.data.email);
      setIsLoading(false);
      navigate('/dashboard');
    }else{
      setIsLoading(false);
      alert('Error logging in. Please try again.');
    }

    }catch (error) {
      setIsLoading(false);
      alert('Error logging in. Please try again.');
    }
    
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">Welcome back</h2>
        <p className="text-secondary-500 dark:text-secondary-400 mt-2">
          Log in to access your financial dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500" size={18} />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pl-10"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
              Password
            </label>
            <a href="#" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500" size={18} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pl-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 hover:text-secondary-600 dark:hover:text-secondary-300"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading}
          className="button-primary w-full flex items-center justify-center space-x-2 py-2.5"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <span>Log in</span>
              <ArrowRight size={18} />
            </>
          )}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-secondary-600 dark:text-secondary-400">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
        >
          Sign up
        </Link>
      </p>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-secondary-800">
        <p className="text-xs text-center text-secondary-500 dark:text-secondary-500">
          By logging in, you agree to our{' '}
          <a href="#" className="text-primary-600 hover:underline dark:text-primary-400">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-primary-600 hover:underline dark:text-primary-400">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
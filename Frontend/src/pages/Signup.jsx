import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL_1}/api/v1/users/signup`, {
      name,
      email,
      password,
    });
    console.log(response);
    if(response){
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('email', response.data.email);
      setIsLoading(false);
      navigate('/complete-profile');
    }else{
      setIsLoading(false);
      alert('Error signing up. Please try again.');
    }
  }catch (error) {
    
      // setIsLoading(false);
      alert('Error signing up. Please try again.');
    }
  }
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">Create an account</h2>
        <p className="text-secondary-500 dark:text-secondary-400 mt-2">
          Start your financial wellness journey today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500" size={18} />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field pl-10"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

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
          <label htmlFor="password" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Password
          </label>
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
              minLength={8}
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
          <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
            Must be at least 8 characters long
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading}
          className="button-primary w-full flex items-center justify-center space-x-2 py-2.5 mt-2"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <span>Sign up</span>
              <ArrowRight size={18} />
            </>
          )}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-secondary-600 dark:text-secondary-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
        >
          Log in
        </Link>
      </p>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-secondary-800">
        <p className="text-xs text-center text-secondary-500 dark:text-secondary-500">
          By signing up, you agree to our{' '}
          <a href="#" className="text-primary-600 hover:underline dark:text-primary-400">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-primary-600 hover:underline dark:text-primary-400">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};


export default Signup;
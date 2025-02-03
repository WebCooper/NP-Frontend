import { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {authContext} from '../context/AuthContext.tsx'
import { useNavigate } from 'react-router-dom';
import * as React from "react";
import {loginTeacher} from "../lib/utils/auth/authService.ts";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(authContext)
  const navigate = useNavigate()
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await loginTeacher({email, password})

      console.log(result)
      dispatch({
        type : 'LOGIN_SUCCESS',
        payload:{
          user: {
            id: result.user._id,
            name: result.user.name,
          },
          token:result.token
        },
      });
      
      toast.success('Login successful!');
      navigate('/teacher-home')

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder='Enter Your Email'
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder='Enter Your Password'
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Teacher Login
          </button>
          <div className='pt-5'>
            <h2>Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></h2>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

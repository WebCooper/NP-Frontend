import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      const response = await axios.post(`${baseUrl}/api/user/register`, {
        name,
        email,
        password,
        confirmPassword,
      });
      toast.success(response.data.message);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error('Registration failed: ' + (error.response?.data?.error || error.message));
      } else {
        toast.error('Registration failed: ' + error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="name"
              placeholder='Enter Your Name'
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder='Enter Your Email'
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder='Enter Your Password'
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="confirmPassword"
              placeholder='Confirm Your Password'
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Teacher Register
          </button>
          <div className='pt-4'>
            <h2 className='text-center'>Already have an account? <a className='text-blue-600' href="/login">Login</a></h2>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;

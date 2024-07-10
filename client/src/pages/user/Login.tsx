import React from 'react'
import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      toast.error('Please enter your password');
      return;
    }

    // Handle login logic here
    console.log('Logging in user:', { email, password });
    toast.success('Login successful!');

    // Clear form fields
    setEmail('');
    setPassword('');
  };
  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              <FaEnvelope className="inline-block mr-2" /> Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              <FaLock className="inline-block mr-2" /> Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

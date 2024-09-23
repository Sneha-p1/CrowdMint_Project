import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });

    if (res.ok) {
      toast.success("Logged in Successfully");
      return navigate("/dashboard");
    } else {
      toast.error("Please check your credentials");
      return navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-500 via-purple-300 to-pink-200">
      <div className="w-1/4 bg-gray-600 h-screen shadow-xl flex items-center justify-center">
        <div className="text-white text-2xl font-semibold text-center">
          Welcome back
          <br />
          <br />
          Sign in to your Account
        </div>
      </div>
      <div className="w-3/4 p-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white bg-opacity-60 backdrop-blur-lg rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Your Account Details</h1>
          <form onSubmit={loginSubmit} className="text-lg">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter A Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
           
            <button
              type="submit"
              className="w-full bg-green-400 text-white py-2 px-4 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign In
            </button>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:text-blue-800">
                  Sign Up
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

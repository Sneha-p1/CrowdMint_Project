import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const signupSubmit = async (userDetails) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (res.ok) {
      toast.success("Signup successful");
      return navigate("/login");
    } else {
      toast.error("Please check the input data");
      return navigate("/signup");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const userDetails = {
      name,
      password,
      email,
    };

    signupSubmit(userDetails);
  };

  return (
    
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-500 via-purple-300 to-pink-200 " >
      
      <div className="w-1/4 bg-gray-600 h-screen shadow-xl flex items-center justify-center">
        <div className="text-white text-2xl font-semibold text-center">
          Welcome to CrowdMint
          <br />
          <br />
          Create an Account
        </div>
      </div>
      <div className="w-3/4 p-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white bg-opacity-60 backdrop-blur-lg rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Your Account Details</h1>
          <form onSubmit={submitForm} className="text-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
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
              Sign Up
            </button>
            <div className="mt-4 text-center">
              <a href="/login" className="text-blue-600 hover:text-blue-800 text-sm">
                Already have an account? Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;

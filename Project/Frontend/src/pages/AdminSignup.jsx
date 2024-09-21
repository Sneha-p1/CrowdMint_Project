import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupSubmit = async (adminDetails) => {
    const res = await fetch("/api/adminsignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminDetails),
    });

    console.log(res);
    if (res.ok) {
      toast.success("Signup successful");
      return navigate("/adminlogin");
    } else {
      toast.error("Please check the input data");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const adminDetails = {
      email,
      password,
    };

    signupSubmit(adminDetails);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/4 bg-gray-600  h-screen shadow-lg flex items-center justify-center">
        <div className="text-white text-2xl font-semibold">
          Admin Sign Up
          <br />
          <span className="text-lg">Create an Account</span>
        </div>
      </div>
      <div className="w-3/4 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white bg-opacity-40 backdrop-blur-lg rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Admin Sign Up</h1>
          <form onSubmit={submitForm}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter A Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link to="/adminlogin" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout';

const AdminDash = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('api/totalusers', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setTotalUsers(data.userCount);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-1/4 bg-white border-r border-gray-300 shadow-md h-screen">
        <div className="p-4 border-b border-gray-300 bg-green-300">
          <Link to='/admindash' className="text-lg font-semibold text-gray-700 hover:text-gray-900">
            Admin Dashboard
          </Link>
        </div>
        <nav className="p-4 border-b border-gray-300">
          <Link to="/admin/allusers" className="text-lg font-semibold text-gray-700 hover:text-gray-900">
            View Users
          </Link>
        </nav>
        <div className="p-4">
          <Logout />
        </div>
      </aside>
      <main className="flex-1 p-8">
        <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="bg-green-100 border-b border-gray-200 p-4 text-center">
            <span className="text-2xl font-bold text-gray-700">Total Users</span>
          </div>
          <div className="p-4 text-center">
            <p id="users" className="text-4xl font-bold text-gray-800">{totalUsers}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDash;

import React from 'react';
import img from '../assets/logo.png';
import Logout from './Logout';
import { Link } from 'react-router-dom';

const UserNav = () => {
  return (
    <div className="bg-gray-800 p-4 h-16 shadow-lg flex items-center justify-between px-6">
      {/* Logo and Branding */}
      <div className="flex items-center">
        <Link to="/dashboard">
          <img src={img} alt="CrowdMint Logo" className="h-12 w-12" />
        </Link>
        <span className="ml-3 text-white text-2xl font-semibold">CrowdMint</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-8 items-center text-white">
        <Link to="/projects" className="hover:text-gray-200 transition-colors duration-300">
          View Projects
        </Link>
        {/* <Link to="/new-project" className="hover:text-gray-200 transition-colors duration-300">
          Create Project
        </Link> */}
        <Logout />
      </nav>
    </div>
  );
};

export default UserNav;

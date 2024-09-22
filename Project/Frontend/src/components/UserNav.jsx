import React from 'react';
import img from '../assets/logo.png';
import Logout from './Logout';
import { Link } from 'react-router-dom';

const UserNav = () => {
  return (
    <div className="bg-gray-900 p-4 shadow-lg flex flex-col md:flex-row items-center justify-between px-6">
    
      <div className="flex items-center mb-4 md:mb-0">
        <Link to="/dashboard">
          <img src={img} alt="CrowdMint Logo" className="h-12 w-28 md:h-14 md:w-32" />
        </Link>
      </div>

   
      <nav className="flex flex-col md:flex-row md:space-x-8 items-center text-white">
        <Link to="/projects" className="mb-2 md:mb-0 hover:text-gray-200 transition-colors duration-300">
          View Projects
        </Link>
        <Logout />
      </nav>
    </div>
  );
};

export default UserNav;

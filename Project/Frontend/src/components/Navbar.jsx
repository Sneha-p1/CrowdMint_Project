import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/logo.png'; // Assuming you have a logo

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
         
          <div className="flex items-center">
            <img src={img} alt="CrowdMint Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-white text-xl font-bold">CrowdMint</h1>
          </div>
          
          
          <div className="flex space-x-4">
            <Link to="/adminsignup">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                Admin
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
                User
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

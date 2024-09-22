import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/logo.png';

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
         
          <div className="flex items-center">
            <img src={img} alt="CrowdMint Logo" className="h-12 w-32 md:h-14 md:w-36 mr-2" />
            {/* <h1 className="text-white text-xl font-bold">CrowdMint</h1> */}
          </div>

          <div className="hidden md:flex space-x-4">
            <Link to='/Topprojects'>
              <button
                className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200"
              >
                Top Projects
              </button>
            </Link>
          </div>


          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      
      <div className="md:hidden bg-gray-800">
        <div className="flex flex-col items-center space-y-4 py-4">
          <Link to='/Topprojects'>
            <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200">
              Top Projects
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

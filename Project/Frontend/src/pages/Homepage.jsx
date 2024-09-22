import React from 'react';
import DisplayProjects from '../components/DisplayProjects';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <>
      
      <div 
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url('/src/assets/Images/bg.jpg')`}}  // Adjust the path to your image
      >
       
        <div className="bg-slate-100 bg-opacity-80 mx-4 my-6 md:mx-12 lg:mx-16 p-6 md:p-10 rounded-lg shadow-2xl text-center">
          <p className="text-2xl sm:text-3xl md:text-2xl lg:text-2xl font-bold">
            Where Innovation Meets Support.
          </p>
        </div>

        
        <div className="space-y-4 mt-6">
          <Link to='/signup'>
            <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-green-600 hover:text-white">
              Go to CrowdMint
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Homepage;

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
        <div className="text-center px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 md:mb-10">
            Where Innovation <br className="hidden sm:block"/> Meets Support.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto">
            Decentralized application that allows users to create and fund <br className="hidden sm:block"/> 
            projects securely and transparently on the blockchain.
          </p>
        </div>

        <div className="space-y-4 mt-8">
          <Link to='/signup'>
            <button className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-black text-sm sm:text-base rounded-full hover:bg-green-600 hover:text-white transition-all duration-300">
              Go to CrowdMint
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Homepage;

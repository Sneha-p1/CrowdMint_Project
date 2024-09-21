import React from 'react';
import DisplayProjects from '../components/DisplayProjects';

const Homepage = () => {
  return (
    <>
      {/* Responsive header section */}
      <div className="bg-slate-100 mx-4 my-6 md:mx-12 lg:mx-16 p-6 md:p-10 rounded-lg shadow-2xl text-center">
        <p className="text-2xl sm:text-3xl md:text-2xl lg:text-2xl font-bold">
          Where Innovation Meets Support.
        </p>
      </div>

      {/* Responsive project display section */}
      <div className="px-2 md:px-6 lg:px-10">
        <DisplayProjects />
      </div>
    </>
  );
};

export default Homepage;

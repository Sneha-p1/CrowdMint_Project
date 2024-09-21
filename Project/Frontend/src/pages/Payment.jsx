// import React from 'react'

// const Payment = () => {
//   return (
//     <>
//         <div className="bg-green-500 h-[60px]">
//         <p className="text-2xl p-3 font-bold">PAYNET GATEWAY</p>
//     </div>

//     <div>
//         <div className="h-screen bg-gradient-to-r from-cyan-100 to-green-100 text-2xl items-center">
//             <h1 className='font-bold text-center mt-[2rem]'>Payment Successfully Done!</h1>
//             <h2 className='text-center mt-[2rem]'>Congratulations! You have helped someone achieve their dream. We value your contribution to the project.</h2>
//         </div>

//     </div>
//     </>
//   )
// }

// export default Payment

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const { title, amount } = location.state || {};

  return (
    <>
      <div className="bg-green-500 h-[60px]">
        <p className="text-2xl p-3 font-bold">PAYNET GATEWAY</p>
      </div>

      <div className="h-screen bg-gradient-to-r from-cyan-100 to-green-100 text-2xl items-center">
        <h1 className='font-bold text-center mt-[2rem]'>Payment Successfully Done!</h1>
        <h2 className='text-center mt-[2rem]'>
          Congratulations! You have helped someone achieve their dream. We value your contribution to the project.
        </h2>
        <div className='text-center mt-[2rem]'>
          <p className='font-medium'>Project Title: {title}</p>
          <p className='font-medium'>Amount Donated: ₹{amount}</p>
        </div>
        <div className='w-[200px] mx-[700px] mt-6'>
        <Link to='/dashboard' className='w-[200px] text-xs border-2 bg-green-300 p-2 rounded-lg drop-shadow-lg hover:bg-green-500'>Head to Dashboard</Link>
        </div>
        
      </div>
    </>
  );
}

export default Payment;

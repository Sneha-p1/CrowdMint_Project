import React, { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import CrowdMint from "/src/scdata/CrowdMint.json";

const Fundraise = ({ signer }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const contractAddress = '0xd3f5A8D1bC421c38F2EBD4f03C0fCD245797e911';

  const submitProject = async (e) => {
    e.preventDefault();
    try {
      const contract = new ethers.Contract(contractAddress, CrowdMint.abi, signer);
      
      // Use targetAmount directly (assuming it's already in the correct format)
      const tx = await contract.createProject(title, description, targetAmount);
      await tx.wait();

      toast.success("Project successfully added to the blockchain");
      setTitle('');
      setDescription('');
      setTargetAmount('');
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project: " + error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 '>
      <div className='w-full max-w-md '>
        <form onSubmit={submitProject} className='mt-8 space-y-6'>
          <div className='rounded-lg shadow-lg p-8 bg-white'> {/* Added bg-white for form background */}
            <h1 className='text-3xl font-extrabold text-center text-gray-900'>
              Create a New Project
            </h1>

            <div className='mb-4'>
              <label className='block text-lg font-medium text-gray-700 mt-4'>
                Project Title
              </label>
              <input 
                type="text" 
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                required 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              />
            </div>

            <div className='mb-4'>
              <label className='block text-lg font-medium text-gray-700'>
                Project Description
              </label>
              <textarea 
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                rows="4" 
                required 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label className='block text-lg font-medium text-gray-700'>
                Target Amount (in WEI)
              </label>
              <input 
                type="text" 
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                required 
                value={targetAmount} 
                onChange={(e) => setTargetAmount(e.target.value)} 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Fundraise;

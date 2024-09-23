import React, { useState } from 'react';
import { ethers } from 'ethers'; 
import CrowdMint from '/src/scdata/CrowdMint.json'; 
import { CrowdMintCrowd } from '/src/scdata/deployed_addresses.json'; 
import { toast } from 'react-toastify'; 
import { useParams } from 'react-router-dom';
import AllpNav from '../components/AllpNav';

const Donate = () => {
  const { projectId } = useParams(); 
  const [amount, setAmount] = useState(''); 
  const [loading, setLoading] = useState(false);

  const donateToProject = async () => {
    try {
      setLoading(true);
      console.log(projectId);

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); 
      const signer = await provider.getSigner(); 

      const contract = new ethers.Contract(CrowdMintCrowd, CrowdMint.abi, signer);

      const tx = await contract.donateToProject(projectId, {
        value: ethers.parseEther(amount), 
      });

      await tx.wait(); 

      toast.success('Donation successful!');
    } catch (error) {
      console.error('Donation failed:', error);
      toast.error('Donation failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AllpNav />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
          <h1 className="text-3xl font-bold text-center mb-6">Donate to Project {projectId}</h1>
          <p className="text-gray-600 text-center mb-4">
            Enter the amount you would like to donate to this project in Ether.
          </p>
          <input
            type="text"
            placeholder="Enter donation amount in Ether"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          />
          <button
            onClick={donateToProject}
            className={`w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Donate'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Donate;

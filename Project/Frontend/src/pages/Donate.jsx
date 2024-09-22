import React, { useState } from 'react';
import { ethers } from 'ethers'; // You don't need to import BrowserProvider separately
import CrowdMint from '/src/scdata/CrowdMint.json'; // ABI of your contract
import { CrowdMintCrowd } from '/src/scdata/deployed_addresses.json'; // Deployed contract address
import { toast } from 'react-toastify'; // Notification library
import { useParams } from 'react-router-dom';

const Donate = () => {
  const { projectId } = useParams(); // Get the project ID from the URL
  const [amount, setAmount] = useState(''); // Assuming amount is in Ether
  const [loading, setLoading] = useState(false);

  const donateToProject = async () => {
    try {
      setLoading(true);
      console.log(projectId);

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request MetaMask connection if not already connected
      const signer = await provider.getSigner(); // Get the signer (user's wallet)
      
      // Initialize the contract
      const contract = new ethers.Contract(CrowdMintCrowd, CrowdMint.abi, signer);

      // Call the smart contract function to donate to the project
      const tx = await contract.donateToProject(projectId, {
        value: amount, // Pass the Wei-converted amount
      });

      await tx.wait(); // Wait for the transaction to be confirmed

      toast.success('Donation successful!');
    } catch (error) {
      console.error('Donation failed:', error);
      toast.error('Donation failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Donate to Project {projectId}</h1>
      <input
        type="text"
        placeholder="Enter donation amount in Ether"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
      />
      <button
        onClick={donateToProject}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Donate'}
      </button>
    </div>
  );
};

export default Donate;

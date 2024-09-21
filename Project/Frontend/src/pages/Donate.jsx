import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import CrowdMint from '/src/scdata/CrowdMint.json';
import { toast } from 'react-toastify';

const Donate = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [signer, setSigner] = useState(null); // State to hold the signer
  const { id } = useParams(); // Project ID from URL
  const navigate = useNavigate();

  const contractAddress = '0xd3f5A8D1bC421c38F2EBD4f03C0fCD245797e911'; // Your contract address

  // Connect to MetaMask
  const connectToMetamask = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request wallet connection
      const signerInstance = await provider.getSigner(); // Get the signer
      setSigner(signerInstance); // Set the signer in the state
      toast.success('Wallet connected successfully');
      console.log("Connected signer address:", await signerInstance.getAddress());
    } catch (error) {
      console.error("Failed to connect MetaMask:", error);
      toast.error('MetaMask connection failed');
    }
  };

  // Fetch the project title when component mounts
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum); // Provider for reading data
        const contract = new ethers.Contract(contractAddress, CrowdMint.abi, provider);
        const projects = await contract.getProjects();
        const project = projects[id];
        setTitle(project.title); // Set the project title
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    
    fetchTitle();
  }, [id]);

  const submitDonation = async (e) => {
    e.preventDefault();

    // Check if the signer is available (wallet connected)
    if (!signer) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      // Instantiate contract with the signer to send a transaction
      const contract = new ethers.Contract(contractAddress, CrowdMint.abi, signer);

      // Convert the donation amount to Wei (smallest unit of ETH)
      const weiAmount = ethers.parseEther(amount);

      // Send the donation transaction
      const tx = await contract.donateToProject(id, { value: weiAmount });
      await tx.wait(); // Wait for transaction to be confirmed

      toast.success('Donation successful!');

      // Redirect to the "all projects" page or show a confirmation
      navigate('/projects');
    } catch (error) {
      console.error('Donation failed:', error);
      toast.error('Donation failed: ' + error.message);
    }
  };

  return (
    <div className="h-screen">
      <form onSubmit={submitDonation}>
        {/* Wallet Connect Button */}
        {!signer && (
          <button type="button" onClick={connectToMetamask} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 mt-4 ml-10">
            Connect Wallet
          </button>
        )}

        <div className="mt-6">
          <h1 className="text-3xl text-center font-semibold">Donate to the Project</h1>
          <div className="w-[700px] rounded-2xl shadow-2xl shadow-stone-950 mx-auto mt-6 p-4">
            <div className="mt-4">
              <label className="text-xl font-medium">Project Title</label>
              <p id="title" className="border rounded w-full py-2 px-3 mb-2">{title}</p>
            </div>

            <div className="mt-4">
              <label className="text-xl font-medium">Donation Amount (in ETH)</label>
              <input
                type="text"
                id="amount"
                name="amount"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your donation amount"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-[200px] mx-auto">
          <button
            type="submit"
            className="w-[200px] bg-green-300 p-2 rounded-lg mt-[30px] hover:bg-green-500"
          >
            Donate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Donate;

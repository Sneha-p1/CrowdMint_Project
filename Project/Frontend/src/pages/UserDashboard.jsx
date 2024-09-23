import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CrowdMint from '/src/scdata/CrowdMint.json';
import { CrowdMintCrowd } from '/src/scdata/deployed_addresses.json';
import UserNav from '../components/UserNav';

const UserDashboard = () => {
  const [userAddress, setUserAddress] = useState('');
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    goal: ''
  });
  const [isConnected, setIsConnected] = useState(false);

  // MetaMask connection function
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setUserAddress(accounts[0]);
        setIsConnected(true);
      } else {
        alert('Please install MetaMask');
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // Handles form input changes
  const handleInputChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  // Submits project to the smart contract
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!isConnected) {
      alert('Please connect to MetaMask');
      return;
    }

    const { title, description, goal } = projectData;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CrowdMintCrowd, CrowdMint.abi, signer);
      
      const formattedGoal = ethers.parseEther(goal);  // Convert goal to Wei

      const tx = await contract.createProject(title, description, formattedGoal);
      await tx.wait();
      
      alert('Project created successfully!');
      setProjectData({
        title: '',
        description: '',
        goal: ''
      });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setUserAddress(window.ethereum.selectedAddress);
      setIsConnected(true);
    }
  }, []);

  return (
    <>
      <UserNav />
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        {!isConnected ? (
          <button 
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform 
            hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 w-full md:w-1/2 mx-auto mt-20"
            onClick={connectWallet}
          >
            Connect MetaMask
          </button>
        ) : (
          <div>
            <p className="text-gray-600 text-lg mb-4 truncate text-center md:text-left">Connected Wallet Address: {userAddress}</p>
              
            <div className='max-w-lg mx-auto bg-white shadow-md rounded-lg p-6'>
              <p className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Create Project</p>

              <form onSubmit={handleCreateProject} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={projectData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:border-indigo-500 focus:ring-indigo-500 transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea 
                    name="description" 
                    value={projectData.description}
                    onChange={handleInputChange}
                    required
                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:border-indigo-500 focus:ring-indigo-500 transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Goal (in ETH)</label>
                  <input 
                    type="number" 
                    name="goal" 
                    value={projectData.goal}
                    onChange={handleInputChange}
                    required
                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:border-indigo-500 focus:ring-indigo-500 transition duration-200"
                    step="any"
                  />
                </div>

                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 w-full"
                >
                  Create Project
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashboard;

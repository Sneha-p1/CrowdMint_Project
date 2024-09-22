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
        <h1 className="text-2xl md:text-3xl font-bold mb-4">User Dashboard</h1>

        {!isConnected ? (
          <button 
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full md:w-auto" 
            onClick={connectWallet}
          >
            Connect MetaMask
          </button>
        ) : (
          <div>
            <p className="text-gray-600 mb-4 truncate">Connected Wallet Address: {userAddress}</p>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={projectData.title}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  name="description" 
                  value={projectData.description}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  step="any"
                />
              </div>

              <button 
                type="submit" 
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full md:w-auto"
              >
                Create Project
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashboard;

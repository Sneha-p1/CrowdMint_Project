import React, { useEffect, useState } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { useNavigate } from 'react-router-dom';
import CrowdMint from "/src/scdata/CrowdMint.json";
import { CrowdMintCrowd } from "/src/scdata/deployed_addresses.json"; 
import { toast } from 'react-toastify'; 

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState('');
  const navigate = useNavigate();

  // Fetch the connected wallet address
  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setConnectedWalletAddress(accounts[0]); // Store the connected address
      } catch (error) {
        console.error("Error fetching wallet address:", error);
      }
    };

    // Fetch projects data from the smart contract
    const fetchProjects = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CrowdMintCrowd, CrowdMint.abi, provider);
        const projectsData = await contract.getProjects(); // Fetch projects from the contract

        const formattedProjects = projectsData.map((project, index) => ({
          id: index,
          title: project.title,
          description: project.description,
          goal: ethers.formatEther(project.goal),
          fundsRaised: ethers.formatEther(project.fundsRaised),
          creator: project.creator,
          isCompleted: project.isCompleted
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletAddress();
    fetchProjects();
  }, []);


const handleDonateClick = (project) => {
  const normalizedWalletAddress = connectedWalletAddress.toLowerCase();
  const normalizedCreatorAddress = project.creator.toLowerCase();

  if (normalizedWalletAddress === normalizedCreatorAddress) {
    // Show error toast if project creator tries to donate to their own project
    toast.error("Project creator cannot donate to their own project");
  } else if (project.isCompleted) {
    // If project has reached its goal, show a toast notification
    toast.warning("Project has already reached its goal");
  } else {
    // Redirect to the donate page if the user is not the creator and project is still active
    navigate(`/donate/${project.id}`);
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">All Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <p className="text-gray-600 mt-2">Goal: {project.goal} ETH</p>
            <p className="text-gray-600 mt-2">Funds Raised: {project.fundsRaised} ETH</p>
            <p className="text-gray-600 mt-2">Creator: {project.creator}</p>
            <p className="text-gray-600 mt-2">Status: {project.isCompleted ? 'Goal Reached' : 'Ongoing'}</p>
            
            <button
              onClick={() => handleDonateClick(project)}
              className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg"
            >
              Donate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;

import React, { useEffect, useState } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { useNavigate } from 'react-router-dom';
import CrowdMint from "/src/scdata/CrowdMint.json";
import { CrowdMintCrowd } from "/src/scdata/deployed_addresses.json"; 
import { toast } from 'react-toastify'; 
import AllpNav from '../components/AllpNav';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setConnectedWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Error fetching wallet address:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CrowdMintCrowd, CrowdMint.abi, provider);
        const projectsData = await contract.getProjects();

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
      toast.error("Project creator cannot donate to their own project");
    } else if (project.isCompleted) {
      toast.warning("Project has already reached its goal");
    } else {
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
    <>
    <AllpNav/>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">All Projects</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-gray-800 truncate">{project.title}</h2>
            <p className="text-gray-600 mt-2 break-words">
              {project.description.length > 100 
                ? project.description.slice(0, 100) + '...'
                : project.description}
            </p>
            <p className="text-gray-600 mt-2">Goal: <span className="font-medium">{project.goal} ETH</span></p>
            <p className="text-gray-600 mt-2">Funds Raised: <span className="font-medium">{project.fundsRaised} ETH</span></p>
            <p className="text-gray-600 mt-2 break-all">Creator: <span className="font-medium">{project.creator}</span></p>
            <p className="text-gray-600 mt-2">Status: 
              <span className={`ml-2 ${project.isCompleted ? 'text-green-600' : 'text-yellow-500'}`}>
                {project.isCompleted ? 'Goal Reached' : 'Ongoing'}
              </span>
            </p>

            <button
              onClick={() => handleDonateClick(project)}
              className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
            >
              Donate
            </button>
          </div>
        ))}
      </div>
      </div>
  </>
  );
};

export default AllProjects;

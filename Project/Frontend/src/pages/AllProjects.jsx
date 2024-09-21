import React, { useEffect, useState } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import CrowdMint from "/src/scdata/CrowdMint.json";
import { Link } from 'react-router-dom';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const provider = new ethers.BrowserProvider(window.ethereum);
  const contractAddress = '0xd3f5A8D1bC421c38F2EBD4f03C0fCD245797e911'; // Replace with your contract's address

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const contract = new ethers.Contract(contractAddress, CrowdMint.abi, provider);
        const projectsData = await contract.getProjects();

        const formattedProjects = projectsData.map((project, index) => ({
          id: index,
          title: project.title,
          description: project.description,
          goal: ethers.formatEther(project.goal),
          fundsRaised: ethers.formatEther(project.fundsRaised),
          creator: project.creator,
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
        {projects.length === 0 ? (
          <div className="col-span-1 text-center">
            <p className="text-lg">No projects found.</p>
          </div>
        ) : (
          projects.map(project => (
            <div key={project.id} className="border rounded-lg shadow-lg bg-white p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-bold text-green-600 mb-2">{project.title}</h2>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <p className="text-gray-600"><strong>Goal:</strong> {project.goal} ETH</p>
              <p className="text-gray-600"><strong>Funds Raised:</strong> {project.fundsRaised} ETH</p>
              <p className="text-gray-600 truncate" title={project.creator}><strong>Creator:</strong> {project.creator}</p>
              <Link to={`/donate/${project.id}`}>
                <button className="w-full mt-4 border-2 bg-green-300 p-2 rounded-lg drop-shadow-lg hover:bg-green-500">
                  Donate
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProjects;

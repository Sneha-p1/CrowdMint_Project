import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ReviewPage = () => {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/user/${userId}/projects`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [userId]);

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      // Remove the deleted project from the state
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="mt-10">
      <div className="w-full text-center mt-4">
        <div className="text-xl font-bold">
          <p>Projects for User: {userId}</p>
        </div>
        <div className="border-t-2 mt-4">
          {projects.map(project => (
            <div key={project._id} className="border-b-2 bg-green-100 text-left p-2">
              <span className="block font-bold">{project.title}</span>
              <span>{project.description}</span>
              <div className="text-sm text-gray-600">
                Target Amount: {project.targetAmount}, Pledged Amount: {project.pledgedAmount}
              </div>
              <button className='border-2 rounded-lg bg-green-300 hover:bg-green-500' onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;

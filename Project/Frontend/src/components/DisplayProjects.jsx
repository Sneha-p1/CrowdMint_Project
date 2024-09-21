import React from "react";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

const DisplayProjects = () => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("api/projects/");
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchProjects();
  }, []);

  const projects = project.slice(0, 3);

  return (
    <>
      <div className="text-2xl text-center mt-2 font-black">Top Projects</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </>
  );
};
export default DisplayProjects;

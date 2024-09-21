import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({project}) => {
  return (
    <>
        <div className='bg-white rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10'>
        <h2 className='font-bold text-lg text-black '>{project.title}</h2>
        <p className='text-black group-hover:text-white my-2 mx-5'>{project.tagline} </p>
        <p className='text-black group-hover:text-white my-2 mx-5'>{project.description} </p>
        <p className='text-black group-hover:text-white my-2 mx-5'>Target : {project.targetAmount} </p>
        <p className='text-black group-hover:text-white my-2 mx-5'>Raised : {project.pledgedAmount} </p>
        <p>Created By: {project.createdBy}</p>

        <Link to={`/donate/${project._id}`}>
        <button className="w-[200px] border-2 bg-green-300 p-2 rounded-lg drop-shadow-lg hover:bg-green-500">
          Donate
        </button>
      </Link>
      </div>
    </>
  )
}

export default ProjectCard

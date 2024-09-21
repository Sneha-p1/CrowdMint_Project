import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/allusers');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data.projectsByUser);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleReviewClick = (userId) => {
    navigate(`/admin/review/${userId}`);
  };

  return (
    <div className="mt-10 flex">
      <div className="w-1/4 border-2 h-screen">
        <div className="border-b-2 p-2 bg-green-300">
          <Link to='/admindash'>Admin Dashboard</Link>
        </div>
        <div className="border-b-2 p-2">
          <Link to="/admin/allusers">View Users</Link>
        </div>
      </div>
      <div className="w-3/4 text-center mt-4">
        <div className="text-xl font-bold">
          <p>All Users</p>
        </div>
        <div className="border-t-2">
          {users.map(user => (
            <div key={user._id} className="border-b-2 bg-green-100 text-left p-2">
              <span className="h-10 p-4">{user._id}</span>
              <span className="text-lg">{user.projects.map(project => project.title).join(', ')}</span>
              <button className="border-2 rounded-lg bg-green-300 hover:bg-green-500 float-right p-1" onClick={() => handleReviewClick(user._id)}>Review</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminAllUsers;

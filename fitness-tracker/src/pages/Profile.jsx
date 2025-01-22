import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        alert('Session expired. Please log in again.');
        return;
      }
  
      try {
        const response = await axios.get('http://localhost:5000/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormData({ username: response.data.username });
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data?.message || error.message);
        alert('Failed to fetch profile. Please log in again.');
        localStorage.removeItem('token'); // Clear invalid token
      }
    };
  
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    if (!formData.username.trim()) {
      alert('Username cannot be empty');
      return;
    }
  
    try {
      const response = await axios.put(
        'http://localhost:5000/auth/profile',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user); // Update user state with returned data
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.response?.data?.message);
      alert('Failed to update profile: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  if (!user)
    return <div className="flex justify-center items-center min-h-screen text-lg bg-black">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg max-w-md w-full p-6">
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-indigo-400 text-6xl mb-4" />
          <h1 className="text-2xl font-semibold text-center text-gray-100">
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="border bg-gray-700 text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter username"
              />
            ) : (
              `Welcome, ${user.username}`
            )}
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Joined on: {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {isEditing ? (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition ease-in-out"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-700 transition ease-in-out"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition ease-in-out"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

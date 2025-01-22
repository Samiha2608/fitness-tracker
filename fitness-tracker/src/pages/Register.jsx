import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Initialize navigate hook

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/auth/register', { username, password });
          setMessage(response.data.message);
          // Navigate to the login page after successful registration
          if (response.data.message === 'User registered successfully') {
              setTimeout(() => {
                  navigate('/');  // Navigate to /login after 1 second
              }, 1000);  // You can adjust the timeout duration as needed
          }
      } catch (error) {
          if (error.response) {
              setMessage(error.response.data.message);
          } else {
              setMessage("An error occurred. Please try again.");
          }
      }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>

                {message && (
                    <p className={`mt-4 text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Register;

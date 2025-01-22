import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Sending login request to backend
            const response = await axios.post('http://localhost:5000/auth/login', { username, password });

            setMessage(response.data.message);
            
            // If login is successful
            if (response.data.message === 'Login successful') {
                // Store token in localStorage
                localStorage.setItem('token', response.data.token);
                // Optionally store user data in localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // Navigate to the home page after login
                navigate('/home');
            }
        } catch (error) {
            // Handle error message
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
                {message && <p className="text-center text-red-500">{message}</p>}
                <div className="text-center">
                    <p className="text-sm text-gray-600">Don't have an account?</p>
                    <button
                        onClick={() => navigate('/register')}
                        className="text-indigo-600 hover:underline"
                    >
                        Register here
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;

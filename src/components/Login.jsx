import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';

const Login = ({ setRole }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            const { access, refresh, role } = data;

            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
            localStorage.setItem('role', role);
            setRole(role);

            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else if (role === 'manager') {
                navigate('/manager-dashboard');
            } else if (role === 'employee') {
                navigate('/employee-dashboard');
            } else {
                navigate('/'); // Default fallback
            }
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className='absolute bottom-0 right-0'>Dummy user: <br /> markmaina425@gmail.com <br /> adm1n</p>
            <div className="w-full max-w-md p-8 space-y-6  rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-sky-600 rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </div>
        </div>
    );
};

export default Login;

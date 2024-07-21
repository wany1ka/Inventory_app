import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch user info using the access token
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('access');
            try {
                const response = await fetch('http://127.0.0.1:8000/accounts/api/user-info/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        // Fetch users data using the access token
        const fetchUsers = async () => {
            const token = localStorage.getItem('access');
            try {
                const response = await fetch('http://127.0.0.1:8000/accounts/api/users/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUserInfo();
        fetchUsers();
    }, []);

    return (
        <div className="admin-dashboard p-4 md:p-6 bg-gray-100 min-h-screen">
            <header className="admin-dashboard-header bg-white shadow p-4 md:p-6 mb-6 md:mb-8 rounded-lg">
                <h1 className="text-xl md:text-3xl font-semibold mb-2">Welcome, {username}!</h1>
                <p className="text-sm md:text-gray-600">Welcome to the Admin Dashboard. Here you can manage users and perform administrative tasks.</p>
            </header>
            <section className="users-section bg-white shadow p-4 md:p-6 rounded-lg">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Users</h2>
                <div className="overflow-x-auto">
                    <table className="users-table min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">{user.username}</td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

    );
};

export default AdminDashboard;

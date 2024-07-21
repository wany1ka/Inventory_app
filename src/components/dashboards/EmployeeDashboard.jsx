import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [lowStockItems, setLowStockItems] = useState([]);
    const [showAlert, setShowAlert] = useState(false);


    useEffect(() => {
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

        fetchUserInfo();
    }, []);

    const LowStockAlert = ({ items, onClose }) => {
        return (
            <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute ml-4 text-white font-bold hover:bg-red-700 top-0 right-0 mr-5 px-2 font-normal"
                >
                    X
                </button>
                <strong>Low Stock Alerts:</strong>
                <ul>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <li key={index}>
                                {item.name} is running low (Quantity: {item.quantity})
                            </li>
                        ))
                    ) : (
                        <li>No low stock alerts at this time.</li>
                    )}
                </ul>

            </div>
        );
    };

    useEffect(() => {
        const fetchLowStockAlerts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/accounts/reports/low-stock-alerts/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Low stock data:', data); // Log data to check structure
                setLowStockItems(data);
                // Adjust
                const lowStockThreshold = 5;
                const filteredItems = data.filter(item => item.quantity < lowStockThreshold);
                if (filteredItems.length > 0) {
                    setLowStockItems(filteredItems);
                    setShowAlert(true);
                } else {
                    setShowAlert(false);
                }
            } catch (error) {
                console.error('Error fetching low stock alerts:', error);
            }
        };

        fetchLowStockAlerts();

        // Polling for updates (optional)
        const interval = setInterval(fetchLowStockAlerts, 43200000); // Check every 12hrs

        return () => clearInterval(interval);
    }, []);

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
                <div className="employee-dashboard p-6 bg-gray-100 min-h-screen">
            <header className="bg-white shadow p-6 mb-8 rounded-lg">
                <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
                <p className="text-gray-600">Here you can view stocks and record sales.</p>
            </header>
                        {/* Your existing dashboard content */}
                        {showAlert && (
                <LowStockAlert items={lowStockItems} onClose={handleCloseAlert} />
            )}
        </div>

    );
};

export default Dashboard;

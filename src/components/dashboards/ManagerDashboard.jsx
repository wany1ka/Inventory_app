import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../config';

const ManagerDashboard = () => {
    const [inventory, setInventory] = useState([]);
    const [sales, setSales] = useState([]);
    const [trends, setTrends] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch dashboard data
        const fetchDashboardData = async () => {
            try {
                const [inventoryResponse, salesResponse, trendsResponse] = await Promise.all([
                    fetch(`${BASE_URL}api/inventory/`).then(res => res.json()),
                    fetch(`${BASE_URL}api/sales/`).then(res => res.json()),
                    fetch(`${BASE_URL}api/sales-trends/`).then(res => res.json()),
                ]);

                setInventory(inventoryResponse);
                setSales(salesResponse);
                setTrends(trendsResponse);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        // Fetch user info
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('access');
            try {
                const response = await fetch(`${BASE_URL}api/user-info/`, {
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

        fetchDashboardData();
        fetchUserInfo();
    }, []);

    return (
        <div className="manager-dashboard p-6">
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
                <p className="text-gray-600">Welcome, {username}! Welcome to the Manager Dashboard. Here you can manage inventory, view sales, and analyze sales trends.</p>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Inventory Status */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Inventory Status</h2>
                    <ul>
                        {inventory.map(item => (
                            <li key={item.id} className="mb-2">
                                {item.name}: {item.quantity} in stock
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Sales Reports */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Sales Reports</h2>
                    <ul>
                        {sales.map(sale => (
                            <li key={sale.id} className="mb-2">
                                {sale.productName}: Kes {sale.price} each, {sale.quantity} sold on {new Date(sale.date).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Sales Trends */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Sales Trends</h2>
                    <ul>
                        {trends.map(trend => (
                            <li key={trend.item__name} className="mb-2">
                                {trend.total_sales} sale, Kes {trend.total_revenue.toFixed(2)} in revenue within the week
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default ManagerDashboard;

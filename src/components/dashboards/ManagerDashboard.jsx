import React, { useEffect, useState } from 'react';

const ManagerDashboard = () => {
    const [inventory, setInventory] = useState([]);
    const [sales, setSales] = useState([]);
    const [trends, setTrends] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [inventoryResponse, salesResponse, trendsResponse] = await Promise.all([
                    fetch('http://127.0.0.1:8000/accounts/api/inventory/'),
                    fetch('http://127.0.0.1:8000/accounts/api/sales/'),
                    fetch('http://127.0.0.1:8000/accounts/api/sales-trends/'),
                ]);

                const inventoryData = await inventoryResponse.json();
                const salesData = await salesResponse.json();
                const trendsData = await trendsResponse.json();

                setInventory(inventoryData);
                setSales(salesData);
                setTrends(trendsData);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="manager-dashboard p-6">
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Manager Dashboard</h1>
                <p className="text-gray-600">Welcome to the Manager Dashboard. Here you can manage inventory, view sales, and analyze sales trends.</p>
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
                                {sale.productName}: ${sale.amount} on {sale.date}
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
                                {trend.item__name}: {trend.total_quantity} sold, ${trend.total_revenue.toFixed(2)} in revenue
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default ManagerDashboard;

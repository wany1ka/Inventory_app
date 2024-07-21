import React, { useState, useEffect } from 'react';

const LowStockAlerts = () => {
    const [lowStockItems, setLowStockItems] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchLowStockAlerts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/accounts/reports/low-stock-alerts/');
                const data = await response.json();
                setLowStockItems(data);
            } catch (error) {
                console.error('Error fetching low stock alerts:', error);
            }
        };

        fetchLowStockAlerts();
    }, []);

    const sendEmail = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/reports/low-stock-alerts/', {
                method: 'POST',
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Error sending email:', error);
            setMessage('Failed to send email');
        }
    };

    return (
        <div className="low-stock-alerts p-6">
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Low Stock Alerts</h1>
                <p className="text-gray-600">Items that are low in stock.</p>
            </header>
            <section className="bg-white shadow-md rounded-lg p-6">
                <ul>
                    {lowStockItems.map(item => (
                        <li key={item.id} className="mb-2">
                            <strong>{item.name}:</strong> {item.quantity} in stock
                        </li>
                    ))}
                </ul>
                <button onClick={sendEmail} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    Send Low Stock Email
                </button>
                {message && <p className="mt-4">{message}</p>}
            </section>
        </div>
    );
};

export default LowStockAlerts;

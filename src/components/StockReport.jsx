import React, { useState, useEffect } from 'react';

const StockLevelsReport = () => {
    const [inventoryItems, setInventoryItems] = useState([]);

    useEffect(() => {
        const fetchStockLevels = async () => {
            try {
                const response = await fetch(`${BASE_URL}reports/stock-levels/`);
                const data = await response.json();
                setInventoryItems(data);
            } catch (error) {
                console.error('Error fetching stock levels:', error);
            }
        };

        fetchStockLevels();
    }, []);

    return (
        <div className="stock-levels-report p-6">
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Stock Levels Report</h1>
                <p className="text-gray-600">Current stock levels of inventory items.</p>
            </header>
            <section className="bg-white shadow-md rounded-lg p-6">
                <ul>
                    {inventoryItems.map(item => (
                        <li key={item.id} className="mb-2">
                            <strong>{item.name}:</strong> {item.quantity} in stock
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default StockLevelsReport;

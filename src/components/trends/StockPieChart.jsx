import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';

// Register necessary Chart.js components
Chart.register(ArcElement, Legend, Tooltip);

const StockPieChart = () => {
    const [inventoryItems, setInventoryItems] = useState([]);

    useEffect(() => {
        fetchInventoryItems();
    }, []);

    const fetchInventoryItems = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/api/inventory/');
            if (!response.ok) {
                throw new Error('Error fetching inventory items');
            }
            const data = await response.json();
            setInventoryItems(data);
        } catch (error) {
            console.error('Error fetching inventory items:', error);
        }
    };

    const stockData = {
        labels: inventoryItems.map(item => item.name),
        datasets: [
            {
                label: 'Stock Items',
                data: inventoryItems.map(item => item.quantity),
                backgroundColor: inventoryItems.map((item, index) => `hsl(${(index / inventoryItems.length) * 360}, 100%, 75%)`),
                hoverBackgroundColor: inventoryItems.map((item, index) => `hsl(${(index / inventoryItems.length) * 360}, 100%, 60%)`)
            }
        ]
    };

    const pieOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'right',
            }
        },
        maintainAspectRatio: false,
        responsive: true
    };

    return (
        <div className="chart-container" style={{ height: '350px', width: '800px' }}>
            <h3 className="font-bold text-xl mb-2 text-center">Stock Items</h3>
            <Pie data={stockData} options={pieOptions} />
        </div>
    );
};

export default StockPieChart;

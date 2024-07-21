import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Legend, Tooltip } from 'chart.js';

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const SalesBarGraph = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/api/sales/');
            if (!response.ok) {
                throw new Error('Error fetching sales');
            }
            const data = await response.json();
            setSales(data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const salesData = {
        labels: sales.map(sale => sale.date),
        datasets: [
            {
                label: 'Sales',
                data: sales.map(sale => sale.price * sale.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const salesOptions = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Sales Amount'
                }
            }
        },
        maintainAspectRatio: false,
        responsive: true
    };

    return (
        <div className="chart-container mb-20" style={{ height: '390px', width: '800px' }}>
            <h3 className="font-bold text-xl mb-2">Sales Over Time</h3>
            <Bar data={salesData} options={salesOptions} />
        </div>
    );
};

export default SalesBarGraph;

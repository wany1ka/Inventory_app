// ProfitLossPieChart.jsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';

// Register necessary Chart.js components
Chart.register(ArcElement, Legend, Tooltip);

const ProfitLossPieChart = () => {
    const [sales, setSales] = useState([]);
    const [inventoryItems, setInventoryItems] = useState([]);

    useEffect(() => {
        fetchSales();
        fetchInventoryItems();
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

    const calculateProfitAndLoss = () => {
        const totalSales = sales.reduce((total, sale) => total + sale.price * sale.quantity, 0);
        const totalInventoryCost = inventoryItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const profit = totalSales - totalInventoryCost;
        const loss = totalInventoryCost - totalSales;

        return {
            profit,
            loss
        };
    };

    const profitAndLossData = {
        labels: ['Profit', 'Loss'],
        datasets: [
            {
                label: 'Profit and Loss',
                data: [calculateProfitAndLoss().profit, calculateProfitAndLoss().loss],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384']
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
        <div className="chart-container mb-20" style={{ height: '350px', width: '800px' }}>
            <h3 className="font-bold text-xl mb-2 mt-6 text-center">Profit and Loss</h3>
            <Pie data={profitAndLossData} options={pieOptions} />
        </div>
    );
};

export default ProfitLossPieChart;

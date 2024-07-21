import React from 'react';
import SalesBarGraph from './trends/SalesBarGraph';
import ProfitLossPieChart from './trends/ProfitLossPieChart';
import StockPieChart from './trends/StockPieChart';

const SalesTrends = () => {
    return (
        <div className="sales-trends-container p-4">
            <h2 className="font-bold text-2xl mb-4">Sales Trends</h2>
            <SalesBarGraph />
            <ProfitLossPieChart />
            <StockPieChart />
        </div>
    );
};

export default SalesTrends;

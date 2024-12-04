import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './App.css';
import Inventory from './components/Inventory';
import Register from "./components/Register";
import Navbar from './components/navbar';
import Footer from "./components/Footer";
import ErrorPage from "./components/Error-page";
import AddInventory from "./components/AddInventory";
import Sales from "./components/Sales";
import ContactForm from "./components/ContactForm";
import Login from "./components/Login";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import ManagerDashboard from "./components/dashboards/ManagerDashboard";
import EmployeeDashboard from "./components/dashboards/EmployeeDashboard";
import ContactMessages from "./components/Messages";
import StockLevelsReport from "./components/StockReport";
import LowStockAlerts from "./components/LowStock";
import ProfitLossPieChart from "./components/trends/ProfitLossPieChart";
import SalesBarGraph from "./components/trends/SalesBarGraph";
import StockPieChart from "./components/trends/StockPieChart";
import About from "./components/About";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsConditions";

const App = () => {
    const [role, setRole] = useState(localStorage.getItem('role'));

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);

    return (
        <Router>
            <Navbar role={role} />
            <main className='flex-1 p-6'>
                <Routes>
                    <Route path="/" element={<Login setRole={setRole} />} />
                    <Route path="/add" element={<AddInventory />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profit_loss" element={<ProfitLossPieChart />} />
                    <Route path="/sales-trends" element={<SalesBarGraph />} />
                    <Route path="/stock-trends" element={<StockPieChart />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/add_inventory" element={<AddInventory />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/contact" element={<ContactForm />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                    <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                    <Route path="/messages" element={<ContactMessages />} />
                    <Route path="/stock_report" element={<StockLevelsReport />} />
                    <Route path="/low_stock" element={<LowStockAlerts />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-conditions" element={<TermsAndConditions />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            <Footer />
            </main>
        </Router>
    );
};

export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ role }) => {
    const [isTrendsDropdownOpen, setTrendsDropdownOpen] = useState(false);

    const toggleTrendsDropdown = () => {
        setTrendsDropdownOpen(prev => !prev);
    };

    return (
        <nav className=" text-[#ebf2fa] shadow-md  top-0 w-full z-50 mt-2 b-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold">InventoryApp</h1>
                    </div>
                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6">
                        {role === 'admin' && (
                            <>
                                <Link
                                    to="/admin-dashboard"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Admin Dashboard
                                </Link>
                                <Link
                                    to="/inventory"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Inventory
                                </Link>
                                <Link
                                    to="/add_inventory"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Add Stock
                                </Link>
                                <Link
                                    to="/sales"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Sales
                                </Link>
                                <div className="relative">
                                    <span
                                        onClick={toggleTrendsDropdown}
                                        className="text-lg font-semibold cursor-pointer hover:text-[#93e1d8] transition-all"
                                    >
                                        Trends
                                    </span>
                                    {isTrendsDropdownOpen && (
                                        <ul className="absolute mt-2 w-40 bg-white text-gray-700 shadow-lg rounded">
                                            <li className="hover:bg-gray-100">
                                                <Link
                                                    to="/sales-trends"
                                                    className="block px-4 py-2"
                                                >
                                                    Sales Trends
                                                </Link>
                                            </li>
                                            <li className="hover:bg-gray-100">
                                                <Link
                                                    to="/stock-trends"
                                                    className="block px-4 py-2"
                                                >
                                                    Stock Chart
                                                </Link>
                                            </li>
                                            <li className="hover:bg-gray-100">
                                                <Link
                                                    to="/profit_loss"
                                                    className="block px-4 py-2"
                                                >
                                                    Profit Loss
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                                <Link
                                    to="/stock_report"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Reports
                                </Link>
                                <Link
                                    to="/low_stock"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Low Stock
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/messages"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Messages
                                </Link>
                            </>
                        )}
                        {role === 'manager' && (
                            <>
                                <Link
                                    to="/manager-dashboard"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Manager Dashboard
                                </Link>
                                <Link
                                    to="/add_inventory"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Add Stock
                                </Link>
                                <Link
                                    to="/inventory"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Inventory
                                </Link>
                                {/* Dropdown for Trends */}
                                <div className="relative">
                                    <span
                                        onClick={toggleTrendsDropdown}
                                        className="text-lg font-semibold cursor-pointer hover:text-[#93e1d8] transition-all"
                                    >
                                        Trends
                                    </span>
                                    {isTrendsDropdownOpen && (
                                        <ul className="absolute mt-2 w-40 bg-white text-gray-700 shadow-lg rounded">
                                            <li className="hover:bg-gray-100">
                                                <Link
                                                    to="/sales-trends"
                                                    className="block px-4 py-2"
                                                >
                                                    Sales Trends
                                                </Link>
                                            </li>
                                            <li className="hover:bg-gray-100">
                                                <Link
                                                    to="/stock-trends"
                                                    className="block px-4 py-2"
                                                >
                                                    Stock Chart
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                                <Link
                                    to="/stock_report"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Reports
                                </Link>
                                <Link
                                    to="/low_stock"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Low Stock
                                </Link>
                            </>
                        )}
                        {role === 'employee' && (
                            <>
                                <Link
                                    to="/employee-dashboard"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Employee Dashboard
                                </Link>
                                <Link
                                    to="/sales"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Sales
                                </Link>
                                <Link
                                    to="/add_inventory"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Add Stock
                                </Link>
                                <Link
                                    to="/inventory"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Inventory
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    Contact
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

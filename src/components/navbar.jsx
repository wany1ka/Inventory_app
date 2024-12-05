import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ role }) => {
    const [isTrendsDropdownOpen, setTrendsDropdownOpen] = useState(false);
    const location = useLocation();

    const toggleTrendsDropdown = () => {
        setTrendsDropdownOpen((prev) => !prev);
    };

    // Check if the current path is the login page
    const isLoginPage = location.pathname === '/login';

    const menuItems = {
        admin: [
            { path: '/admin-dashboard', label: 'Admin Dashboard' },
            { path: '/inventory', label: 'Inventory' },
            { path: '/add_inventory', label: 'Add Stock' },
            { path: '/sales', label: 'Sales' },
            { path: '/stock_report', label: 'Reports' },
            { path: '/low_stock', label: 'Low Stock' },
            { path: '/register', label: 'Register' },
            { path: '/messages', label: 'Messages' },
        ],
        manager: [
            { path: '/manager-dashboard', label: 'Manager Dashboard' },
            { path: '/inventory', label: 'Inventory' },
            { path: '/add_inventory', label: 'Add Stock' },
            { path: '/stock_report', label: 'Reports' },
            { path: '/low_stock', label: 'Low Stock' },
        ],
        employee: [
            { path: '/employee-dashboard', label: 'Employee Dashboard' },
            { path: '/sales', label: 'Sales' },
            { path: '/add_inventory', label: 'Add Stock' },
            { path: '/inventory', label: 'Inventory' },
            { path: '/contact', label: 'Contact' },
        ],
    };

    const trendsLinks = [
        { path: '/sales-trends', label: 'Sales Trends' },
        { path: '/stock-trends', label: 'Stock Chart' },
        ...(role === 'admin' ? [{ path: '/profit_loss', label: 'Profit Loss' }] : []),
    ];

    return (
        <nav className="text-[#ebf2fa] shadow-md top-0 w-full z-50 mt-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold">Stockify</h1>
                    </div>
                    {/* Show navigation links only if not on the login page */}
                    {!isLoginPage && (
                        <div className="hidden md:flex space-x-6">
                            {menuItems[role]?.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-lg font-semibold hover:text-[#93e1d8] transition-all"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {/* Dropdown for Trends (only for admin and manager) */}
                            {(role === 'admin' || role === 'manager') && (
                                <div className="relative">
                                    <span
                                        onClick={toggleTrendsDropdown}
                                        className="text-lg font-semibold cursor-pointer hover:text-[#93e1d8] transition-all"
                                    >
                                        Trends
                                    </span>
                                    {isTrendsDropdownOpen && (
                                        <ul className="absolute mt-2 w-40 bg-white text-gray-700 shadow-lg rounded">
                                            {trendsLinks.map((link) => (
                                                <li key={link.path} className="hover:bg-gray-100">
                                                    <Link to={link.path} className="block px-4 py-2">
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

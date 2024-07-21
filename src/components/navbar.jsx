import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ role }) => {
    const [isTrendsDropdownOpen, setTrendsDropdownOpen] = useState(false);

    // Function to toggle dropdown visibility
    const toggleTrendsDropdown = () => {
        setTrendsDropdownOpen(prev => !prev);
    };

    return (
        <nav className='flex items-center justify-between bg-[#1B2430] p-5 shadow-md'>
            <ul id='navbar' className='flex items-center'>
                {role === 'admin' && (
                    <>
                        <li className='relative'>
                            <Link to="/admin-dashboard" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-5'>Admin Dashboard</Link>
                        </li>
                        <li className='relative'>
                            <Link to="/inventory" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'>Inventory</Link>
                        </li>
                        <li className='relative'>
                            <Link to="/activity" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'>Activity</Link>
                        </li>
                        <li className='relative'>
                            <Link to="/sales" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'>Sales</Link>
                        </li>
                        <li className='relative'>
                            <span
                                onClick={toggleTrendsDropdown}
                                className='text-[#fff] text-lg font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'
                            >
                                Trends
                            </span>
                            {isTrendsDropdownOpen && (
                                <ul className='absolute left-0 mt-2 w-48 bg-white shadow-lg rounded'>
                                    <li className='hover:bg-gray-100'>
                                        <Link to="/sales-trends" className='block px-4 py-2 text-gray-700'>Sales Trends</Link>
                                    </li>
                                    <li className='hover:bg-gray-100'>
                                        <Link to="/stock-trends" className='block px-4 py-2 text-gray-700'>Stock Chart</Link>
                                    </li>
                                    <li className='hover:bg-gray-100'>
                                        <Link to="/profit_loss" className='block px-4 py-2 text-gray-700'>Profit Loss</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className='relative'>
                            <Link to="/register" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'>Register</Link>
                        </li>
                        <li className='relative'>
                            <Link to="/messages" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'>Messages</Link>
                        </li>
                    </>
                )}
                {role === 'manager' && (
                    <>
                        <li className='relative'>
                            <Link to="/manager-dashboard" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-5'>Manager Dashboard</Link>
                        </li>
                        <li className='relative'>
                            <Link to="/inventory" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'>Inventory</Link>
                        </li>
                        <li className='relative'>
                            <span
                                onClick={toggleTrendsDropdown}
                                className='text-[#fff] text-lg font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'
                            >
                                Trends
                            </span>
                            {isTrendsDropdownOpen && (
                                <ul className='absolute left-0 mt-2 w-48 bg-white shadow-lg rounded'>
                                    <li className='hover:bg-gray-100'>
                                        <Link to="/sales-trends" className='block px-4 py-2 text-gray-700'>Sales Trends</Link>
                                    </li>
                                    <li className='hover:bg-gray-100'>
                                        <Link to="/stock-trends" className='block px-4 py-2 text-gray-700'>Stock Chart</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className='relative'>
                            <Link to="/stock_report" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'>Reports</Link>
                        </li>
                        <li className='relative'>
                            <Link to="/low_stock" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'>Low</Link>
                        </li>
                    </>
                )}
                {role === 'employee' && (
                    <>
                        <li className='relative'>
                            <Link to="/employee-dashboard" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-5'>Employee Dashboard</Link>
                        </li>
                        <li className='relative'>
                            <Link to="/sales" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'>Sales</Link>
                        </li>
                        <li className='relative'>
                            <Link to="/contact" className='text-[#fff] text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97] mr-3'>Contact</Link>
                        </li>
                    </>
                )}
                {!role && (
                    <>
                        <h1 className='text-[#fff] text-lg font-semibold'>Welcome</h1>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

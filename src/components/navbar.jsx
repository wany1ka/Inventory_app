import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ role }) => {
    const [isTrendsDropdownOpen, setTrendsDropdownOpen] = useState(false);

    const toggleTrendsDropdown = () => {
        setTrendsDropdownOpen(prev => !prev);
    };

    return (
        <nav className='w-64 bg-[#1B2430] text-white shadow-md h-screen fixed top-0 left-0'>
            <ul className='flex flex-col p-5'>
                {role === 'admin' && (
                    <>
                        <li className='mb-3'>
                            <Link to="/admin-dashboard" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Admin Dashboard</Link>
                        </li>
                        <li className='mb-3'>
                            <Link to="/inventory" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Inventory</Link>
                        </li>
                        <li className='mb-3'>
                            <Link to="/activity" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Activity</Link>
                        </li>
                        <li className='mb-3'>
                            <Link to="/sales" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Sales</Link>
                        </li>
                        <li className='relative mb-3'>
                            <span
                                onClick={toggleTrendsDropdown}
                                className='block text-lg font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:text-[#17CF97]'
                            >
                                Trends
                            </span>
                            {isTrendsDropdownOpen && (
                                <ul className='absolute left-full top-0 mt-1 w-48 bg-white text-gray-700 shadow-lg rounded'>
                                    <li className='hover:bg-gray-100'>
                                        <Link to="/sales-trends" className='block px-4 py-2'>Sales Trends</Link>
                                    </li>
                                    <li className='hover:bg-gray-100'>
                                        <Link to="/stock-trends" className='block px-4 py-2'>Stock Chart</Link>
                                    </li>
                                    <li className='hover:bg-gray-100'>
                                        <Link to="/profit_loss" className='block px-4 py-2'>Profit Loss</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className='mb-3'>
                            <Link to="/register" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Register</Link>
                        </li>
                        <li className='mb-3'>
                            <Link to="/messages" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Messages</Link>
                        </li>
                    </>
                )}
                {role === 'manager' && (
                    <>
                        <li className='mb-3'>
                            <Link to="/manager-dashboard" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Manager Dashboard</Link>
                        </li>
                        <li className='mb-3'>
                            <Link to="/inventory" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Inventory</Link>
                        </li>
                        <li className='relative mb-3'>
                            <span
                                onClick={toggleTrendsDropdown}
                                className='block text-lg font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:text-[#17CF97]'
                            >
                                Trends
                            </span>
                            {isTrendsDropdownOpen && (
                                <ul className='absolute left-full top-0 mt-1 w-48 bg-white text-gray-700 shadow-lg rounded'>
                                    <li className='hover:bg-gray-100'>
                                        <Link to="/sales-trends" className='block px-4 py-2'>Sales Trends</Link>
                                    </li>
                                    <li className='hover:bg-gray-100'>
                                        <Link to="/stock-trends" className='block px-4 py-2'>Stock Chart</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className='mb-3'>
                            <Link to="/stock_report" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Reports</Link>
                        </li>
                        <li className='mb-3'>
                            <Link to="/low_stock" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Low</Link>
                        </li>
                    </>
                )}
                {role === 'employee' && (
                    <>
                        <li className='mb-3'>
                            <Link to="/employee-dashboard" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Employee Dashboard</Link>
                        </li>
                        <li className='mb-3'>
                            <Link to="/sales" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Sales</Link>
                        </li>
                        <li className='mb-3'>
                            <Link to="/contact" className='block text-lg font-semibold transition-all duration-300 ease-in-out hover:text-[#17CF97]'>Contact</Link>
                        </li>
                    </>
                )}
                {!role && (
                    <li className='mb-3'>
                        <h1 className='text-lg font-semibold'>Welcome</h1>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

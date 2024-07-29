import React, { useState, useEffect } from 'react';
import '../styles/Sales.css';
import BASE_URL from '../../config.js';

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [formData, setFormData] = useState({
        item: '',
        quantity: 0,
        price: 0.0,
        date: ''
    });
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchSales();
        fetchInventoryItems();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await fetch(`${BASE_URL}api/sales/`);
            if (!response.ok) {
                throw new Error('Failed to fetch sales');
            }
            const data = await response.json();
            // Sort the sales data by date in descending order
            const sortedSales = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setSales(sortedSales);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const fetchInventoryItems = async () => {
        try {
            const response = await fetch(`${BASE_URL}api/inventory/`);
            if (!response.ok) {
                throw new Error('Failed to fetch inventory items');
            }
            const data = await response.json();
            setInventoryItems(data);
        } catch (error) {
            console.error('Error fetching inventory items:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}api/sales/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Sale recorded:', await response.json());
                fetchSales(); // Refresh the sales list after recording a sale
                setFormData({
                    item: '',
                    quantity: 0,
                    price: 0.0,
                    date: ''
                });
                setMessage('Sale recorded successfully!');
            } else {
                const errorData = await response.json();
                setMessage('Error recording sale.');
                console.error('Error recording sale:', errorData);
            }
        } catch (error) {
            setMessage('Error recording sale.');
            console.error('Error recording sale:', error);
        }
    };

    return (
        <div className="sales-container p-4">
            <h2 className="font-bold text-2xl mb-4">Sales Management</h2>
            <button 
                onClick={() => setShowForm(!showForm)} 
                className="bg-[#064789] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mb-4"
            >
                {showForm ? "Hide Sale Form" : "Show Sale Form"}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="sales-form bg-white shadow-md rounded-lg p-6 mb-6">
                    <div className="form-group mb-4">
                        <label className="block text-gray-700">Item:</label>
                        <select name="item" value={formData.item} onChange={handleChange} className="border-gray-300 border p-2 rounded-md w-full mt-2" required>
                            <option value="">Select an item</option>
                            {inventoryItems.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700">Quantity:</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="border-gray-300 border p-2 rounded-md w-full mt-2" required />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700">Price:</label>
                        <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="border-gray-300 border p-2 rounded-md w-full mt-2" required />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700">Date:</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="border-gray-300 border p-2 rounded-md w-full mt-2" required />
                    </div>
                    <button type="submit" className="bg-[#064789] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Record Sale</button>
                </form>
            )}
            {message && <p className="text-green-500 mb-4">{message}</p>}
            <h3 className="font-bold text-xl mb-4">Sales List</h3>
            <div className="sales-table-container bg-white shadow-md rounded-lg p-4">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-2 px-4 text-left">Product Name</th>
                            <th className="py-2 px-4 text-left">Quantity</th>
                            <th className="py-2 px-4 text-left">Price</th>
                            <th className="py-2 px-4 text-left">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale.id} className="border-b border-gray-200">
                                <td className="py-2 px-4">{sale.productName || 'N/A'}</td>
                                <td className="py-2 px-4">{sale.quantity}</td>
                                <td className="py-2 px-4">Kes {sale.price}</td>
                                <td className="py-2 px-4">{new Date(sale.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Sales;

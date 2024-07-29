import React, { useState, useEffect } from 'react';
import BASE_URL from '../../config.js';


const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        price_min: null,
        price_max: null,
        stock_min: null,
        stock_max: null,
    });
    const [sortParams, setSortParams] = useState({
        sortBy: 'name',
        sortOrder: 'asc',
    });
    const [editingItem, setEditingItem] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        description: '',
        quantity: 0,
        price: 0.0,
    });

    useEffect(() => {
        fetchInventoryItems();
    }, [filters, sortParams]);

    const fetchInventoryItems = async () => {
        try {
            const filteredParams = {};
            for (const key in filters) {
                if (filters[key] !== '' && filters[key] !== null) {
                    filteredParams[key] = filters[key];
                }
            }
            filteredParams['ordering'] = `${sortParams.sortOrder === 'desc' ? '-' : ''}${sortParams.sortBy}`;

            const queryString = new URLSearchParams(filteredParams).toString();

            const response = await fetch(`${BASE_URL}api/inventory/?${queryString}`);
            if (!response.ok) {
                throw new Error('Error fetching inventory items');
            }
            const data = await response.json();
            setInventoryItems(data);
        } catch (error) {
            console.error('Error fetching inventory items:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await fetch(`${BASE_URL}api/inventory/${id}/`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Error deleting item');
                }
                console.log('Item deleted:', id);
                fetchInventoryItems(); // Refresh the inventory list after deleting an item
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setEditFormData({
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            price: item.price,
        });
    };

    const handleEditChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}api/inventory/${editingItem.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editFormData),
            });
            if (!response.ok) {
                throw new Error('Error updating item');
            }
            console.log('Item updated:', editingItem.id);
            fetchInventoryItems(); // Refresh the inventory list after updating an item
            setEditingItem(null); // Close the edit form
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleSortChange = (e) => {
        setSortParams({
            ...sortParams,
            [e.target.name]: e.target.value,
        });
    };

    const handleExportCSV = () => {
        window.location.href = `${BASE_URL}api/export-inventory/`;
    };

    return (
        <div className="inventory px-9 mx-9">
            <h2 className="font-bold text-2xl mb-6">Inventory Management</h2>
            <div className="filters-sort-container bg-gray-100 rounded-lg p-4 mb-6">
                <div className="filters flex items-center mb-4">
                    <div className="filter-item flex items-center mr-4 mb-2">
                        <label className="text-gray-700 mr-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            className="border-gray-300 border rounded-lg p-1 w-48"
                        />
                    </div>
                    <div className="filter-item flex items-center mr-4 mb-2">
                        <label className="text-gray-700 mr-2">Stock Range:</label>
                        <input
                            type="number"
                            name="stock_min"
                            value={filters.stock_min || ''}
                            onChange={handleFilterChange}
                            placeholder="Min"
                            className="border-gray-300 border rounded-lg p-1 w-24 mr-1"
                        />
                        <input
                            type="number"
                            name="stock_max"
                            value={filters.stock_max || ''}
                            onChange={handleFilterChange}
                            placeholder="Max"
                            className="border-gray-300 border rounded-lg p-1 w-24"
                        />
                    </div>
                    <div className="filter-item flex items-center mr-4 mb-2">
                        <label className="text-gray-700 mr-2">Price Range:</label>
                        <input
                            type="number"
                            name="price_min"
                            value={filters.price_min || ''}
                            onChange={handleFilterChange}
                            placeholder="Min"
                            className="border-gray-300 border rounded-lg p-1 w-24 mr-1"
                        />
                        <input
                            type="number"
                            name="price_max"
                            value={filters.price_max || ''}
                            onChange={handleFilterChange}
                            placeholder="Max"
                            className="border-gray-300 border rounded-lg p-1 w-24"
                        />
                    </div>
                </div>
                <div className="sort flex items-center mb-4">
                    <label className="text-gray-700 mr-2">Sort By:</label>
                    <select
                        name="sortBy"
                        value={sortParams.sortBy}
                        onChange={handleSortChange}
                        className="border-gray-300 border rounded-lg p-1 w-24 mr-4"
                    >
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="quantity">Quantity</option>
                    </select>

                    <label className="text-gray-700 mr-2">Sort Order:</label>
                    <select
                        name="sortOrder"
                        value={sortParams.sortOrder}
                        onChange={handleSortChange}
                        className="border-gray-300 border rounded-lg p-1 w-24 mr-5"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <button 
                        onClick={handleExportCSV} 
                        className="bg-[#FF4500] text-white ml-auto py-1 px-2 rounded-md hover:bg-orange-700 transition duration-300">
                            Export
                    </button>
                </div>
            </div>

            <table className="min-w-full bg-white">
                <thead className="bg-[#064789] text-white">
                    <tr>
                        <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                        <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                        <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
                        <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Last Modified At</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {inventoryItems.map((item) => (
                        <React.Fragment key={item.id}>
                            <tr className="border-b">
                                <td className="text-left py-3 px-4 text-[#000000]">{item.name}</td>
                                <td className="text-left py-3 px-4">{item.quantity}</td>
                                <td className="text-left py-3 px-4">Kes {item.price}</td>
                                <td className="text-left py-3 px-4">{new Date(item.last_updated).toLocaleString()}</td>
                                <td className="text-left py-3 px-4">
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleEdit(item)} className="bg-[#FFA500] text-white px-2 py-1 rounded-md hover:bg-amber-600 transition duration-300">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="bg-[#C83200] text-white px-2 py-1 rounded-md hover:bg-red-500 transition duration-300">Delete</button>
                                    </div>
                                </td>
                            </tr>
                            {editingItem && editingItem.id === item.id && (
                                <tr>
                                    <td colSpan="6" className="p-4 bg-gray-100">
                                        <div className="edit-form-container">
                                            <h3 className="font-bold text-xl mb-2">Edit Item</h3>
                                            <form onSubmit={handleEditSubmit}>
                                                <div className="mb-2">
                                                    <label className="block text-gray-700 mb-1">Name:</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={editFormData.name}
                                                        onChange={handleEditChange}
                                                        className="border-gray-300 border rounded-lg p-1 w-full"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-gray-700 mb-1">Description:</label>
                                                    <input
                                                        type="text"
                                                        name="description"
                                                        value={editFormData.description}
                                                        onChange={handleEditChange}
                                                        className="border-gray-300 border rounded-lg p-1 w-full"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-gray-700 mb-1">Quantity:</label>
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        value={editFormData.quantity}
                                                        onChange={handleEditChange}
                                                        className="border-gray-300 border rounded-lg p-1 w-full"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-gray-700 mb-1">Price:</label>
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        value={editFormData.price}
                                                        onChange={handleEditChange}
                                                        className="border-gray-300 border rounded-lg p-1 w-full"
                                                    />
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Save</button>
                                                    <button onClick={() => setEditingItem(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300">Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;

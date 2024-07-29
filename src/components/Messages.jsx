import React, { useState, useEffect } from 'react';
import BASE_URL from '../../config.js';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${BASE_URL}api/contact/`);
                if (!response.ok) {
                    throw new Error('Error fetching messages');
                }
                const data = await response.json();
                // Sort messages by created_at in descending order (newest first)
                const sortedMessages = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setMessages(sortedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const filteredMessages = messages.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (message.phone && message.phone.includes(searchTerm)) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
            <input
                type="text"
                placeholder="Search messages"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full md:w-1/2 lg:w-1/3"
            />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 border-b text-left">Name</th>
                            <th className="py-3 px-4 border-b text-left">Email</th>
                            <th className="py-3 px-4 border-b text-left">Phone</th>
                            <th className="py-3 px-4 border-b text-left">Message</th>
                            <th className="py-3 px-4 border-b text-left">Sent At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMessages.map(message => (
                            <tr key={message.id}>
                                <td className="py-3 px-4 border-b">{message.name}</td>
                                <td className="py-3 px-4 border-b">
                                    <a className='text-blue-600 hover:underline' href={`mailto:${message.email}`}>{message.email}</a>
                                </td>
                                <td className="py-3 px-4 border-b">
                                    {message.phone && 
                                        <a className='text-blue-600 hover:underline' href={`tel:${message.phone}`}>{message.phone}</a>
                                    }
                                </td>
                                <td className="py-3 px-4 border-b">{message.message}</td>
                                <td className="py-3 px-4 border-b">{new Date(message.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactMessages;

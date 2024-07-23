import React, { useState, useEffect } from 'react';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:8000/accounts/api/contact/');
                if (!response.ok) {
                    throw new Error('Error fetching messages');
                }
                const data = await response.json();
                // Sort messages by created_at in descending order (newest first)
                const sortedMessages = data.sort((a, b) => {
                    if (a.created_at > b.created_at) return -1;
                    if (a.created_at < b.created_at) return 1;
                    return 0;
                });
                setMessages(sortedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-8 mx-10">
            <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {messages.map(message => (
                    <div key={message.id} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                        <div className="space-y-2">
                            <div>
                                <strong className="font-semibold">Name:</strong> {message.name}
                            </div>
                            <div>
                                <strong className="font-semibold">Email:</strong> <a className='hover:text-sky-500' href={`mailto:${message.email}`}>{message.email}</a>
                            </div>
                            <div>
                                {message.phone &&
                                    <>
                                        <strong className="font-semibold">Phone:</strong> <a className='hover:text-sky-500' href={`tel:${message.phone}`}>{message.phone}</a>
                                    </>
                                }
                            </div>
                            <div>
                                <strong className="font-semibold">Message:</strong> {message.message}
                            </div>
                            <div className="text-sm text-gray-500">
                                Sent at: {new Date(message.created_at).toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactMessages;

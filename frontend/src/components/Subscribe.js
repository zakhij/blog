import React, { useState } from 'react';
import axios from 'axios';

export default function Subscribe() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/subscribe/`, { email });
            setMessage('Thank you for subscribing!');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage('This email is already subscribed.');
            } else {
                setMessage('Something went wrong. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Subscribe for New Blog Post Updates!</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        >
                            {loading ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                    {message && <p className="mt-4 text-center text-green-600">{message}</p>}
                </div>
            </div>
    );
}

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PageLayout from './PageLayout';

export default function Unsubscribe() {
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUnsubscribe = async () => {
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/unsubscribe/${token}/`);
            setMessage('You have been successfully unsubscribed.');
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Unsubscribe from Email Updates</h2>
                    <p className="mb-4">Are you sure you want to unsubscribe from email updates?</p>
                    <button
                        onClick={handleUnsubscribe}
                        disabled={loading}
                        className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                    >
                        {loading ? 'Unsubscribing...' : 'Unsubscribe'}
                    </button>
                    {message && <p className="mt-4 text-green-600">{message}</p>}
                </div>
            </div>
    );
}


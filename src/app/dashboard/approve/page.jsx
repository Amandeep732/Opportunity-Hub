"use client";
import { useState, useEffect } from 'react';
import api from '@/helpers/api';

export default function AdminApprovalPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch non-approved events
  const fetchNonApprovedEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/event/adminApi/getAll');
      setEvents(res.data.data);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNonApprovedEvents();
  }, []);

  // Approve event function
  const approveEvent = async (eventId) => {
    try {
      setLoading(true);
      await api.patch(`/event/adminApi/approve/${eventId}`);
      
      setEvents(prev => prev.filter(event => event._id !== eventId));
    } catch (err) {
      setError('Failed to approve event');
      console.error('Error approving event:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && events.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Loading events...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-red-500">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Pending Approvals</h1>
        
        {events.length === 0 ? (
          <p className="text-gray-400">No events pending approval</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-400 line-clamp-2">{event.desc}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {event.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => approveEvent(event._id)}
                        className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-800 transition-colors"
                        disabled={loading}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
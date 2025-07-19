"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/helpers/api"
import { useRouter } from "next/navigation";
useRouter
export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await api.get("/user/me");
        const hackRes = await api.get("/event/usersApi/hackathons");

        setUser(userRes.data.user);
        setHackathons(hackRes.data.hackathons || []);
      } catch (err) {
        console.error("Error fetching hackathons:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const handleEdit = (event) => {
     router.push(`/dashboard/update/${event._id}?${new URLSearchParams({eventData : JSON.stringify(event)})}`)
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this hackathon?")) return;
    try {
      await api.delete(`/event/adminApi/delete/${id}`);
      setHackathons(prev => prev.filter(h => h._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete hackathon.");
    }
  }

  if (loading) return <p className="p-6">Loading hackathons...</p>;

  if (!user) return <p className="p-6 text-red-600">Failed to load user info</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Upcoming Hackathons</h1>
        {user.role.trim() === 'admin' && (
          <Link
            href="/dashboard/addEvent"
            className="mt-4 md:mt-0 inline-block bg-green-600 text-black px-4 py-2 rounded-lg hover:bg-green-700 transition text-base"
          >
            + Add Hackathon
          </Link>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
              {(user.role === 'admin') && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hackathons.map(hack => (
              <tr key={hack._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-800">{hack.title}</td>
                <td className="px-4 py-4 text-sm text-gray-700">{hack.location}</td>
                <td className="px-4 py-4 text-sm">
                  <a
                    href={hack.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Register
                  </a>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">{new Date(hack.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {new Date(hack.deadline).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </td>
                {user.role.trim() === 'admin' && (
                  <td className="px-4 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(hack) }
                        className="bg-blue-600 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(hack._id)}
                        className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {hackathons.map(hack => (
          <div key={hack._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">{hack.title}</h2>
              <span className="text-xs text-gray-500">
                {new Date(hack.deadline).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{hack.location}</p>
            <div className="mt-3 flex justify-between items-center">
              <a
                href={hack.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Register
              </a>
              {user.role.trim() === 'admin' && (
                <div className="space-x-2">
                  <Link
                    href={`/hackathons/edit/${hack._id}`}
                    className="bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition text-xs"
                  >Edit</Link>
                  <button
                    onClick={() => handleDelete(hack._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition text-xs"
                  >Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No data fallback */}
      {hackathons.length === 0 && (
        <p className="mt-6 text-center text-gray-600">No hackathons found.</p>
      )}
    </div>
  );
}

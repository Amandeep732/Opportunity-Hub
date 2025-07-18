"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/helpers/api";

export default function InternshipsPage() {
  const [internships, setInternships] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await api.get("/user/me");
        const internshipsRes = await api.get("/event/usersApi/internships");
    
        setUser(userRes.data.user); 
        setInternships(internshipsRes.data.internships);
      } catch (err) {
        console.error("Error fetching internships:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this internship?")) return;
    try {
      const response = await api.delete(`/event/adminApi/delete/${id}`);
      console.log("Delete response:", response.data);
      setInternships((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete internship.");
    }
  }

  if (loading) {
    return <p className="p-6">Loading internships...</p>;
  }

  if (!user) {
    return <p className="p-6 text-red-600">Failed to load user info</p>;
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Upcoming Internships</h1>

      {/* Add button visible only for admin */}
      {user.role.trim() === 'admin' && (
        <div className="mb-4">
          <Link
            href="/internships/add"
            className="inline-block bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Add Internship
          </Link>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Posted Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Deadline
              </th>
              {user.role.trim() === 'user' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                  Operations
                </th>
              )}  
              {user.role.trim() === 'admin' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {internships?.map((internship) => (
              <tr key={internship._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-black w-1/6">
                  {internship.title}
                </td>
                <td className="px-6 py-4 text-sm text-black w-1/6">
                  {internship.company || internship.location}
                </td>
                <td className="px-6 py-4 text-sm text-black w-1/6">
                  <a 
                    href={internship.registrationLink || internship.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Apply
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-black w-1/6">
                  {new Date(internship.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-black w-1/6">
                  {new Date(internship.deadline).toLocaleDateString()}
                </td>
                
                {user.role.trim() === "admin" && (
                  <td className="px-6 py-4 text-sm w-1/6">
                    <div className="flex space-x-2">
                      <Link
                        href={`/internships/edit/${internship._id}`}
                        className="bg-blue-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(internship._id)}
                        className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-700 transition"
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
    </div>
  );
}
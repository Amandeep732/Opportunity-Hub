"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/helpers/api"; // <-- your axios instance configured with baseURL & auth headers

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [userRes, hackRes] = await Promise.all([
//           api.get("/api/user/me"),
//           api.get("/api/hackathons"),
//         ]);
//         setUser(userRes.data); // { name, role }
//         setHackathons(hackRes.data); // array of hackathons
//       } catch (err) {
//         console.error("Error fetching hackathons:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this hackathon?")) return;
    try {
      await api.delete(`/api/hackathons/${id}`);
      // update local state
      setHackathons((prev) => prev.filter((h) => h._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete hackathon.");
    }
  }

  if (loading) {
    return <p className="p-6">Loading hackathons...</p>;
  }

  if (!user) {
    return <p className="p-6 text-red-600">Failed to load user info</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Hackathons</h1>

      {/* Add button visible only for admin */}
      {user.role === "admin" && (
        <div className="mb-4">
          <Link
            href="/hackathons/add"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Add Hackathon
          </Link>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              {user.role === "admin" && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hackathons.map((hack) => (
              <tr key={hack._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {hack.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {hack.company}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {hack.date}
                </td>
                {user.role === "admin" && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <Link
                        href={`/hackathons/edit/${hack._id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(hack._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
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

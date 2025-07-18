"use client";
import api from "@/helpers/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [hackathonsCount, setHackathonsCount] = useState(0);
  const [InternshipsCount, setInternshipCount] = useState(0);
  const [ContestsCount, setContestsCount] = useState(0);
  const stats = [
    { title: "Internships", count: InternshipsCount, href: "/dashboard/internships" },
    { title: "Hackathons", count: hackathonsCount, href: "/dashboard/hackathons" }, // Dynamic count
    { title: "Contests", count: ContestsCount, href: "/dashboard/contests" },
  ];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [userRes, countRes, interCount, ContestsCount ] = await Promise.all([
          api.get('/user/me'),
          api.get('/event/usersApi/hackathons'),
          api.get('/event/usersApi/internships'),
          api.get('/event/usersApi/contests')
        ]);  

        setUser(userRes.data.user);
        setHackathonsCount(countRes.data.count || 0); 
        setInternshipCount(interCount.data.count || 0),
        setContestsCount(ContestsCount.data.count)
        // Ensure we have a number
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchAll();
  }, []);

  const recent = [
    { title: "Frontend Developer Intern", type: "Internship" },
    { title: "AI Hackathon 2025", type: "Hackathon" },
    { title: "CodeSprint Challenge", type: "Contest" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.name || 'User'} 👋
      </h1>

      {/* Stats cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <Link key={s.title} href={s.href}>
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer">
              <p className="text-gray-500">{s.title}</p>
              <p className="text-2xl text-gray-800 font-bold mt-2">
                {s.count}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick add button only for admin */}
      {user?.role === "admin" && (
        <div className="mb-6">
          <Link
            href="/events/add"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Add New Event
          </Link>
        </div>
      )}

      {/* Recent opportunities */}
      <h2 className="text-xl font-semibold mb-4">Recent Opportunities</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4 text-gray-800">Title</th>
              <th className="p-4 text-gray-800">Type</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-4 text-gray-800">{item.title}</td>
                <td className="p-4 text-gray-800">{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
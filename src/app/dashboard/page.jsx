// app/dashboard/page.tsx  (if using Next.js App Router)

"use client";
import Link from "next/link";

export default function DashboardPage() {
  const user = { name: "Achal", role: "admin" }; // api call
  const stats = [
    { title: "Internships", count: 12, href: "/internships" },
    { title: "Hackathons", count: 8, href: "/hackathons" },
    { title: "Contests", count: 5, href: "/contests" },
  ];

  const recent = [ // api calls
    { title: "Frontend Developer Intern", type: "Internship" },
    { title: "AI Hackathon 2025", type: "Hackathon" },
    { title: "CodeSprint Challenge", type: "Contest" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user.name} 👋
      </h1>

      {/* Stats cards */}
      <div className="grid  md:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <Link key={s.title} href={s.href}>
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer">
              <p className="text-gray-500">{s.title}</p>
              <p className="text-2xl text-gray-800 font-bold mt-2">{s.count}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick add button only for admin */}
      {user.role === "admin" && (
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

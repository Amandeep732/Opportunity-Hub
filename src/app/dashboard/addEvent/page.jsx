"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/helpers/api";

export default function AddEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    source: "",
    approved: false,
    time: "",
    deadline: "",
    location: "",
    registrationLink: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev, [name]: type === "checkbox" ? checked : value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/event/adminApi/add", formData);
      console.log(`all repost is ${response}`)
      if (response.status === 201) {
        alert("Event created successfully!");
        router.push("/dashboard");
      } else {
        setError(response.data.error || "Failed to create event");
      }
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-green-400">Add New Event</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-900 text-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Category*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
                required
              >
                <option value="" className="bg-gray-900">Select Category</option>
                <option value="hackathons" className="bg-gray-900">Hackathon</option>
                <option value="internships" className="bg-gray-900">Internship</option>
                <option value="contests" className="bg-gray-900">Contest</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-300">Description*</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                rows={2}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
                required
              />
            </div>

            {/* Time */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Event Time*</label>
              <input
                type="datetime-local"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white [color-scheme:dark]"
                required
              />
            </div>

            {/* Deadline */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Deadline*</label>
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white [color-scheme:dark]"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Location*</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
                required
              />
            </div>

            {/* Registration Link */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Registration Link*</label>
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
                required
              />
            </div>

            {/* Source */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Source</label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
                placeholder="Where did you find this event?"
              />
            </div>

            {/* Approved */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="approved"
                checked={formData.approved}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-green-400 focus:ring-green-400"
                id="approved-checkbox"
              />
              <label htmlFor="approved-checkbox" className="text-sm font-medium text-gray-300">
                Approved
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-800 text-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-800 transition-colors"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
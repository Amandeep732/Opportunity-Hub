"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import api from "@/helpers/api";

export default function EditEventPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [eventData, setEventData] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    source: "",
    approved: false,
    time: "",
    deadline: "",
    location: "",
    registrationLink: "",
  });

  // Load event data
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        let data;
        
        // Check if data is passed via URL params
        const eventParam = searchParams.get("eventData");
        if (eventParam) {
          data = JSON.parse(decodeURIComponent(eventParam));
        } else {
          // Fetch from API if not in URL params
          const response = await api.get(`/event/usersApi/one/${id}`);
          data = response.data;
        }
        
        setEventData(data);
        
        // Format dates for datetime-local inputs
        const formatDateForInput = (dateString) => {
          if (!dateString) return "";
          const date = new Date(dateString);
          return date.toISOString().slice(0, 16);
        };

        setFormData({
          title: data.title || "",
          desc: data.desc || "",
          category: data.category || "",
          source: data.source || "",
          approved: data.approved || false,
          time: formatDateForInput(data.time),
          deadline: formatDateForInput(data.deadline),
          location: data.location || "",
          registrationLink: data.registrationLink || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load event data");
        console.error("Error loading event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id, searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const payload = {
        title: formData.title,
        desc: formData.desc || '',
        category: formData.category,
        source: formData.source,
        approved: formData.approved,
        time: formData.time,
        deadline: formData.deadline || '',
        location: formData.location,
        registrationLink: formData.registrationLink,
      };

      await api.patch(`/event/adminApi/edit/${id}`, payload);
      router.push("/dashboard?updated=true");
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.response?.data?.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !eventData) {
    return (
      <div className="min-h-screen bg-black text-gray-100 p-6">
        <div className="max-w-4xl mx-auto">Loading event data...</div>
      </div>
    );
  }

  if (error && !eventData) {
    return (
      <div className="min-h-screen bg-black text-gray-100 p-6">
        <div className="max-w-4xl mx-auto text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-green-400">Update Event</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-900 text-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">
                Title*
              </label>
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
              <label className="block text-sm font-medium text-gray-300">
                Category*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
                required
              >
                <option value="">Select Category</option>
                <option value="hackathons">Hackathon</option>
                <option value="internships">Internship</option>
                <option value="contests">Contest</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-300">
                Description*
              </label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
                
              />
            </div>

            {/* Time */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">
                Event Time*
              </label>
              <input
                type="datetime-local"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white [color-scheme:dark]"
                
              />
            </div>

            {/* Deadline */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">
                Deadline*
              </label>
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white [color-scheme:dark]"
                
              />
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">
                Location*
              </label>
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
              <label className="block text-sm font-medium text-gray-300">
                Registration Link*
              </label>
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
              <label className="block text-sm font-medium text-gray-300">
                Source
              </label>
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
              <label
                htmlFor="approved-checkbox"
                className="text-sm font-medium text-gray-300"
              >
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
              {loading ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
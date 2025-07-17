"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/helpers/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",       // ✅ matches backend
    email: "",
    password: "",
    role: "user",   // ✅ default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/signup", formData);
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1b1b1e] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-lg shadow-lg p-8 border border-white/10">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-500 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ Name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d0d0f] border border-white/10 rounded text-white focus:ring-2 focus:ring-[#f02e65] focus:border-transparent"
            />
          </div>

          {/* ✅ Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d0d0f] border border-white/10 rounded text-white focus:ring-2 focus:ring-[#f02e65] focus:border-transparent"
            />
          </div>

          {/* ✅ Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d0d0f] border border-white/10 rounded text-white focus:ring-2 focus:ring-[#f02e65] focus:border-transparent"
            />
          </div>

          {/* ✅ Role is fixed to "user", so we don't need to show it as input.
              If you WANT to allow selecting, uncomment below:
          
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#0d0d0f] border border-white/10 rounded text-white focus:ring-2 focus:ring-[#f02e65] focus:border-transparent"
            >
              <option value="user">User</option>
            </select>
          </div>
          */}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-[#f02e65] hover:bg-[#d82555] text-white py-2 px-4 rounded transition duration-200 flex justify-center items-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-[#f02e65] hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

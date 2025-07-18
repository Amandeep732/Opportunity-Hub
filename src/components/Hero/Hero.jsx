import React, { useState } from 'react';

 export function Hero() {
  const [activeFilter, setActiveFilter] = useState('Internships');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['Internships', 'Hackathons', 'Coding Contests', 'Remote'];

  // Mock counter animation
  const [opportunitiesCount] = useState(187);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
            Your Gateway to Tech Opportunities
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10">
            Discover, Apply, and Track — All in One Hub. Updated Daily.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search roles, skills, or companies..."
              className="w-full text-white bg-[#001E2B] px-6 py-4  rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className=" cursor-pointer absolute right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-4 cursor-pointer py-2 rounded-full text-sm font-medium transition ${activeFilter === filter ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex justify-center gap-4  mb-16">
          <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition transform hover:scale-105 shadow-md">
            Get Started →
          </button>
          <button className="bg-white cursor-pointer hover:bg-gray-100 text-gray-700 font-medium py-3 px-8 rounded-full transition border border-gray-300">
            Browse Opportunities
          </button>
        </div>

        {/* Social Proof & Counter */}
        <div className="text-center">
          <p className="text-gray-500 mb-2">
            <span className="font-bold text-blue-600 animate-pulse">{opportunitiesCount.toLocaleString()}+</span> New Opportunities Added This Month!
          </p>
          {/* <p className="text-gray-600">
            Trusted by <span className="font-semibold">50,000+ students</span> from IITs, Stanford, NUS, and more.
          </p> */}
          <div className="flex justify-center mt-4 space-x-6 opacity-80">
            {/* Placeholder for university logos - replace with actual images */}
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};


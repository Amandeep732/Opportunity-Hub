// components/SuccessStories.tsx
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'; // Changed import path
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    name: "Priya K.",
    college: "IIT Delhi",
    role: "Google Summer Intern '23",
    text: "Landed 3 internship offers through Opportunity Hub's early alerts!",
    rating: 5
  },
  {
    name: "Rahul M.",
    college: "NIT Trichy",
    role: "Hackathon Winner",
    text: "Won my first hackathon after discovering it here",
    rating: 5
  }
];

export  function SuccessStories() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Success Stories
        </h2>
        
        <div className=" grid  md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-gray-200 bg-[#001E2B] rounded-lg p-6 hover:shadow-md transition">
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <SolidStarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-400 italic mb-4">"{t.text}"</p>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role} • {t.college}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
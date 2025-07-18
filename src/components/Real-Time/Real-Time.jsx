// components/RealTimeUpdates.tsx
import { 
  BoltIcon,
  ClockIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';

export  function RealTime() {
  return (
    <div className="bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Always Updated. Always Relevant.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <BoltIcon className="h-8 w-8 text-yellow-500" />,
              title: "Instant Notifications",
              desc: "Get alerts for new opportunities matching your profile"
            },
            {
              icon: <ClockIcon className="h-8 w-8 text-blue-500" />,
              title: "Daily Refreshes",
              desc: "Our bots scan 500+ sources every 6 hours"
            },
            {
              icon: <CalendarIcon className="h-8 w-8 text-green-500" />,
              title: "Deadline Tracking",
              desc: "Personalized countdowns for application deadlines"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center mb-4">
                {item.icon}
                <h3 className="ml-3 text-lg font-medium">{item.title}</h3>
              </div>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
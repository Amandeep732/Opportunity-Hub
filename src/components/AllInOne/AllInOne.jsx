// components/AllInOneFeature.tsx
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const features = [
  "Real-time internship updates",
  "Global hackathon calendar",
  "Coding contest reminders",
  "Personalized recommendations",
  "Deadline tracking",
];

export function AllInOneFeature() {
  return (
    <div className="#001E2B py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2
            className="text-3xl font-bold sm:text-4xl"
            style={{ color: "#00ED64" }}
          >
            All Opportunities. One Platform.
          </h2>

          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            Never miss a chance to level up your tech career
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex flex-col items-center text-center p-4"
            >
              <CheckCircleIcon className="h-8 w-8 text-green-500 mb-3" />
              <span className="font-medium text-gray-400">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

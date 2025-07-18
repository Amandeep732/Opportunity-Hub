// components/HowItWorks.tsx
const steps = [
  {
    id: 1,
    name: "Create Profile",
    description: "Tell us your skills, interests, and goals"
  },
  {
    id: 2,
    name: "Get Matched",
    description: "We surface the most relevant opportunities"
  },
  {
    id: 3,
    name: "Apply Directly",
    description: "One-click applications for many listings"
  },
  {
    id: 4,
    name: "Track Progress",
    description: "Manage all applications in your dashboard"
  }
];

export function HowItWorks() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        
        <div className="flow-root">
  <ul className="flex flex-col lg:flex-row lg:justify-between -mb-8 lg:space-x-8">
    {steps.map((step, stepIdx) => (
      <li key={step.id} className="flex-1">
        <div className="relative pb-8 lg:pb-0">
          {/* hide vertical line on desktop */}
          {stepIdx !== steps.length - 1 ? (
            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 lg:hidden" />
          ) : null}
          <div className="relative flex space-x-3 lg:block lg:text-center">
            <div className="flex-shrink-0 mx-auto lg:mb-4">
              <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mx-auto">
                {step.id}
              </span>
            </div>
            <div className="min-w-0 flex-1 pt-1.5 lg:pt-0">
              <h3 className="text-lg font-medium text-gray-900">{step.name}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>

      </div>
    </div>
  );
}
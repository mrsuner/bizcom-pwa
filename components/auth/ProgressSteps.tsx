interface ProgressStepsProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressSteps({ currentStep, totalSteps = 3 }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
              ${
                step < currentStep
                  ? "bg-primary text-white"
                  : step === currentStep
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
          >
            {step < currentStep ? "✓" : step}
          </div>
          {step < totalSteps && (
            <div
              className={`w-8 h-0.5 mx-1 transition-colors
                ${step < currentStep ? "bg-primary" : "bg-gray-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

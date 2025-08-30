import React from "react";

const ProgressHeader = ({ step, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
      <div className="flex items-center justify-center space-x-4 max-w-2xl mx-auto">
        {steps.map((stepNumber, index) => (
          <React.Fragment key={stepNumber}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                step >= stepNumber
                  ? 'bg-white text-indigo-600'
                  : 'bg-indigo-500 text-white border-2 border-indigo-300'
              }`}
            >
              {stepNumber}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 bg-indigo-500 rounded">
                <div
                  className={`h-full bg-white rounded transition-all duration-300 ${
                    step > stepNumber ? 'w-full' : step === stepNumber ? 'w-1/2' : 'w-0'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressHeader;

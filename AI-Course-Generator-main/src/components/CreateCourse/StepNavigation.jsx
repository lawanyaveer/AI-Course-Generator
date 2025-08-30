import React from "react";

const StepNavigation = ({
  step,
  totalSteps,
  onPrev,
  onNext,
  onGenerate,
  onCreate,
  onUpdate,
  isEditing
}) => {
  if (step === 1) {
    return (
      <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
        <div className="flex justify-between">
          <div /> {/* Empty div for spacing */}
          <button
            onClick={onGenerate}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
          >
            Generate Content
          </button>
        </div>
      </div>
    );
  }

  if (step <= 3) {
    return (
      <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
        <div className="flex justify-between">
          <button
            onClick={onPrev}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
          >
            Previous
          </button>
          
          {step === 3 ? (
            <button
              onClick={isEditing ? onUpdate : onCreate}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
            >
              {isEditing ? 'Update Course' : 'Create Course'}
            </button>
          ) : (
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default StepNavigation;

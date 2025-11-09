import { useState } from "react";
import firstAidData from "../data/firstAid.json";

export default function FirstAid({ navigate }) {
  const [selectedAid, setSelectedAid] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);

  // --- LIST VIEW ---
  if (!selectedAid) {
    return (
      <div className="h-full w-full flex flex-col bg-gray-50">
        {/* Header */}
        <div className="p-4 border-b bg-white flex items-center justify-between shadow-sm">
          <button
            onClick={() => navigate("home")}
            className="text-blue-600 font-medium"
          >
            ← Back
          </button>
          <h2 className="text-lg font-semibold text-gray-800">
            First Aid Guide
          </h2>
          <div className="w-10" />
        </div>

        {/* Aid List */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-gray-700 font-semibold mb-3">
            Select a First Aid Topic
          </h3>
          <ul className="space-y-3">
            {firstAidData.map((aid, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setSelectedAid(aid);
                  setStepIndex(0);
                }}
                className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm 
                           hover:bg-blue-50 active:scale-[0.98] transition-all 
                           cursor-pointer flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">{aid.title}</h4>
                  <p className="text-sm text-gray-600">{aid.description}</p>
                </div>
                <span className="text-blue-600 font-semibold text-xl">›</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // --- STEP VIEW ---
  const steps = selectedAid.steps;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  return (
    <div className="h-full w-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white border-b shadow-sm flex items-center justify-between">
        <button
          onClick={() => {
            setSelectedAid(null);
            setStepIndex(0);
          }}
          className="text-blue-600 font-medium"
        >
          ← Back
        </button>
        <h2 className="text-center font-semibold text-base flex-1 text-gray-800">
          {selectedAid.title}
        </h2>
        <div className="w-10" />
      </div>

      {/* Step View */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 py-8 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm w-full max-w-md text-gray-800">
          <p className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
            Step {stepIndex + 1} of {steps.length}
          </p>
          <p className="text-xl font-medium leading-relaxed">
            {steps[stepIndex]}
          </p>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex gap-3 p-4 bg-white border-t shadow-sm">
        {!isFirstStep ? (
          <button
            onClick={() => setStepIndex((i) => i - 1)}
            className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 active:scale-95 transition-transform"
          >
            ← Previous
          </button>
        ) : (
          <div className="flex-1" />
        )}

        {!isLastStep ? (
          <button
            onClick={() => setStepIndex((i) => i + 1)}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-95 transition-transform"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={() => {
              setSelectedAid(null);
              setStepIndex(0);
            }}
            className="flex-1 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 active:scale-95 transition-transform"
          >
            Done ✅
          </button>
        )}
      </div>
    </div>
  );
}

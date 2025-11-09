import React, { useState } from 'react';
import firstAidData from '../../data/firstAid.json';

const FirstAid = () => {
  // Index for emergency scenarios
  const [scenarioIdx, setScenarioIdx] = useState(0);
  // Index for step within scenario
  const [stepIdx, setStepIdx] = useState(0);

  const scenario = firstAidData[scenarioIdx];
  const steps = scenario.steps;

  // Move to previous scenario
  const handlePrevScenario = () => {
    setScenarioIdx((idx) => Math.max(0, idx - 1));
    setStepIdx(0); // reset step to 0
  };

  // Move to next scenario
  const handleNextScenario = () => {
    setScenarioIdx((idx) => Math.min(firstAidData.length - 1, idx + 1));
    setStepIdx(0); // reset step to 0
  };

  // Move to previous step
  const handlePrevStep = () => {
    setStepIdx((idx) => Math.max(0, idx - 1));
  };

  // Move to next step
  const handleNextStep = () => {
    setStepIdx((idx) => Math.min(steps.length - 1, idx + 1));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">First Aid Guide</h2>
      <div className="mb-2">
        <span className="font-semibold">Scenario:</span> {scenario.title}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Step {stepIdx + 1} of {steps.length}:</span>
        <div className="mt-2 text-lg">{steps[stepIdx]}</div>
      </div>
      <div className="flex justify-between mb-2">
        <button
          onClick={handlePrevScenario}
          disabled={scenarioIdx === 0}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          &#8592; Prev Scenario
        </button>
        <button
          onClick={handleNextScenario}
          disabled={scenarioIdx === firstAidData.length - 1}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next Scenario &#8594;
        </button>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrevStep}
          disabled={stepIdx === 0}
          className="px-2 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          &#8592; Back
        </button>
        <button
          onClick={handleNextStep}
          disabled={stepIdx === steps.length - 1}
          className="px-2 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
};

export default FirstAid;

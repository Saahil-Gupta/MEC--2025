import { useState } from "react";
import disasterFAQ from "../data/EmergencyFAQ.json";

export default function DisasterFAQ({ navigate }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // 1️⃣ Show disaster list
  if (!selectedEvent) {
    return (
      <div className="h-full w-full flex flex-col bg-gray-50">
        <div className="p-4 border-b bg-white flex items-center justify-between shadow-sm">
          <button
            onClick={() => navigate("home")}
            className="text-blue-600 font-medium"
          >
            ← Back
          </button>
          <h2 className="text-xl font-bold">Emergency FAQs</h2>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-gray-700 font-semibold mb-3">
            Choose a Disaster Type
          </h3>
          <ul className="space-y-2">
            {disasterFAQ.map((d, i) => (
              <li
                key={i}
                onClick={() => setSelectedEvent(d)}
                className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-blue-50 cursor-pointer flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">{d.event}</h4>
                  <p className="text-sm text-gray-600">{d.desc}</p>
                </div>
                <span className="text-blue-600 font-semibold text-lg">›</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // 2️⃣ Show question list
  if (selectedEvent && !selectedQuestion) {
    return (
      <div className="h-full w-full flex flex-col bg-gray-50">
        <div className="p-4 border-b bg-white flex items-center justify-between shadow-sm">
          <button
            onClick={() => setSelectedEvent(null)}
            className="text-blue-600 font-medium"
          >
            ← Back
          </button>
          <h2 className="text-lg font-semibold">{selectedEvent.event}</h2>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-gray-700 font-semibold mb-3">
            Common Questions
          </h3>
          <ul className="space-y-2">
            {selectedEvent.faqs.map((faq, idx) => (
              <li
                key={idx}
                onClick={() => setSelectedQuestion(faq)}
                className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-blue-50 cursor-pointer flex justify-between items-center"
              >
                <p className="text-gray-800 font-medium">{faq.question}</p>
                <span className="text-blue-600 font-semibold text-lg">›</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // 3️⃣ Show answer view
  return (
    <div className="h-full w-full flex flex-col bg-gray-50">
      <div className="p-4 border-b bg-white flex items-center justify-between shadow-sm">
        <button
          onClick={() => setSelectedQuestion(null)}
          className="text-blue-600 font-medium"
        >
          ← Back
        </button>
        <h2 className="text-lg font-semibold">FAQ Answer</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="bg-white p-6 rounded-2xl shadow-sm border text-gray-800 text-base leading-relaxed">
          <h3 className="font-semibold text-lg mb-2">
            {selectedQuestion.question}
          </h3>
          <p>{selectedQuestion.answer}</p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              setSelectedEvent(null);
              setSelectedQuestion(null);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 active:scale-95 transition-transform"
          >
            Done ✅
          </button>
        </div>
      </div>
    </div>
  );
}

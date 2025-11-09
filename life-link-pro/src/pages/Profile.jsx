import { useState } from "react";
import { saveUser, getUser } from "../stores/userStore";

export default function Profile({ navigate }) {
  const existing = getUser();

  const [name, setName] = useState(existing?.name || "");
  const [role, setRole] = useState(existing?.role || "Citizen");
  const [medical, setMedical] = useState(existing?.medical || "");

  const submit = () => {
    saveUser({
      name,
      role,
      medical,
      createdAt: existing?.createdAt || Date.now(),
    });

    navigate("home");
  };

  return (
    <div className="h-full w-full p-5 space-y-6">

      <button
        onClick={() => navigate("home")}
        className="text-blue-600 text-sm"
      >
        ← Back
      </button>

      <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>

      <div className="flex flex-col space-y-4">

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Enter your name"
          />
        </div>

        {/* Role */}
        <div>
          <label className="text-sm font-medium text-gray-700">Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
          >
            <option>Citizen</option>
            <option>First Responder</option>
            <option>Volunteer</option>
            <option>Emergency Worker</option>
          </select>
        </div>

        {/* Medical Notes */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Medical / Emergency Notes
          </label>
          <textarea
            value={medical}
            onChange={e => setMedical(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Allergies, medications, chronic conditions"
          />
        </div>

        <button
          onClick={submit}
          className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold shadow hover:bg-green-700"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

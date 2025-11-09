import { useState, useEffect } from "react";

// Persistent storage
export const saveUser = (user) => {
  localStorage.setItem("userProfile", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("userProfile");
  return user ? JSON.parse(user) : null;
};

export default function Profile({ navigate }) {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Citizen");
  const [medical, setMedical] = useState("");

  useEffect(() => {
    const existing = getUser();
    if (existing) {
      setUser(existing);
      setName(existing.name);
      setRole(existing.role);
      setMedical(existing.medical);
      setIsEditing(false); // start in view mode if user exists
    } else {
      setIsEditing(true); // no user, start in edit mode
    }
  }, []);

  const submit = () => {
    const newUser = {
      name,
      role,
      medical,
      createdAt: user?.createdAt || Date.now(),
    };
    saveUser(newUser);
    setUser(newUser);
    setIsEditing(false);
  };

  // Handle case where user hasn't loaded yet
  if (!user && !isEditing) {
    return <div className="p-5">Loading...</div>;
  }

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
        {isEditing ? (
          <>
            <div className="flex justify-center mb-4">
              <img
                src="/icons/placeholder_user.png"
                alt="placeholder_user"
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
            </div>

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
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {/* Placeholder Image */}
            <img
              src="/icons/placeholder.png"
              alt="User"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />

            {/* Name below image */}
            <p className="text-lg font-semibold">{user?.name || "placeholder_user"}</p>

            {/* Role */}
            <div className="text-center">
              <p className="font-medium text-gray-600">Role:</p>
              <p>{user?.role || "Citizen"}</p>
            </div>

            {/* Medical / Emergency Notes */}
            <div className="text-center">
              <p className="font-medium text-gray-600">Medical / Emergency Notes:</p>
              <p>{user?.medical || "None"}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full max-w-xs bg-blue-600 text-white py-2 rounded-xl font-semibold shadow hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

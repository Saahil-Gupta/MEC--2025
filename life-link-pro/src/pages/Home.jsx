export default function Home({ navigate }) {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-5 text-center border-b">
        <h1 className="text-2xl font-bold">Life-Link Pro</h1>
        <p className="text-xs text-gray-500">Offline disaster response</p>
      </div>

      <div className="flex-1 p-6 space-y-4">
        <button
          onClick={() => navigate("sos")}
          className="w-full bg-red-600 text-white py-5 rounded-xl text-xl font-semibold"
        >
          SEND SOS
        </button>

        <button
          onClick={() => navigate("hazards")}
          className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg"
        >
          Hazard Reports
        </button>

        <button
          onClick={() => navigate("firstAid")}
          className="w-full bg-green-600 text-white py-4 rounded-xl text-lg"
        >
          First Aid Guide
        </button>
      </div>
    </div>
  );
}

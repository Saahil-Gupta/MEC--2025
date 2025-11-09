export default function Header({ title, onBack }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
      {onBack ? (
        <button
          onClick={onBack}
          className="text-blue-600 font-medium hover:underline"
        >
          ← Back
        </button>
      ) : (
        <span></span>
      )}
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <span></span>
    </div>
  );
}

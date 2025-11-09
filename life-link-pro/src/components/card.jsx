export default function Card({ title, content }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 border">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
}

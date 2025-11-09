export default function StatusBar() {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex justify-between items-center text-xs px-4 py-1 bg-gray-100 text-gray-700">
      <span>📶 LTE</span>
      <span>{time}</span>
      <span>🔋 85%</span>
    </div>
  );
}

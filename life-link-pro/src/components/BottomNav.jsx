export default function BottomNav({ navigate, current }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "firstAid", label: "First Aid" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="flex justify-around bg-gray-100 border-t py-2 text-sm">
      {links.map(link => (
        <button
          key={link.id}
          onClick={() => navigate(link.id)}
          className={`px-3 py-1 rounded-lg ${current === link.id ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}

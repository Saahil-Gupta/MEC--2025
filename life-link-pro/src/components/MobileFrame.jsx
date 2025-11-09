export default function MobileFrame({ children }) {
  return (
    <div className="w-full h-screen flex justify-center items-start bg-gray-200 overflow-auto">
      <div
        className="
          w-[390px]
          h-[800px]
          bg-white
          rounded-[40px]
          border-[12px]
          border-black
          shadow-2xl
          overflow-hidden
          mt-6
        "
      >
        {children}
      </div>
    </div>
  );
}

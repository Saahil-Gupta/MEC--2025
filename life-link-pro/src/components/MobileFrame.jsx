import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";

export default function MobileFrame({ children, navigate, current }) {
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
          shadow-[0_0_40px_rgba(255,255,255,0.4)]
          overflow-hidden
          mt-6
          flex flex-col
        "
      >
        <StatusBar />

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {children}
        </div>

        {/* BOTTOM NAV */}
        <BottomNav navigate={navigate} current={current} />
      </div>
    </div>
  );
}

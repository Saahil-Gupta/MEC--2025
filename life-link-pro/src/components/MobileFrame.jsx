import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";

export default function MobileFrame({ children, navigate, current }) {
  return (
    <div className="w-[390px]
          h-[800px]
          bg-white
          rounded-[40px]
          border-[12px]
          border-black
          shadow-2xl
          overflow-hidden
          mt-6
        ">
      <StatusBar />
      <div className="flex-1 overflow-y-auto">{children}</div>
      <BottomNav navigate={navigate} current={current} />
    </div>
  );
}

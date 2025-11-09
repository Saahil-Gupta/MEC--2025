export default function MobileFrame({ children }) {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="
        w-[390px] h-[800px] 
        bg-white 
        rounded-[40px] 
        border-[12px] 
        border-black 
        overflow-hidden 
        shadow-xl 
        mt-6
      ">
        {children}
      </div>
    </div>
  );
}

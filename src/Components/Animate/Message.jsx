import React from "react";

const Message = () => {
  return (
    <div
      className="border-4 bg-[#131f24] text-white border-[#37464f] w-fit rounded-2xl
      animate-[float_2s_ease-in-out_infinite]"
    >
      <div className="py-4 px-8 rounded-2xl">
        <p className="font-semibold text-[#58cc02] text-lg">Mulai</p>
      </div>
      <div className="p-3 absolute bg-[#131f24] rotate-45 top-[3.09rem] left-11 border-b-4 border-r-4 border-[#37464f]"></div>
    </div>
  );
};

export default Message;

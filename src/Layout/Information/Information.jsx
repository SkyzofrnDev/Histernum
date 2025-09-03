import React from "react";

const Information = () => {
  return (
    <div>
      <div className="flex gap-10 w-fit">
        <div className="flex items-center gap-2 ">
          <img src="/Icons/ID.svg" alt="icon-flag" loading="lazy"  className="w-7" />
        <p className="font-semibold text-[#fff]">ID</p>
        </div>
        <div className="flex items-center gap-2 ">
          <img src="/Icons/heart.svg" alt="icon-heart" loading="lazy" className="w-7" />
        <p className="font-semibold text-[#e84c4b]">5</p>
        </div>
        <div className="flex items-center gap-2 ">
          <img src="/Icons/fire0.svg" alt="icon-fire" loading="lazy" className="w-7" />
        <p className="font-semibold text-[#72787e]">129</p>
        </div>
      </div>
    </div>
  );
};  

export default Information;

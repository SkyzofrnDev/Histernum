import React from "react";
import { ButtonLevel } from "../../Components/Index";
import BTMaterial from "../../Components/Button/BTMaterial";
const level = true;


const Level = () => {
  return (
    <div className=" pt-10 px-20 flex flex-col h-[1000vh] items-center w-full">
      <div className="w-full items-center justify-center flex sticky top-5 pb-20 z-20">
        <div className="p-4 bg-[#58cc02] rounded-2xl w-fit">
          <div className="flex items-center gap-10">
            <div>
              <div className="flex gap-2 items-center">
                <img
                  src="/Icons/temple.svg"
                  alt="icon-arrow"
                  loading="lazy"
                  className="w-fit"
                />
                <p>Sejarah Indonesia</p>
              </div>
              <p className="font-bold text-xl mt-2">
                Sejarah Hindu Budha di Indonesia
              </p>
            </div>
            <BTMaterial />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5  text-white/20 w-4/5">
        <div className="w-full border-white/20 border-t-2 rounded-full"></div>
        <p className="font-semibold text-2xl flex-shrink-0">
          SEJARAH HINDU BUDHA
        </p>
        <div className="w-full border-white/20 border-t-2 rounded-full"></div>
      </div>
      <ButtonLevel />
    </div>
  );
};

export default Level;

import React from "react";
import { ButtonLevel } from "../../Components/Index";
import BTMaterial from "../../Components/Button/BTMaterial";
const levels = [
  { id: 1, title: "Level 1" },
];

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
      <div className="flex flex-col items-center gap-6 mt-10">
        
        <div className="flex flex-col items-center gap-16 mt-10">
          {levels.map((level, index) => {
            const group = Math.floor(index / 3);
            const direction = group % 2 === 0 ? "right" : "left";
            const posInGroup = index % 3;
            let translateClass = "";
            if (direction === "right") {
              if (posInGroup === 0) translateClass = "translate-x-12";
              if (posInGroup === 1) translateClass = "translate-x-24";
              if (posInGroup === 2) translateClass = "translate-x-12";
            } else {
              if (posInGroup === 0) translateClass = "-translate-x-12";
              if (posInGroup === 1) translateClass = "-translate-x-24";
              if (posInGroup === 2) translateClass = "-translate-x-12";
            }


            return (
              <div
                key={level.id}
                className={`${translateClass} transition-transform duration-300`}
              >
                <ButtonLevel>{level.title}</ButtonLevel>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Level;

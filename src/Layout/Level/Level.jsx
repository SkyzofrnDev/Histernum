import React, { useState } from "react";
import BTLevel from "../../Components/Button/BTLevel";
import dataLevel from "../../Data/Level.json";
import BTMaterial from "../../Components/Button/BTMaterial";

const Level = () => {
  const [openPopupId, setOpenPopupId] = useState(null);

  return (
    <div className="pt-10 px-20 flex flex-col min-h-[1000vh] items-center w-full">
      {dataLevel.map((section) => (
        <div key={section.id} className="w-full">
          {/* Header */}
          <div className="w-full items-center justify-center flex sticky top-5 pb-20 z-20">
            <div className="p-4 bg-[#58cc02] rounded-2xl w-fit">
              <div className="flex items-center gap-10">
                <div>
                  <div className="flex gap-2 items-center">
                    <img
                      src="/Icons/temple.svg"
                      alt="icon-arrow"
                      loading="lazy"
                    />
                    <p>{section.description}</p>
                  </div>
                  <p className="font-bold text-xl mt-2">{section.title}</p>
                </div>
                <BTMaterial />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-white/20 w-4/5 mx-auto">
            <div className="w-full border-white/20 border-t-2 rounded-full"></div>
            <p className="font-semibold text-2xl flex-shrink-0">
              {section.title.toUpperCase()}
            </p>
            <div className="w-full border-white/20 border-t-2 rounded-full"></div>
          </div>

          {/* Loop Levels */}
          <div className="flex flex-col items-center gap-16 mt-10">
            {section.levels.map((item, index) => {
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

              // cari index terakhir yang unlocked = true
              const lastUnlockedIndex = section.levels
                .map((lvl, i) => (lvl.unlocked ? i : -1))
                .filter((i) => i !== -1)
                .pop();

              const isLastUnlocked = index === lastUnlockedIndex;

              return (
                <div
                  key={item.id}
                  className={`${translateClass} transition-transform duration-300`}
                >
                  <BTLevel
                    level={item.unlocked}
                    showMessageEnabled={isLastUnlocked && openPopupId === null}
                    showPopUpEnabled={true}
                    isOpen={openPopupId === item.id}
                    onToggle={() =>
                      setOpenPopupId(openPopupId === item.id ? null : item.id)
                    }
                    titlelevel={item.title}
                    desclevel={item.description}
                    lesson={`quiz/${item.id}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Level;

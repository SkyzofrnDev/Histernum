import React, { useState } from "react";

const Input = () => {
  const [isSelected, setSelected] = useState(null);
  const answer = ["RA. Kartini", "RA. Kartu Remi", "RA. Kartina", "RA. Kartun"];
  const baseStyle =
    "font-semibold flex items-center  px-5 text-center gap-5 overflow-hidden shadow-[0_4px_0_#37464f] active:shadow-[0_1px_0_#37464f] active:translate-y-[4px] duration-100 transition-all h-fit p-2 rounded-2xl border-2 cursor-pointer";

  return (
    <div className="w-2/3">
      <p className="font-bold text-3xl">Lengkapi Pernyataan Berikut</p>
      <div className="flex px-5 py-3 border-2 border-[#37464f] rounded-2xl w-fit mt-14 font-semibold">
        kontol memek asu anjing bangsat
      </div>
      <div className="grid grid-cols-2 gap-5 mt-10 w-full">
        {answer.map((key, index) => (
          <div
            key={index}
            onClick={() => setSelected(index)}
            className={`${baseStyle} ${
              isSelected === index
                ? "bg-[#202f36] border-[#3f85a7] text-[#1899d6] shadow-[0_4px_0_#3f85a7] active:shadow-[0_1px_0_#3f85a7]"
                : "text-[#52656d] border-[#37464f] hover:bg-[#202f36]"
            }`}
          >
            <div
              className={`border-2 px-3 py-1 rounded-md ${
                isSelected === index
                  ? "border-[#3f85a7] text-[#1899d6] shadow-[0_4px_0_#3f85a7] active:shadow-[0_1px_0_#3f85a7]"
                  : "border-[#37464f]"
              }`}
            >
              <p>{index + 1}</p>
            </div>
            <p className="text-2xl">{key}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Input;

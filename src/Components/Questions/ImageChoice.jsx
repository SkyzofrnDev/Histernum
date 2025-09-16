import React, { useState } from "react";

const ImageChoice = () => {
  const [isSelected, setSelected] = useState(null);
  const answer = [
    "https://tse2.mm.bing.net/th/id/OIP.ggRztOGGZjvC4_X_kCGblQHaJx?pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th/id/OIP.ggRztOGGZjvC4_X_kCGblQHaJx?pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th/id/OIP.ggRztOGGZjvC4_X_kCGblQHaJx?pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th/id/OIP.ggRztOGGZjvC4_X_kCGblQHaJx?pid=Api&P=0&h=180",
  ];
  const baseStyle =
    "font-semibold flex items-center  px-5 text-center gap-5 overflow-hidden shadow-[0_4px_0_#37464f] active:shadow-[0_1px_0_#37464f] active:translate-y-[4px] duration-100 transition-all h-fit p-2 rounded-2xl border-2 cursor-pointer";

  return (
    <div className="min-h-[40vh] flex flex-col justify-between">
      <div>
        <p className="font-bold text-3xl">Pilih salah satu gambar yang tepat</p>
        <div className="flex px-5  w-fit mt-9 text-xl">
          Manakah gambar yang mirip sama aidit
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-10 w-full">
        {answer.map((key, index) => (
          <div
            key={index}
            onClick={() => setSelected(index)}
            className={`${baseStyle} ${
              isSelected === index
                ? "bg-[#202f36] border-[#3f85a7] text-[#1899d6]"
                : "text-[#52656d] border-[#37464f] hover:bg-[#202f36]"
            }`}
          >
            <div
              className={`border-2 px-3 py-1 rounded-md ${
                isSelected === index
                  ? "border-[#3f85a7] text-[#1899d6]"
                  : "border-[#37464f]"
              }`}
            >
              <p>{index + 1}</p>
            </div>
            <img
              src={key}
              className="aspect-square object-cover"
              alt="image-answer"
              srcset=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageChoice;

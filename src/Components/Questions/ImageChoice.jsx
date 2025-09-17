import React, { useState, useEffect, useRef } from "react";

const ImageChoice = () => {
  const [isSelected, setSelected] = useState(null);
  const containerRef = useRef(null);

  const answer = [  
    "https://tse2.mm.bing.net/th/id/OIP.ggRztOGGZjvC4_X_kCGblQHaJx?pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th/id/OIP.ggRztOGGZjvC4_X_kCGblQHaJx?pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th/id/OIP.ggRztOGGZjvC4_X_kCGblQHaJx?pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th/id/OIP.ggRztOGGZjvC4_X_kCGblQHaJx?pid=Api&P=0&h=180",
  ];

  const baseStyle =
    "font-semibold flex items-center px-3 py-2 gap-3 overflow-hidden shadow-[0_4px_0_#37464f] active:shadow-[0_1px_0_#37464f] active:translate-y-[4px] duration-100 transition-all h-fit rounded-2xl border-2 cursor-pointer";

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      setSelected((prev) => (prev + 1) % answer.length);
    }
    if (e.key === "ArrowLeft") {
      setSelected((prev) => (prev - 1 + answer.length) % answer.length);
    }
    if (e.key === "Enter") {
    }
    if (/^[1-9]$/.test(e.key)) {
      const num = parseInt(e.key, 10) - 1;
      if (num < answer.length) {
        setSelected(num);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="min-h-[40vh] flex flex-col justify-between outline-none"
    >
      <div>
        <p className="font-bold text-3xl">Pilih salah satu gambar yang tepat</p>
        <div className="flex px-5 w-fit mt-9 text-xl">
          Manakah gambar yang mirip sama Aidit?
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-10 w-full">
        {answer.map((key, index) => (
          <div
            key={index}
            onClick={() => setSelected(index)}
            className={`${baseStyle} ${
              isSelected === index
                ? "bg-[#202f36] border-[#3f85a7] text-[#1899d6] shadow-[0_4px_0_#3f85a7]"
                : "text-[#52656d] border-[#37464f] hover:bg-[#202f36]"
            }`}
          >
            <div
              className={`border-2 px-3 py-1 rounded-md ${
                isSelected === index
                  ? "border-[#3f85a7] text-[#1899d6] shadow-[0_4px_0_#3f85a7]"
                  : "border-[#37464f]"
              }`}
            >
              <p>{index + 1}</p>
            </div>
            <img
              src={key}
              className="aspect-square object-cover rounded-lg w-32 h-32"
              alt={`Pilihan ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageChoice;

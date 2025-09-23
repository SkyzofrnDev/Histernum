import React, { useState, useEffect, useRef } from "react";

const ImageAnswer = ({ question, onAnswer }) => {
  const {
    prompt = "Pertanyaan belum diisi",
    src = "",
    desc = "",
    options = [],
    correctAnswer = null,
  } = question || {};


  const [isSelected, setSelected] = useState(null);
  const containerRef = useRef(null);

  const baseStyle =
    "font-semibold flex items-center px-5 text-center gap-5 overflow-hidden shadow-[0_4px_0_#37464f] active:shadow-[0_1px_0_#37464f] active:translate-y-[4px] duration-100 transition-all h-fit p-2 rounded-2xl border-2 cursor-pointer";

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelected((prev) =>
        prev === null ? 0 : (prev + 1) % options.length
      );
    }
    if (e.key === "ArrowUp") {
      setSelected((prev) =>
        prev === null
          ? options.length - 1
          : (prev - 1 + options.length) % options.length
      );
    }
    if (/^[1-9]$/.test(e.key)) {
      const num = parseInt(e.key, 10) - 1;
      if (num < options.length) {
        setSelected(num);
      }
    }
  };

  const handleSelect = (index) => {
    setSelected(index);
    const selectedAnswer = options[index]?.ans; // ✅ pakai ans
    console.log("Jawaban dipilih:", selectedAnswer);
    if (onAnswer) onAnswer(selectedAnswer);
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-2/4 justify-between flex flex-col outline-none"
    >
      {/* Pertanyaan */}
      <p className="font-bold text-3xl">{prompt}</p>

      {/* Gambar + deskripsi */}
      <div className="flex mt-10 gap-10">
        {src && (
          <img
            src={src}
            className="rounded-xl w-52 aspect-square object-cover"
            alt={desc || "image-question"}
            loading="lazy"
          />
        )}
        {desc && <p className="font-medium text-xl">{desc}</p>}
      </div>

      {/* Pilihan jawaban */}
      <div className="grid grid-cols-2 gap-5 mt-10 w-full">
        {(options || []).map((opt, index) => (
          <div
            key={opt.id || index}
            onClick={() => handleSelect(index)}
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
            <p className="text-2xl">{opt.ans}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageAnswer;

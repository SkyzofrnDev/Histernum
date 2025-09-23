import React, { useState, useEffect, useRef } from "react";

const Input = ({ question, answers = [], correctAnswer, onAnswer }) => {
  const [isSelected, setSelected] = useState(null);
  const containerRef = useRef(null);

  const baseStyle =
    "font-semibold flex items-center px-5 text-center gap-5 overflow-hidden shadow-[0_4px_0_#37464f] active:shadow-[0_1px_0_#37464f] active:translate-y-[4px] duration-100 transition-all h-fit p-2 rounded-2xl border-2 cursor-pointer";

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  // 🔹 Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelected((prev) => {
        const newIndex = prev === null ? 0 : (prev + 1) % answers.length;
        if (onAnswer) onAnswer(answers[newIndex]?.ans); // ✅ kirim string jawaban
        return newIndex;
      });
    }
    if (e.key === "ArrowUp") {
      setSelected((prev) => {
        const newIndex =
          prev === null ? answers.length - 1 : (prev - 1 + answers.length) % answers.length;
        if (onAnswer) onAnswer(answers[newIndex]?.ans); // ✅ kirim string jawaban
        return newIndex;
      });
    }
    if (/^[1-9]$/.test(e.key)) {
      const num = parseInt(e.key, 10) - 1;
      if (num < answers.length) {
        setSelected(num);
        if (onAnswer) onAnswer(answers[num]?.ans); // ✅ kirim string jawaban
      }
    }
  };

  // 🔹 Klik mouse
  const handleSelect = (index) => {
    setSelected(index);
    const selectedAnswer = answers[index]?.ans;
    console.log("Jawaban dipilih:", selectedAnswer);
    if (onAnswer) onAnswer(selectedAnswer); // ✅ kirim string jawaban
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-2/3 outline-none"
    >
      <p className="font-bold text-3xl">Lengkapi Pernyataan Berikut</p>

      {/* pertanyaan */}
      <div className="flex px-5 py-3 border-2 border-[#37464f] rounded-2xl w-fit mt-14 font-semibold">
        {question}
      </div>

      {/* jawaban */}
      <div className="grid grid-cols-2 gap-5 mt-10 w-full">
        {(answers || []).map((item, index) => (
          <div
            key={item.id || index}
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
            <p className="text-2xl">{item.ans}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Input;

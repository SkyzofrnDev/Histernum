import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PopUpExit = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for fade out animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-1000 ${
        isVisible && !isClosing ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className={`bg-[#131f24] w-fit p-5 rounded-2xl flex items-center flex-col relative transition-all duration-1000 ${
          isVisible && !isClosing 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        <img src="/Icons/exit.svg" alt="" />
        <p className="text-white text-2xl font-bold w-[26rem] text-center">
          Jangan pergi dulu! Progresmu akan hilang kalau kamu berhenti sekarang
        </p>
        <button
          onClick={handleClose}
          className={` w-full justify-center mt-10 inline-flex items-center justify-center] h-[65px] rounded-3xl px-10 bg-[#fff] overflow-hidden shadow-[0_8px_0_#65F003FF] active:shadow-[0_2px_0_#cdf0b4] active:translate-y-[4px] transition-all duration-100`}
        >
          <p className="font-semibold text-[#65F003FF] text-xl">
            Lanjut Belajar
          </p>
        </button>
        <Link to={"/"} className="text-red-500  text-lg font-bold w-[19rem] my-10 text-center">
          Akhiri Sesi
        </Link>
      </div>
    </div>
  );
};

export default PopUpExit;

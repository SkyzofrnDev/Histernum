import React, { useState } from "react";
import CountUp from "../../Components/CountText/CountText";
import { BTBackToHome } from "../../Components/Index";
import { useLocation, useNavigate } from "react-router-dom";

const ScoreGame = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Ambil data dari Questions
  const { correctCount, totalSoal, nilai } = location.state || {};

  // 🔹 Kalau user masuk langsung tanpa main quiz, redirect ke home
  if (!location.state) {
    navigate("/");
    return null;
  }

  const [startAccuracy, setStartAccuracy] = useState(false);

  return (
    <div className="bg-[#131f24] text-white flex justify-center items-center h-screen flex-col">
      <p className="font-semibold text-3xl text-[#ffc700] ">Quiz Selesai</p>
      <p className="font-semibold text-5xl">Sang Ahli Sejarah</p>

      <div className="flex gap-10">
        {/* Total Nilai */}
        <div className="px-1 bg-[#ffc700] pb-3 rounded-xl mt-20">
          <p className="text-[#131f24] text-center font-semibold text-xl rounded-xl">
            Total Nilai
          </p>
          <div className="flex items-center justify-center px-10 bg-[#131f24] rounded-sm">
            <CountUp
              from={0}
              to={nilai}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-2xl font-semibold p-4"
              onEnd={() => setStartAccuracy(true)} // ✅ ganti dari onComplete -> onEnd
            />
          </div>
        </div>

        {/* Akurasi Soal */}
        <div className="px-1 bg-[#93d333] pb-3 rounded-xl mt-20">
          <p className="text-[#131f24] text-center font-semibold text-xl rounded-xl">
            Akurasi Soal
          </p>
          <div className="text-2xl font-semibold p-2 px-10 flex items-center justify-center bg-[#131f24] rounded-sm">
            {startAccuracy ? (
              <CountUp
                from={0}
                to={correctCount}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text text-2xl font-semibold p-2"
              />
            ) : (
              <span className="text-2xl font-semibold p-2">0</span>
            )}
            /{totalSoal}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <BTBackToHome />
      </div>
    </div>
  );
};

export default ScoreGame;

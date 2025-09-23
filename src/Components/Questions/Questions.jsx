import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // 🔹 animasi
import InputQuestion from "./Input";
import ImageChoice from "./ImageChoice";
import ArrangeQuestion from "./Arrange";
import BTAnswer from "../Button/BTAnswer";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from "progressbar.js";
import ImageAnswer from "./ImageAnswer";

// 🔹 fungsi shuffle array biar random
const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const Questions = () => {
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0.0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionOrder, setQuestionOrder] = useState([]);
  const [isChecking, setIsChecking] = useState(false); // 🔹 kontrol tombol
  const [correctCount, setCorrectCount] = useState(0); // 🔹 hitung jawaban benar

  // 🔹 Semua soal disimpan di object
  const dummyData = {
    input: {
      prompt: "Ketik jawaban negara dengan ibu kota Tokyo",
      options: [
        { id: 1, ans: "Jepang" },
        { id: 2, ans: "Korea Selatan" },
        { id: 3, ans: "Cina" },
      ],
      correctAnswer: "Jepang",
    },

    image: {
      prompt: "Pilih bendera yang benar untuk Indonesia",
      options: [
        { id: 1, ans: "Bendera Merah Putih", src: "/Flags/indonesia.png" },
        { id: 2, ans: "Bendera Jepang", src: "/Flags/japan.png" },
        { id: 3, ans: "Bendera Singapura", src: "/Flags/singapore.png" },
      ],
      correctAnswer: "Bendera Merah Putih",
    },

    imageA: {
      prompt: "Siapakah tokoh ini?",
      src: "/People/kartini.jpg",
      desc: "Pahlawan emansipasi wanita Indonesia",
      options: [
        { id: 1, ans: "RA Kartini" },
        { id: 2, ans: "Cut Nyak Dien" },
        { id: 3, ans: "Martha Christina Tiahahu" },
        { id: 4, ans: "Dewi Sartika" },
      ],
      correctAnswer: "RA Kartini",
    },

    arrange: {
      prompt: "Pasangkan peristiwa dengan keterangannya",
      left: ["Membaca naskah", "Menandatangani", "Perumusan", "Pembacaan"],
      right: [
        "17 Agustus 1945",
        "Soekarno-Hatta",
        "Teks proklamasi",
        "Pegangsaan Timur",
      ],
      correctPairs: {
        0: 2,
        1: 1,
        2: 3,
        3: 0,
      },
    },
  };

  // 🔹 Acak urutan soal sekali di awal
  useEffect(() => {
    const keys = Object.keys(dummyData); // ["input","image","imageA","arrange"]
    setQuestionOrder(shuffleArray(keys));
  }, []);

  // 🔹 Setup progress bar
  useEffect(() => {
    barRef.current = new ProgressBar.Line(containerRef.current, {
      strokeWidth: 2,
      easing: "easeInOut",
      duration: 1400,
      color: "#93d333",
      trailColor: "#37464f",
      trailWidth: 2,
      svgStyle: { width: "100%", height: "100%" },
    });

    barRef.current.path.setAttribute("stroke-linecap", "round");
    barRef.current.trail.setAttribute("stroke-linecap", "round");
    barRef.current.animate(progress);

    return () => {
      barRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.animate(progress);
    }
  }, [progress]);

  // 🔹 Render soal sesuai tipe
  const renderQuestion = () => {
    if (currentIndex >= questionOrder.length) {
      return <p className="text-white text-2xl font-bold">🎉 Quiz selesai!</p>;
    }

    const type = questionOrder[currentIndex];
    const data = dummyData[type];

    switch (type) {
      case "input":
        return (
          <InputQuestion
            question={data.prompt}
            answers={data.options}
            correctAnswer={data.correctAnswer}
            onAnswer={(val) => setSelectedAnswer(val)}
          />
        );
      case "image":
        return (
          <ImageChoice
            question={data.prompt}
            answers={data.options}
            correctAnswer={data.correctAnswer}
            onAnswer={(val) => setSelectedAnswer(val)}
          />
        );
      case "imageA":
        return (
          <ImageAnswer
            question={data}
            onAnswer={(val) => setSelectedAnswer(val)}
          />
        );
      case "arrange":
        return (
          <ArrangeQuestion
            question={data.prompt}
            left={data.left}
            right={data.right}
            correctPairs={data.correctPairs || {}}
            onComplete={() => {
              setCorrectCount((prev) => prev + 1); // ✅ anggap selalu benar
              setCurrentIndex((prev) => prev + 1);
              setProgress((prev) => prev + 1 / questionOrder.length);
            }}
          />
        );

      default:
        return <p className="text-white">Tipe soal tidak dikenali</p>;
    }
  };

  // 🔹 Cek jawaban
  const handleCheckAnswer = () => {
    if (currentIndex >= questionOrder.length) return;

    const type = questionOrder[currentIndex];
    const correct = dummyData[type].correctAnswer;

    if (selectedAnswer === null) {
      alert("Pilih jawaban dulu!");
      return;
    }

    setIsChecking(true);

    if (selectedAnswer === correct) {
      setResult("benar");
      setCorrectCount((prev) => prev + 1); // ✅ hitung jawaban benar
      setTimeout(() => {
        setSelectedAnswer(null);
        setResult(null);
        setCurrentIndex((prev) => prev + 1);
        setProgress((prev) => prev + 1 / questionOrder.length);
        setIsChecking(false);
      }, 800);
    } else {
      setResult("salah");
      setTimeout(() => {
        setQuestionOrder((prev) => {
          const newOrder = [...prev];
          newOrder.push(newOrder[currentIndex]);
          return newOrder;
        });
        setSelectedAnswer(null);
        setResult(null);
        setCurrentIndex((prev) => prev + 1);
        setIsChecking(false);
      }, 800);
    }
  };

  // 🔹 Kalau semua soal sudah habis → pindah ke ScoreGame
  useEffect(() => {
    if (currentIndex >= questionOrder.length && questionOrder.length > 0) {
      const totalSoal = questionOrder.length;
      const nilai = Math.round((correctCount / totalSoal) * 100);

      navigate("/score", {
        state: { correctCount, totalSoal, nilai },
      });
    }
  }, [currentIndex, questionOrder, correctCount, navigate]);

  // 🔹 Enter key sebagai shortcut "Periksa Jawaban"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleCheckAnswer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAnswer, currentIndex, questionOrder]);

  return (
    <div className="overflow-hidden w-full select-none h-screen flex flex-col bg-[#131f24] py-5 justify-between">
      {/* 🔹 Header progress */}
      <div className="flex items-center justify-center gap-10 text-[#ed4140] font-semibold text-2xl px-36 w-full py-10">
        <Link to={"/"}>
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/df223d5b9feb8017b323ed21103eb5ac.svg"
            alt="X"
            loading="lazy"
          />
        </Link>
        <div
          ref={containerRef}
          className="w-1/2 h-4 rounded-full overflow-hidden"
        />
        <div className="flex items-center">
          <img
            src="/Icons/heart.svg"
            alt="icon-heart"
            loading="lazy"
            className="w-10"
          />
          <p className="mt-1">5</p>
        </div>
      </div>

      {/* 🔹 Bagian soal dengan animasi */}
      <div className="flex items-baseline justify-center text-white w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex justify-center"
          >
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🔹 Tombol jawab */}
      {currentIndex < questionOrder.length && (
        <div className="border-t-2 border-[#37464f] py-10">
          <div className="flex justify-end px-20 gap-5">
            <BTAnswer
              onClick={handleCheckAnswer}
              disabled={isChecking}
              className={`${
                isChecking ? "opacity-50 cursor-not-allowed" : "opacity-100"
              }`}
            >
              Periksa Jawaban
            </BTAnswer>
          </div>
          {result && (
            <p
              className={`text-center mt-5 text-xl font-bold ${
                result === "benar" ? "text-green-400" : "text-red-400"
              }`}
            >
              Jawaban {result.toUpperCase()}!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;

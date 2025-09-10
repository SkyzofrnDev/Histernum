import React, { useState } from "react";
import { Message } from "../Index";
import { motion, AnimatePresence } from "framer-motion";
import PopUp from "../PopUp/PopUp";

const BTLevel = ({
  level = false,
  showMessageEnabled = false,
  showPopUpEnabled = false,
  isOpen = false, 
  onToggle = () => {}, 
  titlelevel,
  desclevel,
  lesson,
}) => {
  const [showMessage, setShowMessage] = useState(showMessageEnabled);

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* MESSAGE */}
      {showMessageEnabled && (
        <AnimatePresence>
          {showMessage && (
            <motion.div
              key="message"
              className="absolute bottom-16 z-50"
              initial={{ scaleY: 0, opacity: 0, originY: 1 }}
              animate={{ scaleY: 1, opacity: 1, originY: 1 }}
              exit={{ scaleY: 0, opacity: 0, originY: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Message />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* BUTTON */}
      <button
        onClick={() => {
          if (showPopUpEnabled) onToggle(); // pakai props
          if (showMessageEnabled) setShowMessage((prev) => !prev);
        }}
        className={`relative inline-flex items-center justify-center w-[70px] h-[65px] rounded-full ${
          level
            ? `bg-[#58cc02] overflow-hidden shadow-[0_8px_0_#46a302] active:shadow-[0_2px_0_#46a302]`
            : "bg-[#37464f] overflow-hidden shadow-[0_8px_0_#2c383f] active:shadow-[0_2px_0_#2c383f]"
        } active:translate-y-[4px] transition-all duration-100`}
      >
        {level && (
          <svg
            className="absolute top-0 left-0 p-[5px] w-full text-[#72d627] pointer-events-none"
            viewBox="0 0 56 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.2346 3.25135C35.3157 2.1269 34.7053 0.276787 33.1512 0.143156C32.0512 0.0485729 30.9331 0 29.8002 0C13.342 0 0 10.2517 0 22.8979C0 26.3985 1.02236 29.7157 2.85016 32.6827C3.47761 33.7012 4.88715 33.7751 5.71626 32.9128L34.2346 3.25135Z"
              fill="currentColor"
            />
            <path
              d="M55.0954 12.5231C53.3548 9.61289 49.8186 6.8733 47.2219 5.21074C46.2417 4.58319 44.9772 4.77038 44.1616 5.60066C34.5035 15.4328 18.3374 31.8498 12.05 38.0427C10.9724 39.1041 10.996 40.8688 12.249 41.716C16.2271 44.4058 20.9121 45.5851 23.4852 45.9072C24.1853 45.9949 24.8657 45.7259 25.3691 45.2315C34.775 35.9934 50.2041 19.9015 54.7166 15.0879C55.3787 14.3818 55.5923 13.3539 55.0954 12.5231Z"
              fill="currentColor"
            />
          </svg>
        )}
        <svg
          className="w-8 h-8 relative z-10 pointer-events-none"
          viewBox="0 0 42 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.5239 18.112L14.4053 13.9934C13.1459 12.734 11.104 12.734 9.84455 13.9934C8.58514 15.2528 8.58514 17.2947 9.84455 18.5541L16.1331 24.8427C16.7889 25.4985 17.6569 25.8128 18.5161 25.7856C19.3802 25.817 20.2545 25.5028 20.9142 24.8432L32.2521 13.5053C33.5115 12.2459 33.5115 10.204 32.2521 8.94456C30.9927 7.68515 28.9508 7.68515 27.6914 8.94456L18.5239 18.112Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="24.2966"
                height="17.7878"
                fill="white"
                transform="translate(8.9 8)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>

      {/* POPUP */}
      {showPopUpEnabled && (
        <div className="absolute top-24 -left-10 popup-ket w-96 z-[1000]">
          <AnimatePresence>
            {isOpen && ( // pakai props
              <motion.div
                key="popup"
                initial={{ scaleY: 1, opacity: 0, originY: 0 }}
                animate={{ scaleY: 1, opacity: 1, originY: 1 }}
                exit={{ scaleY: 1, opacity: 0, originY: 2 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <PopUp desc={desclevel} title={titlelevel} to={lesson} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default BTLevel;

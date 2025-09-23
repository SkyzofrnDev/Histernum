import React from 'react'
import { Link } from 'react-router-dom'

const BTBackToHome = () => {
  return (
    <Link
    to={"/"}
      className="text-[#52656d] font-semibold items-center justify-between px-5 text-center w-fit gap-5 flex overflow-hidden shadow-[0_4px_0_#37464f] active:shadow-[0_1px_0_#37464f] active:translate-y-[4px] duration-100 transition-all h-fit border-2 border-[#37464f] hover:bg-[#202f36] p-2 rounded-2xl"
    >
      <p className="text-2xl">Back To Menu</p>
    </Link>  )
}

export default BTBackToHome
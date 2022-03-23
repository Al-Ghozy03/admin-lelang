import React from "react";
import { Link } from "react-router-dom";

export default function CardSchedule({ title, status, time, bg, id }) {
  return (
    <React.Fragment>
      <Link
        to={`detail/${id}`}
        className={`h-52 rounded-lg w-full px-7 py-7 shadow-lg ${
          id % 2 === 0 ? "bg-[#FFFCB4]" : "bg-white"
        }`}
      >
        <h1 className="text-2xl h-full font-semibold capitalize">{title}</h1>
        <div className="flex justify-between">
          <p className="text-sm">Status: {status}</p>
          <p className="text-sm capitalize">{time.substring(0, 5)} WIB</p>
        </div>
      </Link>
    </React.Fragment>
  );
}

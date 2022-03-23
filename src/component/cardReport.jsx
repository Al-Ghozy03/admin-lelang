import React from "react";
import { Link } from "react-router-dom";

export default function CardReport({ title, id }) {
  return (
    <React.Fragment>
      <Link
        to={`get/${id}`}
        className={`h-52 rounded-lg w-full px-7 py-7 shadow-lg ${
          id % 2 === 0 ? "bg-[#FFFCB4]" : "bg-white"
        }`}
      >
        <h1 className="text-2xl h-full font-semibold capitalize">{title}</h1>
      </Link>
    </React.Fragment>
  );
}

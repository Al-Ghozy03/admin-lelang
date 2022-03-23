import cx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

export default function Card({ title, count,bg, route}) {
  let rootClass = cx(`h-52 rounded-lg w-full px-7 py-7 ${bg}`)
  return (
    <React.Fragment>
      <Link to={`${route}`} className={rootClass}>
        <h1 className="text-2xl h-full font-semibold capitalize text-white">{title}</h1>
        <p className="text-sm text-right capitalize text-white">{count}</p>
      </Link>
    </React.Fragment>
  );
}

import React from "react";

export default function Table({ title }) {
  return (
    <React.Fragment>
      <h2 className="text-lg text-gray-500 capitalize">{title}</h2>
    </React.Fragment>
  );
}

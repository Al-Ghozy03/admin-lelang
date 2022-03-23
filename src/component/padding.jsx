import React from "react";

export default function Padding({ children }) {
  return (
    <React.Fragment>
      <div className="px-12 py-10">{children}</div>
    </React.Fragment>
  );
}

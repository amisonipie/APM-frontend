import React from "react";

function HeadingIC({ icon, label, className }) {
  return (
    <div className={`${className} headingIC`}>
      <figure className="headingIC--figure">{icon}</figure>
      <h6 className="headingIC--label workOrder-Heading-label">{label}</h6>
    </div>
  );
}

export default HeadingIC;

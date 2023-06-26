import React, { useMemo } from "react";
import WrongSvg from "assets/icons/wrong.svg";
import VerifySvg from "assets/icons/verify.svg";

import "./WarrantyCard.styles.scss";

export function WarrantyCard({ text, isInWarranty }) {
  const data = useMemo(() => (isInWarranty
    ? {
      text: "In Warranty",
      color: "rgba(49, 205, 130, 0.07)",
      icon: VerifySvg,
    }
    : {
      text: "Out of Warranty",
      color: "rgba(235, 87, 87, 0.07)",
      icon: WrongSvg,
    }), [isInWarranty]);

  return (
    <div className="warranty-card" style={{ backgroundColor: data.color }}>
      <img src={data.icon} className="warranty-card-icon" alt="check icon" />
      <p className="warranty-card-heading">{text}</p>
      <p className="warranty-card-warranty-text">{data.text}</p>
    </div>
  );
}

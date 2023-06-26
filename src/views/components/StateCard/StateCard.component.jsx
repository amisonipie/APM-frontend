import React from "react";
import "./StateCard.styles.scss";

export function StateCard({
  color, text, icon, value,
}) {
  return (
    <div className="dashboard-state-card">
      <div className="dashboard-state-card-item">
        <img src={icon} alt={text} />
        <p>{text}</p>
      </div>
      <div className="dashboard-state-card-number">{value}</div>
    </div>
  );
}

import React from "react";
import "./StatusCard.styles.scss";

export function StatusCard({
  text, color, icon, value,
}) {
  return (
    <div className="dashboard-status-card" style={{ backgroundColor: color }}>
      <div className="dashboard-status-card-item">
        <img src={icon} alt={text} />
        <p>{text}</p>
      </div>
      <div className="dashboard-status-card-number">{value}</div>
    </div>
  );
}

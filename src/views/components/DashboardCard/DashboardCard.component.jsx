import React from "react";
import "./DashboardCard.styles.scss";

export function DashboardCard({
  heading, value, icon, isVisible = true,
}) {
  return (
    // Added isVisible for medical and non-medical field user
    isVisible && (
      <div className="dashboard-card mb-1">
        <div className="dashboard-card__main">
          <div className="dashboard-card__main-heading">{heading}</div>
          <div className="dashboard-card__main-number">{value}</div>
        </div>
        <div className="dashboard-card__icon">{icon}</div>
      </div>
    )
  );
}

import React from "react";

import "./DashboardNameCard.styles.scss";

export function DashboardNameCard({ name }) {
  return (
    <div className="name-card">
      <div className="name-card__placeholder" />
      <div className="name-card__text">
        <div className="name-card__text-greeting">
          Good Morning
          {" "}
          <span
            className="name-card__text-greeting-sun"
            role="img"
            aria-label="emoji"
          >
            🌞
          </span>
        </div>
        <div className="name-card__text-name">{name}</div>
      </div>
      <div className="name-card__footer">Last Update Today 6:30 pm</div>
    </div>
  );
}

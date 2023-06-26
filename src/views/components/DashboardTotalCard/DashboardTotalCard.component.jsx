import React from "react";
import ArrowUp from "assets/icons/arrow-up.svg";
import BackgroundSvg from "assets/svg/totalAssetsBackground.png";

import "./DashboardTotalCard.styles.scss";

export function DashboardTotalCard({
  heading = "Total Assets",
  value = 0,
  icon,
  percentage,
}) {
  return (
    <div className="dashboard-card-total">
      <div className="dashboard-card-total__main">
        <div
          className="dashboard-card-total__main-allText"

        >
          <div className="dashboard-card-total__main-heading">{heading}</div>
          <div className="dashboard-card-total__main-number">{value}</div>
        </div>
        <div className="dashboard-card-total__main-bottom">
          <p className="dashboard-card-total__main-bottom-percentage">
            <img
              src={ArrowUp}
              width="11.31px"
              height="17.42px"
              alt="Arrow up"
            />
            {" "}
            {percentage}
            %
          </p>
          <p className="dashboard-card-total__main-bottom-lastdays">
            (last 30 Days)
          </p>
        </div>
      </div>
      <img
        src={BackgroundSvg}
        width="100%"
        height="100%"
        alt="Background"
        style={{ position: "absolute" }}
      />
    </div>
  );
}

import React from "react";
import { AssetsBox, DashboardFilter, NonMedicalAssetCard } from "assets/icons";

import "./CMButton.styles.scss";

export function CMButton({
  children,
  medical,
  nonMedical,
  filter,
  active,
  isVisible,
  onClick = () => { },
}) {
  const text = medical ? "Medical" : nonMedical ? "Non Medical" : "Filter";
  return (
    // Added isVisible for medical and non-medical field user
    isVisible && (
      <button
        className={`dashboard-btn ${active ? "dashboard-btn-active" : ""}`}
        onClick={onClick}
      >
        <div className="dashboard-btn__icon">
          {medical && <AssetsBox />}
          {nonMedical ? <NonMedicalAssetCard /> : <></>}
          {filter ? <DashboardFilter /> : <></>}
        </div>
        <div className="dashboard-btn__text">
          {text}
        </div>
        <div className="dashboard-btn__placeholder" />
        {children}
      </button>
    )
  );
}

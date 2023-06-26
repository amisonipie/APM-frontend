import React from "react";
import { WarrantyCard } from "views/components";
import "./DashboardCardSuper.styles.scss";

export function DashboardCardSuper({
  heading, value, icon, data, assetsStates, parseString,
}) {
  return (
    <>
      <div className="dashboard-card-super">
        <div className="dashboard-card-super__main">
          <div className="dashboard-card-super__main-heading">{heading}</div>
          <div className="dashboard-card-super__main-number">
            {value || "N/A"}
          </div>
          <div className="dashboard-card-super__main-warranty">
            <WarrantyCard
              text={data?.UNDER_WARRANTY || "0"}
              isInWarranty
            />
            <WarrantyCard
              text={data?.OUT_OF_WARRANTY || "0"}
              isInWarranty={false}
            />
          </div>
        </div>
        <div className="dashboard-card-super__icon">{icon}</div>
      </div>

      {assetsStates ? (
        <div className="dashboard-card-tree-view">
          {assetsStates.map((state, index) => (
            <div className="overview-section__assets_details_asset_card mb-1" key={index}>
              <div className="d-flex align-items-center">
                <img src={state.icon} alt="" />
                <p className="ml-2">{state.title}</p>
              </div>
              <h1>{parseString(state.value)}</h1>
            </div>
          ))}
        </div>
      )
        : null}
    </>
  );
}

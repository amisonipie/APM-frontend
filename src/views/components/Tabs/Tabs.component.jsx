import React from "react";
import { Download } from "assets/icons";

import "./Tabs.styles.scss";

export function Tabs({ tabs, current, onExportClick }) {
  return (
    <div className="tabs-component">
      <div className="tabs-component__tabs">
        {tabs.map(
          ({
            heading, icon, active, onClick, isVisible = true,
          }, index) => {
            const isActive = current === index + 1;
            return (
              isVisible && (
                <div
                  key={heading}
                  className="tabs-component__inner"
                  onClick={onClick}
                >
                  <div className="tabs-component__inner-box">
                    {icon}
                    <div
                      className={`tabs-component__inner-box-txt ${
                        isActive ? "tabs-component__inner-box-txt-active" : ""
                      }`}
                    >
                      {heading}
                    </div>
                  </div>
                  <div
                    className={`tabs-component__inner-divider ${
                      isActive ? "divider-show" : ""
                    }`}
                  />
                </div>
              )
            );
          },
        )}
      </div>
      {current === "Corrective Maintenance"
      || current === "Preventive Maintenance" ? (
          <div className="tabs-component__export" onClick={onExportClick}>
            <div className="tabs-component__export-icon">
              <Download />
            </div>
            <div className="tabs-component__export-text">Export</div>
          </div>
        ) : (
          <></>
        )}
    </div>
  );
}

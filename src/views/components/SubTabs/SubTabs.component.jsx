import React from "react";
import "./SubTabs.styles.scss";

export function SubTabs({ tabs, current }) {
  return (
    <div className="sub-tabs">
      {tabs.map((tab) => {
        const {
          title, onClick, Icon, isVisible,
        } = tab;
        const active = title === current;
        return (
          // Added isVisible for medical and non-medical field user
          isVisible && (
            <div
              className={`sub-tabs__tab ${active ? "sub-tabs__tab-active" : ""}`}
              key={title}
              onClick={onClick}
            >
              <div className="sub-tabs__tab-icon">
                <Icon fill={active ? "#2A347B" : "#959DB2"} />
              </div>
              <div className="sub-tabs__tab-text">{title}</div>
            </div>
          )
        );
      })}
    </div>
  );
}

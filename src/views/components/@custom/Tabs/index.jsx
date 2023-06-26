import React from "react";
import { Button } from "reactstrap";
import "./style.scss";

function CustomTabs(props) {
  return (
    <div
      className={`${props?.DBModal ? "customTabs pill" : "customTabs"} ${
        props?.customClasses
      }`}
    >
      {props.tabs?.map((tab) => (
        <Button
          onClick={() => props.toggle(tab.tabId)}
          key={tab?.tabId}
          className={` ${
            props?.DBModal
              ? "customTabs--switch"
              : "customTabs--switch"
          } ${props.activeTab === tab.tabId ? "active" : ""}`}
        >
          {tab.title}
        </Button>
      ))}
    </div>
  );
}

export default CustomTabs;

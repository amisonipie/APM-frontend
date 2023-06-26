import React from "react";
import Pre from "../../../assets/icons/PMCpre.svg";
import Next from "../../../assets/icons/PMCnext.svg";
import "./PMCalender.scss";
import { Button } from "reactstrap";
import { observer } from "mobx-react-lite";
import PrimaryButton from "../PrimaryButton";
import { reloadIcon } from "../RenderList/data";

export const PMCalendarTopBar = observer(
  ({
    Inventories,
    toggleDate,
    disablePrevDateToggler,
    currentMonth,
    activeBracket,
    activeYear,
    disableNextDateToggler,
    loading,
    toggleBracket,
  }) => (
    <div className="pm-calender-section">
      {/* Header Section */}
      <div className="pm-calender-section__header">
        <div className="pm-calender-section__header-left">
          <div className="pm-calender-section__header-left-bar" />
          <div className="pm-calender-section__header-left-title">
            <Button
              onClick={() => toggleDate("prev")}
              disabled={disablePrevDateToggler}
              className="pm-calender-section__header-left-button"
            >
              <img src={Pre} alt="previous" />
            </Button>
            <div>
              {activeBracket === Inventories.brackets.monthly && (
                <span className="month-p">{currentMonth}</span>
              )}
              <span>{activeYear}</span>
            </div>
            <Button
              onClick={() => toggleDate("next")}
              disabled={disableNextDateToggler}
              className="pm-calender-section__header-right-button"
            >
              <img src={Next} alt="next" />
            </Button>
          </div>
        </div>
        <div className="pm-calender-section__header-right">
          {loading && (
            <PrimaryButton
              isDisabled={loading}
              icon={reloadIcon}
              toolTip="Refresh"
              customClasses="mr-2"
              customIconClasses={`resetButton--icon stroke ${
                loading && "reloading"
              }`}
            />
          )}
          <div
            className="pm-calender-section__header-right-switch"
            onClick={toggleBracket}
          >
            <div
              className={`pm-calender-section__header-right-switch-el ${
                activeBracket === Inventories.brackets.annual
                  ? "switch-active"
                  : ""
              }`}
            >
              ANNUAL
            </div>
            <div
              className={`pm-calender-section__header-right-switch-el ${
                activeBracket === Inventories.brackets.monthly
                  ? "switch-active"
                  : ""
              }`}
            >
              MONTHLY
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
);

import React from "react";
import moment from "moment";
import { observer } from "mobx-react-lite";
import PMCalendarModal from "./PMCalenderModal";

import "./PMCalender.scss";

export const PMCalendarData = observer((props) => {
  const size = 3;
  return (
    <div className="px-3 PMCData pb-0">
      {Object.entries(props?.data)
        .sort()
        .map(([key, value], index) => {
          const rowLabel = props?.bracket === props?.Inventories?.brackets?.monthly
            ? moment(new Date(key)).format("DD MMMM")
            : props?.Inventories?.pmMonths[parseInt(key, 10)];
          const rowValues = value instanceof Object ? Object.entries(value) : [];

          return (
            <div className="pmRow" key={index}>
              <div className="data-month">{rowLabel}</div>
              <div className="d-flex data-col ">
                <div className="d-flex data-col__badges">
                  {rowValues
                    ?.slice(0, size)
                    ?.map(([rowKey, rowValue], rowIndex) => (
                      <div className="data" key={rowIndex}>
                        <div className="data-name">{rowKey}</div>
                        <div className="data-count">{rowValue}</div>
                      </div>
                    ))}
                </div>
                {rowValues?.slice(size - 1)?.length > 0 && (
                  <PMCalendarModal
                    {...props}
                    size={size}
                    label={rowLabel}
                    data={rowValues}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
});

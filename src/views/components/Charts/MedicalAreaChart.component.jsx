import _ from "lodash";
import React from "react";
import moment from "moment";
import {
  Area,
  AreaChart as AreaChartImport,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import "./Charts.styles.scss";

function LegendIcon({ fill = "#5BB647" }) {
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.82929 2.5H11C11.5523 2.5 12 2.94772 12 3.5C12 4.05228 11.5523 4.5 11 4.5H8.82929C8.41746 5.66519 7.30622 6.5 6 6.5C4.69378 6.5 3.58254 5.66519 3.17071 4.5H1C0.447715 4.5 0 4.05228 0 3.5C0 2.94772 0.447715 2.5 1 2.5H3.17071C3.58254 1.33481 4.69378 0.5 6 0.5C7.30622 0.5 8.41746 1.33481 8.82929 2.5Z"
        fill={fill}
      />
    </svg>
  );
}

export function MedicalAreaChart({
  data = [{}],
  colors = [],
  dataType = "Hrs",
  areaType,
  startOpacity,
  stopOpacity,
  legendPosition,
  line,
  strokeWidth,
}) {
  const datakey = Object.keys(_.get(data, "0", {})).length
    ? Object.keys(data[0])[0]
    : "";

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <div className="area-chart__legend">
        {payload.map((entry, index) => (
          <div className="area-chart__legend-el" key={`item-${index}`}>
            <LegendIcon fill={entry.color} />
            <div className="area-chart__legend-el-text">{entry.value}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderTooltip = (props) => {
    const { payload } = props;
    return (
      <div className="custom-medical-area-tooltip">
        {payload?.map((data, index) => (
          <div
            key={`item-${index}`}
            className="custom-medical-area-tooltip__el"
          >
            <div className="custom-medical-area-tooltip__el-text">
              <div className="custom-medical-area-tooltip__el-text-it">
                <div
                  className="custom-medical-area-tooltip__el-text-it-icon"
                  style={{ background: data?.color }}
                />
                <div className="custom-medical-area-tooltip__el-text-it-txt">
                  {data?.name}
                </div>
              </div>
              <div className="custom-medical-area-tooltip__el-text-v">
                {data?.payload?.[data?.dataKey]}
                {" "}
                {dataType}
              </div>
            </div>
            <div className="custom-medical-area-tooltip__el-heading">
              {index === payload.length - 1 ? (
                moment(data?.payload?.[datakey]).format(
                  "DD MMMM YYYY hh:mm:ss A",
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const formatter = (value) => `${value} ${dataType}`;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const xFormatter = (value) => days[moment(value).day()];
  return (
    <div className="medical-area-chart">
      <ResponsiveContainer width="95%" height={370}>
        <AreaChartImport data={data}>
          <defs>
            {Object.keys(_.get(data, "0", {})).length
              ? Object.keys(data[0]).map((key, index) => {
                let keyToSet;
                if (/\s/.test(key)) {
                  keyToSet = key?.replace(/\s+/g, "-")?.toLowerCase();
                } else {
                  keyToSet = key?.toLowerCase();
                }
                if (index === 0) {
                  return null;
                }
                return (
                  <linearGradient
                    id={keyToSet}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                    key={keyToSet}
                  >
                    <stop
                      offset="5%"
                      stopColor={colors[index - 1]}
                      stopOpacity={startOpacity || 0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={colors[index - 1]}
                      stopOpacity={stopOpacity || 0.5}
                    />
                  </linearGradient>
                );
              })
              : ""}
          </defs>
          <XAxis dataKey={datakey} tickFormatter={xFormatter} />
          <YAxis width={40} tickFormatter={formatter} />
          <CartesianGrid
            stroke="#959DB280"
            strokeDasharray="3 3"
            vertical={false}
          />
          <Tooltip content={renderTooltip} />

          <Legend
            verticalAlign={legendPosition || "top"}
            align="left"
            content={renderLegend}
          />

          {Object.keys(_.get(data, "0", {})).length
            ? Object.keys(data[0]).map((key, index) => {
              let keyToSet;
              if (/\s/.test(key)) {
                keyToSet = key?.replace(/\s+/g, "-")?.toLowerCase();
              } else {
                keyToSet = key?.toLowerCase();
              }
              if (index === 0) {
                return null;
              }
              return (
                <Area
                  key={keyToSet}
                  dataKey={key}
                  type={areaType || "monotone"}
                  stroke={colors[index - 1]}
                  fillOpacity={line ? 0 : 1}
                  fill={`url(#${keyToSet})`}
                  dot={{ fill: colors[index - 1] }}
                  strokeWidth={strokeWidth || 1}
                />
              );
            })
            : ""}
        </AreaChartImport>
      </ResponsiveContainer>
    </div>
  );
}

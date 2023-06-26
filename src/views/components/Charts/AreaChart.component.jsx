import React from "react";
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

export function AreaChart({ data = [{}], colors = [], dataType = "Hrs" }) {
  const datakey = Object.keys(data[0]).length ? Object.keys(data[0])[0] : "";

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <div className="area-chart__legend">
        {payload.map((entry, index) => (
          <div className="area-chart__legend-el" key={`item-${index}`}>
            <div
              className="area-chart__legend-el-circle"
              style={{
                background: entry.color,
                height: 14,
                width: 14,
                borderRadius: "50%",
              }}
            />
            <div className="area-chart__legend-el-text">{entry.value}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderTooltip = (props) => {
    const { payload } = props;
    return (
      <div className="custom-bar-tooltip">
        {payload.map((data, index) => (
          <div key={`item-${index}`} className="custom-bar-tooltip__el">
            <div className="custom-bar-tooltip__el-heading">
              {index === 0 ? data?.payload?.[datakey] : <></>}
            </div>
            <div className="custom-bar-tooltip__el-text">
              <div
                className="custom-bar-tooltip__el-text-icon"
                style={{ background: data?.color }}
              />
              <div className="custom-bar-tooltip__el-text-txt">
                Avg.
                {" "}
                {data?.name}
                {" "}
                Time:
                {" "}
                {data?.payload?.[data?.dataKey]}
                {" "}
                {dataType}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const formatter = (value) => `${value} ${dataType}`;
  return (
    <div className="custom-area-chart">
      <ResponsiveContainer width="95%" height={315}>
        <AreaChartImport data={data}>
          <defs>
            {Object.keys(data[0]).length
              ? Object.keys(data[0]).map((key, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <linearGradient
                    id={key}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                    key={index}
                  >
                    <stop
                      offset="5%"
                      stopColor={colors[index - 1]}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={colors[index - 1]}
                      stopOpacity={0.5}
                    />
                  </linearGradient>
                );
              })
              : ""}
          </defs>
          <XAxis dataKey={datakey} />
          <YAxis width={40} tickFormatter={formatter} />
          <CartesianGrid stroke="#959DB280" />
          <Tooltip content={renderTooltip} />

          <Legend content={renderLegend} verticalAlign="top" />

          {Object.keys(data[0]).length
            ? Object.keys(data[0]).map((key, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <Area
                  key={key}
                  dataKey={key}
                  type="monotone"
                  stroke={colors[index - 1]}
                  fillOpacity={1}
                  fill={`url(#${key})`}
                />
              );
            })
            : ""}
        </AreaChartImport>
      </ResponsiveContainer>
    </div>
  );
}

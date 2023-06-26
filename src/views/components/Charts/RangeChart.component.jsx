import React from "react";
import {
  Bar,
  BarChart as RechartsBC,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "./Charts.styles.scss";

export function RangeChart({
  data = [{}],
  layout = "vertical",
  colors = [],
  radius = 1,
  dataType = "Hrs",
}) {
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="bar-chart__legend">
        {payload.map((entry, index) => (
          <div className="bar-chart__legend-el" key={`item-${index}`}>
            <div
              className="bar-chart__legend-el-circle"
              style={{
                background: entry.color,
                height: 14,
                width: 14,
                borderRadius: "50%",
              }}
            />
            <div className="bar-chart__legend-el-text">{entry.value}</div>
          </div>
        ))}
      </div>
    );
  };

  const datakey = Object.keys(data[0]).length ? Object.keys(data[0])[0] : "";

  const formatter = (value) => `${value} ${dataType}`;

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
                Range of
                {" "}
                {data?.name}
                :
                {" "}
                {data?.payload?.[data?.dataKey][0]}
                {" "}
                -
                {" "}
                {data?.payload?.[data?.dataKey][1]}
                {dataType}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="95%" height={315}>
      <RechartsBC
        data={data}
        barGap={2}
        layout={layout}
        margin={{
          top: 0, left: 0, right: 0, bottom: 0,
        }}
      >
        <CartesianGrid stroke="#959DB280" />
        {layout === "vertical" ? (
          <XAxis type="number" tickFormatter={formatter} />
        ) : (
          <XAxis dataKey={datakey} />
        )}
        {layout === "vertical" ? (
          <YAxis type="category" dataKey={datakey} width={40} />
        ) : (
          <YAxis width={40} tickFormatter={formatter} />
        )}
        <Tooltip content={renderTooltip} />
        <Legend
          content={renderLegend}
          margin={{
            top: 0, left: 0, right: 0, bottom: 0,
          }}
        />
        {Object.keys(data[0]).length
          ? Object.keys(data[0]).map((key, index) => {
            if (index === 0) {
              return null;
            }
            return (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index - 1]}
                radius={radius}
              />
            );
          })
          : ""}
      </RechartsBC>
    </ResponsiveContainer>
  );
}

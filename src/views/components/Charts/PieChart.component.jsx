import React, { useState } from "react";
import {
  Cell,
  Pie,
  Sector,
  PieChart as PieChartImport,
  Label,
  ResponsiveContainer,
} from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    name,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 2}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 5}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        style={{ fontSize: 12, fil: "#00000", fontWeight: 600 }}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        // dy={18}
        textAnchor={textAnchor}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#000"
      >
        {`${name}`}
      </text>
    </g>
  );
};

export function PieChart({
  data = {},
  colors = [""],
  outerRadius = {},
  innerRadius = {},
  txt,
  tValue,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={350}>
        <PieChartImport>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}

            <Label
              value={tValue}
              position="center"
              dy={-15}
              style={{
                fontSize: "300%",
                fill: "#2B3037",
                fontWeight: "700",
                fontFamily: "Sofia Pro Bold",
              }}
            />
            <Label
              value={txt}
              position="center"
              dy={15}
              style={{
                fill: "#576169",
                fontWeight: "500",
                fontFamily: "Sofia Pro",
              }}
            />
          </Pie>
        </PieChartImport>
      </ResponsiveContainer>
    </div>
  );
}

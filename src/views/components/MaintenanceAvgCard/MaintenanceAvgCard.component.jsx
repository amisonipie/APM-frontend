import React from "react";
import { Cell, Pie, PieChart } from "recharts";
import { BarChart } from "views/components/Charts";
import {
  CMApprove, CMClose, CMRepair, CMRespond, Filter,
} from "assets/icons";

import "./MaintenanceAvgCard.styles.scss";

// data for header text and icon
const avgData = [
  {
    icon: <CMRespond />,
    text: "Respond",
  },
  {
    icon: <CMRepair />,
    text: "Repair",
  },
];

// legend data for pie chart of corrective maintainance
const cardData = [
  {
    icon: <CMRespond />,
    text: "Respond",
  },
  {
    icon: <CMRepair />,
    text: "Repair",
  },
  {
    icon: <CMApprove />,
    text: "Approve",
  },
  {
    icon: <CMClose />,
    text: "Close",
  },
];

// data for PM Bar chart
const avgBarData = [
  {
    device: "Monitor",
    Respond: 5,
    Repair: 7,
  },
  {
    device: "Surgery Bed",
    Respond: 8,
    Repair: 6,
  },
  {
    device: "ECG Machine",
    Respond: 10,
    Repair: 4,
  },
  {
    device: "Ventilator",
    Respond: 7,
    Repair: 9,
  },
  {
    device: "Gloves",
    Respond: 15,
    Repair: 12,
  },
];

const avgColors = ["#F1963A", "#A166AB"];

// data for CM PIE chart
const data = [
  { name: "Respond", value: 40 },
  { name: "Repair", value: 30 },
  { name: "Approve", value: 30 },
  { name: "Close", value: 20 },
];
const COLORS = ["#F1963A", "#A166AB", "#0AB39C", "#000000"];

export function MaintenanceAvgCard({
  text,
  correctiveMaintenance,
  correctivePieChart,
  PmBarChart,
}) {
  return (
    <div className="avg-card">
      <div className="avg-card__header">
        <div className="avg-card__header-heading">{text}</div>
        <div className="avg-card__header-right">
          {avgData.map(({ icon, text }) => (
            <div className="avg-card__header-right-text" key={text}>
              <div className="avg-card__header-right-text-icon">{icon}</div>
              <div className="avg-card__header-right-text-txt">{text}</div>
            </div>
          ))}

          <div className="avg-card__header-right-filter">
            <Filter />
          </div>
        </div>
      </div>
      <div className="avg-card__body">
        <div className="avg-card__body-graph">
          {correctivePieChart ? (
            <PieChart width={225} height={225}>
              <Pie
                data={data}
                cx={120}
                cy={120}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <></>
          )}

          {/* PM bar Chart goes here */}

          {PmBarChart ? (
            <BarChart
              data={avgBarData}
              colors={avgColors}
              radius={[5, 5, 0, 0]}
              hideLegend
              barSize={30}
              gap={10}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="avg-card__body-data">
          {correctiveMaintenance ? (
            <>
              {cardData.map(({ icon, text }, index) => (
                <div className="avg-card__body-data-text" key={index}>
                  <div className="avg-card__body-data-text-icon">
                    {icon}
                  </div>
                  <div className="avg-card__body--data-text-txt">
                    {text}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

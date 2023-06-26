import React from "react";
import {
  CMApprove, CMClose, CMRepair, CMRespond, Filter,
} from "assets/icons";
import {
  BarChart,
  AreaChart,
  PieChart,
  RangeChart,
} from "views/components/Charts";

import "./MaintenanceCard.styles.scss";

const barData = [
  {
    day: "Sun",
    Respond: 5,
    Repair: 7,
    Approve: 10,
    Close: 2,
  },
  {
    day: "Mon",
    Respond: 2,
    Repair: 6,
    Approve: 8,
    Close: 4,
  },
  {
    day: "Tue",
    Respond: 9,
    Repair: 4,
    Approve: 7,
    Close: 11,
  },
  {
    day: "Wed",
    Respond: 3,
    Repair: 7,
    Approve: 5,
    Close: 9,
  },
  {
    day: "Thu",
    Respond: 2,
    Repair: 6,
    Approve: 4,
    Close: 10,
  },
];

const rangeData = [
  {
    day: "Sun",
    Respond: [2, 3],
    Repair: [2, 5],
    Approve: [1, 3],
    Close: [2, 6],
  },
  {
    day: "Mon",
    Respond: [3, 4],
    Repair: [2, 6],
    Approve: [1, 5],
    Close: [5, 6],
  },
  {
    day: "Tue",
    Respond: [6, 9],
    Repair: [5, 7],
    Approve: [5, 6],
    Close: [8, 9],
  },
  {
    day: "Wed",
    Respond: [3, 4],
    Repair: [2, 6],
    Approve: [1, 5],
    Close: [5, 6],
  },
  {
    day: "Thu",
    Respond: [6, 9],
    Repair: [5, 7],
    Approve: [5, 6],
    Close: [8, 9],
  },
];

const departmentData = [
  {
    dep: "ER",
    Repair: 7,
    Respond: 5,
  },
  {
    dep: "ICU",
    Repair: 6,
    Respond: 8,
  },
  {
    dep: "CCU",
    Repair: 4,
    Respond: 10,
  },
  {
    dep: "Rehab",
    Repair: 9,
    Respond: 7,
  },
  {
    dep: "OPD",
    Repair: 12,
    Respond: 15,
  },
];

const deptColors = ["#A166AB", "#F1963A"];

const deviceData = [
  {
    device: "Monitor",
    Repair: 7,
    Respond: 5,
  },
  {
    device: "Surgical Bed",
    Repair: 6,
    Respond: 8,
  },
  {
    device: "ECG Machine",
    Repair: 4,
    Respond: 10,
  },
  {
    device: "Ventilator",
    Repair: 9,
    Respond: 7,
  },
  {
    device: "Gloves",
    Repair: 12,
    Respond: 15,
  },
];

const devicesWithMostOverdue = [
  {
    device: "ER Monitor",
    Approval: 25,
  },
  {
    device: "Surgical Bed",
    Approval: 3,
  },
  {
    device: "CCU Ventilator",
    Approval: 6,
  },
  {
    device: "Gloves",
    Approval: 12,
  },
  {
    device: "Blades",
    Approval: 21,
  },
  {
    device: "Syringe",
    Approval: 5,
  },
];

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

// Avg Time bar chart data for PM
const pmAvgBarData = [
  {
    day: "Sun",
    Approve: 5,
  },
  {
    day: "Mon",
    Approve: 2,
  },
  {
    day: "Tue",
    Approve: 9,
  },
  {
    day: "Wed",
    Approve: 3,
  },
  {
    day: "Thu",
    Approve: 2,
  },
  {
    day: "Fri",
    Approve: 5,
  },
];

// Avg Device Overdue Bar data for Pm
const pmAvgDevData = [
  {
    device: "Monitor",
    Approve: 5,
  },
  {
    device: "Surgry Bed",
    Approve: 8,
  },
  {
    device: "ECG Machine",
    Approve: 10,
  },
  {
    device: "Ventilator",
    Approve: 7,
  },
  {
    device: "Gloves",
    Approve: 15,
  },
];
const COLORS = ["#F1963A", "#A166AB", "#0AB39C", "#000000"];

// Pie chart for PM

const data = [
  { name: "HMC", value: 1200 },
  { name: "Awaiting MOH Engg", value: 1500 },
  { name: "Closed", value: 1600 },
];
const pieColors = ["#31CD82", "#F1963A", "#000000"];

const statusOverdueData = [
  { name: "HMC", value: 40 },
  { name: "Awaiting MOH Engg", value: 30 },
];
const statusOverdueColors = ["#31CD82", "#F1963A"];

const pmWoStatusHMCData = [
  { name: "Awaiting by 3rd party", value: 40 },
  { name: "Awaiting Parts", value: 30 },
  { name: "Pending for maintenance", value: 30 },
];
const pmWoStatusHMColors = ["#B80F4B", "#959DB2", "#B07FC8"];

const pmWoStatusOverdueData = [
  { name: "Awaiting Parts", value: 10 },
  { name: "Ready for maintenance", value: 30 },
  { name: "in-use", value: 10 },
  { name: "Awaiting by 3rd party", value: 40 },
];
const pmWoStatusOverdueColors = ["#959DB2", "#31CD82", "#B07FC8", "#B80F4B"];

export function MaintenanceCard({
  text,
  singleAvg,
  legendTxt,
  barChart,
  department,
  device,
  range,
  PmTime,
  deviceOverdue,
  PmWoStatus,
  StatusOverdue,
  PmWoStatusHMC,
  PmWoStatusOverdue,
}) {
  return (
    <div className="cm-card">
      <div className="cm-card__header">
        <div className="cm-card__header-text">{text}</div>
        <div className="cm-card__header-icon">
          <Filter />
        </div>
      </div>
      <div className="cm-card__body">
        <div className="cm-card__body-graph">
          {barChart ? (
            <BarChart data={barData} colors={COLORS} />
          ) : (
            <></>
          )}
          {range ? (
            <RangeChart data={rangeData} colors={COLORS} />
          ) : (
            <></>
          )}
          {department ? (
            <AreaChart data={departmentData} colors={deptColors} />
          ) : (
            <></>
          )}
          {device ? (
            <AreaChart data={deviceData} colors={deptColors} />
          ) : (
            <></>
          )}
          {/* PM card List goes here */}
          {PmTime ? (
            <BarChart
              data={pmAvgBarData}
              colors={["#1A8451"]}
              radius={[5, 5, 0, 0]}
              barSize={27}
              hideLegend
            />
          ) : (
            <></>
          )}
          {deviceOverdue ? (
            <BarChart
              data={devicesWithMostOverdue}
              colors={["#EB5757"]}
              radius={[5, 5, 0, 0]}
              barSize={27}
              hideLegend
            />
          ) : (
            <></>
          )}
          {PmWoStatus ? (
            <PieChart
              data={data}
              colors={pieColors}
              outerRadius={100}
              innerRadius={60}
              txt="Total Work Orders"
              tValue="5.6k"
            />
          ) : (
            <></>
          )}
          {StatusOverdue ? (
            <PieChart
              data={statusOverdueData}
              colors={statusOverdueColors}
              outerRadius={100}
              innerRadius={60}
              txt="Overdue PM WO's"
              tValue="5.6k"
            />
          ) : (
            <></>
          )}
          {PmWoStatusHMC ? (
            <PieChart
              data={pmWoStatusHMCData}
              colors={pmWoStatusHMColors}
              outerRadius={100}
              innerRadius={30}
            />
          ) : (
            <></>
          )}
          {PmWoStatusOverdue ? (
            <PieChart
              data={pmWoStatusOverdueData}
              colors={pmWoStatusOverdueColors}
              outerRadius={100}
              innerRadius={30}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

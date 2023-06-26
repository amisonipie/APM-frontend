import React from "react";
import { AssetTick, AssetCross } from "assets/icons";
import { MedicalAreaChart } from "views/components";
import Loader from "views/components/@vuexy/spinner/Loading-spinner";

import "./Medical.styles.scss";

const medicalAssetsData = [
  {
    dateTime: "2022-04-11T10:20:30Z",
    Working: 1700,
    Down: 980,
    "Due For PM": 500,
  },
  {
    dateTime: "2022-04-12T10:20:30Z",
    Working: 2100,
    Down: 1600,
    "Due For PM": 1200,
  },
  {
    dateTime: "2022-04-13T10:20:30Z",
    Working: 2200,
    Down: 1500,
    "Due For PM": 490,
  },
  {
    dateTime: "2022-04-14T10:20:30Z",
    Working: 1900,
    Down: 980,
    "Due For PM": 600,
  },
  {
    dateTime: "2022-04-15T10:20:30Z",
    Working: 1500,
    Down: 600,
    "Due For PM": 450,
  },
  {
    dateTime: "2022-04-16T10:20:30Z",
    Working: 2000,
    Down: 980,
    "Due For PM": 660,
  },
  {
    dateTime: "2022-04-17T10:20:30Z",
    Working: 1900,
    Down: 980,
    "Due For PM": 100,
  },
];

const medicalAssetsColors = ["#7DBD5B", "#E94235"];

const dataHistoryOptions = [
  { value: 7, label: "Last 7 Days" },
  { value: 30, label: "Last 30 Days" },
  { value: 60, label: "Last 60 Days" },
  { value: 90, label: "Last 90 Days" },
];

function WarrantyBox({ Icon, title, value }) {
  return (
    <div className="medical-section__stats-warranty-box">
      <div className="medical-section__stats-warranty-box-icon">
        <Icon />
      </div>
      <div className="medical-section__stats-warranty-box-text">
        <p className="medical-section__stats-warranty-box-text-h">{title}</p>
        <p className="medical-section__stats-warranty-box-text-v">{value}</p>
      </div>
    </div>
  );
}

export function Medical({
  data, chartData, days, setDays, loading,
}) {
  // const { OUT_OF_WARRANTY, TOTAL, UNDER_WARRANTY } = data;

  const newData = chartData.map((item) => ({
    dateTime: item?.created_at,
    Working: item?.working,
    Down: item?.not_working,
  }));

  // const [dataHistory, setDataHistory] = useState(7);
  return (
    <div className="medical-section">
      {/* Header Section */}
      <div className="medical-section__header">
        <div className="medical-section__header-left">
          <div className="medical-section__header-left-bar" />
          <div className="medical-section__header-left-title">
            Inservice Assets
          </div>
        </div>
        {/* // As removed chart i commented the selection box for days */}
        {/* <div className="medical-section__header-right">
          <div className="medical-section__header-right-dd">
            <select
              value={days}
              onChange={(e) => {
                setDays(e.target.value);
              }}
            >
              {dataHistoryOptions.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div> */}
      </div>

      {/* Stats Section */}
      <div className="medical-section__stats">
        <div className="medical-section__stats-total">
          <h1>{data?.TOTAL}</h1>
        </div>
        <div className="medical-section__stats-warranty">
          <WarrantyBox
            Icon={AssetTick}
            title="In Warranty"
            value={`${data?.UNDER_WARRANTY}`}
          />
          <WarrantyBox
            Icon={AssetCross}
            title="Out Of Warranty"
            value={`${data?.OUT_OF_WARRANTY}`}
          />
        </div>
      </div>

      {/* Chart Section */}
      {/* // commented as told in teamwork */}
      {/* <div className="medical-section__chart">
        {newData && !loading ? (
          <MedicalAreaChart
            data={newData}
            colors={medicalAssetsColors}
            dataType=""
            areaType="linear"
            startOpacity={0.2}
            stopOpacity={0.01}
            legendPosition="bottom"
          />
        ) : (
          <>
            <Loader />
          </>
        )}
      </div> */}
    </div>
  );
}

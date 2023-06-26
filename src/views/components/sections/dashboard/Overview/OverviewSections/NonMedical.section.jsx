import React, { useEffect, useState } from "react";
import { AssetTick, AssetCross } from "assets/icons";

import "./NonMedical.styles.scss";
import CustomTabs from "views/components/@custom/Tabs";
import { classification } from "utility/config";

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
const classificationTabs = [
  {
    tabId: classification.nonMedical,
    title: "Non Medical",
  },
  {
    tabId: classification.generic,
    title: "Generic",
  },
];
export function NonMedical({
  data,
  nonMedicalChartData,
  genericChartData,
  nonMedicalDays,
  setNonMedicalDays,
  genericDays,
  setGenericDays,
  loading,
}) {
  const [activeTab, setActiveTab] = useState(classification.nonMedical);
  const [activeData, setActiveData] = useState({});
  // const [activeChartData, setActiveChartData] = useState([]);
  // const [dataHistory, setDataHistory] = useState(7);

  const nonmedicalStats = data?.nonmedicalStats;
  const genericStats = data?.genericStats;

  // const newNonMedicalChartData = nonMedicalChartData.map((item) => {
  //   return {
  //     dateTime: item?.created_at,
  //     Working: item?.working,
  //     Down: item?.not_working,
  //   };
  // });

  // const newGenericChartData = genericChartData.map((item) => {
  //   return {
  //     dateTime: item?.created_at,
  //     Working: item?.working,
  //     Down: item?.not_working,
  //   };
  // });

  useEffect(() => {
    if (activeTab === classification.nonMedical) {
      setActiveData(nonmedicalStats);
      // setActiveChartData(newNonMedicalChartData);
    } else {
      setActiveData(genericStats);
      // setActiveChartData(newGenericChartData);
    }
  }, [activeTab, nonMedicalChartData, genericChartData]);

  const handleSwitch = (payload) => setActiveTab(payload);

  return (
    <div className="non-medical-section">
      {/* Header Section */}
      <div className="non-medical-section__header">
        <div className="non-medical-section__header-left">
          <div className="non-medical-section__header-left-bar" />
          <div className="non-medical-section__header-left-title">
            Inservice Assets
          </div>
        </div>
        <CustomTabs
          tabs={classificationTabs}
          toggle={handleSwitch}
          activeTab={activeTab}
        />
      </div>

      {/* Stats Section */}
      <div className="non-medical-section__stats">
        <div className="non-medical-section__stats-total">
          <h1>{activeData?.TOTAL}</h1>
          <div className="non-medical-section__stats-warranty">
            <WarrantyBox
              Icon={AssetTick}
              title="In Warranty"
              value={`${activeData?.UNDER_WARRANTY}`}
            />
            <WarrantyBox
              Icon={AssetCross}
              title="Out Of Warranty"
              value={`${activeData?.OUT_OF_WARRANTY}`}
            />
          </div>
        </div>
        {/* // As removed chart i commented the selection box for days */}
        {/* <div className="non-medical-section__stats-select">
          <select
            value={
              activeTab === classification.nonMedical
                ? nonMedicalDays
                : genericDays
            }
            onChange={(e) => {
              if (activeTab === classification.nonMedical) {
                setNonMedicalDays(e.target.value);
              } else {
                setGenericDays(e.target.value);
              }
            }}
          >
            {dataHistoryOptions.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div> */}
      </div>

      {/* Chart Section */}
      {/* // commented as told in teamwork */}
      {/* <div className="non-medical-section__chart">
        {!loading ? (
          <MedicalAreaChart
            data={activeChartData}
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
      {/* <MedicalAreaChart
          data={medicalAssetsData}
          colors={medicalAssetsColors}
          dataType=""
          areaType="monotone"
          startOpacity={0.2}
          stopOpacity={0.01}
          legendPosition="bottom"
          line
          strokeWidth={2}
        /> */}
    </div>
  );
}

import React from "react";
import {
  AssetsBox,
  WorkingA,
  WorkingB,
  WorkingC,
  CardTotal,
  CardWork,
  CardDown,
  NonMedicalAssetCard,
} from "assets/icons";

import "./DashboardCard.styles.scss";

function ClassCard({ data }) {
  const classData = [
    {
      icon: <WorkingA />,
      text: "Class A",
      number: data?.a,
    },
    {
      icon: <WorkingB />,
      text: "Class B",
      number: data?.b,
    },
    {
      icon: <WorkingC />,
      text: "Class C",
      number: data?.c,
    },
  ];
  return (
    <>
      {classData.map(({
        icon, text, number, retired, isNonMedical,
      }, index) => (
        <div key={index} className="card__body-right-content">
          <div>{icon}</div>
          <div className="card__body-right-content-text">
            <div className="card__body-right-content-text-txt">
              {text}
              {" "}
              <br />
              {" "}
              <span className="card__body-right-content-text-txt-bold">
                {number}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function CardBox({ data, isNonMedical }) {
  const {
    total, working, notWorking, retired,
  } = data;

  const getProgress = (obtained) => Math.round((obtained * 100) / total);
  return (
    <div
      // TODO: Uncomment this when retired card is required and remove other className
      // className={`dashboard-card-box ${
      //   isNonMedical ? 'dashboard-card-box-retired' : ''
      // }`}
      className="old-dashboard-card-box"
    >
      <div className="old-dashboard-card__footer-box">
        <div className="old-dashboard-card__footer-box-inner">
          <div className="old-dashboard-card__footer-box-inner-header">
            <CardTotal />
            <div className="old-dashboard-card__footer-box-inner-header-text">
              Total
            </div>
          </div>
          <div className="old-dashboard-card__footer-box-inner-body">
            {total}
          </div>
          <div className="old-dashboard-card__footer-box-inner-footer">
            <div className="old-dashboard-card__footer-box-inner-footer-outer">
              <div
                className="old-dashboard-card__footer-box-inner-footer-inner old-dashboard-card__footer-box-inner-footer-inner-total"
                style={{ width: "100%", background: "#6c5dd3" }}
              />
            </div>
          </div>
        </div>
        <div className="old-dashboard-card__footer-box-inner">
          <div className="old-dashboard-card__footer-box-inner-header">
            <CardWork />
            <div className="old-dashboard-card__footer-box-inner-header-text">
              Working
            </div>
          </div>
          <div className="old-dashboard-card__footer-box-inner-body">
            {working}
          </div>
          <div className="old-dashboard-card__footer-box-inner-footer">
            <div className="old-dashboard-card__footer-box-inner-footer-outer">
              <div
                className="old-dashboard-card__footer-box-inner-footer-inner old-dashboard-card__footer-box-inner-footer-inner-work"
                style={{
                  width: `${getProgress(working)}%`,
                  background: "#1A8451",
                }}
              />
            </div>
          </div>
        </div>
        <div className="old-dashboard-card__footer-box-inner">
          <div className="old-dashboard-card__footer-box-inner-header">
            <CardDown />
            <div className="old-dashboard-card__footer-box-inner-header-text">
              Down
            </div>
          </div>
          <div className="old-dashboard-card__footer-box-inner-body">
            {notWorking}
          </div>
          <div className="old-dashboard-card__footer-box-inner-footer">
            <div className="old-dashboard-card__footer-box-inner-footer-outer">
              <div
                className="old-dashboard-card__footer-box-inner-footer-inner old-dashboard-card__footer-box-inner-footer-inner-down"
                style={{
                  width: `${getProgress(notWorking)}%`,
                  background: "#EB5757",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* TODO: Uncomment This when retired card is required */}
      {/* {isNonMedical && (
        <div className="card__footer-card">
          <div className="card__footer-card-inner">
            <div className="card__footer-card-inner-header">
              <CardRetired />
              <div className="card__footer-card-inner-header-text">Retired</div>
            </div>
            <div className="card__footer-card-inner-body">{retired}</div>
            <div className="card__footer-card-inner-footer">
              <div className="card__footer-card-inner-footer-outer">
                <div
                  className="card__footer-card-inner-footer-inner"
                  style={{ width: `${getProgress(retired)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

const dummyData = {
  MEDICAL: 11,
  MEDICAL_CLASS_A: 3,
  MEDICAL_CLASS_B: 6,
  MEDICAL_CLASS_C: 2,
  MEDICAL_NOT_WORKING: 0,
  MEDICAL_WORKING: 11,
  NONMEDICAL: 9,
  NONMEDICAL_NOT_WORKING: 0,
  NONMEDICAL_RETIRED: 0,
  NONMEDICAL_WORKING: 9,
};

export function DashboardCard({ heading, data = dummyData, isMedical }) {
  const isNonMedical = Object.keys(data).includes("retired");
  return (
    <div className="old-dashboard-card">
      <div className="db-old-dashboard-card__top">
        <div className="old-dashboard-card__header">
          <div className="old-dashboard-card__header-icon">
            {isMedical ? <AssetsBox /> : <NonMedicalAssetCard />}
          </div>
          <div className="old-dashboard-card__header-text">{heading}</div>
        </div>
        <div className="old-dashboard-card__body">
          <div className="old-dashboard-card__body-left">
            <div className="old-dashboard-card__body-left-number">
              {data?.total}
            </div>
          </div>
          <div className="old-dashboard-card__body-right">
            {isNonMedical ? (
              <></>
            ) : (
              <ClassCard data={data?.class} />
            )}
          </div>
        </div>
      </div>
      <div className="old-dashboard-card__footer">
        <div>
          <div className="old-dashboard-card__body-left-text">
            Inservice
          </div>
        </div>
        <div>
          <CardBox isNonMedical={isNonMedical} data={data} />
        </div>
      </div>
    </div>
  );
}

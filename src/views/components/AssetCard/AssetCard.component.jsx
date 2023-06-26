import React from "react";
import { getWarrantyStatus } from "views/components/generalHelper";
import {
  WorkingA,
  WorkingB,
  WorkingC,
  DMA,
  DMB,
  DMC,
  DueA,
  DueB,
  DueC,
  AssetTick,
  AssetCross,
} from "assets/icons";

import "./AssetCard.styles.scss";

const damyData = {
  DUE_FOR_PM_CLASS_A: 3,
  DUE_FOR_PM_CLASS_B: 6,
  DUE_FOR_PM_CLASS_C: 2,
  DUE_FOR_PM_OUT_OF_WARRANTY: 7,
  DUE_FOR_PM_UNDER_WARRANTY: 4,
  MEDICAL_NOT_WORKING_CLASS_A: 0,
  MEDICAL_NOT_WORKING_CLASS_B: 0,
  MEDICAL_NOT_WORKING_CLASS_C: 0,
  MEDICAL_NOT_WORKING_OUT_OF_WARRANTY: 0,
  MEDICAL_NOT_WORKING_UNDER_WARRANTY: 0,
  MEDICAL_WORKING_CLASS_A: 3,
  MEDICAL_WORKING_CLASS_B: 6,
  MEDICAL_WORKING_CLASS_C: 2,
  MEDICAL_WORKING_OUT_OF_WARRANTY: 7,
  MEDICAL_WORKING_UNDER_WARRANTY: 4,
};

export function AssetCard({
  data = damyData, iswork, isDM, isDue,
}) {
  return (
    <div className="asset-card">
      <div className="asset-card__upper">
        <div className="asset-card__upper-top">
          {iswork ? <WorkingA /> : <></>}
          {isDM ? <DMA /> : <></>}
          {isDue ? <DueA /> : <></>}
          <div className="asset-card__upper-top-text">
            Class A
            {" "}
            <br />
            {" "}
            <span className="asset-card__upper-top-text-bold">{data?.a}</span>
          </div>
        </div>
        <div className="asset-card__upper-top">
          {iswork ? <WorkingB /> : <></>}
          {isDM ? <DMB /> : <></>}
          {isDue ? <DueB /> : <></>}
          <div className="asset-card__upper-top-text">
            Class B
            {" "}
            <br />
            {" "}
            <span className="asset-card__upper-top-text-bold">{data?.b}</span>
          </div>
        </div>
        <div className="asset-card__upper-top">
          {iswork ? <WorkingC /> : <></>}
          {isDM ? <DMC /> : <></>}
          {isDue ? <DueC /> : <></>}
          <div className="asset-card__upper-top-text">
            Class C
            {" "}
            <br />
            {" "}
            <span className="asset-card__upper-top-text-bold">{data?.c}</span>
          </div>
        </div>
      </div>
      <div className="asset-card__bottom">
        <div className="asset-card__bottom-inner">
          <AssetTick />
          <div className="asset-card__bottom-inner-text">
            In Warranty
            {" "}
            <br />
            <span className="asset-card__bottom-inner-text-bold">
              {getWarrantyStatus[data?.warrantyStatus] || "N/A"}
            </span>
          </div>
        </div>
        <div className="asset-card__bottom-inner">
          <AssetCross />
          <div className="asset-card__bottom-inner-text">
            Out of Warranty
            {" "}
            <br />
            <span className="asset-card__bottom-inner-text-bold">
              {data?.outOfWarranty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

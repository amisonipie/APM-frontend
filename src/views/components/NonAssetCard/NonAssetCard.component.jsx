import React from "react";
import {
  NonMedicalAssetsSVG,
  MedicalAssetsWorking,
  CardDown,
  GenericAssetsSVG,
} from "assets/icons";

import "./NonAssetCard.styles.scss";

export function NonAssetCard({ generic, text, data }) {
  return (
    <div className="non-asset">
      <div className="non-asset__card">
        <div className="non-asset__card-top">
          <div className="non-asset__card-top-left">
            {generic ? <GenericAssetsSVG /> : <NonMedicalAssetsSVG />}
            <div className="non-asset__card-top-left-text">{text}</div>
          </div>
          <div className="non-asset__card-top-right">{data?.total}</div>
        </div>
        <div className="non-asset__card-bottom">
          <div className="non-asset__card-bottom-card">
            <MedicalAssetsWorking />
            <div className="non-asset__card-bottom-card-text">
              Working
              {" "}
              <br />
              {" "}
              <span className="non-asset__card-bottom-card-text-bold">
                {data?.working}
              </span>
            </div>
          </div>
          <div className="non-asset__card-bottom-card">
            <CardDown />
            <div className="non-asset__card-bottom-card-text">
              Down
              {" "}
              <br />
              {" "}
              <span className="non-asset__card-bottom-card-text-bold">
                {data?.notWorking}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

function Details(assetInfo) {
  return (
    <div className="d-flex flex-wrap border p-5">
      {assetInfo.assetInfo.map((item, astIndex) => (
        <div
          key={astIndex}
          className={`workOrder_detail__assetInformation__body__box 
            ${
        item?.label === "Uploaded Files"
          ? "d-flex flex-direction-row"
          : ""
        }
                    `}
        >
          <p>{item?.label}</p>
          <h2>{item?.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default Details;

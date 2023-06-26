import React from "react";
import { splitData } from "utility/transformers";
import { Card, CardBody, CardHeader } from "reactstrap";
import { assetInfoIcon } from "assets/icons/svgIcons";

function WorkOrderAssetInformation({ assetInfo, state }) {
  return (
    <Card className="">
      <CardHeader>
        <div className="workOrder_detail__assetInformation__heading">
          <figure>{assetInfoIcon}</figure>
          <h2>Asset Information</h2>
        </div>
      </CardHeader>
      <CardBody className="workOrder_detail__assetInformation__body">
        {state?.data?.inventory
          && assetInfo.map((item, astIndex) => (
            <div
              key={astIndex}
              className="workOrder_detail__assetInformation__body__box"
            >
              <p>{item?.label}</p>
              <h2 className="text-capitalize">
                {splitData(item?.value, "_", " ")}
              </h2>
            </div>
          ))}
      </CardBody>
    </Card>
  );
}

export default WorkOrderAssetInformation;

import React, { useState, Fragment } from "react";
import { profileIcon } from "assets/icons/svgIcons";
import { getField, getStatus } from "views/components/generalHelper";
import CardBadge from "views/components/workOrders/CardView/Header/CardBadge";
import { FiPrinter } from "react-icons/fi";
import { UncontrolledTooltip } from "reactstrap";

import moment from "moment";
import { exportWorkOrderPDF } from "utility/helper/endpoints";
import { SC } from "utility/helper";
import { splitData } from "utility/transformers";

function WorkOrderHeader({
  state, color, current, workOrderId,
}) {
  const [loading, setLoading] = useState(false);
  const handlePrint = async () => {
    setLoading(true);
    try {
      await SC.downloadCall({
        url: `/${exportWorkOrderPDF}/${workOrderId}`,
        fileName: `workorder_export_${splitData(
          moment(new Date()).format("DD MM YYYY hh:mm:ss"),
          " ",
          "_",
        )}`,
        fileExtension: ".pdf",
        params: {
          isDownload: 0,
        },
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <header className="workOrder_detail__header">
      <div className="workOrder_detail__header__stats">
        <h2>
          #
          {state?.data?.serial}
        </h2>
        <div className="cardView__header__badgeContainer align-items-center">
          <CardBadge
            text={getStatus(state?.data?.status, current?.site_model)}
            isIcon
            customClasses={`${color} main`}
          />
          <CardBadge
            text={state?.data?.type}
            customClasses="cardView__header__badgeContainer--category"
          />
          <CardBadge
            text={getField(current?.classification)}
            customClasses="cardView__header__badgeContainer--category"
          />
          {/* Print WO  */}
          {/* {showPrint && ( */}
          <FiPrinter
            size={20}
            className="click-able workOrder_detail--printer"
            id="print-wo"
            onClick={handlePrint}
          />
          <UncontrolledTooltip placement="top" target="print-wo">
            {loading ? "Please wait..." : "Print Work Order"}
          </UncontrolledTooltip>
          {/* Print wo Close  */}
          {/* )}{" "} */}
        </div>
      </div>
      {state?.data?.creator && (
        <div className="workOrder_detail__header__owner">
          <div className="workOrder_detail__header__owner__content">
            <p>Requester</p>
            <strong>{state?.data?.creator?.name}</strong>
            <a
              className="d-block mb-0"
              href={`tel:${state?.data?.creator?.phone}`}
            >
              <i>
                +
                {state?.data?.creator?.phone}
              </i>
            </a>
            <a
              className="d-block mb-1"
              href={`mailto:${state?.data?.creator?.email}`}
            >
              {state?.data?.creator?.email}
            </a>
          </div>
          <div className="workOrder_detail__header__owner__profile">
            {profileIcon}
          </div>
        </div>
      )}
    </header>
  );
}

export default WorkOrderHeader;

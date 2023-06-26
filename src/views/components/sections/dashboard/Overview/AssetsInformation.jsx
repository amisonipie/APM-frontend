import get from "lodash/get";
import { Col, Row } from "reactstrap";
import Closed from "assets/imgs/closed.svg";
import Rejected from "assets/imgs/rejected.svg";
import Completed from "assets/imgs/completed.svg";
import InProgress from "assets/imgs/inprogress.svg";
import AwaitingMaintenance from "assets/imgs/awaiting.svg";
import CheckMarkGreen from "assets/imgs/checkmarkgreen.svg";
import CorrectiveSetting from "assets/imgs/correctiveSetting.svg";
import DownForMaintenanceIcon from "assets/imgs/downForMaintenanceIcon.svg";
import DownForMaintenance from "assets/imgs/downForMaintenance.svg";
import AssetRetired from "assets/imgs/assetRetired.svg";
import React, { useMemo, Fragment } from "react";

import "./Overview.styles.scss";
import CustomSelect from "views/components/@custom/Select";
import CustomTabs from "views/components/@custom/Tabs";
import { classificationTabs } from "utility/helper/constants";
import { dashboardViewMedicalNonMedical } from "utility/helper/permissions";
import { canDoDirect } from "utility/helper/directPermissions";
import { observer } from "mobx-react-lite";
import { assetWarningIcon } from "assets/icons/svgIcons";

const getStatus = (data) => [
  {
    title: "Working assets",
    icon: CheckMarkGreen,
    value: get(data, "WORKING", 0),
  },
  {
    title: "Down for Maintenance",
    icon: DownForMaintenance,
    value: get(data, "NOT_WORKING", 0),
  },
  {
    title: "Retired",
    icon: AssetRetired,
    value: get(data, "RETIRED", 0),
  },
];

const workOrder = (data) => [
  {
    title: "Awaiting Maintenance",
    icon: AwaitingMaintenance,
    value: get(data, "opened"),
  },
  {
    title: "In-Progress",
    icon: InProgress,
    value: get(data, "in_progress", 0),
  },
  {
    title: "Maintenance Completed",
    icon: Completed,
    value: get(data, "solved", 0),
  },
  {
    title: "Rejected",
    icon: Rejected,
    value: get(data, "rejected", 0),
  },
  {
    title: "Closed",
    icon: Closed,
    value: get(data, "closed", 0),
  },
];

const parseString = (value) => {
  if (String(value).length === 1 && parseInt(value) !== 0) {
    return `0${value}`;
  }

  return value;
};

const AssetsInformation = observer((props) => {
  const assetsStates = useMemo(
    () => getStatus(
      get(
        props?.DBModal?.workOrderStats?.data,
        "workorder.inventory_status",
        {},
      ),
    ),
    [props?.DBModal?.workOrderStats?.data],
  );

  const correctiveMaintainanceCards = useMemo(
    () => workOrder(
      get(props?.DBModal?.workOrderStats?.data, "workorder.corrective", {}),
    ),
    [props?.DBModal?.workOrderStats?.data],
  );

  const preventiveMaintainanceCards = useMemo(
    () => workOrder(
      get(props?.DBModal?.workOrderStats?.data, "workorder.preventive", {}),
    ),
    [props?.DBModal?.workOrderStats?.data],
  );

  return (
    <Row className={props?.isSuperAdmin ? "mt-2" : "mt-2"}>
      {/* <Col md="12" sm="12" className={"mb-4"}>
        <div className="d-flex flex-row w-100 justify-content-between align-items-center flex-wrap row m-0">
          <Col lg="3">
            <h1 className="m-0 mb-1  mb-lg-0">Work Orders</h1>
          </Col>
          {canDoDirect(props?.DBModal.User, dashboardViewMedicalNonMedical) && (
            <Col lg="5">
              <CustomTabs
                tabs={Object.values(classificationTabs).filter(
                  (item) => item.filter
                )}
                toggle={(e) =>
                  props?.DBModal?.HandleFilters({
                    key: "classification_filter",
                    value: e,
                  })
                }
                activeTab={props?.DBModal?.filters?.classification_filter}
                customClasses="mb-1  mb-lg-0"
                DBModal={props?.DBModal}
              />
            </Col>
          )}
          {props.isSuperAdmin && (
            <CustomSelect
              col={true}
              name="site_id"
              options={props?.DBModal?.sites.data}
              SelectFormGroupClasses="mb-0"
              placeholder="Select Site"
              isLoading={props?.DBModal?.sites.loading}
              value={props?.DBModal?.filters?.site_id}
              customColClasses=" mb-1  mb-lg-0 col-lg-4"
              handleChange={props?.DBModal?.HandleFilters}
              optionsCustoms={{ value: "_id", label: "site_name" }}
            />
          )}
        </div>
      </Col> */}
      {props?.isSuperAdmin || props?.staffMedical ? (
        assetsStates.map((state, key) => (
          <Col key={key} md="4" sm="12" className="mb-2">
            <div className="overview-section__assets_details_asset_card">
              <div className="d-flex">
                <img src={state.icon} alt="" />
                <p className="ml-2 ml-md-1 align-self-center">{state.title}</p>
              </div>
              <h1>{parseString(state.value)}</h1>

            </div>
          </Col>
        ))
      ) : null}

      <Col md="6" sm="12" className="mb-2">
        <MaintainanceCard
          title="Corrective Maintenance"
          icon={CorrectiveSetting}
          totalAssets={get(
            props?.DBModal?.workOrderStats?.data,
            "workorder.corrective.total",
            0,
          )}
          status={correctiveMaintainanceCards}
        />
      </Col>
      <Col md="6" sm="12" className="mb-2">
        <MaintainanceCard
          title="Preventive Maintenance"
          icon={DownForMaintenanceIcon}
          totalAssets={get(
            props?.DBModal?.workOrderStats?.data,
            "workorder.preventive.total",
            0,
          )}
          status={preventiveMaintainanceCards}
        />
      </Col>
    </Row>
  );
});

function MaintainanceCard({
  title, totalAssets, status, icon,
}) {
  return (
    <div className="overview-section__assets_details_details_card">
      <div className="d-flex align-items-center">
        <img src={icon} alt="" />
        <h1 className="ml-2">{title}</h1>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-4">
        <p className="overview-section__assets_details_total_text">
          Total Work orders
        </p>
        <p className="overview-section__assets_details_total_number">
          {totalAssets}
        </p>
      </div>

      {status.map((maintainance, key) => (
        <Fragment key={key}>
          {key !== 0 && (
            <p className="overview-section__assets_details_hr" />
          )}

          <div
            key={key}
            className="d-flex align-items-center justify-content-between mt-3 flex-row"
          >
            <div className="d-flex align-items-center justify-content-center">
              <img src={maintainance.icon} alt="" />
              <p className="overview-section__assets_details_status_text">
                {maintainance.title}
              </p>
            </div>
            <p className="overview-section__assets_details_status_number">
              {parseString(maintainance.value)}
            </p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default AssetsInformation;

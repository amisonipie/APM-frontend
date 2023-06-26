import _ from "lodash";
import React, { Fragment } from "react";
import BuildingIcon from "assets/icons/buildings.svg";
import {
  DashboardCardSuper,
  DashboardToast,
  DashboardTotalCard,
  StateCard,
} from "views/components";
import { Col } from "reactstrap";
import { canDoDirect } from "utility/helper/directPermissions";
import { dashboardViewMedicalNonMedical } from "utility/helper/permissions";
import CustomTabs from "views/components/@custom/Tabs";
import { classificationTabs } from "utility/helper/constants";
import CustomSelect from "views/components/@custom/Select";
import { filterIcon } from "assets/icons/svgIcons";
import { observer } from "mobx-react-lite";

export const SuperAdminContent = observer(({
  data,
  statusCardData,
  cardsData,
  parseString,
  stateCardData,
  sites,
  totalAssetCardData,
  assetsStates,
  isSuperAdmin,
  DBModal,
  onSiteSelect = () => { },
}) => {
  const toastCard = {
    icon: BuildingIcon,
    text: "No. of upcoming out of warranty assets",
    value: _.get(data, "inventory.expiring", 0),
    color: "rgba(244, 165, 94, 0.25)",
  };
  return (
    <>
      <DashboardToast card={toastCard} />

      <Col md="12" sm="12" className="mb-2 mt-3">
        <div className="d-flex flex-row w-100 justify-content-between align-items-center flex-wrap row m-0">
          <Col lg="2" md="2" className="d-none d-md-flex align-items-center">
            <figure
              style={{ color: "#1A355E", fontSize: "15px" }}
              className="custom-primary-btn--icon "
            >
              {filterIcon}
            </figure>
            <span
              style={{ color: "#1A355E", fontSize: "20px", fontWeight: 500 }}
              className="custom-primary-btn--text"
            >
              Filters
            </span>
          </Col>
          <Col lg="10" md="10" className="d-block d-md-flex align-items-center p-0 p-sm-1">
            {isSuperAdmin && (
              <div className="w-350 h-44">
                <CustomSelect
                  // col={true}
                  name="site_id"
                  options={DBModal?.sites.data}
                  SelectFormGroupClasses="mb-0"
                  placeholder="Select Site"
                  isLoading={DBModal?.sites.loading}
                  value={DBModal?.filters?.site_id}
                  customColClasses="mr-0 mr-md-1"
                  handleChange={DBModal?.HandleFilters}
                  optionsCustoms={{ value: "_id", label: "site_name" }}
                />
              </div>
            )}
            {canDoDirect(DBModal?.User, dashboardViewMedicalNonMedical) && (
              <CustomTabs
                tabs={Object.values(classificationTabs).filter(
                  (item) => item.filter,
                )}
                toggle={(e) => DBModal?.HandleFilters({
                  key: "classification_filter",
                  value: e,
                })}
                activeTab={DBModal?.filters?.classification_filter}
                customClasses="mb-1 mr-0 mr-md-1 mt-1"
                DBModal={DBModal}
              />
            )}
          </Col>
        </div>
      </Col>

      <div className="overview-section__all_state">
        <div className="overview-section__cards_state mb-1">
          {stateCardData.map((card, index) => (
            <StateCard
              {...card}
              key={index}
              value={_.get(data, `sites.${card.key}`, 0)}
            />
          ))}

        </div>
        <DashboardTotalCard
          {...totalAssetCardData}
          percentage={parseFloat(_.get(data, "inventory.added", 0)).toFixed(
            2,
          )}
        />
      </div>
      <div
        className={`overview-section__cards_super ${!isSuperAdmin ? "overview-section__cards_super overview-section__cards_super--twoCards" : `${cardsData?.length === 1
          ? "overview-section__cards_super--oneCards"
          : cardsData?.length === 2
            ? "overview-section__cards_super--twoCards"
            : ""
        }`} `}
      >
        {cardsData.map((card, index) => (card.isTotalAssets ? (
          <DashboardTotalCard
            key={index}
            {...card}
            assetsStates={isSuperAdmin ? false : assetsStates}
            parseString={isSuperAdmin ? false : parseString}
            percentage={parseFloat(_.get(data, "inventory.added", 0)).toFixed(
              2,
            )}
          />
        ) : (
          <DashboardCardSuper
            key={index}
            assetsStates={isSuperAdmin ? false : assetsStates}
            parseString={isSuperAdmin ? false : parseString}
            {...card}
          />
        )))}
      </div>
      {/* <div className="overview-section__cards">
        {statusCardData.map((card, index) => (
          <StatusCard
            {...card}
            key={index}
            value={_.get(data, `inventory.status.${card.key}`, "N/A")}
          />
        ))}
      </div> */}
    </>
  );
});

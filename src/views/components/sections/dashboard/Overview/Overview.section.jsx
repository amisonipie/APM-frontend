import _ from "lodash";
import get from "lodash/get";
import { useParams } from "react-router-dom";
import CheckIcon from "assets/icons/check.svg";
import DownForMaintenance from "assets/imgs/downForMaintenance.svg";
import AssetRetired from "assets/imgs/assetRetired.svg";
import { SC } from "utility/helper";
import WarningIcon from "assets/icons/warning.svg";
import CheckMarkGreen from "assets/imgs/checkmarkgreen.svg";
import RetiredIcon from "assets/icons/retired.svg";
import ScienceIcon from "assets/icons/science.svg";
import BuildingIcon from "assets/icons/buildings.svg";
import {
  classification,
  dashboardComparisonID,
  userRole,
} from "utility/config";
import LocationIcon from "assets/icons/location_new.svg";
import HospitalIcon from "assets/icons/hospital_new.svg";
import PrimaryButton from "views/components/PrimaryButton";
import Loader from "views/components/@vuexy/spinner/Loading-spinner";
import React, {
  Fragment, useEffect, useMemo, useState,
} from "react";
import ImportAndCompare from "./ImportAndCompare";
import AssetsInformation from "./AssetsInformation";
import { SuperAdminContent } from "./SuperAdminContent";
import {
  inventoryAnalytics,
} from "utility/helper/endpoints";

import {
  TotalAssets,
  NonMedicalAssets,
  MedicalAssets,
  NewMedicalAssets,
  NewNonMedicalAssets,
  NonMedicalIcon,
  MedicalIcon,
} from "assets/icons";

import "./Overview.styles.scss";
import {
  dashboardViewMedical,
  dashboardViewNonMedical,
  userViewMedical,
  userViewMedicalNonMedical,
  userViewNonMedical,
} from "utility/helper/permissions";
import { canDoDirect } from "utility/helper/directPermissions";
import { DashboardModal } from "models/dashboard";
import { observer } from "mobx-react-lite";

const numFormatter = (num) => {
  if (num > 100000) {
    return Math.abs(num) > 999
      ? `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)}k`
      : Math.sign(num) * Math.abs(num);
  }
  const intlNumberFormat = new Intl.NumberFormat("en-US");
  return intlNumberFormat.format(num);
};

export const Overview = observer(() => {
  const DBModal = React.useMemo(
    () => new DashboardModal({
      getSites: true,
      getAssetStats: true,
      getWOStats: true,
    }),
    [],
  );

  const params = useParams();
  const [current, setCurrent] = useState("Medical");
  const [medicalData, setMedicalData] = useState([]);
  const [nonMedicalData, setNonMedicalData] = useState([]);

  const [genericData, setGenericData] = useState([]);
  const [medicalDays, setMedicalDays] = useState(7);
  const [nonMedicalDays, setNonMedicalDays] = useState(7);
  const [genericDays, setGenericDays] = useState(7);
  const [chartLoading, setChartLoading] = useState(false);
  const [importedData, setImportedData] = useState({});
  const [isCompare, setCompare] = useState(false);

  // const [cardsData, setCardsData] = useState([]);

  // ! commented as we removed the graph
  // useEffect(() => {
  //   if (DBModal.User?.role !== userRole.superAdmin)
  //     getMedicalChartsData(medicalDays, DBModal?.filters?.site_id?.VALUE);
  // }, [medicalDays, DBModal?.filters?.site_id?.VALUE]);
  // useEffect(() => {
  //   if (DBModal.User?.role !== userRole.superAdmin)
  //     getGenericChartsData(genericDays, DBModal?.filters?.site_id?.VALUE);
  // }, [genericDays, DBModal?.filters?.site_id?.VALUE]);
  // useEffect(() => {
  //   if (DBModal.User?.role !== userRole.superAdmin)
  //     getNonMedicalChartsData(nonMedicalDays, DBModal?.filters?.site_id?.VALUE);
  // }, [nonMedicalDays, DBModal?.filters?.site_id?.VALUE]);

  const getMedicalChartsData = async (days, site_id = "") => {
    setChartLoading(true);
    const medicalDataRes = await SC.getCall({
      url: inventoryAnalytics,
      params: { type: "medical", days, site_id },
    });
    setMedicalData(medicalDataRes?.data);
    setChartLoading(false);
  };

  const getNonMedicalChartsData = async (days, site_id = "") => {
    setChartLoading(true);
    const nonMedicalRes = await SC.getCall({
      url: inventoryAnalytics,
      params: { type: "nonmedical", days, site_id },
    });
    setNonMedicalData(nonMedicalRes?.data);
    setChartLoading(false);
  };

  const getGenericChartsData = async (days, site_id = "") => {
    setChartLoading(true);
    const genericRes = await SC.getCall({
      url: inventoryAnalytics,
      params: { type: "generic", days, site_id },
    });
    setGenericData(genericRes?.data);
    setChartLoading(false);
  };

  // constants

  const isSuperAdmin = useMemo(
    () => DBModal?.User?.role === "super_admin",
    [DBModal?.User?.role],
  );
  // isOrganizationAdmin
  const isOrganizationAdmin = useMemo(
    () => DBModal?.User?.role === userRole.organizationAdmin,
    [DBModal?.User?.role],
  );

  // Getter for isStaffWithMedicalNonMedicalPermissions
  const isStaffWithMedicalNonMedicalPermissions = useMemo(
    () => (DBModal?.User?.role === userRole.staff && DBModal?.User?.field === classification.medical && canDoDirect(DBModal?.User, userViewMedicalNonMedical)),
    [DBModal?.User?.role, DBModal?.User?.field],
  );

  const isSiteAdmin = useMemo(
    () => (DBModal?.User?.role === userRole.siteAdmin),
    [DBModal?.User?.role, DBModal?.User?.field],
  );

  const isMedical = () => isSuperAdmin || isOrganizationAdmin || (isSiteAdmin && canDoDirect(DBModal?.User, [userViewMedicalNonMedical, userViewMedical])) || isStaffWithMedicalNonMedicalPermissions || getUserField === classification.medical;

  const isNonMedical = () => isSuperAdmin || isOrganizationAdmin || (isSiteAdmin && canDoDirect(DBModal?.User, [userViewMedicalNonMedical, userViewNonMedical])) || isStaffWithMedicalNonMedicalPermissions || getUserField === classification.nonMedical;

  const isMedicalNonMedical = () => isSuperAdmin || isOrganizationAdmin || (isSiteAdmin && canDoDirect(DBModal?.User, userViewMedicalNonMedical)) || isStaffWithMedicalNonMedicalPermissions;

  // alert(JSON.stringify(DBModal?.User?.direct_permission));

  // Getter for User Field i.e, Medical/Non-medical
  const getUserField = useMemo(() => DBModal.User?.field ?? null, [DBModal?.User?.field]);

  // CDM for setting current tab for medical and non-medical
  useEffect(() => {
    if (DBModal.User?.field === classification.nonMedical) setCurrent("Non-Medical/Generic");
  }, [DBModal?.User?.field]);

  useEffect(() => {
    if (DBModal.User?.role === userRole.superAdmin || DBModal.User?.role === userRole.organizationAdmin) setCurrent("Medical");
  }, [DBModal?.User?.role]);

  const isDataAvailable = Object.keys(DBModal.assets.data || {})?.length;

  const statusCardData = [
    {
      icon: CheckIcon,
      text: "Working",
      color: "#1A8451",
      key: "WORKING",
    },
    {
      icon: WarningIcon,
      text: "Under Maintenance",
      color: "#C37E21",
      key: "NOT_WORKING",
    },
    {
      icon: RetiredIcon,
      text: "Retired",
      color: "#363849",
      key: "RETIRED",
    },
  ];

  const stateCardData = [
    {
      icon: LocationIcon,
      text: "Total Sites",
      color: "rgba(44, 53, 124, 0.1)",
      key: "TOTAL",
    },
    {
      icon: HospitalIcon,
      text: "Total Hospitals",
      color: "rgba(202, 189, 255, 0.25)",
      key: "HOSPITAL",
    },
    {
      icon: ScienceIcon,
      text: "Total Labs",
      color: "rgba(87, 239, 166, 0.25)",
      key: "LAB",
    },
    {
      icon: BuildingIcon,
      text: "Total PHC’s",
      color: "rgba(244, 165, 94, 0.25)",
      key: "PHC",
    },
  ];

  // Main Cards Data
  // ! TOTAL Assets
  // {
  //   heading: "Total Assets",
  //   value: numFormatter(DBModal.assets.data?.inventory?.totalStats?.TOTAL),
  //   icon: <TotalAssets />,
  //   isTotalAssets: true,
  //   key: "TOTAL",
  //   // added isVisible according to role
  //   isVisible: isMedicalNonMedical(),

  // },
  // ! TOTAL Assets
  const totalAssetCardData = {
    heading: "Total Assets",
    value: numFormatter(DBModal.assets.data?.inventory?.totalStats?.TOTAL),
    icon: <TotalAssets />,
    isTotalAssets: true,
    key: "TOTAL",
    // added isVisible according to role
    isVisible: isMedicalNonMedical(),
  };
  const isSuperAdminCardsData = [
    {
      heading: "Medical Assets",
      classification: classification.medical,
      value: numFormatter(DBModal.assets.data?.inventory?.totalStats?.MEDICAL),
      icon: isSuperAdmin ? <MedicalIcon /> : <MedicalAssets />,
      data: _.get(DBModal.assets.data, "inventory.type.medicalStats", 0),
      // added isVisible according to role
      isVisible: isMedical(),
    },
    {
      heading: isSuperAdmin
        ? "Non-Medical Assets"
        : "Non-Medical/Generic Assets",
      classification: classification.nonMedical,
      value: numFormatter(
        DBModal.assets.data?.inventory?.totalStats?.NONMEDICAL_GENERIC,
      ),
      icon: isSuperAdmin ? <NonMedicalIcon /> : <NonMedicalAssets />,
      data: _.mergeWith(
        {},
        _.get(DBModal.assets.data, "inventory.type.nonmedicalStats", {}),
        _.get(DBModal.assets.data, "inventory.type.genericStats", {}),
        (objValue, srcValue) => (_.isNumber(objValue) ? objValue + srcValue : srcValue),
      ),
      // added isVisible according to role
      isVisible: isNonMedical(),
    },
  ];
  const staffMedical = DBModal.User?.role === "staff" && getUserField !== "nonmedical";

  let cardsData = [];
  if (getUserField === "nonmedical") {
    cardsData.push(isSuperAdminCardsData[1]);
  } else if (DBModal.User?.role === "staff") {
    cardsData = isSuperAdminCardsData;
  } else {
    cardsData.push(isSuperAdminCardsData[0]);
  }
  let tabs = [
    {
      Icon: NewMedicalAssets,
      title: "Medical",
      classification: classification.medical,
      onClick: () => setCurrent("Medical"),
      // Added isVisible prop id user has acces to check that tab
      isVisible: isMedical(),
    },
    {
      Icon: NewNonMedicalAssets,
      classification: classification.nonMedical,
      title: "Non-Medical/Generic",
      onClick: () => setCurrent("Non-Medical/Generic"),
      isVisible: isNonMedical(),
    },
  ];

  // UPDATING DASHBOARD GRAPH TABS ON THE BASES OF TYPE PERMISSIONS
  if (canDoDirect(DBModal?.User, dashboardViewMedical)) {
    // UPDATING TYPE CARDS
    cardsData = cardsData.filter(
      (item) => item.classification === classification.medical,
    );

    // UPDATING GRAPH TABS
    tabs = tabs.filter(
      (item) => item.classification === classification.medical,
    );
  }
  if (canDoDirect(DBModal?.User, dashboardViewNonMedical)) {
    // UPDATING TYPE CARDS
    cardsData = cardsData.filter(
      (item) => item.classification === classification.nonMedical,
    );

    // UPDATING GRAPH TABS
    tabs = tabs.filter(
      (item) => item.classification === classification.nonMedical,
    );
  }
  // added helper function for isvisible card class identification
  const getIsVisibleCount = (dataList) => {
    const filteredDataList = dataList?.filter(({ isVisible = true }) => { if (isVisible) return isVisible; });
    return filteredDataList.length;
  };
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

  const assetsStates = useMemo(
    () => getStatus(
      get(
        DBModal?.workOrderStats?.data,
        "workorder.inventory_status",
        {},
      ),
    ),
    [DBModal?.workOrderStats?.data],
  );
  const parseString = (value) => {
    if (String(value).length === 1 && parseInt(value) !== 0) {
      return `0${value}`;
    }

    return value;
  };
  return (
    <div className="overview-section ">
      {/* {!isSuperAdmin && (
        <CustomSelect
          sm="4"
          col={true}
          name="site_id"
          options={DBModal.sites.data}
          placeholder="Select Site"
          isLoading={DBModal?.sites.loading}
          value={DBModal?.sites.DBModal}
          customColClasses="p-0 mb-2"
          handleChange={DBModal.HandleFilters}
          optionsCustoms={{ value: "_id", label: "site_name" }}
        />
      )} */}
      {isDataAvailable ? (
        <>
          {isSuperAdmin || staffMedical ? (
            <>
              <SuperAdminContent
                data={DBModal.assets.data}
                statusCardData={statusCardData}
                cardsData={isSuperAdminCardsData}
                stateCardData={stateCardData}
                totalAssetCardData={totalAssetCardData}
                DBModal={DBModal}
                isSuperAdmin={isSuperAdmin}
              />

              {params?.comparisonID
                && params?.comparisonID === dashboardComparisonID && (
                <PrimaryButton
                  text={isCompare ? "Cancel Comparison" : "Compare Data?"}
                  onClick={() => setCompare(!isCompare)}
                  customClasses="mb-2"
                />
              )}
              {isCompare && (
                <ImportAndCompare
                  data={DBModal.imported.data}
                  statusCardData={statusCardData}
                  cardsData={cardsData}
                  stateCardData={stateCardData}
                  getDashboardData={DBModal.GetAssetsStats}
                />
              )}
            </>
          ) : (
            <>
              <SuperAdminContent
                data={DBModal.assets.data}
                statusCardData={statusCardData}
                cardsData={cardsData}
                parseString={parseString}
                assetsStates={assetsStates}
                stateCardData={stateCardData}
                totalAssetCardData={totalAssetCardData}
                DBModal={DBModal}
                isSuperAdmin={isSuperAdmin}
              />
              {/* <div
                className={`overview-section__cards ${getIsVisibleCount(cardsData) === 1
                  ? "overview-section__cards--oneCards"
                  : getIsVisibleCount(cardsData) === 2
                    ? "overview-section__cards--twoCards"
                    : ""
                  }  mb-2`}
              >
                {cardsData.map((card, index) => (
                  <DashboardCard key={index} {...card} />
                ))}
              </div>
              <div className="overview-section__tabs mb-2">
                <SubTabs tabs={tabs} current={current} />

                {current === "Medical" && (
                  <Medical
                    data={DBModal.assets.data?.inventory?.type?.medicalStats}
                    chartData={medicalData}
                    days={medicalDays}
                    setDays={setMedicalDays}
                    loading={chartLoading}
                  />
                )}

                {current === "Non-Medical/Generic" && (
                  <NonMedical
                    data={{
                      nonmedicalStats:
                        DBModal.assets.data?.inventory?.type?.nonmedicalStats,
                      genericStats:
                        DBModal.assets.data?.inventory?.type?.genericStats,
                    }}
                    nonMedicalChartData={nonMedicalData}
                    genericChartData={genericData}
                    nonMedicaldays={nonMedicalDays}
                    setNonMedicalDays={setNonMedicalDays}
                    genericDays={genericDays}
                    setGenericDays={setGenericDays}
                    loading={chartLoading}
                  />
                )}
              </div> */}
            </>
          )}
          <AssetsInformation isSuperAdmin={isSuperAdmin} staffMedical={staffMedical} DBModal={DBModal} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
});

import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { store } from "redux/storeConfig/store";
import { userRole } from "utility/config";
import { errorHandler, SC } from "utility/helper";
import { classificationTabs, JDIO, listIO } from "utility/helper/constants";
import { canDoDirect } from "utility/helper/directPermissions";
import {
  allSites,
  getDashboardOverview,
  getDashboardWorkorderOverview,
} from "utility/helper/endpoints";
import { dashboardViewMedicalNonMedical } from "utility/helper/permissions";

export class DashboardModal {
  sites = listIO;

  assets = JDIO;

  imported = JDIO;

  workOrderStats = JDIO;

  filters = {
    site_id: null,
    classification_filter: classificationTabs.MEDICALNONMEDICAL.tabId,
  };

  constructor(props) {
    // CALL GET SITES IF REQUESTED FROM COMPONENT
    if (props?.getSites) this.GetSites();
    if (props?.getAssetStats) this.GetAssetsStats();
    if (props?.getWOStats) this.GetWOStats();

    makeAutoObservable(this);
  }

  // GET USER FROM REDUX
  get User() {
    return store?.getState()?.auth?.login?.data || null;
  }

  // HELPERS

  // HANDLE FILTERS CHANGE
  HandleFilters = (props) => {
    this.filters[props.key] = props.value;

    // CALL GET_ASSETS_STATS IF SITE CHANGE AND USER IS NOT SUPER_ADMIN
    if (props.key === "site_id" && this?.User?.role !== userRole.superAdmin) { this.GetAssetsStats(); }

    // CALL GET_WO_STATS
    this.GetWOStats();
  };

  // GETTING USER FROM REDUX

  // GETTING SITES
  GetSites = async () => {
    try {
      const response = await SC.getCall({
        url: allSites,
      });
      const data = response?.data || [];
      this.UpdateSites(data);
    } catch (error) {
      this.UpdateSites(false);
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  // UPDATING SITES FIELD AFTER RESPONSE
  UpdateSites = (data) => {
    this.sites.loading = false;
    this.sites.data = data || listIO.data;
  };

  // GET ASSETS STATS FOR OVERVIEW SECTION
  GetAssetsStats = async (props) => {
    try {
      const response = await SC.getCall({
        url: getDashboardOverview,
        params: {
          site_id: props?.site_id?.VALUE || this.filters.site_id?.VALUE,
        },
      });
      const data = response?.data || {};
      if (props?.isImport) {
        this.UpdateImportedStats(data);
      } else {
        this.UpdateAssetsSites(data);
      }
    } catch (error) {
      this.UpdateAssetsSites(false);
      this.UpdateImportedStats(false);
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  // UPDATING ASSETS STATS AFTER RESPONSE
  UpdateAssetsSites = (data) => {
    this.assets.loading = false;
    this.assets.data = data || JDIO.data;
  };

  // UPDATING IMPORTED STATS AFTER RESPONSE
  UpdateImportedStats = (data) => {
    this.imported.loading = false;
    this.imported.data = data || JDIO.data;
  };

  // GET WORKORDERS STATS FOR OVERVIEW SECTION
  GetWOStats = async (props) => {
    let params = {
      site_id: props?.site_id?.VALUE || this.filters.site_id?.VALUE,
    };

    // ADDING CLASSIFICATION FILTER TO GET_WO_STATS IF USER HAVE CLASSIFICATION FILTER ACCESS
    if (canDoDirect(this.User, dashboardViewMedicalNonMedical)) {
      params = {
        ...params,
        classification_filter:
          props?.classification_filter || this.filters.classification_filter,
      };
    }

    try {
      const response = await SC.getCall({
        url: getDashboardWorkorderOverview,
        params,
      });
      const data = response?.data || {};
      this.UpdateWO(data);
    } catch (error) {
      this.UpdateWO(false);
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  };

  // UPDATING WORKORDERS STATS AFTER RESPONSE
  UpdateWO = (data) => {
    this.workOrderStats.loading = false;
    this.workOrderStats.data = data || JDIO.data;
  };
}

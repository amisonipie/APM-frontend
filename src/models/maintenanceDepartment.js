import React from "react";
import { toast } from "react-toastify";
import { makeAutoObservable, autorun } from "mobx";
import { store } from "redux/storeConfig/store";
import { VF } from "utility/securePass/validatePassword";
import { arrayHead, errorHandler, SC } from "utility/helper";
import CardBadge from "views/components/workOrders/CardView/Header/CardBadge";
import { getOptionObject, getSelectOptions, TR } from "utility/transformers";
import {
  editConfirmation,
  toggleGetData,
} from "redux/actions/renderList/renderListAction";
import { commonDrawer } from "redux/actions/drawer/drawerActions";
import {
  createMaintenanceDepartment,
  getMaintenanceDepartment,
  getMaintenanceDepartmentsList,
  sitesList,
  updateMaintenanceDepartment,
} from "utility/helper/endpoints";

import { userRole } from "utility/config";
import { debounce } from "lodash";
import UserModel from "./user";

export class MaintenanceDepartmentModel {
  listingData = {
    loading: true,
    data: [],
    dataTime: Date.now(),
  };

  constructor(props) {
    this.idToUpdate = props?.id?.id;
    this.rowName = props?.id?.name;
    this.state = constants.IO;
    this.submitLoading = false;
    this.isValidationError = false;
    this.validation = constants.FVIO;
    this.columns = constants.listColumns;
    this.userModel = new UserModel();
    this.reLoading = false;
    this.selectedSite = null;
    this.labs = {
      loading: false,
      data: [],
    };
    // this.listingData = {
    //   loading: true,
    //   data: [],
    // };
    this.pagination = {
      page: 1,
      per_page: 10,
    };

    if (props?.callSites) this.getSites();
    if (props?.id) this.getData();
    makeAutoObservable(this);
  }

  // Computed props
  get canSelectSite() {
    return (
      this.userModel.isSuperAdmin
      || this.userModel.user?.role === userRole.organizationAdmin
    );
  }

  // Helpers
  searchSites = debounce((e) => {
    this.getSites({ keyword: e });
  }, 1000);

  filterListingData = (e) => {
    this.selectedSite = e;
    this.getListingData({ site_ids: e });
  };

  // Requestors
  getSites = async (props) => {
    this.labs.loading = true;
    try {
      const response = await SC.getCall({
        url: sitesList,
        params: {
          // page: 1,
          // per_page: 10,
          // isPagination: 1,
          // keyword: props?.keyword || "",
        },
      });
      const data = getSelectOptions(response.data, {
        value: "_id",
        label: "site_name",
      });
      this.labs = { loading: false, data };
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.labs.loading = false;
      if (errorMessage) toast.error(errorMessage);
    }
  };

  getData = async () => {
    try {
      const response = await SC.getCall({
        url: `${getMaintenanceDepartment}/${this.idToUpdate}`,
      });
      const { data } = response;
      this.state = {
        name: data?.name,
        site_id: getOptionObject(arrayHead(data?.labs), "_id", "site_name"),
        loading: false,
      };
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
      this.state.loading = false;
    }
  };

  getListingData = async (props) => {
    this.pagination.page = props?.page || this.pagination.page;
    this.pagination.per_page = props?.per_page || this.pagination.per_page;
    const params = {
      isPagination: 1,
      page: this.pagination.page,
      per_page: this.pagination.per_page,
      site_ids:
        props?.site_ids?.length > 0
          ? props?.site_ids?.map((item) => item?._id)
          : undefined,
    };
    try {
      const response = await SC.getCall({
        url: getMaintenanceDepartmentsList,
        params,
      });

      Object.assign(this.listingData, {
        ...response?.data,
        loading: false,
        data: response?.data?.data,
        dataTime: Date.now(),
      });

      // this.listingData.loading = false

      this.reLoading = false;
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
      this.reLoading = false;
    }
  };

  // Handlers
  handleChange = ({ key, value }) => {
    this.state[key] = value;
    let temp = this.state;
    this.handleValidationOnChange({ key, value });
    if(this.idToUpdate){
      if(temp["name"] === this.rowName) {
        store.dispatch(editConfirmation(false));
      }else{
        store.dispatch(editConfirmation(true));
      }
    }else{
     if (temp["name"] || temp["site_id"]) {
        store.dispatch(editConfirmation(true));
    } else {
      store.dispatch(editConfirmation(false));
     }
   }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = createMaintenanceDepartment;
    let responseMessage = "Maintenance Department created Successfully!";

    let data = TR.dataToSubmit(this.state);
    delete data.loading;
    // VO === Validation Object
    let VO = {};
    const IVO = constants.FVIO;
    // if (!this.canSelectSite) {
    //   delete IVO.site_id;
    //   delete data.site_id;
    // }
    // validating All required fields
    Object.keys(IVO).map((item) => {
      const response = VF.validateFields({
        value: data[item],
        not: true,
      });
      if (response?.length > 0) {
        VO = {
          ...VO,
          [item]: response,
        };
      }
    });
    if (Object.keys(VO).length) {
      // set validation
      this.validation = VO;
      this.isValidationError = true;
    } else {
      this.submitLoading = true;
      this.isValidationError = false;
      if (this.idToUpdate) {
        endpoint = updateMaintenanceDepartment;
        data = {
          ...data,
          id: this.idToUpdate,
        };
        responseMessage = "Maintenance Department Updated Successfully!";
      }
      try {
        await SC.postCall({
          url: endpoint,
          data,
        });
        this.submitLoading = false;
        toast.success(responseMessage);
        autorun(() => {});
        this.listingData.loading = true;
        store.dispatch(commonDrawer({ isOpen: false }));
        this.getListingData();
        store.dispatch(toggleGetData(false));
      } catch (error) {
        const errorMessage = errorHandler(error);
        this.submitLoading = false;
        if (errorMessage) toast.error(errorMessage);
      }
    }
  };

  handleValidationOnChange = ({ key, value }) => {
    const response = VF.validateFields({
      value,
      not: true,
    });
    this.validation[key] = response;
  };

  getValidationObject = (key) => ({
    isValidationError: this.isValidationError,
    error: this.validation[key],
  });
}

export const constants = {
  FVIO: {
    name: [],
    site_id: [],
  },
  IO: {
    name: "",
    site_id: null,
    loading: false,
  },

  listColumns: [
    {
      name: "Department name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Site",
      selector: "lab",
      sortable: true,
      cell: (row) => row?.labs?.map((item, index) => (
        <CardBadge key={index} text={item?.site_name} />
      )),
    },
  ],
};

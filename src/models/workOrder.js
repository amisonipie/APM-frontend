import React from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { makeAutoObservable } from "mobx";
import { TR, splitData, sortArray } from "utility/transformers";
import { store } from "redux/storeConfig/store";
import { history } from "utility/helper/history";
import { errorHandler, SC } from "utility/helper";
import withReactContent from "sweetalert2-react-content";
import { VF } from "utility/securePass/validatePassword";

import moment from "moment";
import { getColor } from "views/components/generalHelper";

import { showControls } from "views/components/workOrders/showControls";
import {
  exportWorkOrderPDF,
  workOrderDetail,
  getDepartmentsList,
  getEquipmentsList,
  getInventoryById,
  getManufacturersList,
  getRegionsList,
  inventoryFormOptions,
  sitesList,
  workOrderCreate,
} from "utility/helper/endpoints";
import { getAssetInformation, getWOActionButtons } from "views/components/workOrders/data";
import { toggleTechnicianForm } from "redux/actions/workOrder";

import { toggleSideBarRouteBase, commonDrawer } from "redux/actions/drawer/drawerActions";
import {
  toggleGetData,
  getListingData,
  filterListingData,
  editConfirmation,
} from "redux/actions/renderList/renderListAction";
import CheckCircleIcon from "assets/img/png/check-circle-icon.png";
import { cloneDeep, debounce } from "lodash";
import { modWorkOrders } from "utility/helper/apmModules";
import { codeword, inventoryStatus } from "utility/config";

const MySwal = withReactContent(Swal);

export const IOFilter = {
  equipment_id: [],
  manufacturer: [],
  model: "",
  class: [],
  site_department_id: [],
  startDateFrom: null,
  startDateTo: null,
  site_ids: [],
  region_ids: [],
};
export class WorkOrderModal {
  // FORM FIELDS INITIAL OBJECT
  IO = {
    inventory: "",
    filteredInventory: null,
    description: "",
    department: "",
    uploadedFiles: [],
    isPropsData: false,
  };

  // VALIDATION INITIAL OBJECT
  FVIO = {
    inventory: [],
    description: [],
    department: [],
  };

  // INVENTORY INITIAL OBJECT
  IIO = {
    data: null,
    loading: false,
    error: false,
  };

  // Filter INITIAL OBJECT
  // WorkOrderDetail
  LSIO = { flag: 0, on: false };

  rejectionIO = {
    flag: 0,
    comment: "",
    endPoint: "",
    onRejection: false,
  };

  FVIOO = {
    comment: [],
  };

  constructor(props) {
    // convert useParams hook
    this.params = {
      workOrderId: props?.location?.pathname?.split("/")[props?.location?.pathname?.split("/").length - 1],
    };

    this.isControls = false;
    this.isOpen = true;
    this.loading = false;
    this.state = { ...this.IO };
    this.IOFilterState = this.IOFilter;
    this.inventory = this.IIO;
    this.validation = this.FVIO;
    this.isValidationError = false;
    this.user = null;
    this.reduxSideBarFilterFields = store.getState().renderList?.filterSideBarRight;
    this.equipments = { data: [] };
    this.equipmentsLoading = false;
    this.manufacturersLoading = false;
    this.manufacturers = { data: [] };
    this.siteDepartmentLoading = false;
    this.siteDepartment = { data: [] };
    this.options = { data: {}, loading: true };
    this.labs = { data: [], loading: true };
    this.regions = { data: [], loading: true };

    // workOderDetail=====================>
    this.isRating = false;
    this.workOrderDetailIsValidationError = false;
    // work workOderDetailState initial object
    this.workOderDetailState = { data: {} };

    this.remarks = [];
    this.workOderDetailLoading = true;
    this.loadingSubmission = this.LSIO;
    this.formModal = false;
    this.rejection = this.rejectionIO;
    this.workOderDetailValidation = this.FVIOO;
    this.userWorkDetail = store.getState()?.auth?.login?.data;
    this.toggleDrawer = store.getState()?.renderList?.toggleDrawer;
    this.isTechnicianForm = store.getState()?.workOrder?.workOrder?.isTechnicianForm;
    this.workOderDetailsValidationError = false;
    this.moreFilters = false;
    store.subscribe(() => {
      // When state will be updated(in our case, when items will be fetched),
      // we will update local component state and force component to rerender
      // with new data.
      this.user = store.getState().auth.login.data;
      this.userWorkDetail = store.getState()?.auth?.login?.data;
      this.toggleDrawer = store.getState()?.renderList?.toggleDrawer;
      this.reduxSideBarFilterFields = store.getState().renderList?.filterSideBarRight;
      this.isTechnicianForm = store.getState()?.workOrder?.workOrder?.isTechnicianForm;
      this.initOtherFields();
    });

    this.init(props);
    this.getUser();
    this.getReduxSideBarFilterFields();
    this.customUseEffect(props);

    makeAutoObservable(this);
  }

  // ==================================================> WorkOrderDetail

  // getWorkorder in usEffect
  subscribeToGetWorkOrder = () => {
    this.getWorkOrder();
    if (!this.toggleDrawer) this.formModal = false;
  };

  // getToggleTechnisianForm function in useEffect
  subscribeToToggleTechnicianForm = () => {
    if (this.inProgress) {
      store.dispatch(toggleTechnicianForm(true));
    }
    store.dispatch(toggleTechnicianForm(false));
  };

  subscribeForShowControls = () => {
    if (!this?.workOderDetailState?.loading) {
      this.isControls = showControls({
        user: this.userWorkDetail,
        currentStep: this.current?.step,
        woClassification: this.current?.classification,
        isRequester: this.current?.requester,
        workOrder: this?.workOderDetailState?.data,
        siteModel: this.current?.site_model,
      });
    }
  };

  getMoreFilters() {
    this.moreFilters = !this.moreFilters;
  }

  // convert usParams
  getWorkOrderId = (props) => {
    if (props?.location) {
      const orderId = props.location.pathname.split("/")[props.location.pathname.split("/").length - 1];

      this.params = { workOrderId: orderId };
    }
  };

  customUseEffect(props) {
    //! api call two time
    // if (props?.location) {
    //   this.getWorkOrder();
    // }
    // if (!this.toggleDrawer) this.formModal = false;
    //! api call two time
    this.initOtherFields();
  }

  handleModel = ({ flag, endPoint, onRejection }) => {
    this.formModal = true;
    this.rejection = {
      ...this.rejection,
      flag,
      endPoint,
      onRejection,
    };
  };

  handleRejection = ({ key, value }) => {
    this.rejection = { ...this.rejection, [key]: value };
    this.ValidationOnChange({ key, value });
  };

  ValidationOnChange = ({ key, value }) => {
    const response = VF.validateFields({
      value,
      not: true,
    });
    this.workOderDetailValidation = {
      ...this.workOderDetailValidation,
      [key]: response,
    };
  };

  handleDownload = async (flag) => {
    this.loadingSubmission = {
      flag,
      on: true,
    };

    try {
      await SC.downloadCall({
        url: `/${exportWorkOrderPDF}/${this.params.workOrderId}`,
        fileName: `workorder_export_${splitData(moment(new Date()).format("DD MM YYYY hh:mm:ss"), " ", "_")}`,
        fileExtension: ".pdf",
        params: {
          isDownload: flag === 1 ? 1 : 0,
        },
      });
      this.loadingSubmission = this.LSIO;
    } catch (err) {
      this.loadingSubmission = this.LSIO;
    }
  };

  closeModal = () => {
    this.formModal = false;
    this.rejection = this.rejectionIO;
  };

  getWorkOrder = async () => {
    try {
      const response = await SC.getCall({
        url: `${workOrderDetail}/${this.params.workOrderId}`,
      });
      this.workOderDetailState = { data: response?.data || {} };

      const remarksRes = response?.data?.remarks;
      const sortedRemarks = sortArray(remarksRes);
      this.remarks = sortedRemarks;
      this.workOderDetailLoading = false;
    } catch (error) {
      // const errorMessage = errorHandler(error);
      // if (errorMessage) toast.error(errorMessage);
      this.workOderDetailLoading = false;
    }
    this.initOtherFields();
  };

  statusUpdate = (status) => {
    this.formModal = status;
  };

  workOderDetailsHandleSubmit = ({ flag, comment, endPoint, noValidate }) => {
    const data = {
      workOrderId: this.workOderDetailState?.data?._id,
      flag,
      comment: comment?.trim(),
    };
    let VO = {};
    // validating All required fields
    Object.keys(this.FVIOO).map((item) => {
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
    if (!noValidate && Object.keys(VO).length) {
      // set validation
      this.workOderDetailValidation = VO;
      this.workOderDetailsValidationError = true;
    } else {
      this.loadingSubmission = {
        flag,
        on: true,
      };
      SC.postCall({
        url: endPoint,
        data,
      }).then((response) => {
        const responseCode = response.data.code;
        const responseMessage = response.data.message;
        if (responseCode === 200) {
          store.dispatch(toggleGetData({ isToggle: false }));
          this.getWorkOrder();
          this.formModal = false;
          this.loadingSubmission = this.LSIO;
          this.rejection = this.rejectionIO;
          toast.success(responseMessage);
        } else {
          toast.error(responseMessage);
          this.formModal = false;
          this.loadingSubmission = this.LSIO;
        }
      });
    }
  };

  toggleRating = () => {
    this.isRating = !this.isRating;
  };

  getValidationObject = (key) => ({
    isValidationError: this.isValidationError,
    error: this.validation[key],
  });

  // ********************************************************finish
  getReduxSideBarFilterFields() {
    this.reduxSideBarFilterFields = store.getState().renderList?.filterSideBarRight;
  }

  get totalSelectedFilters() {
    return Object.values(this.IOFilterState)
      .map((item) => (item instanceof Array ? item.length > 0 : item instanceof String ? true : item instanceof Date))
      ?.filter((item) => item)?.length;
  }

  // Redux Getters
  getUser() {
    this.user = store.getState().auth.login.data;
  }
  // EVENT HANDLERS

  // functions
  toggle = () => (this.isOpen = !this.isOpen);

  handleChange = ({ key, value }) => {
    if (key === "inventory") {
      if (value === "") {
        this.inventory = { ...this.IIO };
        this.validation.inventory = this.validation.inventory.filter((item) => !item?.notFound);
      } else {
        this.findInventory(value);
      }
    }
    this.state[key] = value;
    this.handleValidationOnChange({ key, value });
    if (
      this.state["department"] !== "" ||
      this.state["inventory"] !== "" ||
      !["", "\n"].includes(this.state["description"].replace(/<[^>]+>/g, ""))
    ) {
      store.dispatch(editConfirmation(true));
    } else {
      store.dispatch(editConfirmation(false));
    }
  };

  handleValidationOnChange = ({ key, value }) => {
    const response = VF.validateFields({
      value,
      not: true,
    });
    this.validation[key] = response;
  };

  getInventory = async (keyword) => {
    this.inventory.loading = true;
    try {
      const response = await SC.getCall({
        url: `${getInventoryById}/${keyword}`,
      });
      const inventoriesData = response?.data || this.inventory.data;

      this.inventory = { ...this.IIO, loading: false, data: inventoriesData };
      this.validation.inventory = this.validation.inventory.filter((item) => !item?.notFound);
    } catch (err) {
      if (this.state.inventory) {
        this.isValidationError = true;
        this.validation.inventory = [
          ...this?.validation?.inventory,
          {
            validation: "oneOf",
            arguments: ["undefined", "null", null, ""],
            inverted: true,
            message: "Inventory not found!",
            notFound: true,
          },
        ];
      }
      this.inventory = { ...this.IIO, error: true };
    }
  };

  handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const dataToSubmit = TR.dataToSubmit(this.state);
    // VO === Validation Object
    let VO = {};
    // validating All required fields
    Object.keys(this.FVIO).map((item) => {
      const response = VF.validateFields({
        value: dataToSubmit[item],
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
      this.loading = true;
      this.isValidationError = true;
      const data = {
        classification: this?.state?.inventory?.equipment?.type,
        type: "corrective",
        inventoryId: this?.inventory?.data?._id,
        description: dataToSubmit.description,
        department: dataToSubmit.department,
        uploadedFiles: dataToSubmit?.uploadedFiles,
      };
      if (data?.uploadedFiles?.length === 0) {
        delete data.uploadedFiles;
      }
      // this.inventory.status = inventoryStatus.retired // ! QA
      try {
        if (this.inventory?.status === inventoryStatus.retired) {
          toast.error(
            "Asset is Retired and No Longer In Service. Please Contact Maintenance Team to Remove it from Use"
          );
          this.loading = false;
          return;
        }
        const response = await SC.postCall({
          url: workOrderCreate,
          data,
        });
        this.loading = false;
        this.showAlert({
          id: response.data?._id,
          title: "Work Order Created Successfully!",
          confirmButtonText: "View Work Order",
          htmlContent: (
            <p>
              Work Order Number is
              <b>{response.data?.serial}</b>
            </p>
          ),
          success: true,
        });
        store.dispatch(commonDrawer({ isOpen: false }));
        store.dispatch(toggleSideBarRouteBase(false));
        store.dispatch(toggleGetData(false));
        store.dispatch(getListingData());

        toast.success("Work order created successfully!");
      } catch (error) {
        const errorResponse = error?.response?.data?.data;
        const codeWord = errorResponse?.codeword;
        if (codeWord === codeword.WORKORDER_EXIST_24H) {
          this.toggle();
          store.dispatch(commonDrawer({ isOpen: false }));
          this.showAlert({
            id: errorResponse?.workorder_id,
            title: "",
            confirmButtonText: "View Work Order",
            htmlContent: (
              <p>
                Another Work Order was Generated in the Past 24 Hours
                <b>#{errorResponse?.workorder_serial}</b>.
              </p>
            ),
            warning: true,
          });
        } else {
          const errorMessage = errorHandler(error);
          if (errorMessage) toast.error(errorMessage);
        }
      }
      this.loading = false;
    }
  };

  showAlert = (props) =>
    MySwal.fire({
      title: props.title,
      imageUrl: props?.success ? CheckCircleIcon : "",
      icon: props?.warning ? "warning" : "",
      html: props?.htmlContent,
      showCloseButton: true,
      showConfirmButton: true,
      focusConfirm: true,
      buttonsStyling: true,
      confirmButtonText: props.confirmButtonText,
      customClass: {
        confirmButton: "custom-primary-btn solid ",
        container: "workOrder_detail__dialogue",
        title: "workOrder_detail__dialogue--title",
        htmlContainer: "workOrder_detail__dialogue__body",
      },
    }).then((alertRes) => {
      if (alertRes.isConfirmed) {
        store.dispatch(toggleGetData({ isToggle: false }));

        history.push(`/work-orders/list/${props?.id}`);
      }
    });

  init = (props) => {
    if (props?.inventory) {
      this.getInventory(props?.inventory?.inventoryId);
      this.state.inventory = props?.inventory?.inventoryId;
      this.state.isPropsData = true;
    }
    if (this.options.loading) this.getOptions();
    if (this.labs.loading) this.getLabs({});
    if (this.regions.loading) this.getRegions({});

    // get InitialObject value from function
    if (this.params && props?.location) this.getWorkOrderId(props);

    // if (manufacturersLoading) getManufacturers({});
    // if (equipmentsLoading) getEquipments({});
    if (this.reduxSideBarFilterFields[modWorkOrders.id]) {
      this.updateFiltersState();
    }
  };

  findInventory = debounce((e) => this.getInventory(e), 1000);

  findLabs = debounce((e) => this.getLabs({ keyword: e }), 1000);

  // Filter Work Order

  findEquipment = debounce((e) => {
    this.equipmentsLoading = true;
    this.getEquipments({ keyword: e });
  }, 1000);

  findManufacturer = debounce((e) => {
    this.manufacturersLoading = true;
    this.getManufacturers({ keyword: e });
  }, 1000);

  findSiteDepartment = debounce((e) => {
    this.siteDepartmentLoading = true;
    this.getSiteDepartment({ keyword: e });
  }, 1000);

  handleChangeFilter = ({ key, value }) => {
    this.IOFilterState[key] = value;

    const stateToSubmit = cloneDeep({ ...this.IOFilterState });
    let data = TR.dataToSubmit(stateToSubmit);
    data = {
      ...data,
      manufacturer_id: data?.manufacturer,
    };
    delete data.manufacturer;
    delete data.installationDate;
    store.dispatch(
      filterListingData({
        filteredData: data,
        localState: stateToSubmit,
        module: modWorkOrders.id,
        uiTabFilteredData: this.UIFilterState,
      })
    );
    store.dispatch(getListingData());
    store.dispatch(toggleGetData(false));
  };

  resetState = () => {
    this.IOFilterState = this.IOFilter;
    store.dispatch(
      filterListingData({
        filteredData: this.IOFilter,
        localState: this.IOFilter,
        module: modWorkOrders.id,
        uiTabFilteredData: {},
      })
    );
  };

  getEquipments = async ({ keyword }) => {
    try {
      const response = await SC.getCall({
        url: getEquipmentsList,
        params: { isPagination: 1, keyword: keyword || "null" },
      });
      const data = response?.data?.data || [];

      const dataList = [];
      data &&
        data.map((item) => {
          dataList.push({
            LABEL: item?.nameEnglish + (item?.nameArabic ? ` / ${item?.nameArabic}` : ""),
            VALUE: item._id,
          });
        });

      this.equipments = { data: dataList };
      this.equipmentsLoading = false;
    } catch (error) {
      const errorMessage = errorHandler(error);

      this.equipmentsLoading = false;
      if (errorMessage) toast.error(errorMessage);
    }
  };

  getManufacturers = async ({ keyword }) => {
    try {
      const response = await SC.getCall({
        url: getManufacturersList,
        params: { isPagination: 1, keyword: keyword || "null" },
      });
      const data = response?.data?.data || [];
      this.manufacturers = { data };
      this.manufacturersLoading = false;
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.manufacturersLoading = false;
      if (errorMessage) toast.error(errorMessage);
    }
  };

  getSiteDepartment = async ({ keyword }) => {
    try {
      const response = await SC.getCall({
        url: getDepartmentsList,
        params: { isPagination: 1, keyword: keyword || "null" },
      });
      const data = response?.data?.data || [];

      const dataList = [];
      data &&
        data.map((item) => {
          dataList.push({ LABEL: item?.name, VALUE: item._id });
        });

      this.siteDepartment = { data: dataList };
      this.siteDepartmentLoading = false;
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.siteDepartmentLoading = false;
      if (errorMessage) toast.error(errorMessage);
    }
  };

  handleSubmitFilter = async (e) => {
    e.preventDefault();
    const stateToSubmit = cloneDeep({
      ...this.IOFilterState,

      // nextPMDate,
    });

    let data = TR.dataToSubmit(stateToSubmit);
    data = {
      ...data,
      manufacturer_id: data?.manufacturer,
    };
    delete data.manufacturer;
    delete data.installationDate;
    // delete data.region_ids;
    store.dispatch(
      filterListingData({
        filteredData: data,
        localState: stateToSubmit,
        module: modWorkOrders.id,
        uiTabFilteredData: this.UIFilterState,
      })
    );
    store.dispatch(getListingData());
    store.dispatch(toggleGetData(false));
  };

  getOptions = async () => {
    try {
      const response = await SC.getCall({
        url: inventoryFormOptions,
      });
      const data = response?.data || {};
      this.options = { loading: false, data };
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.options = { ...this.options, loading: false };
      if (errorMessage) toast.error(errorMessage);
    }
  };

  getLabs = async ({ keyword }) => {
    try {
      const response = await SC.getCall({
        url: sitesList,
        params: { isPagination: 1, keyword },
      });
      const data = response?.data?.data || [];
      this.labs = { loading: false, data };
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.labs = { ...this.labs, loading: false };
      if (errorMessage) toast.error(errorMessage);
    }
  };

  getRegions = async ({ keyword }) => {
    try {
      const response = await SC.getCall({
        url: getRegionsList,
        params: { isPagination: 1, keyword },
      });
      const data = response?.data?.data || [];
      this.regions = { loading: false, data };
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.regions = { ...this.regions, loading: false };
      if (errorMessage) toast.error(errorMessage);
    }
  };

  updateFiltersState = () => {
    if (this.reduxSideBarFilterFields[modWorkOrders.id]?.localStateFilteredFields) {
      const filteredData = JSON.parse(this.reduxSideBarFilterFields[modWorkOrders.id]?.localStateFilteredFields);

      filteredData.startDateFrom = filteredData?.startDateFrom ? new Date(filteredData?.startDateFrom) : "";
      filteredData.startDateTo = filteredData?.startDateTo ? new Date(filteredData?.startDateTo) : "";

      this.IOFilterState = filteredData;
    }
    if (this.reduxSideBarFilterFields[modWorkOrders.id]?.uiTabFilteredFields) {
      this.UIFilterState = this.reduxSideBarFilterFields[modWorkOrders.id]?.uiTabFilteredFields;
    }
  };

  initOtherFields = () => {
    this.current = {
      step: this.workOderDetailState?.data?.work_order_steps?.currentStep || 1,
      role: this.workOderDetailState?.data?.work_order_steps?.currentRole,
      classification: this.workOderDetailState?.data?.work_order_classification?.classification,
      status: this.workOderDetailState?.data?.status,
      requester: this.workOderDetailState?.data?.creator?._id === this.user?._id,
      site_model: this.workOderDetailState?.data?.site_model,
      user: this.user,
    };

    this.isDisabled = false;
    this.inProgress = this.current?.status === "in_progress";
    this.isRedirected = this.current?.status === "rejected" || this.current?.status === "redirected";
    this.color = getColor(this.current?.status);
    this.assetInfo = getAssetInformation(this.workOderDetailState?.data?.inventory);

    this.allSteps = this.workOderDetailState?.data?.work_order_classification?.steps;

    this.technicianForm = this.workOderDetailState?.data?.work_order_steps?.technician_form;
    this.assetRemarksCols = "col-12";
    this.assetInfoCols = "col-12";
    this.technicianCols = "col-lg-12";
    this.remarksCols = "col-12";

    this.woActionButtons = getWOActionButtons({
      isRedirected: this.isRedirected,
      inProgress: this.inProgress,
      siteModel: this.current?.site_model,
      woClassification: this.current?.classification,
      workOrder: this.workOderDetailState?.data,
      user: this.user,
    });

    if (!this.workOderDetailState?.loading) {
      this.isControls = showControls({
        user: this.user,
        currentStep: this.current?.step,
        woClassification: this.current?.classification,
        isRequester: this.current?.requester,
        workOrder: this.workOderDetailState?.data,
        siteModel: this.current?.site_model,
      });
    }
    this.WorkOrderForm = this.isControls && (this.inProgress || this.isRedirected) && this.isTechnicianForm;
  };
}

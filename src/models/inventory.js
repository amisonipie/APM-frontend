import { toast } from "react-toastify";
import { makeAutoObservable } from "mobx";
import { store } from "redux/storeConfig/store";
import { arrayHead, errorHandler, SC } from "utility/helper";
import { VF } from "utility/securePass/validatePassword";
import {
  classification,
  codeword,
  inventoryStatus,
  site_model,
  types,
  userRole,
} from "utility/config";
import {
  fiveRandomNumbers,
  getFileObj,
  getOptionObject,
  getSelectOptions,
  TR,
} from "utility/transformers";

import {
  editConfirmation,
  editAdditionalConfirmation,
  getListingData,
  showDisacrdConfirmation,
  toggleGetData,
} from "redux/actions/renderList/renderListAction";
import {
  createInventory,
  getAllWorkOrders,
  getDepartmentsList,
  getEquipmentsList,
  getInventory,
  getMaintenanceDepartmentsList,
  getManufacturersList,
  getRegionsList,
  inventoryFormOptions,
  sitesList,
  updateInventory,
} from "utility/helper/endpoints";
import {
  inventoryColumns,
  WoHistoryColumns,
} from "views/components/inventories/data";
import { planningColumns } from "views/components/inventories/planningData";
import { add, debounce } from "lodash";
import { infoIcon, workOrderIcon } from "assets/icons/svgIcons";
import { commonDrawer } from "redux/actions/drawer/drawerActions";

export const IOFilter = {
  equipment_id: [],
  manufacturer_id: [],
  model: "",
  class: [],
  nextPMDate: null,
  installationDateFrom: null,
  installationDateTo: null,
  pmFrequency: [],
  site_ids: [],
  region_ids: [],
};
export class InventoriesModal {
  FVIO = {
    type: [],
    // agent: [],
    model: [],
    site_id: [],
    serialNumber: [],
    equipment_id: [],
    manufacturer_id: [],
    maintenance_department_id: [],
    warrantyStatus: [],
    installationDate: [],
    acquisitionMethod: [],
    currentStatus: [],
    status: [],
  };

  IO = {
    room: "",
    model: "",
    agent: "",
    floor: "",
    sequence: "",
    pmVendor: "",
    building: "",
    pmStartDate: null,
    serialNumber: "",
    purchasePrice: "",
    installationDate: null,
    inventoryId: "",
    type: null,
    class: null,
    site_id: null,
    pmDoneBy: null,
    pmFrequency: null,
    equipment_id: null,
    currentStatus: null,
    status: null,
    warrantyStatus: null,
    manufacturer_id: null,
    acquisitionMethod: null,
    maintenance_department_id: null,
    pmRequired: true,
    fileUpload: [],
  };

  additionalFieldsIO = {
    udiName: "",
    udiCode: "",
    assetType: "",
    ipAddress: "",
    macAddress: "",
    serviceManual: "",
    referenceNumber: "",
    assetDescription: "",
    operationalManual: "",
    purchaseOrderDate: "",
    departmentMoveDate: null,
    purchaseOrderNumber: "",
    locationDescription: "",
    assetPlug: null,
    userTrained: null,
    utilization: null,
    estimatedAge: null,
    assetSeverity: null,
    assetPriority: null,
    categoryNumber: null,
    failureFrequency: null,
    dueForReplacement: null,
    technicalPerformance: null,
    site_department_id: null,
    warranties: [],
  };

  // ========= IMC fields =========
  // purchaseOrderNumber'
  // 'purchaseOrderDate'
  // 'assetType'
  // 'assetDescription'
  // 'assetPriority'
  // 'assetSeverity'
  // 'operationalManual'
  // 'serviceManual'
  // 'userTrained'
  // 'locationDescription'
  // 'assetPlug'
  // 'categoryNumber'
  // ========= IMC fields =========

  conditionalStatesOptions = [
    {
      VALUE: true,
      LABEL: "Yes",
    },
    {
      VALUE: false,
      LABEL: "No",
    },
  ];

  conditionalStatesIO = {
    isOperationalManual: null,
    isServiceManual: null,
  };

  warrantiesIO = {
    warrantyEndDate: "",
    warrantyStartDate: "",
    warrantyCoverage: null,
    id: fiveRandomNumbers(),
  };

  options = {
    inventory: {},
    equipments: [],
    allEquipments: [],
    manufacturers: [],
    loading: true,
  };

  filterOptions = {
    data: {},
    loading: true,
  };

  user = null;

  idToUpdate = "";

  loading = false;

  editMode = false;

  originalState = null;

  printLoading = false;

  sideBarActiveTab = "1";

  isValidationError = false;

  labs = { data: [], loading: true, selected: [] };

  siteDepartments = { data: [], loading: true };

  maintenanceDepartments = { data: [], loading: false };

  PMCMonthlyArray = PMCalenderArray;

  constructor(props) {
    if (props) {
      this.idToUpdate = props?.id;
      this.rowToUpdate = props?.rowList;
      this.isCreate = props?.isCreate;
    }
    this.state = {
      ...this.IO,
      loading: !!this.idToUpdate,
    };

    this.additionalFields = {
      ...this.additionalFieldsIO,
      loading: !!this.idToUpdate,
    };

    this.validation = this.FVIO;
    this.conditionalStates = this.conditionalStatesIO;

    // inventories filter
    this.labsLoading = false;
    this.equipmentsLoading = false;
    this.equipments = { data: [] };
    this.mountedRef = true;
    this.manufacturersLoading = false;
    this.manufacturers = { data: [] };
    this.regionsLoading = false;
    this.regions = { data: [] };
    this.assetRetireConfirmation = false;
    this.assetRetireError = false;

    // add inventories field
    this.inventoriesStatusModal = false;
    this.statusValue = {};
    this.filterData = { data: [], loading: false };
    this.hideCurrentStatus = false;
    this.isRetired = false;

    // this.getManufacturers({});
    // this.getEquipments({});
    // this.getSiteDepartments();

    if (this.user?.role === userRole.superAdmin) this.getRegions({});
    if (props) {
      this.init(props);
    }
    makeAutoObservable(this);
    //! remove so many api call this
    // this.getUser();
    // this.getOptions();
    // this.getLabs({});
    //! remove so many api call this
  }

  init = (props) => {
    this.getOptionsAndFieldsData();
    this.getLabs({});
  };

  get isSuperAdmin() {
    return this.user?.role === userRole.superAdmin;
  }

  get isOrganizationAdmin() {
    return this.user?.role === userRole.organizationAdmin;
  }

  get isMaintenanceFieldDisabled() {
    return (
      (this.isSuperAdmin || this.isOrganizationAdmin)
      && !this.state.site_id?._id
    );
  }

  get IMCModel() {
    return this.state?.site_id?.model === site_model.imc;
  }

  get is3rdPartyVendor() {
    return this.state?.pmDoneBy?.VALUE === "3RD_PARTY_VENDOR";
  }

  get getEQPColumns() {
    return planningColumns(this.options);
  }

  get getInventoryColumns() {
    return inventoryColumns(this.options);
  }

  get getWoHistoryColumns() {
    return WoHistoryColumns;
  }

  get getEndpointWorkOrdersHistoryByInventoryID() {
    return getAllWorkOrders;
  }

  get getSideBarTabs() {
    return sideBarTabs;
  }

  get getFormHeading() {
    return this.idToUpdate
      ? this.state.loading
        ? "Getting title..."
        : this?.state?.equipment_id?.nameEnglish
      : "Create Asset";
  }

  get getModeBtnText() {
    return this.editMode ? "Cancel" : "Edit";
  }

  get getPrintBtnText() {
    return this.printLoading ? "Printing..." : "Print";
  }

  get isDetailView() {
    return !this.editMode && this.idToUpdate;
  }

  get brackets() {
    return {
      annual: "ANNUAL",
      monthly: "MONTHLY",
    };
  }

  get pmMonths() {
    return months;
  }

  // HELPERS=========================
  // SEARCH SITE AFTER COMPLETE INPUT
  searchSites = debounce((e) => {
    this.labs.loading = true;
    this.getLabs({ keyword: e });
  }, 1000);

  // UPDATE CURRENT STATUS IN EDIT MODE
  updateCurrentStatus = (options) => {
    if (!this.idToUpdate) {
      this.state.currentStatus = options?.CURRENT_STATUS.WORKING || this.IO.currentStatus;
    }
  };

  // UPDATE STATUS IN EDIT MODE
  updateStatus = (options) => {
    if (!this.idToUpdate) {
      this.state.status = options?.STATUS?.IN_SERVICE || this.IO.status;
    }
  };

  // HANDLING EDIT MODE
  toggleEditMode = () => {
    this.editMode = !this.editMode;
    this.getMaintenanceDepartments(this.state?.site_id);
    this.getSiteDepartments(this.state?.site_id);

    if (!this.editMode) {
      this.updateFormFields(this.originalState, this.originalFormOptions);
    }
  };

  // MULTIPLE SITES SELECTION
  handleSitesSelection = (selectedSites) => {
    this.labs.selected = selectedSites;
  };

  // PROMISE BASED=========================
  getOptionsAndFieldsData() {
    let promises = [this.getOptions()];
    promises = this.idToUpdate
      ? [...promises, this.getDataByID(this.idToUpdate)]
      : promises;

    Promise.all(promises).then((response) => {
      if (response?.length > 0) {
        this.originalFormOptions = response[0];
        this.updateFormOptions(response[0]);
        this.updateCurrentStatus(response[0]?.inventory);
        this.updateStatus(response[0]?.inventory);
      }
      // calling Update form options fun
      if (response?.length > 1) {
        this.updateFormFields(response[1].data, response[0]);
        // updating original state to use for later use
        this.originalState = response[1].data;
      } // calling Update form fields fun
    });
  }

  // TOGGLE SIDEBAR TABS
  toggleTabs = (e) => {
    this.sideBarActiveTab = e.count;
  };

  // HELPERS

  // GET MONTH DAYS
  getMonthDays = (month, year) => {
    let days = {};
    getAllDaysInMonth(month, year).map((x) => {
      const data = x.toLocaleDateString([], { month: "long", day: "numeric" });
      days = {
        ...days,
        [data]: [],
      };
    });
    return days;
  };

  // Redux Getters
  getUser() {
    this.user = store.getState().auth.login.data;
    this.state.site_id = (this?.user?.lab
        && getOptionObject(this?.user?.lab, "_id", "site_name"))
      || this.IO.site_id;
    if (!this.idToUpdate && this.isCreate) {
      this.getMaintenanceDepartments(this.state.site_id);
    }
    this.getSiteDepartments(this.state.site_id);
  }

  // Requesters

  async getDataByID(id) {
    try {
      const response = SC.getCall({
        url: `${getInventory}/${id}`,
      });
      return response;
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.state.loading = false;
      if (errorMessage) toast.error(errorMessage);
    }
  }

  async getLabs(props) {
    this.getUser();
    //! auto call in develop branch
    // this.getOptions();
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
      const data = getSelectOptions(response?.data, {
        value: "_id",
        label: "site_name",
      });
      this.labs = { loading: false, data };
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.labs.loading = false;
      if (errorMessage) toast.error(errorMessage);
    }
  }

  async getSiteDepartments(props) {
    const params = {
      site_ids: props?._id ? [props?._id] : undefined,
      isPagination: 1,
      keyword: props?.keyword || "null",
    };

    try {
      const response = await SC.getCall({
        url: getDepartmentsList,
        params,
      });
      const data = getSelectOptions(response?.data?.data || [], {
        value: "_id",
        label: "name",
      });
      this.siteDepartments.data = data;
      this.siteDepartments.loading = false;
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.siteDepartments.loading = false;
      if (errorMessage) toast.error(errorMessage);
    }
  }

  async getMaintenanceDepartments(props) {
    this.maintenanceDepartments.loading = true;
    try {
      const response = await SC.getCall({
        url: getMaintenanceDepartmentsList,
        params: {
          site_ids: props?._id ? [props?._id] : undefined,
        },
      });
      const data = getSelectOptions(response?.data, {
        value: "_id",
        label: "name",
      });
      this.maintenanceDepartments = { loading: false, data };
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.maintenanceDepartments.loading = false;
      if (errorMessage) toast.error(errorMessage);
    }
  }

  // PRINT INVENTORY DETAIL
  printInventoryDetail = async () => {
    // this.printLoading = true;
    // try {
    //   const response = await SC.getCall({
    //     url: `${inventoryFormOptions}`,
    //   });
    //   this.printLoading = false;
    //   return response.data;
    // } catch (error) {
    //   const errorMessage = errorHandler(error);
    //   this.printLoading = false;
    //   if(errorMessage) toast.error(errorMessage);
    // }
  };

  // EVENT CHANGE HANDLERS======================

  getValidationObject = (key) => ({
    isValidationError: this.isValidationError,
    error: this.validation[key],
  });

  // handle InventoriesStatus modal
  closeInventoriesModal = () => {
    this.inventoriesStatusModal = false;
  };

  // getWorkOrders = async () => {
  //   this.filterData.loading = true
  //   const response = await SC.getCall({
  //     url: `/workorders`,
  //     // params: params,
  //   })
  //   const data = response.data.data.filter((data) => data.inventoryId === this.idToUpdate)
  //   this.filterData.loading = false
  //   const filterData = data.filter((data) => data.status !== 'closed')
  //   this.filterData.data = filterData
  // }

  handleChange = async ({ key, value }) => {
    if (key === "pmRequired" && !value) {
      this.state = {
        ...this.state,
        pmFrequency: this.IO.pmFrequency,
        pmStartDate: this.IO.pmStartDate,
        pmDoneBy: this.IO.pmDoneBy,
        pmVendor: this.IO.pmVendor,
      };
    } else if (key === "pmDoneBy" && value?.value !== "3RD_PARTY_VENDOR") {
      this.state.pmVendor = this.IO.pmVendor;
    } else if (key === "type") {
      if (value?.VALUE !== "medical") {
        this.state.class = this.IO.class;
      }

      this.state.equipment_id = this.IO.equipment_id;
      this.options.equipments = this.options.allEquipments.filter(
        (item) => item?.type === value?.VALUE
      );
    } else if (key === "warrantyStatus" && value?.value === "OUT_OF_WARRANTY") {
      this.handleChangeAdditional({ key: "warranties", value: [] });
    } else if (key === "site_id") {
      if (value) {
        this.getMaintenanceDepartments(value);
        this.getSiteDepartments(value);
      }
      // MAKING MAINTENANCE DEPARTMENT AND SITE DEPARTMENT FIELD EMPTY IF SITE CHANGES
      this.state.maintenance_department_id = this.IO.maintenance_department_id;
      this.additionalFields.site_department_id = this.additionalFieldsIO.site_department_id;

      // REMOVING SITE & MAINTENANCE DEPARTMENT  OPTIONS IF NO SITE IS SELECTED
      this.siteDepartments.data = [];
      this.maintenanceDepartments.data = [];
    }
    this.state[key] = value;
    let temp = this.state;
    this.handleValidationOnChange({ key, value });
if(this.idToUpdate) {
  if(((temp?.equipment_id !== null ? temp?.equipment_id?.VALUE : null) === (this.rowToUpdate?.equipment_id)) &&
     ((temp?.manufacturer_id !== null ? temp?.manufacturer_id?.VALUE : null) === (this.rowToUpdate?.manufacturer_id)) &&
     ((temp?.model !== "" ? temp?.model : null) === (this?.rowToUpdate?.model)) && 
     ((temp?.serialNumber !== null ? temp?.serialNumber : null) === (this?.rowToUpdate?.serialNumber)) &&
     ((temp?.acquisitionMethod !== null ? temp?.acquisitionMethod?.VALUE : null) === (this?.rowToUpdate?.acquisitionMethod)) &&
     ((temp?.sequence !== "" ? parseInt(temp?.sequence) : null) === (this?.rowToUpdate?.sequence !== null ? +this?.rowToUpdate?.sequence : null))  &&
     ((temp?.purchasePrice !== "" ? +temp?.purchasePrice : null) === (this?.rowToUpdate?.purchasePrice !== null ? +this?.rowToUpdate?.purchasePrice : null))&&
     ((temp?.status !== null ? temp?.status?.VALUE : null) === (this?.rowToUpdate?.status)) &&
     ((temp?.agent !== "" ? temp?.agent : null) === (this?.rowToUpdate?.agent)) &&
     ((temp?.class !== null ? temp?.class?.VALUE : null) === (this?.rowToUpdate?.class)) &&
     ((temp?.installationDate !== null ? new Date(temp?.installationDate).toDateString() : null) === (this?.rowToUpdate?.installationDate !== null ? new Date(this?.rowToUpdate?.installationDate).toDateString() : null)) &&
     ((temp?.warrantyStatus !== null ? temp?.warrantyStatus?.VALUE : null) === (this?.rowToUpdate?.warrantyStatus)) &&
     temp?.pmRequired === this?.rowToUpdate?.pmRequired && 
     ((temp?.pmFrequency !== null ? temp?.pmFrequency?.VALUE : null) === (this?.rowToUpdate?.pmFrequency)) &&
     ((temp?.pmStartDate !== null ? new Date(temp?.pmStartDate).toDateString() : null) === (this?.rowToUpdate?.pmStartDate !== null ? new Date(this?.rowToUpdate?.pmStartDate).toDateString() : null ))&&
     ((temp?.pmDoneBy !== null ? temp?.pmDoneBy?.VALUE : null) === (this?.rowToUpdate?.pmDoneBy)) && 
     ((temp?.building !== "" ? temp?.building : null) === (this?.rowToUpdate?.building)) &&
     ((temp?.floor !== "" ? temp?.floor : null) === (this?.rowToUpdate?.floor)) && 
     ((temp?.room !== "" ? temp?.room : null) === (this?.rowToUpdate?.room)) &&
     ((temp?.maintenance_department_id !== null ? temp?.maintenance_department_id?.VALUE : []) === (this?.rowToUpdate?.maintenance_department_ids && this?.rowToUpdate?.maintenance_department_ids[0]))
    ) {
    store.dispatch(editConfirmation(false));
  } else {
    store.dispatch(editConfirmation(true));
  }
}else{
    if(
    temp["type"] || 
    temp["manufacturer_id"] || 
    temp["serialNumber"] ||  
    temp["acquisitionMethod"] || 
    temp["purchasePrice"] || 
    temp["class"] ||
    temp["equipment_id"] || 
    temp["model"] || 
    temp["sequence"]  || 
    temp["agent"] ||
    temp["installationDate"] ||
    temp["warrantyStatus"] || 
    temp["pmFrequency"] ||
    !temp["pmRequired"] ||
    temp["pmStartDate"] ||
    temp["pmDoneBy"] ||
    (((key === "site_id" && value !== null) ? 
          temp["site_id"]?.VALUE : 
          (temp["site_id"]?.VALUE && !temp["maintenance_department_id"]?.VALUE) ? 
          null :
          (!temp["site_id"]?.VALUE) ?
          null
          : 
          null)) ||
    temp["building"] ||
    temp["floor"] || 
    temp["room"] || 
    ((temp["maintenance_department_id"]?.VALUE ?
          temp["maintenance_department_id"]?.VALUE : 
          (!temp["maintenance_department_id"]?.VALUE && temp["site_id"]?.VALUE) ?
           null : 
           null))
    ){
    store.dispatch(editConfirmation(true));
  } else {
    store.dispatch(editConfirmation(false));
  }
}
  };

  handleChangeAdditional = ({ key, value }) => {
    this.additionalFields[key] = value;
    let additionalTemp = this.additionalFields;

    if(this.idToUpdate) {
      if(
        ((additionalTemp?.referenceNumber !== "" ? additionalTemp?.referenceNumber : null) === (this?.rowToUpdate?.referenceNumber)) &&
        ((additionalTemp?.departmentMoveDate !== null ? new Date(additionalTemp?.departmentMoveDate).toDateString() : null) === (this?.rowToUpdate?.departmentMoveDate !== null ? new Date(this?.rowToUpdate?.departmentMoveDate).toDateString() : null)) &&
        ((additionalTemp?.ipAddress !== "" ? additionalTemp?.ipAddress : null) === (this?.rowToUpdate?.ipAddress)) &&
        ((additionalTemp?.macAddress !== "" ? additionalTemp?.macAddress : null) === (this?.rowToUpdate?.macAddress)) &&
        ((additionalTemp?.udiName !== "" ? additionalTemp?.udiName : null) === (this?.rowToUpdate?.udiName)) &&
        ((additionalTemp?.udiCode !== "" ? additionalTemp?.udiCode.toString() : null) === (this?.rowToUpdate?.udiCode !== null ? this?.rowToUpdate?.udiCode.toString() : null)) &&
        ((additionalTemp?.utilization !== null ? additionalTemp?.utilization?.VALUE : null) === (this?.rowToUpdate?.utilization))  &&
        ((additionalTemp?.technicalPerformance !== null ? additionalTemp?.technicalPerformance?.VALUE : null) === (this?.rowToUpdate?.technicalPerformance)) &&
        ((additionalTemp?.failureFrequency !== null ? additionalTemp?.failureFrequency?.VALUE : null) === (this?.rowToUpdate?.failureFrequency)) &&
        ((additionalTemp?.estimatedAge !== null ? +additionalTemp?.estimatedAge?.VALUE : null) === (this?.rowToUpdate?.estimatedAge !== null ? +this?.rowToUpdate?.estimatedAge : null )) &&
        ((additionalTemp?.dueForReplacement !== null ? additionalTemp?.dueForReplacement?.VALUE : null) === (this?.rowToUpdate?.dueForReplacement))
      ) {
        store.dispatch(editAdditionalConfirmation(false));
      } else {
        store.dispatch(editAdditionalConfirmation(true));
      }
    }else{
    if(additionalTemp["referenceNumber"] ||
      additionalTemp["departmentMoveDate"] ||
      additionalTemp["ipAddress"] ||
      additionalTemp["macAddress"] ||
      additionalTemp["udiName"] ||
      additionalTemp["udiCode"] ||
      additionalTemp["utilization"] ||
      additionalTemp["technicalPerformance"] ||
      additionalTemp["failureFrequency"] ||
      additionalTemp["estimatedAge"] ||
      additionalTemp["dueForReplacement"]
      ) {
      store.dispatch(editAdditionalConfirmation(true));
    } else {
      store.dispatch(editAdditionalConfirmation(false));
    }
  }
  };

  handleConditionalChange = ({ key, value }) => {
    this.conditionalStates[key] = value;

    if (key === "isOperationalManual") {
      this.handleChangeAdditional({
        key: "operationalManual",
        value: "",
      });
    } else if (key === "isServiceManual") {
      this.handleChangeAdditional({
        key: "serviceManual",
        value: "",
      });
    }
  };

  handleValidationOnChange({ key, value }) {
    const response = VF.validateFields({
      value,
      not: true,
    });
    this.validation[key] = response;
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    let endpoint = createInventory;
    let responseMessage = "Inventory Created Successfully!";
    const stateToSubmit = {
      ...this.state,
      ...this.additionalFields,
      warranties: this.additionalFields?.warranties?.map((item) => {
        delete item.id;
        return { ...TR.dataToSubmit(item) };
      }),
    };

    let data = TR.dataToSubmit(stateToSubmit);
    delete data.loading;
    //  HIDING PREVENTIVE MAINTENANCE SECTION WHILE EDIT MODE
    // if (!this?.isDetailView && this?.idToUpdate) {
    //   this.state.pmRequired = false;
    //   delete data?.pmRequired;
    //   delete data?.pmFrequency;
    //   delete data?.pmStartDate;
    //   delete data?.pmDoneBy;
    //   delete data?.pmVendor;
    // }
    // handling estimated Age value as it is returning false if Value is 0
    data.estimatedAge = typeof this.additionalFields?.estimatedAge?.VALUE === "number"
      ? this.additionalFields?.estimatedAge?.VALUE.toString()
      : this.additionalFields.estimatedAge;

    // VO === Validation Object
    let VO = {};
    // IVO === Initial Validation Object
    let IVO = { ...this.FVIO };

    // making fields required on specific conditions

    if (this.state?.pmRequired) {
      IVO = {
        ...IVO,
        pmFrequency: [],
        pmDoneBy: [],
        pmStartDate: [],
      };
      if (this.is3rdPartyVendor) {
        IVO = {
          ...IVO,
          pmVendor: [],
        };
      }
    }

    if (this.state?.type?.VALUE === classification.medical) {
      IVO = {
        ...IVO,
        class: [],
      };
    }
    // REMOVING FILE UPLOAD FIELD IF NO FILES SELECTED ON UPDATE

    if (this.idToUpdate && data.fileUpload?.length === 0) {
      delete data.fileUpload;
    }

    // IN CREATE MODE - REMOVING STATUS AND CURRENT STATUS FIELD FROM PAYLOAD AND IT's VALIDATION

    if (!this.idToUpdate) {
      // FROM PAYLOAD
      delete data.status;
      delete data.currentStatus;

      delete IVO.currentStatus;
      delete IVO.status;
    }
    // End making fields required

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
      // set Inventories.validation
      this.validation = VO;
      this.isValidationError = true;
    } else {
      this.loading = true;
      this.isValidationError = false;
      if (this.idToUpdate) {
        endpoint = updateInventory;
        data = {
          ...data,
          id: this.idToUpdate,
        };
        responseMessage = "Inventory Updated Successfully!";
      }

      try {
        this.loading = true;
        if (this.isRetired && data?.status === inventoryStatus.retired) {
          this.inventoriesStatusModal = true;
          this.assetRetireConfirmation = false;
          this.assetRetireError = true;
        } else if (
          data?.status === inventoryStatus.retired
          && !this.inventoriesStatusModal
        ) {
          this.inventoriesStatusModal = true;
          this.assetRetireConfirmation = true;
          this.assetRetireError = false;
          this.loading = false;
        } else {
          // throw new Error("Error"); // ! test
          const response = await SC.postCall({
            url: endpoint,
            data,
          });
          this.closeInventoriesModal();
          //
          store.dispatch(commonDrawer({ isOpen: false }));
          store.dispatch(editConfirmation(false));
          store.dispatch(editAdditionalConfirmation(false));
          store.dispatch(showDisacrdConfirmation(false));
          //
          toast.success(responseMessage);
          store.dispatch(getListingData());
          store.dispatch(toggleGetData(false));

          // ! TODO : check submit for popup
          this.inventoriesStatusModal = false;
          this.assetRetireConfirmation = false;
          this.assetRetireError = false;
          this.loading = false;
        }
        this.loading = false;
      } catch (error) {
        const errorResponse = error?.response?.data?.data;
        const codeWord = errorResponse?.codeword;

        if (codeWord === codeword.ASSET_RETIREMENT_DISABLED) {
          this.inventoriesStatusModal = true;
          this.assetRetireConfirmation = false;
          this.assetRetireError = true;
        } else {
          const errorMessage = errorHandler(error);
          if (errorMessage) toast.error(errorMessage);
        }
        this.loading = false;
      }
    }
  };

  removeWarranty = ({ id }) => {
    const filteredWarranties = this.additionalFields.warranties.filter(
      (item) => item.id !== id
    );
    this.additionalFields.warranties = [...filteredWarranties];
  };

  updateFormFields = (data, formOptions) => {
    // Flag for functional status field
    this.hideCurrentStatus = data?.status === inventoryStatus.retired;
    this.isRetired = data?.status === inventoryStatus.retired;

    // Updating main states
    this.state = {
      loading: false,
      inventoryId: data.inventoryId || this.inventoryId,
      room: data?.room || this.IO.room,
      model: data?.model || this.IO.model,
      agent: data?.agent || this.IO.agent,
      floor: data?.floor || this.IO.floor,
      sequence: data?.sequence || this.IO.sequence,
      pmVendor: data?.pmVendor || this.IO.pmVendor,
      building: data?.building || this.IO.building,
      equipment_id:
        (data?.equipment
          && getOptionObject(data?.equipment, "_id", "nameEnglish"))
        || this.IO.equipment_id,
      serialNumber: data?.serialNumber || this.IO.serialNumber,
      maintenance_department_id:
        getOptionObject(
          arrayHead(data?.maintenance_departments),
          "_id",
          "name"
        ) || this.IO.maintenance_department_id,
      purchasePrice: data?.purchasePrice || this.IO.purchasePrice,
      manufacturer_id:
        (data?.manufacturer
          && getOptionObject(data?.manufacturer, "_id", "name"))
        || this.IO.manufacturer_id,
      pmStartDate: data?.pmStartDate
        ? new Date(data?.pmStartDate)
        : this.IO.pmStartDate,
      installationDate: data?.installationDate
        ? new Date(data?.installationDate)
        : this.IO.installationDate,
      class:
        (data?.class && formOptions?.inventory?.CLASS[data?.class])
        || this.IO.class,
      site_id:
        (data?.lab && getOptionObject(data?.lab, "_id", "site_name"))
        || this.IO.site_id,
      type:
        (data?.type
          && formOptions?.inventory?.CLASSIFICATION[types[data?.type]])
        || this.IO.type,
      pmDoneBy:
        (data?.pmDoneBy
          && formOptions?.inventory?.PM_DONE_BY[data?.pmDoneBy])
        || this.IO.pmDoneBy,
      pmFrequency:
        (data?.pmFrequency
          && formOptions?.inventory?.PM_FREQUENCY[data?.pmFrequency])
        || this.IO.pmFrequency,
      currentStatus:
        (data?.currentStatus
          && formOptions?.inventory?.CURRENT_STATUS[data?.currentStatus])
        || this.IO.currentStatus,
      status:
        (data?.status && formOptions?.inventory?.STATUS[data?.status])
        || formOptions?.inventory?.STATUS[inventoryStatus.inService],
      warrantyStatus:
        (data?.warrantyStatus
          && formOptions?.inventory?.WARRANTY[data?.warrantyStatus])
        || this.IO.warrantyStatus,
      acquisitionMethod:
        (data?.acquisitionMethod
          && formOptions?.inventory?.ACQUISITION[data?.acquisitionMethod])
        || this.IO.acquisitionMethod,
      pmRequired: data?.pmRequired,
      fileUpload: data?.fileUpload?.map((item) => getFileObj(item)) || [],
    };
    // Updating additional states
    this.additionalFields = {
      loading: false,
      udiName: data?.udiName || this.additionalFieldsIO?.udiName,
      udiCode: data?.udiCode || this.additionalFieldsIO?.udiCode,
      assetType: data?.assetType || this.additionalFieldsIO?.assetType,
      ipAddress: data?.ipAddress || this.additionalFieldsIO?.ipAddress,
      macAddress: data?.macAddress || this.additionalFieldsIO?.macAddress,
      serviceManual:
        data?.serviceManual || this.additionalFieldsIO?.serviceManual,
      referenceNumber:
        data?.referenceNumber || this.additionalFieldsIO?.referenceNumber,
      assetDescription:
        data?.assetDescription || this.additionalFieldsIO?.assetDescription,
      operationalManual:
        data?.operationalManual || this.additionalFieldsIO?.operationalManual,
      purchaseOrderDate: data?.purchaseOrderDate
        ? new Date(data?.purchaseOrderDate)
        : this.additionalFieldsIO.purchaseOrderDate,
      departmentMoveDate: data?.departmentMoveDate
        ? new Date(data?.departmentMoveDate)
        : this.additionalFieldsIO.departmentMoveDate,
      purchaseOrderNumber:
        data?.purchaseOrderNumber
        || this.additionalFieldsIO?.purchaseOrderNumber,
      locationDescription:
        data?.locationDescription
        || this.additionalFieldsIO?.locationDescription,

      utilization:
        formOptions?.inventory?.UTILIZATION?.[data?.utilization] || null,
      technicalPerformance:
        formOptions?.inventory?.TECHNICAL_PERFORMANCE?.[
          data?.technicalPerformance
        ] || null,
      failureFrequency:
        formOptions?.inventory?.FAILURE_FREQUENCY?.[data?.failureFrequency]
        || null,
      estimatedAge:
        formOptions?.inventory?.ESTIMATED_AGE?.[data?.estimatedAge] || null,
      dueForReplacement:
        formOptions?.inventory?.DUE_FOR_REPLACEMENT?.[
          data?.dueForReplacement
        ] || null,
      site_department_id:
        getOptionObject(arrayHead(data?.site_departments), "_id", "name")
        || this.additionalFieldsIO.site_department_id,
      assetPlug:
        (data?.assetPlug
          && formOptions?.inventory?.ASSET_PLUG?.[data?.assetPlug])
        || this.additionalFieldsIO.assetPlug,
      userTrained:
        (data?.userTrained
          && formOptions?.inventory?.USER_TRAINED?.[data?.userTrained])
        || this.additionalFieldsIO.userTrained,
      assetSeverity:
        (data?.assetSeverity
          && formOptions?.inventory?.ASSET_SEVERITY?.[data?.assetSeverity])
        || this.additionalFieldsIO.assetSeverity,
      assetPriority:
        (data?.assetPriority
          && formOptions?.inventory?.ASSET_PRIORITY?.[data?.assetPriority])
        || this.additionalFieldsIO.assetPriority,

      categoryNumber:
        (data?.categoryNumber
          && formOptions?.inventory?.CATEGORY_NUMBER?.[data?.categoryNumber])
        || this.additionalFieldsIO.categoryNumber,
      warranties: data?.warrantiesFormatted?.map((item) => ({
        id: fiveRandomNumbers(),
        warrantyCoverage:
            (item?.warrantyCoverage
              && formOptions?.inventory?.WARRANTY_COVERAGE?.[
                item?.warrantyCoverage
              ])
            || this.warrantiesIO.warrantyCoverage,
        warrantyStartDate: item?.warrantyStartDate
          ? new Date(item?.warrantyStartDate)
          : this.warrantiesIO.warrantyStartDate,
        warrantyEndDate: item?.warrantyEndDate
          ? new Date(item?.warrantyEndDate)
          : this.warrantiesIO.warrantyEndDate,
      })),
    };
    // Updating conditional states
    let conditionalStatesCopy = this.conditionalStatesIO;

    if (data?.operationalManual) {
      conditionalStatesCopy = {
        ...conditionalStatesCopy,
        isOperationalManual: this.conditionalStatesOptions[0],
      };
    }

    if (data?.serviceManual) {
      conditionalStatesCopy = {
        ...conditionalStatesCopy,
        isServiceManual: this.conditionalStatesOptions[0],
      };
    }
    this.conditionalStates = conditionalStatesCopy;
    this.options.equipments = this.options.allEquipments?.filter(
      (item) => item?.type === this.state.type?.VALUE
    );
  };

  updateFormOptions(data) {
    this.options = {
      loading: false,
      inventory: data?.inventory,
      manufacturers: getSelectOptions(data?.inventory?.manufacturers, {
        value: "_id",
        label: "name",
      }),
      equipments: getSelectOptions(data?.equipments, {
        value: "_id",
        label: "nameEnglish",

        // e?.nameEnglish + (e?.nameArabic ? " / " + e?.nameArabic : "")
      }),
      allEquipments: getSelectOptions(data?.equipments, {
        value: "_id",
        label: "nameEnglish",

        // e?.nameEnglish + (e?.nameArabic ? " / " + e?.nameArabic : "")
      }),
    };
  }

  // inventories filter

  findLabs = debounce((e) => {
    this.labsLoading = true;
    this.getLabs({ keyword: e });
  }, 1000);

  findEquipment = debounce((e) => {
    this.getEquipments({ keyword: e });
  }, 1000);

  findManufacturer = debounce((e) => {
    this.getManufacturers({ keyword: e });
  }, 1000);

  findSiteDepartment = debounce((e) => {
    this.siteDepartments.loading = false;
    this.getSiteDepartments({ keyword: e });
  }, 1000);

  getEquipments = async ({ keyword }) => {
    this.equipmentsLoading = true;
    try {
      const response = await SC.getCall({
        url: getEquipmentsList,
        params: { isPagination: 1, keyword: keyword || "null" },
      });
      let data = response?.data?.data || [];
      if (data?.length > 0) {
        data = data.map((item) => ({
          LABEL:
              item?.nameEnglish
              + (item?.nameArabic ? ` / ${item?.nameArabic}` : ""),
          VALUE: item._id,
        }));
      }
      this.equipments = { data };
      this.equipmentsLoading = false;
    } catch (error) {
      if (!this.mountedRef) return null;
      const errorMessage = errorHandler(error);
      this.equipmentsLoading = false;
      if (errorMessage) toast.error(errorMessage);
    }
  };

  getManufacturers = async ({ keyword }) => {
    this.manufacturersLoading = true;
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
      if (!this.mountedRef) return null;
      this.manufacturersLoading = false;
      if (errorMessage) toast.error(errorMessage);
    }
  };

  getOptions = async () => {
    try {
      const response = await SC.getCall({
        url: inventoryFormOptions,
      });
      const data = response?.data || {};
      this.filterOptions = { loading: false, data };
      return data;
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.filterOptions = { ...this.filterOptions, loading: false };
      if (errorMessage) toast.error(errorMessage);
    }
  };

  getRegions = async ({ keyword }) => {
    this.regionsLoading = true;
    try {
      const response = await SC.getCall({
        url: getRegionsList,
        params: { keyword },
      });
      const data = response?.data || [];
      this.regions = { data };
      this.regionsLoading = false;
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.regions = { ...this.regions };
      this.regionsLoading = false;
      if (errorMessage) toast.error(errorMessage);
    }
  };
}

export const sideBarTabs = [
  {
    title: "Info",
    value: "info",
    icon: infoIcon,
    seqNo: 1,
  },
  {
    title: "WO History",
    value: "woHistory",
    icon: workOrderIcon,
    seqNo: 2,
  },
];
const getAllDaysInMonth = (month, year) => Array.from(
  { length: new Date(year, month, 0).getDate() }, // get next month, zeroth's (previous) day
  (_, i) => new Date(year, month - 1, i + 1), // get current month (0 based index)
);

// const allDatesInOctober = getAllDaysInMonth(10, 2021);

const PMCalenderArray = {
  january: [
    {
      _id: "as320cwjaff",
      name: "Infusion Pump",
      count: 10,
    },
    {
      _id: "jaiojsdfoijdsaf984fsdsa",
      name: "Ventilator",
      count: 340,
    },
    {
      _id: "jaiojsd3434foijdsaf984fsdsa",
      name: "Ventilator",
      count: 340,
    },
    {
      _id: "jaiojsdfoijdsa11111f984fsdsa",
      name: "Ventilator",
      count: 340,
    },
  ],
  february: [
    {
      _id: "as320cwja324323f",
      name: "OTC",
      count: 12,
    },
  ],
  march: [],
  april: [],
  may: [],
  june: [
    {
      _id: "mas32432bbilalhamayun",
      name: "Ventilator test 1",
      count: 4110,
    },
    {
      _id: "mas32432bbilalhamayun1",
      name: "Ventilator test 2",
      count: 40,
    },
    {
      _id: "mas32432bbilalhamayun2",
      name: "Ventilator test 3",
      count: 240,
    },
    {
      _id: "mas32432bbilalhamayun3",
      name: "Ventilator test 4",
      count: 240,
    },
  ],
  july: [],
  august: [],
  september: [
    {
      _id: "masubbilalhamayun",
      name: "Ventilator test 1",
      count: 670,
    },
  ],
  october: [],
  november: [
    {
      _id: "as320cwja3243242342343f",
      name: "OTC Test 1",
      count: 342,
    },
    {
      _id: "as320cwjafeerwerwr24f",
      name: "Infusion Pump test 1",
      count: 450,
    },
  ],
  december: [],
};
const months = {
  1: "january",
  2: "february",
  3: "march",
  4: "april",
  5: "may",
  6: "june",
  7: "july",
  8: "august",
  9: "september",
  10: "october",
  11: "november",
  12: "december",
};

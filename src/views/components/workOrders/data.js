import moment from "moment";
import { history } from "utility/helper/history";
import React, { Fragment } from "react";
import { store } from "redux/storeConfig/store";
import { userPlusIcon } from "assets/icons/svgIcons";
import { RenderFile } from "utility/helper/renderFile";
import TemporaryDrawer from "views/components/sidebar";
import { fiveRandomNumbers } from "utility/transformers";
import PrimaryButton from "views/components/PrimaryButton";
import { classification, site_model } from "utility/config";
import AssignTo from "views/components/workOrders/AssignTo";
import WOProgress from "views/components/workOrders/WOProgress";
import { ticketIdIcon } from "views/components/workOrders/CardView/data";
import { toggleGetData } from "redux/actions/renderList/renderListAction";
import CardBadge from "views/components/workOrders/CardView/Header/CardBadge";
import WOSolutionFOrm from "views/components/workOrders/DetailPage/TechnicianOps";

import { getColor, getField, getStatus, getWarrantyStatus } from "views/components/generalHelper";

import {
  workOrderApprovalQA,
  workOrderApprovalRequestor,
  workOrderApprovalSupervisor,
  workOrderAssignSupervisor,
  workOrderAssignTechnician,
  workOrderConfirmTechnician,
  workOrderResolveTechnician,
} from "utility/helper/endpoints";
import { toggleTechnicianForm } from "redux/actions/workOrder";
import { arrayHead, SC } from "utility/helper";
import { toast } from "react-toastify";
import overDue from "../../../assets/icons/duedate.svg";
<<<<<<< HEAD
import { modWorkOrdersAssignTo } from "utility/helper/apmModules";
=======
>>>>>>> a763321d8a2557cae8ecacc25402e13c74dee32a
import { commonDrawer } from "redux/actions/drawer/drawerActions";

export const replacedPartIO = {
  part_name: "",
  part_number: "",
  cost: "",
  quantity: "",
  id: fiveRandomNumbers(),
};

// RPVIO = Replaced Parts Validation Initial Object
export const RPVIO = {
  part_name: [],
  part_number: [],
  cost: [],
  quantity: [],
};
export const columns = [
  {
    name: "Work Orders",
    selector: "_id",
    sortable: true,
    cell: (row) => (
      <>
        {/* <figure
          className="cardView__header__ticketId--icon"
          // color="success"
          style={{
            color: "red",
            fill: "green",
            filter: "green",
          }}
        > */}
        <span className=""> {ticketIdIcon}</span>
        {/* </figure> */}
        <span className="ml-2 font-weight-bold">#{row?.serial}</span>
      </>
    ),
    width: "200px",
  },
  {
    name: "Description",
    selector: "description",
    sortable: true,
    reorder: true,
    cell: (row) => (
      <span className="font-weight-bold text-truncate">
        <span dangerouslySetInnerHTML={{ __html: row?.description }} />
      </span>
    ),
    width: "250px",
  },
  {
    name: "Asset ID",
    selector: "inventory",
    sortable: true,
    reorder: true,
    cell: (row) => <span className="font-weight-bold text-truncate">{row?.inventory?.inventoryId}</span>,
    width: "150px",
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    width: "200px",
    reorder: true,
    cell: (row) => (
      <CardBadge
        text={getStatus(row?.status, row?.site_model)}
        isIcon
        customClasses={`text-capitalize ${row?.status && getColor(row?.status)} main`}
      />
    ),
    // width: "auto",
  },
  {
    name: "Type",
    selector: "type",
    sortable: true,
    reorder: true,
    cell: (row) => <CardBadge text={row?.type || ""} customClasses="main me-2" />,
    // width: "auto",
  },
  {
    name: "Classification",
    selector: "classification",
    sortable: true,
    reorder: true,
    cell: (row) => (
      <CardBadge text={getField(row?.work_order_classification?.classification || "")} customClasses="main" />
    ),
    width: "150px",
  },
  // {
  //   name: "Due Date",
  //   selector: "dueDate",
  //   sortable: true,
  //   reorder: true,
  //   cell: (row) =>
  //     row?.dueDate ? (
  //       <Fragment>
  //         <figure className="mr-1">{dateIconList}</figure>
  //         <span className="customDateColor">{dateFormat(row?.dueDate)}</span>
  //       </Fragment>
  //     ) : (
  //       <span>----</span>
  //     ),
  //   width: "200px",
  // },
  {
    name: "Progress",
    selector: "progress",
    sortable: true,
    reorder: true,
    cell: (row) => <WOProgress customClasses="mt-0" item={row} />,
    width: "300px",
  },
  {
    width: "150px",
    name: "",
    cell: (row) => (
      <PrimaryButton customClasses="primary-outline" onClick={(e) => handleDetailBtnClick(e, row)} text="Details" />
    ),
  },
];

export const columnsOverdue = [
  {
    name: "Work Orders",
    selector: "_id",
    sortable: true,
    cell: (row) => (
      <>
        {/* <figure
          className="cardView__header__ticketId--icon"
          // color="success"
          style={{
            color: "red",
            fill: "green",
            filter: "green",
          }}
        > */}
        <span className=""> {ticketIdIcon}</span>
        {/* </figure> */}
        <span className="ml-2 font-weight-bold">#{row?.serial}</span>
      </>
    ),
    width: "200px",
  },
  {
    name: "Description",
    selector: "description",
    sortable: true,
    reorder: true,
    cell: (row) => (
      <span className="font-weight-bold text-truncate">
        <span dangerouslySetInnerHTML={{ __html: row?.description }} />
      </span>
    ),
    width: "250px",
  },
  {
    name: "Asset ID",
    selector: "inventory",
    sortable: true,
    reorder: true,
    cell: (row) => <span className="font-weight-bold text-truncate">{row?.inventory?.inventoryId}</span>,
    width: "150px",
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    width: "200px",
    reorder: true,
    cell: (row) => (
      <CardBadge
        text={getStatus(row?.status, row?.site_model)}
        isIcon
        customClasses={`text-capitalize ${row?.status && getColor(row?.status)} main`}
      />
    ),
    // width: "auto",
  },
  {
    name: "Type",
    selector: "type",
    sortable: true,
    reorder: true,
    cell: (row) => <CardBadge text={row?.type || ""} customClasses="main me-2" />,
    // width: "auto",
  },
  {
    name: "Classification",
    selector: "classification",
    sortable: true,
    reorder: true,
    cell: (row) => (
      <CardBadge text={getField(row?.work_order_classification?.classification || "")} customClasses="main" />
    ),
    width: "150px",
  },
  // {
  //   name: "Due Date",
  //   selector: "dueDate",
  //   sortable: true,
  //   reorder: true,
  //   cell: (row) =>
  //     row?.dueDate ? (
  //       <Fragment>
  //         <figure className="mr-1">{dateIconList}</figure>
  //         <span className="customDateColor">{dateFormat(row?.dueDate)}</span>
  //       </Fragment>
  //     ) : (
  //       <span>----</span>
  //     ),
  //   width: "200px",
  // },

  {
    name: "Due Date",
    selector: "duedate",
    sortable: true,
    // omit: Params === "/work-orders/list/overdue" ? false : true,
    reorder: true,
    cell: (row) => (
      <span className="font-weight-bold text-truncate danger">
        <img className="timer-icon-due-date-col" src={overDue} />
        Overdue
      </span>
    ),
    width: "150px",
  },
  {
    name: "Progress",
    selector: "progress",
    sortable: true,
    reorder: true,
    cell: (row) => <WOProgress customClasses="mt-0" item={row} />,
    width: "300px",
  },
  {
    width: "150px",
    name: "",
    cell: (row) => (
      <PrimaryButton customClasses="primary-outline" onClick={(e) => handleDetailBtnClick(e, row)} text="Details" />
    ),
  },
];
const handleDetailBtnClick = (event, row) => {
  if (event.ctrlKey) {
    window.open(`/work-orders/list/${row?._id}`, "_blank");
  } else {
    history.push(`/work-orders/list/${row?._id}`);
  }
};
export const remarks = [
  {
    id: 1,
    user: { title: "Service Requester", type: "requester" },
    message: "Marked the work order closed",
    status: "closed",
    createdAt: moment(new Date("10/01/2022")).format("DD/MM/YYYY hh:mm A"),
  },
  {
    id: 2,
    user: { title: "HMC Technician", type: "technician" },
    message: "Philips solved the query",
    status: "opened",
    createdAt: moment(new Date("11/01/2022")).format("DD/MM/YYYY hh:mm A"),
  },
  {
    id: 3,
    user: { title: "HMC Technician", type: "technician" },
    message: "Philips solved the query",
    status: "inprogress",
    createdAt: moment(new Date("9/01/2022")).format("DD/MM/YYYY hh:mm A"),
  },
  {
    id: 4,
    user: { title: "HMC supervisor", type: "supervisor" },
    message: "John assigned the work order",
    status: "assigned",
    createdAt: moment(new Date("12/01/2022")).format("DD/MM/YYYY hh:mm A"),
  },
];

export const getReasonToReject = (workorder) => {
  const step = workorder?.work_order_steps?.currentStep;
  const comments = workorder?.work_order_steps;

  // ---------- Permanent Start (Self & Technician Assigned)
  //  Medical/Non-Medical
  let comment = {
    1: comments?.technician?.comment,
    3: comments?.supervisorApproval?.comment || comments?.engineer?.comment || comments?.technician?.comment,
    4: comments?.engineer?.comment,
    5: comments?.creator?.comment || comments?.staffApproval?.comment,
  };

  // Generic
  if (workorder?.site_model === site_model.permanent && workorder?.classification === classification.generic) {
    comment = {
      2: comment[1],
      4: comment[3],
      5: comment[4],
    };
  }
  // ---------- Permanent End

  // MakeShift Start (Supervisor Assigned)
  // Medical/Non-Medical/Generic
  if (workorder?.site_model === site_model.makeShift) {
    comment = {
      2: comment[4],
    };
  }
  // MakeShift End

  // IMC Start (Supervisor Assigned)
  // Medical/Non-Medical/Generic
  if (workorder?.site_model === site_model.imc) {
    comment = {
      1: comment[1],
      3: comment[5],
    };
  }
  // IMC End

  return comment[step];
};

export const getAssetInformation = (asset, all) => {
  const allData = [
    {
      label: "HMC",
      value: asset?.hmc?.name || "N/A",
    },
    {
      label: "Asset Type",
      value: asset?.equipment?.type || "N/A",
    },
    {
      label: "AGENT",
      value: asset?.agent || "N/A",
    },
    {
      label: "MANUFACTURER",
      value: asset?.manufacturer?.name || "N/A",
    },
    {
      label: "Sequence",
      value: asset?.sequence || "N/A",
    },
    {
      label: "MODEL",
      value: asset?.model || "N/A",
    },
    {
      label: "SERIAL NUMBER",
      value: asset?.serialNumber || "N/A",
    },
    {
      label: "CLASS",
      value: asset?.class || "N/A",
    },
    {
      label: "Acquisition Method",
      value: asset?.acquisitionMethod || "N/A",
    },
    {
      label: "Purchase Price",
      value: asset?.purchasePrice || "N/A",
    },
    {
      label: "System Registration Date",
      value: asset?.systemRegistrationDate || "N/A",
    },
    {
      label: "WARRANTY",
      value: getWarrantyStatus[asset?.warrantyStatus] || "N/A",
    },
    {
      label: "INSTALLATION DATE",
      value: asset?.installationDate || "N/A",
    },
    {
      label: "WARRANTY EXPIRATION DATE",
      value: asset?.warrantyExpirationDate || "N/A",
    },
    {
      label: "PM Required",
      value: asset?.pmRequired?.toString() || "N/A",
    },
    {
      label: "PM Frequency",
      value: asset?.pmFrequency || "N/A",
    },
    {
      label: "PM StartDate",
      value: asset?.pmStartDate || "N/A",
    },
    {
      label: "PM Done By",
      value: asset?.pmDoneBy || "N/A",
    },
    {
      label: "PM Vendor",
      value: asset?.pmVendor || "N/A",
    },
    {
      label: "Site Department",
      value: asset?.labDepartment || "N/A",
    },
    {
      label: "Maintenance Department",
      value: asset?.maintenanceDepartments?.map((item, index) => <CardBadge key={index} text={item?.name} />) || "N/A",
    },
    {
      label: "Building",
      value: asset?.building || "N/A",
    },
    {
      label: "Zone",
      value: asset?.zone || "N/A",
    },
    {
      label: "Floor",
      value: asset?.floor || "N/A",
    },
    {
      label: "Room",
      value: asset?.room || "N/A",
    },
    {
      label: "Attachments",
      value: asset?.fileUpload?.map((item, index) => <RenderFile key={index} file={item} />),
    },
  ];

  return all
    ? [
        {
          label: "Name",
          value: asset?.equipment?.nameEnglish || "N/A",
        },
        {
          label: "Manufacturer",
          value: asset?.manufacturer?.name || "N/A",
        },
        {
          label: "Serial #",
          value: asset?.serialNumber || "N/A",
        },
        {
          label: "Warranty",
          value: getWarrantyStatus[asset?.warrantyStatus] || "N/A",
        },

        {
          label: "Site Name",
          value: asset?.lab?.site_name || "N/A",
        },
        ...allData,
      ]
    : [
        {
          label: "Asset ID",
          value: asset?.inventoryId || "N/A",
        },
        {
          label: "Name",
          value: asset?.equipment?.nameEnglish || "N/A",
        },
        {
          label: "Manufacturer",
          value: asset?.manufacturer?.name || "N/A",
        },
        {
          label: "Model",
          value: asset?.model || "N/A",
        },
        {
          label: "Serial #",
          value: asset?.serialNumber || "N/A",
        },
        {
          label: "Warranty",
          value: getWarrantyStatus[asset?.warrantyStatus] || "N/A",
        },
        {
          label: "Acquisition Method",
          value: asset?.acquisitionMethod || "N/A",
        },

        {
          label: "Site Name",
          value: asset?.lab?.site_name || "N/A",
        },
        {
          label: "Department",
          value: arrayHead(asset?.site_departments)?.name || "N/A",
        },
      ];
};

export const getDetailPageActions = ({
  item,
  current,
  woActionButtons,
  isDisabled,
  index,
  handleSubmit,
  handleModel,
  state,
  btnText,
  isRedirectModel,
  loadingSubmission,
  showRating,
  handleDownload,
}) => {
  const { showIcons, isDrawers, endPoint, components, forceFlag, isRating, customClick } =
    woActionButtons[current?.step];
  let { flag, comment } = item;
  const isDrawer = isDrawers && isDrawers[index];
  const showIcon = showIcons && showIcons[index];
  const moduleName = components && components[index];
  const CustomClick = customClick && customClick[index];
  const isLoading = flag === loadingSubmission?.flag && loadingSubmission?.on;
  flag = forceFlag || flag;

<<<<<<< HEAD
  // ParentComp/parent props
  let PCProps = { key: index };
  // ChildComp/parent props
  let CCProps = { key: index };
  const DrawerClick = () => {
    store.dispatch(toggleGetData({ isToggle: true }));
    store.dispatch(commonDrawer({isOpen:true, moduleName: modWorkOrdersAssignTo.id , workOrderId:state?.data?._id}))
    // closeModal();
=======
  const handleOnClickEvent = () => {
    if (isDrawer) {
      store.dispatch(
        commonDrawer({
          isOpen: true,
          type: "create",
          module: moduleName,
        })
      );
    } else if (isRating && flag === 0) {
      showRating();
    } else if (isRating && (flag === 1 || flag === 2)) {
      handleDownload(flag);
    } else if (CustomClick) {
      CustomClick(CustomProps, current);
    } else if (flag) {
      handleSubmit({ flag, comment, endPoint, noValidate: true });
    } else {
      handleModel({ flag, endPoint, onRejection: isRedirectModel });
    }
>>>>>>> a763321d8a2557cae8ecacc25402e13c74dee32a
  };

  // Custom props

  let CustomProps = {
    icon: null,
    key: index,
    current: current,
    module: moduleName,
    workOrder: state?.data,
    showDrawerToggler: true,
    onClick: handleOnClickEvent,
    isOpen: true,
    text: isLoading ? "Submitting..." : btnText,
    isDisabled: !!isDisabled || loadingSubmission?.on,
    customClasses: "workOrder_detail__actions__btnContainer__btn",
    customTextClasses: "workOrder_detail__actions__btnContainer__btn--text",
    customClasses: `workOrder_detail__actions__btnContainer__btn approve ${flag ? "success" : "red"}`,
  };

  if (showIcon) {
    CustomProps = {
      ...CustomProps,
      icon: userPlusIcon,
    };
  }
  return {
    CustomProps,
  };
};

export const SelfAssignTo = async (props) => {
  const data = {
    workOrderId: props?.workOrder?._id,
    assignedTo: props?.current?.user?._id,
  };
  const response = await SC.postCall({
    url: workOrderAssignTechnician,
    data,
  });
  const responseCode = response?.data?.code || 0;
  const responseMessage = response?.data?.message || "";
  if (responseCode === 200) {
    store.dispatch(toggleGetData(false));
    toast.success(responseMessage);
  }
};

export const getWOActionButtons = ({ isRedirected, inProgress, siteModel, woClassification, workOrder, user }) => {
  const canRate = user?._id === workOrder?.creator?._id && !workOrder?.rating;
  // Permanent sites work orders
  let woActionButtons = {
    1: {
      endPoint: workOrderAssignTechnician,
      texts: isRedirected ? ["View Reason"] : ["Assign To", "Complete Work order"],
      isDrawers: [!isRedirected, false],
      showIcons: [false],
      components: [isRedirected ? null : "assignTo", null],
      customClick: [isRedirected ? false : false, SelfAssignTo],
      description: isRedirected
        ? "This  work order is redirected by the HMC technician. Please review!"
        : "This is a new work order. Please assign it.",
    },
    2: {
      endPoint: workOrderConfirmTechnician,
      texts: isRedirected ? ["View Reason"] : ["Redirect", "Accept"],
      isDrawers: isRedirected ? [false] : [false, false],
      components: isRedirected ? [false] : [null, null],
      description: "Please accept this work order as HMC Supervisor/Technician",
    },

    3: {
      endPoint: workOrderResolveTechnician,
      texts: isRedirected ? ["View Reason"] : ["Complete Work Order"],
      isDrawers: isRedirected ? [false] : [false],
      components: isRedirected ? [false] : [WOSolutionFOrm],
      // forceFlag: [isRedirected ? false : 1],
      customClick: [isRedirected ? false : () => store.dispatch(toggleTechnicianForm(true))],
      description:
        (isRedirected && "This  work order is rejected by the HMC Supervisor please review") ||
        "Please solve this work order  as HMC Supervisor/Technician",
    },

    4: {
      endPoint: workOrderApprovalSupervisor,
      texts: isRedirected ? ["View Reason"] : ["Reject", "Approve"],
      isDrawers: [false, false],
      components: [null, null],
      description:
        (isRedirected && "This  work order is rejected by the MOH Engineer please review") ||
        "Please approve this work order as HMC Supervisor",
    },
    5: {
      endPoint: workOrderApprovalQA, // engineer approval
      texts: isRedirected ? ["View Reason"] : ["Reject", "Approve"],
      isDrawers: [false, false],
      components: [null, null],
      description:
        (isRedirected && "This  work order is rejected by the Service Requester please review") ||
        "Please approve this work order as MOH Engineer",
    },
    6: {
      endPoint: workOrderApprovalRequestor,
      texts: ["Reject", "Approve"],
      description: "Please approve this work order as Service Requester",
    },
    7: {
      endPoint: workOrderApprovalRequestor,
      texts: ["Rate Now", "Download"],
      description: `${
        (canRate && "Please rate this work order as Service Requester.") || ""
      } This Work Order is closed now, you can download or print it.`,
      isRating: true,
    },
    array: [
      {
        flag: 0,
        comment: "",
      },
      {
        flag: 1,
        comment: "",
      },
      {
        flag: 2,
        comment: "",
      },
    ],
  };

  if (siteModel === site_model.permanent && woClassification === classification.generic) {
    woActionButtons = {
      1: {
        ...woActionButtons[1],
        endPoint: workOrderAssignSupervisor,
        description: "This is a new work order. Please assign it to Maintenance Department.",
      },
      2: {
        ...woActionButtons[1],
        description: isRedirected
          ? "This  work order is redirected by the HMC Technician. Please review!"
          : "This is a new work order. Please assign it.",
      },
      3: woActionButtons[2],
      4: woActionButtons[3],
      5: woActionButtons[4],
      6: woActionButtons[5],
      7: woActionButtons[7],
      array: woActionButtons.array,
    };
  }

  // Makeshift sites work orders

  if (siteModel === site_model.makeShift) {
    woActionButtons = {
      1: {
        ...woActionButtons[2],
        endPoint: workOrderAssignTechnician,
        texts: ["Start Working"],
        forceFlag: [1],
        description: "Please start this work order as HMC Supervisor",
      },
      2: {
        ...woActionButtons[3],
        description: isRedirected
          ? "This  work order is rejected by the MOH Engineer. Please review!"
          : woActionButtons[3]?.description,
      },
      3: woActionButtons[5],
      4: woActionButtons[7],
      array: woActionButtons.array,
    };
  }

  // IMC sites work orders

  if (siteModel === site_model.imc) {
    woActionButtons = {
      1: woActionButtons[1],
      2: woActionButtons[2],
      3: woActionButtons[3],
      4: woActionButtons[6],
      5: woActionButtons[7],
      array: woActionButtons.array,
    };
  }

  // ASCEND SERVICES sites work orders

  if (siteModel === site_model.ascendServices) {
    woActionButtons = {
      1: {
        ...woActionButtons[1],
        texts: [isRedirected ? "View Reason" : "Assign To"],
        components: [!isRedirected || "assignTo"],
        isDrawers: [!isRedirected],
        showIcons: [false],
      },
      2: {
        ...woActionButtons[2],
        texts: isRedirected ? ["View Reason"] : ["Assign To", "Complete Work order"],
        components: isRedirected ? [false] : ["assignTo", false],
        isDrawers: isRedirected ? [false] : [true, false],
        showIcons: [false, false],
        customClick: isRedirected ? [false] : [false, SelfAssignTo],
      },
      3: woActionButtons[3],
      4: woActionButtons[7],
      array: woActionButtons.array,
    };
  }

  return woActionButtons;
};

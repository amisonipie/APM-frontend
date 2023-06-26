import moment from "moment";
import { Table } from "reactstrap";
import React, { Fragment } from "react";
import { store } from "redux/storeConfig/store";
import { commonDrawer } from "redux/actions/drawer/drawerActions";
import Badge from "reactstrap/lib/Badge";
import { inventoryStatus, site_model } from "utility/config";
import { dateFormat } from "utility/helper/DateFormat";
import { RenderFile } from "utility/helper/renderFile";
import { fiveRandomNumbers } from "utility/transformers";
import CardBadge from "views/components/workOrders/CardView/Header/CardBadge";
import {
  getField,
  getICS,
  getIS,
  getWarrantyStatus,
} from "views/components/generalHelper";
import { arrayHead } from "utility/helper";
import ListActions from "views/components/ListActions";
import { apmModules } from "utility/helper/apmModules";
import {
  dateIconList,
  ticketIdIcon,
} from "views/components/workOrders/CardView/data";
import { arrowRightIcon } from "assets/icons/svgIcons";
import { history } from "utility/helper/history";

export const warrantiesIO = {
  warrantyEndDate: "",
  warrantyStartDate: "",
  warrantyCoverage: null,
  id: fiveRandomNumbers(),
};

// RPVIO = Replaced Parts Validation Initial Object
export const AWVIO = {
  warrantyEndDate: [],
  warrantyStartDate: [],
  warrantyCoverage: [],
};

export const WoHistoryColumns = [
  {
    name: "Work Orders",
    selector: "_id",
    sortable: true,
    style: {
      marginRight: "auto",
    },
    cell: (row) => (
      <div>
        {/* <figure
          className="cardView__header__ticketId--icon"
          // color="success"
          style={{
            color: "red",
            fill: "green",
            filter: "green",
          }}
        > */}
        <span className="">
          {" "}
          {ticketIdIcon}
        </span>
        {/* </figure> */}
        <span className="ml-2 font-weight-bold">
          #
          {row?.serial}
        </span>
      </div>
    ),
    width: "250px",
  },

  {
    name: "Type",
    selector: "type",
    sortable: true,
    reorder: true,
    cell: (row) => (
      <CardBadge text={row?.type || ""} customClasses="main m-0" />
    ),
    width: "100px",
  },
  {
    name: "Due Date",
    selector: "dueDate",
    sortable: true,
    reorder: true,
    cell: (row) => (row?.created_at ? (
      <div className="d-flex align-items-center">
        <figure className="mr-1 mb-0">{dateIconList}</figure>
        <span className="customDateColor">{dateFormat(row?.created_at)}</span>
      </div>
    ) : (
      <span>----</span>
    )),
    width: "150px",
  },
  {
    name: "Action",
    selector: "action",
    sortable: true,
    reorder: true,
    cell: (row) => (
      <figure
        className="mb-0 click-able"
        onClick={() => (
          store.dispatch(commonDrawer({ isOpen: false })),
          history.push(`work-orders/list/${row?._id}`)
          )}
      >
        {arrowRightIcon}
      </figure>
    ),
    right: true,
    width: "50px",
  },
];
export const inventoryColumns = (options) => [
  {
    title: "",
    name: "",
    dataIndex: "inventoryId",
    selector: "inventoryId",
    cell: (row) => (
      <ListActions
        module={apmModules.inventories.id}
        row={row}
        inventoryDetails
      />
    ),
    sortable: true,
    isListing: true,
    width: "70px",
    center: true,
  },
  {
    title: "ID",
    name: "ID",
    dataIndex: "inventoryId",
    selector: "inventoryId",
    sortable: true,
    isListing: true,
    center: true,
    width: "150px",
  },
  {
    title: "Name",
    name: "name",
    dataIndex: "equipment",
    selector: "equipment",
    cell: (row) => row?.equipment?.nameEnglish,
    sortable: true,
    isListing: true,
    width: "300px",
  },
  {
    title: "MANUFACTURER",
    name: "MANUFACTURER",
    dataIndex: "manufacturer",
    selector: "manufacturer",
    cell: (row) => row?.manufacturer?.name || "N/A",
    customCell: (row) => row?.manufacturer?.name || "N/A",
    sortable: true,
    width: "200px",
    isListing: true,
  },
  {
    title: "Model",
    name: "Model",
    dataIndex: "model",
    selector: "model",
    cell: (row) => row?.model || "N/A",
    customCell: (row) => row?.model || "N/A",
    sortable: true,
    center: true,
    width: "120px",
    isListing: true,
  },
  {
    title: "Serial Number",
    name: "Serial Number",
    dataIndex: "serialNumber",
    selector: "serialNumber",
    cell: (row) => row?.serialNumber || "N/A",
    customCell: (row) => row?.serialNumber || "N/A",
    sortable: true,
    center: true,
    width: "160px",
    isListing: true,
  },
  {
    title: "CLASS",
    name: "CLASS",
    dataIndex: "class",
    selector: "class",
    sortable: true,
    cell: (row) => (options?.inventory?.CLASS
          && options?.inventory?.CLASS[row?.class]?.LABEL)
        || "N/A",
    isListing: true,
    center: true,
  },
  {
    title: "Site",
    name: "Site",
    dataIndex: "lab",
    selector: "lab",
    cell: (row) => row?.lab?.site_name,
    sortable: true,
    width: "300px",
    isListing: true,
  },
  // {
  //   title: "Frequency",
  //   name: "Frequency",
  //   dataIndex: "pmFrequency",
  //   selector: "pmFrequency",
  //   cell: (row) =>
  //     (options?.inventory?.PM_FREQUENCY &&
  //       options?.inventory?.PM_FREQUENCY[row?.pmFrequency]?.LABEL) ||
  //     "N/A",
  //   sortable: true,
  //   width: "200px",
  //   center: true,
  //   isListing: true,
  // },
  // {
  //   title: "status",
  //   name: "status",
  //   dataIndex: "status",
  //   selector: "status",
  //   cell: (row) => {
  //     const color = row?.status === inventoryStatus.retired ? "red" : "green";
  //     return (
  //       <CardBadge
  //         text={getIS[row?.status || "IN_SERVICE"]}
  //         isIcon={true}
  //         customClasses={`${color} main`}
  //       />
  //     );
  //   },
  //   sortable: true,
  //   isListing: true,
  //   width: "150px",
  // },
  {
    title: "Warranty Status",
    name: "Warranty Status",
    dataIndex: "warrantyStatus",
    selector: "warrantyStatus",
    cell: (row) => {
      const color = row?.warrantyStatus === "OUT_OF_WARRANTY" ? "red" : "green";
      return (
        <CardBadge
          text={getWarrantyStatus[row?.warrantyStatus]}
          isIcon
          customClasses={`${color} main`}
        />
      );
    },
    sortable: true,
    isListing: true,

    width: "200px",
  },
  {
    title: "Next PM Date",
    name: "Next PM Date",
    dataIndex: "nextPmDate",
    selector: "nextPmDate",
    cell: (row) => row?.nextPmDate || "N/A",
    sortable: true,
    width: "200px",
    center: true,
    isListing: true,
  },
  // {
  //   title: "Required Time",
  //   name: "Required Time",
  //   dataIndex: "requiredTime",
  //   selector: "requiredTime",
  //   sortable: true,
  //   cell: (row) => <b>N/A</b>,
  //   // cell: (row) => moment(row?.requiredTime).format("DD-MM-YYYY") || "N/A",
  //   isListing: true,
  //   width: "200px",
  //   center: true,
  // },
  // {
  //   title: "Purchased Date",
  //   name: "Purchased Date",
  //   dataIndex: "purchasedDate",
  //   selector: "purchasedDate",
  //   sortable: true,
  //   cell: (row) => moment(row?.purchasedDate).format("DD-MM-YYYY") || "N/A",
  //   isListing: true,
  //   center: true,
  //   width: "200px",
  // },
  // {
  //   title: "Regtd Date",
  //   name: "Registered Date",
  //   dataIndex: "systemRegistrationDate",
  //   selector: "systemRegistrationDate",
  //   sortable: true,
  //   cell: (row) => moment(row?.systemRegistrationDate).format("DD-MM-YYYY"),
  //   isListing: true,
  //   center: true,
  //   width: "200px",
  // },
  // {
  //   title: "Agent",
  //   name: "Agent",
  //   dataIndex: "agent",
  //   selector: "agent",
  //   sortable: true,
  //   width: "200px",
  //   isListing: true,
  //   cell: (row) => row?.agent || "N/A",
  // },
];
export const handleExportContent = ({ data }) => {
  let exportData = [];
  let headers = [];

  data.map((item) => {
    let exportItem = item;
    const ticketCreateUrl = `${process?.env?.REACT_APP_INVENTORY_TICKET_CREATE_ROUTE_WITH_HOST}/${item?._id}`;
    inventoryColumns.map((colItem) => {
      if (Object.keys(item).includes(colItem.selector)) {
        exportItem = {
          ...exportItem,
          [colItem.selector]: colItem.customCell
            ? colItem.customCell(item)
            : colItem.cell
              ? colItem.cell(item)
              : item[colItem.selector],
        };
      }
    });
    exportData = [...exportData, { ...exportItem, ticketCreateUrl }];
    return { ...item, ticketCreateUrl };
  });
  headers = [
    ...inventoryColumns.filter((colItem) => colItem.selector !== "actions"),
    {
      title: "Ticket Create Link",
      dataIndex: "ticketCreateUrl",
    },
  ];
  return { data: exportData, headers };
};

export function ExpandableComponent({ data, options }) {
  return (
    <Table responsive striped className="expandable-table" bordered>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>HMC</td>
          <td>
            <Badge color="primary">{data?.hmc?.name}</Badge>
          </td>
        </tr>
        <tr>
          <td>Site</td>
          <td>{data?.lab?.site_name}</td>
        </tr>
        <tr>
          <td>Region</td>
          <td>{data?.lab?.region?.name}</td>
        </tr>
        <tr>
          <td>Asset Type</td>
          <td>
            <Badge color="primary" className="text-capitalize">
              {getField(data?.equipment?.type)}
            </Badge>
          </td>
        </tr>

        <tr>
          <td>SUPPLIER</td>
          <td>{data?.agent || "N/A"}</td>
        </tr>
        <tr>
          <td>MANUFACTURER</td>
          <td>{data?.manufacturer?.name || "N/A"}</td>
        </tr>
        <tr>
          <td>Sequence</td>
          <td>{data?.sequence || "N/A"}</td>
        </tr>
        <tr>
          <td>MODEL</td>
          <td>{data?.model || "N/A"}</td>
        </tr>
        <tr>
          <td>SERIAL NUMBER</td>
          <td>{data?.serialNumber || "N/A"}</td>
        </tr>
        <tr>
          <td>Acquisition Method</td>
          <td>
            <Badge color="primary">
              {(options?.inventory?.ACQUISITION
                && options?.inventory?.ACQUISITION[data?.acquisitionMethod]
                  ?.LABEL)
                || "N/A"}
            </Badge>
          </td>
        </tr>
        <tr>
          <td>Purchase Price</td>
          <td>
            <Badge color="primary">{data?.purchasePrice || "N/A"}</Badge>
          </td>
        </tr>
        <tr>
          <td>System Registration Date</td>
          <td>
            {(data?.systemRegistrationDate
              && dateFormat(data?.systemRegistrationDate))
              || "N/A"}
          </td>
        </tr>
        <tr>
          <td>WARRANTY</td>
          <td>
            {(options?.inventory?.WARRANTY
              && options?.inventory?.WARRANTY[data?.warrantyStatus]?.LABEL)
              || "N/A"}
          </td>
        </tr>
        <tr>
          <td>INSTALLATION DATE</td>
          <td>
            {(data?.installationDate && dateFormat(data?.installationDate))
              || "N/A"}
          </td>
        </tr>
        <tr>
          <td>WARRANTY EXPIRATION DATE</td>
          <td>
            {(data?.warrantyExpirationDate
              && dateFormat(data?.warrantyExpirationDate))
              || "N/A"}
          </td>
        </tr>
        <tr>
          <td>PM Required</td>
          <td>
            <Badge color="primary">{data?.pmRequired ? "Yes" : "No"}</Badge>
          </td>
        </tr>
        {data?.pmRequired && (
          <>
            <tr>
              <td>PM Frequency</td>
              <td>
                {(options?.inventory?.PM_FREQUENCY
                  && options?.inventory?.PM_FREQUENCY[data?.pmFrequency]?.LABEL)
                  || "N/A"}
              </td>
            </tr>
            <tr>
              <td>PM StartDate</td>
              <td>{dateFormat(data?.pmStartDate) || "N/A"}</td>
            </tr>
            <tr>
              <td>PM Done By</td>
              <td>
                {(options?.inventory?.PM_DONE_BY
                  && options?.inventory?.PM_DONE_BY[data?.pmDoneBy]?.LABEL)
                  || "N/A"}
              </td>
            </tr>
            {data?.pmDoneBy === "3RD_PARTY_VENDOR" && (
              <tr>
                <td>PM Vendor</td>
                <td>{data?.pmVendor || "N/A"}</td>
              </tr>
            )}
          </>
        )}
        <tr>
          <td>Site Department</td>
          <td>{data?.labDepartment || "N/A"}</td>
        </tr>
        <tr>
          <td>Maintenance Department</td>
          <td>{arrayHead(data?.maintenance_departments)?.name || "N/A"}</td>
        </tr>
        <tr>
          <td>Building</td>
          <td>{data?.building || "N/A"}</td>
        </tr>
        {/* <tr>
          <td>Zone</td>
          <td>{data?.zone || "N/A"}</td>
        </tr> */}

        <tr>
          <td>Floor</td>
          <td>{data?.floor || "N/A"}</td>
        </tr>

        <tr>
          <td>Room</td>
          <td>{data?.room || "N/A"}</td>
        </tr>
        <tr>
          <td>City</td>
          <td>{data?.city || "N/A"}</td>
        </tr>
        <tr>
          <td>UDI Name</td>
          <td>{data?.udiName || "N/A"}</td>
        </tr>
        <tr>
          <td>UDI Code</td>
          <td>{data?.udiCode || "N/A"}</td>
        </tr>
        <tr>
          <td>IP Address</td>
          <td>{data?.ipAddress || "N/A"}</td>
        </tr>
        <tr>
          <td>MAC Address</td>
          <td>{data?.macAddress || "N/A"}</td>
        </tr>

        <tr>
          <td>Department Move Date</td>
          <td>{data?.departmentMoveDate || "N/A"}</td>
        </tr>

        <tr>
          <td>Reference Number</td>
          <td>{data?.referenceNumber || "N/A"}</td>
        </tr>
        {data?.lab?.model === site_model.imc && (
          <>
            <tr>
              <td>Purchase Order Number</td>
              <td>{data?.purchaseOrderNumber || "N/A"}</td>
            </tr>
            <tr>
              <td>Purchase Order Date</td>
              <td>{data?.purchaseOrderDate || "N/A"}</td>
            </tr>
            <tr>
              <td>Asset Description</td>
              <td>{data?.assetDescription || "N/A"}</td>
            </tr>

            <tr>
              <td>Asset Type</td>
              <td>{data?.assetType || "N/A"}</td>
            </tr>
            <tr>
              <td>Asset Priority</td>
              <td>
                {(options?.inventory?.ASSET_PRIORITY
                  && options?.inventory?.ASSET_PRIORITY[data?.assetPriority]
                    ?.LABEL)
                  || "N/A"}
              </td>
            </tr>
            <tr>
              <td>Asset Severity</td>
              <td>
                {(options?.inventory?.ASSET_SEVERITY
                  && options?.inventory?.ASSET_SEVERITY[data?.assetSeverity]
                    ?.LABEL)
                  || "N/A"}
              </td>
            </tr>
            <tr>
              <td>Operational Manual</td>
              <td>{data?.operationalManual || "N/A"}</td>
            </tr>
            <tr>
              <td>User Trained</td>
              <td>
                {(options?.inventory?.USER_TRAINED
                  && options?.inventory?.USER_TRAINED[data?.userTrained]?.LABEL)
                  || "N/A"}
              </td>
            </tr>
            <tr>
              <td>Service Manual</td>
              <td>{data?.serviceManual || "N/A"}</td>
            </tr>
            <tr>
              <td>Asset Plug</td>
              <td>
                {(options?.inventory?.ASSET_PLUG
                  && options?.inventory?.ASSET_PLUG[data?.assetPlug]?.LABEL)
                  || "N/A"}
              </td>
            </tr>
            <tr>
              <td>Category Number</td>
              <td>
                {(options?.inventory?.CATEGORY_NUMBER
                  && options?.inventory?.CATEGORY_NUMBER[data?.categoryNumber]
                    ?.LABEL)
                  || "N/A"}
              </td>
            </tr>
            <tr>
              <td>Location Description</td>
              <td>{data?.locationDescription || "N/A"}</td>
            </tr>
          </>
        )}
        <tr>
          <td>Current Department</td>
          <td>
            {" "}
            {data?.site_department?.name || "N/A"}
          </td>
        </tr>
        {data?.warrantiesFormatted?.length > 0 && (
          <tr>
            <td>Warranties</td>
            <td>
              <ul className="warrantiesList">
                <li>#</li>
                <li>Coverage</li>
                <li>Start Date</li>
                <li>End Date</li>
              </ul>
              {data?.warrantiesFormatted?.map((item, index) => (
                <ul key={index} className="warrantiesList">
                  <li>{index + 1}</li>
                  <li>
                    {options?.inventory?.WARRANTY_COVERAGE
                        && options?.inventory?.WARRANTY_COVERAGE[
                          item?.warrantyCoverage
                        ]?.LABEL}
                  </li>
                  <li>{dateFormat(item?.warrantyStartDate)}</li>
                  <li>{dateFormat(item?.warrantyEndDate)}</li>
                </ul>
              )) || "N/A"}
            </td>
          </tr>
        )}
        <tr>
          <td>Utilization</td>
          <td>
            {(options?.inventory?.UTILIZATION
              && options?.inventory?.UTILIZATION[data?.utilization]?.LABEL)
              || "N/A"}
          </td>
        </tr>

        <tr>
          <td>Technical Performance</td>
          <td>
            {(options?.inventory?.TECHNICAL_PERFORMANCE
              && options?.inventory?.TECHNICAL_PERFORMANCE[
                data?.technicalPerformance
              ]?.LABEL)
              || "N/A"}
          </td>
        </tr>

        <tr>
          <td>Failure Frequency</td>
          <td>
            {(options?.inventory?.FAILURE_FREQUENCY
              && options?.inventory?.FAILURE_FREQUENCY[data?.failureFrequency]
                ?.LABEL)
              || "N/A"}
          </td>
        </tr>

        <tr>
          <td>Estimated Age</td>
          <td>
            {(options?.inventory?.ESTIMATED_AGE
              && options?.inventory?.ESTIMATED_AGE[data?.estimatedAge]?.LABEL)
              || "N/A"}
          </td>
        </tr>

        <tr>
          <td>Due For Replacement</td>
          <td>
            {(options?.inventory?.DUE_FOR_REPLACEMENT
              && options?.inventory?.DUE_FOR_REPLACEMENT[data?.dueForReplacement]
                ?.LABEL)
              || "N/A"}
          </td>
        </tr>
        <tr>
          <td>Attachments</td>
          <td className="d-flex flex-wrap">
            {(data?.fileUpload?.length > 0
              && data?.fileUpload?.map((item, index) => <RenderFile key={index} file={item} />))
              || "N/A"}
          </td>
        </tr>
      </tbody>
    </Table>

  // <Details assetInfo={assetInfo} />
  );
}

export const HandleChangeConditions = ({
  key,
  valuesArr,
  stepToUpdate,
  stateToUpdate,
  indexOfUpdatedOption,
  finalValuestoSubmit,
}) => {
  if (key === "lab_id") {
    stepToUpdate.fields[1] = {
      ...valuesArr[0].fields[1],
      type: "selection",
    };
    stepToUpdate.fields[2] = {
      ...valuesArr[0].fields[2],
    };
    stepToUpdate.fields[indexOfUpdatedOption] = stateToUpdate;
  } else {
    stepToUpdate.fields[indexOfUpdatedOption] = stateToUpdate;
  }
  return { updatedStep: stepToUpdate };
};

import _ from "lodash";
import Swal from "sweetalert2";
import { SC } from "utility/helper";
import FileUploader from "views/components/DropZone";
import withReactContent from "sweetalert2-react-content";
import React, { Fragment, useEffect, useState } from "react";
import { generalExcelImport, getImportLogsUrl } from "utility/helper/endpoints";
import {
  DashboardToast,
} from "views/components";
import BuildingIcon from "assets/icons/buildings.svg";
import UploadedFilesTable from "./UploadedFilesTable";
import { SuperAdminContent } from "./SuperAdminContent";

const MySwal = withReactContent(Swal);

function ImportAndCompare({
  data,
  statusCardData,
  cardsData,
  stateCardData,
  getDashboardData,
}) {
  const toastCard = {
    icon: BuildingIcon,
    text: "No. of upcoming out of warranty assets",
    value: _.get(data, "inventory.expiring", 0),
    color: "rgba(244, 165, 94, 0.25)",
  };
  const [UFs, setUFs] = useState([]);
  const [importLogs, setImportLogs] = useState([]);
  const [importLogsLoading, setImportLogsLoading] = useState(false);
  const [fileToImport, setFileToImport] = useState("");
  const [fileImportLoading, setFileImportLoading] = useState(false);

  useEffect(() => {
    getImportLogs();
  }, []);

  const getImportLogs = async () => {
    setImportLogsLoading(true);
    try {
      const response = await SC.getCall({
        url: getImportLogsUrl,
      });
      setImportLogs(response?.data?.data?.logs || []);
      setImportLogsLoading(false);
    } catch (error) {
      console.log(error?.response);
      setImportLogsLoading(false);
    }
  };

  const handleImport = (fileID) => {
    setFileToImport(fileID);
    return MySwal.fire({
      title: "Are you sure you want to import?",
      icon: "warning",
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes",
    }).then((result, error) => {
      if (result.isConfirmed) {
        importFile(fileID);
      }
    });
  };

  const importFile = async (fileID) => {
    setFileImportLoading(true);
    try {
      await SC.postCall({
        url: generalExcelImport,
        data: {
          logID: fileID,
        },
      });
      setFileToImport("");
      getImportLogs();
      getDashboardData({ isImport: true });
      setFileImportLoading(false);
    } catch (error) {
      console.log(error?.response);
      setFileImportLoading(false);
    }
  };

  const handleFilesChange = (e, isDelete) => {
    if (!isDelete) {
      setUFs([...e]);
      getImportLogs();
    }
  };
  return (
    <>
      <DashboardToast card={toastCard} />
      {Object.keys(data)?.length ? (
        <div className="importBaseOverview">
          <h2 className="my-5">Import Base Overview</h2>
          <SuperAdminContent
            data={data}
            statusCardData={statusCardData}
            cardsData={cardsData}
            stateCardData={stateCardData}
          />
        </div>
      ) : (
        <div />
      )}
      <h1>Import and Compare</h1>
      <FileUploader
        handleChange={(e, isDelete) => handleFilesChange(e, isDelete)}
        accept=".xlsx, .xls"
        size={5000000}
        value={UFs}
        uploaderText="Upload File (xlsx)"
        onlyUploader
        customClasses="bg-transparent mb-0"
        url="/import/log/create"
        single
        privateUpload
        notHyperLink
        hideOnComplete
      />
      <UploadedFilesTable
        importLogs={importLogs}
        importLogsLoading={importLogsLoading}
        // deleteRow={deleteRow}
        handleImport={handleImport}
        fileToImport={fileToImport}
        fileImportLoading={fileImportLoading}
      />
    </>
  );
}

export default ImportAndCompare;

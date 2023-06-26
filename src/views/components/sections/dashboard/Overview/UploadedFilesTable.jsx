import moment from "moment";
import { Table } from "reactstrap";
import React, { Fragment } from "react";
import PrimaryButton from "views/components/PrimaryButton";

function UploadedFilesTable(props) {
  const importStatus = {
    imported: "IMPORTED",
    unImported: "UNIMPORTED",
  };

  return (
    <>
      {props?.importLogsLoading && <h3>Getting logs...</h3>}
      <Table bordered className="table-dark">
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Progress</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {props?.importLogs?.map((item, index) => (
            <tr key={index} className="">
              <td>{index + 1}</td>
              <td>{item?.filename}</td>
              <td>{`#${item?.type}`}</td>
              <td>{item?.status}</td>
              <td>{moment(item?.created_at).format("lll")}</td>
              <td>{item?.progress?.map((item) => item).join(" , ")}</td>
              <td className="text-right">
                <div className="btn-group">
                  {item?.status === importStatus.unImported && (
                    <PrimaryButton
                      isDisabled={props?.fileImportLoading}
                      text={
                        (props?.fileImportLoading
                            && item?._id === props?.fileToImport
                            && "importing")
                          || "Import"
                      }
                      customClasses="solid"
                      onClick={() => props.handleImport(item?._id)}
                    />
                  )}
                  {/* <PrimaryButton
                      isDisabled={props?.fileImportLoading}
                      text="Remove"
                      onClick={() => props?.deleteRow(item?.id)}
                    /> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UploadedFilesTable;

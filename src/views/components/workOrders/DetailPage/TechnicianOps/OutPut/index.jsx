import React from "react";
import HeadingIC from "views/components/Heading";
import { splitData } from "utility/transformers";
import { RenderFile } from "utility/helper/renderFile";
import { timeConvert } from "utility/helper/DateFormat";
import {
  Card, CardBody, CardHeader, Table,
} from "reactstrap";
import {
  attachmentIcon,
  woFormIcon,
} from "assets/icons/svgIcons";

function WorkOrderFormDetail({
  heading = "Failure Type",
  description = "Component Failure",
  actions,
  parts,
  results,
  files,
  hideDivider,
  isVisible,
}) {
  return isVisible ? (
    <div className="workOrder_detail__technicianForm-info">
      {!heading?.icon && (
        <h5 className="workOrder_detail__technicianForm-info-heading">
          {heading}
        </h5>
      )}
      {heading?.icon && (
        <h5 className="workOrder_detail__technicianForm-info-heading">
          {heading?.icon}
          &nbsp;
          {heading?.text}
        </h5>
      )}
      {actions && actions?.length > 0 ? (
        <div className="workOrder_detail__technicianForm-actions-container">
          {actions?.map((action, idx) => {
            const imgSrc = action?.status ? "/check.png" : "/cross.png";
            return (
              <div
                className="workOrder_detail__technicianForm-actions"
                key={idx}
              >
                <p className="workOrder_detail__technicianForm-actions-text text-capitalize">
                  {splitData(action?.name, "_", " ")}
                </p>
                <img
                  src={imgSrc}
                  className="workOrder_detail__technicianForm-info-icon"
                  alt="form-info"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {!parts && !results && !files && (
            <p className="workOrder_detail__technicianForm-info-desc text-capitalize">
              {description}
            </p>
          )}
        </>
      )}
      {parts && (
        <Table className="workOrder_detail__technicianForm-parts" bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Part Name</th>
              <th>Part Number</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            {parts?.map((part, idx) => (
              <tr className="" key={idx}>
                <td className="">{idx + 1}</td>
                <td className="">{part?.part_name}</td>
                <td className="">{part?.part_number}</td>
                <td className="">{part?.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {results && (
        <div className="workOrder_detail__technicianForm-results">
          {results.map((result, idx) => (
            <div
              className="workOrder_detail__technicianForm-results-result"
              key={idx}
            >
              <p className="workOrder_detail__technicianForm-results-result-text text-capitalize">
                {splitData(result?.name, "_", " ")}
              </p>
              <p
                className="workOrder_detail__technicianForm-results-result-text"
                style={
                  result?.status === "Fail"
                    ? { color: "#EB5757" }
                    : result?.status === "N/A"
                      ? { color: "#2a347b" }
                      : { color: "#70E255" }
                }
              >
                {result?.status}
              </p>
            </div>
          ))}
        </div>
      )}
      {files || <></>}
      {hideDivider ? (
        <></>
      ) : (
        <div className="workOrder_detail__technicianForm-info-divider" />
      )}
    </div>
  ) : (
    <div />
  );
}

function TechnicianFormView({ technicianForm, technicianCols }) {
  const { hours, minutes } = timeConvert(technicianForm?.labor_time);
  const labourTime = `${hours} : ${minutes}`;
  const failure_types = technicianForm?.failure_type || {};
  if (failure_types?.other) {
    delete failure_types?.other;
  }
  const failureTypes = Object.entries(failure_types)
    ?.filter(([item, value]) => value)
    ?.map(([item, value]) => ({
      name: item === "other_text" ? value : item,
      status: value,
    }));
  const checkList = Object.entries(technicianForm?.checklist || {})?.map(
    ([item, value]) => ({
      name: item,
      status: value === 1 ? "Pass" : value === 0 ? "Fail" : "N/A",
    }),
  );
  const actionsTaken = Object.entries(technicianForm?.action_taken || {})
    ?.filter(([item, value]) => value)
    ?.map(([item, value]) => ({
      name: item,
      status: value,
    }));

  const replacedParts = technicianForm?.replaced_parts || [];

  return (
    <section
      className={`workOrder_detail__technicianForm p-0 ${technicianCols}`}
    >
      <Card>
        <CardHeader>
          <HeadingIC
            icon={woFormIcon}
            label="Work Order Form"
            className="workOrder_detail__technicianForm__heading"
          />
        </CardHeader>
        <CardBody className="workOrder_detail__technicianForm__body">
          <div className="workOrder_detail__technicianForm">
            <WorkOrderFormDetail
              heading="Status"
              description={splitData(technicianForm?.status, "_", " ")}
              isVisible={technicianForm?.status}
            />
            <WorkOrderFormDetail
              heading="Failure Type"
              actions={failureTypes}
              isVisible={failureTypes?.length > 0}
            />
            <WorkOrderFormDetail
              heading="Found Failure"
              description={<span dangerouslySetInnerHTML={{ __html: technicianForm?.found_failure ? technicianForm?.found_failure : "No Failure Found" }} />}
              isVisible={technicianForm?.found_failure}
            />
            <WorkOrderFormDetail
              heading="Checklist"
              results={checkList}
              isVisible={checkList?.length > 0}
            />
            <WorkOrderFormDetail
              heading="Action Taken"
              actions={actionsTaken}
              isVisible={actionsTaken?.length > 0}
            />

            <WorkOrderFormDetail
              heading="Replaced Parts"
              parts={replacedParts}
              isVisible={replacedParts?.length > 0}
            />

            <WorkOrderFormDetail
              heading="Work Order Summary"
              description={<span dangerouslySetInnerHTML={{ __html: technicianForm?.work_order_summary }} />}
              isVisible={technicianForm?.work_order_summary}
            />

            <WorkOrderFormDetail
              heading="Labour Time"
              description={labourTime}
              isVisible
            />

            {technicianForm?.fileUpload?.filter((item) => !item?.error)
              .length ? (
                <WorkOrderFormDetail
                  heading={{
                    icon: <figure>{attachmentIcon}</figure>,
                    text: "Attachments",
                  }}
                  files={(
                    <div className="workOrder_detail__steps__footer__files">
                      {technicianForm?.fileUpload
                        ?.filter((item) => !item?.error)
                        ?.map((item, aIndex) => <RenderFile key={aIndex} file={item} />)}
                    </div>
                  )}
                  isVisible={technicianForm?.fileUpload?.length > 0}
                  hideDivider
                />
              ) : (
                <></>
              )}
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
export default TechnicianFormView;

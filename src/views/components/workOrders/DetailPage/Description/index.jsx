import React, { Fragment } from "react";
import { CardBody, CardFooter } from "reactstrap";
import { RenderFile } from "utility/helper/renderFile";
import {
  attachmentIcon,
  departmentIcon,
  failureIcon,
} from "assets/icons/svgIcons";
import { observer } from "mobx-react-lite";

const DescriptionAndFiles = observer(({ state }) => (
  <>
    <CardBody className="workOrder_detail__steps__body">
      <div className="workOrder_detail__steps__body__heading">
        <figure>{failureIcon}</figure>
        <h2>Reported Failure</h2>
      </div>
      <p className="workOrder_detail__steps__body__desc">
        <span dangerouslySetInnerHTML={{ __html: state?.data?.description }} />
      </p>
      {state?.data?.department && (
        <div className="mt-3">
          <div className="workOrder_detail__steps__body__heading ">
            <figure>{departmentIcon}</figure>
            <h2>Reported Department</h2>
          </div>
          <p className="workOrder_detail__steps__body__desc">
            {state?.data?.department}
          </p>
        </div>
      )}
    </CardBody>
    {state?.data?.uploadedFiles?.length > 0 && (
      <CardFooter className="workOrder_detail__steps__footer">
        <div className="workOrder_detail__steps__footer__heading">
          <figure>{attachmentIcon}</figure>
          <h2>attachments</h2>
        </div>
        <div className="workOrder_detail__steps__footer__files">
          {state?.data?.uploadedFiles?.map((item, aIndex) => <RenderFile key={aIndex} file={item} />)}
        </div>
      </CardFooter>
    )}
  </>
));

export default DescriptionAndFiles;

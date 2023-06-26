import { observer } from "mobx-react-lite";
import React, { useState, Fragment } from "react";
import {
  Card, CardBody, CardHeader, CardTitle,
} from "reactstrap";

import { BasicDropzone } from "./BasicDropZone";

const FileUploader = observer((props) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  return (
    <>
      {/* <UploadProgressBar uploadProgress={uploadProgress} /> */}
      <Card className={`${props?.customClasses}`}>
        {!props?.onlyUploader && (
          <CardHeader>
            <CardTitle>
              {props?.heading || "Attachments"}
              {" "}
            </CardTitle>
            {!props.required && (
              <CardTitle className="text-success"> Optional</CardTitle>
            )}
          </CardHeader>
        )}
        <CardBody>
          <BasicDropzone
            ref={props.fileRef}
            handleChange={props.handleChange}
            name={props.name}
            accept={props.accept}
            size={props.size}
            value={props.value}
            url={props.url}
            step={props.step}
            single={props.single}
            stepIndex={props.stepIndex}
            progressCB={setUploadProgress}
            uploadProgress={uploadProgress}
            fileUploadName={props.fileUploadName}
            notHyperLink={props?.notHyperLink}
            {...props}
          />
        </CardBody>
      </Card>
    </>
  );
});

export default FileUploader;

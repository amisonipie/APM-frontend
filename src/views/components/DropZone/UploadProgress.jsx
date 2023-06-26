/* eslint-disable multiline-ternary */
import React from "react";
import { Progress } from "reactstrap";

function UploadProgressBar({ uploadProgress, className, isError }) {
  return (
    <Progress
      bar
      animated={uploadProgress !== 100}
      color={`${
        isError || uploadProgress <= 25
          ? "danger"
          : uploadProgress <= 50
            ? "warning"
            : uploadProgress <= 99
              ? "info"
              : "success"
      }`}
      className={`${className}`}
      // className={`${
      //   (uploadProgress === 0 || uploadProgress === 100) && "d-none"
      // }`}
      value={uploadProgress || (isError && 100)}
    >
      {/* {uploadProgress}% */}
    </Progress>
  );
}

export default UploadProgressBar;

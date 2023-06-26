import React from "react";

import { UFIcon } from "./UFIcon";
import { getFileExtension } from "../transformers";

export function RenderFile(props) {
  const { file } = props;
  const fileExt = file ? getFileExtension(file) : null;
  const ImageTypeFiles = [
    "PNG",
    "png",
    "JPG",
    "jpg",
    "JPEG",
    "jpeg",
    // "pdf",
    // "PDF",
    // "SVG",
    // "svg",
    // "xlsx",
    // "XLSX",
    // "xls",
    // "XLS",
  ];
  const isImageType = ImageTypeFiles.includes(fileExt);

  return (
    (file && (
      <a
        href={file}
        className={`workOrder_detail__steps__footer__files__box ${
          !isImageType && "transparent"
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {isImageType
          ? (
            <img src={file} alt={file} width="40px" height="40px" />
          )
          : (
            <figure>{UFIcon(fileExt)}</figure>
          )}
      </a>
    ))
    || "N/A"
  );
}

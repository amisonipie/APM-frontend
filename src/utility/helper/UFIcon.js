import {
  docTypeIcon,
  jpgTypeIcon,
  pdfTypeIcon,
  pngTypeIcon,
  svgTypeIcon,
  xlsTypeIcon,
} from "assets/icons/svgIcons";

// Uploaded File Icon
export const UFIcon = (type) => {
  switch (type) {
  case "jpg":
    return jpgTypeIcon;
  case "png":
    return pngTypeIcon;
  case "pdf":
    return pdfTypeIcon;
  case "xls":
    return xlsTypeIcon;
  case "xlsx":
    return xlsTypeIcon;
  case "doc":
    return docTypeIcon;
  case "docx":
    return docTypeIcon;
  case "svg":
    return svgTypeIcon;
  default:
    return jpgTypeIcon;
  }
};

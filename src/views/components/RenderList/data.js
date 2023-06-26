import React from "react";

export const initialFilters = {
  keyword: "",
};

export const initialPaginationObject = {
  per_page: 20,
  page: 1,
};

export const initialActiveTabObject = {
  count: "1",
  status: "",
  site_models: [],
};

export const downArrowIcon = (
  <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.00014 6.60047C6.47514 6.60047 5.95014 6.39797 5.55264 6.00047L0.662637 1.11047C0.445137 0.892968 0.445137 0.532969 0.662637 0.315469C0.880137 0.0979688 1.24014 0.0979688 1.45764 0.315469L6.34764 5.20547C6.70764 5.56547 7.29264 5.56547 7.65264 5.20547L12.5426 0.315469C12.7601 0.0979688 13.1201 0.0979688 13.3376 0.315469C13.5551 0.532969 13.5551 0.892968 13.3376 1.11047L8.44764 6.00047C8.05014 6.39797 7.52514 6.60047 7.00014 6.60047Z" fill="#2A347B" />
  </svg>
);

export const filterIcon = (
  <svg
    width="27"
    height="24"
    viewBox="0 0 27 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6.5L21 6.5"
      stroke="#1A355E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 11.3667L19 11.3667"
      stroke="#1A355E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 16.5L17 16.5"
      stroke="#1A355E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const searchIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="#959DB2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 22L20 20"
      stroke="#959DB2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const cardViewLogo = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4.26V1.99C11 1.285 10.68 1 9.885 1H7.865C7.07 1 6.75 1.285 6.75 1.99V4.255C6.75 4.965 7.07 5.245 7.865 5.245H9.885C10.68 5.25 11 4.965 11 4.26Z" fill="#959DB2" />
    <path d="M11 9.885V7.865C11 7.07 10.68 6.75 9.885 6.75H7.865C7.07 6.75 6.75 7.07 6.75 7.865V9.885C6.75 10.68 7.07 11 7.865 11H9.885C10.68 11 11 10.68 11 9.885Z" fill="#959DB2" />
    <path d="M5.25 4.26V1.99C5.25 1.285 4.93 1 4.135 1H2.115C1.32 1 1 1.285 1 1.99V4.255C1 4.965 1.32 5.245 2.115 5.245H4.135C4.93 5.25 5.25 4.965 5.25 4.26Z" fill="#959DB2" />
    <path d="M5.25 9.885V7.865C5.25 7.07 4.93 6.75 4.135 6.75H2.115C1.32 6.75 1 7.07 1 7.865V9.885C1 10.68 1.32 11 2.115 11H4.135C4.93 11 5.25 10.68 5.25 9.885Z" fill="#959DB2" />
  </svg>
);
export const rowViewLogo = (
  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.8071 6.75H2.90715C2.15715 6.75 1.85715 7.07 1.85715 7.865V9.885C1.85715 10.68 2.15715 11 2.90715 11H10.8071C11.5571 11 11.8571 10.68 11.8571 9.885V7.865C11.8571 7.07 11.5571 6.75 10.8071 6.75Z" fill="#959DB2" />
    <path d="M10.8071 1H2.90715C2.15715 1 1.85715 1.32 1.85715 2.115V4.135C1.85715 4.93 2.15715 5.25 2.90715 5.25H10.8071C11.5571 5.25 11.8571 4.93 11.8571 4.135V2.115C11.8571 1.32 11.5571 1 10.8071 1Z" fill="#959DB2" />
  </svg>
);
export const reloadIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56"
      stroke="#51459E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

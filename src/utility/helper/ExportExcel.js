import XLSX from "xlsx";
import { SC } from "utility/helper";
import { Spinner } from "reactstrap";
import { ExportSheet } from "react-xlsx-sheet";
import React, { Component, Fragment } from "react";
import PrimaryButton from "views/components/PrimaryButton";

const exportIcon = (
  <svg
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.001 13.5411C9.58701 13.5411 9.25101 13.2051 9.25101 12.7911V0.750092C9.25101 0.336092 9.58701 9.15527e-05 10.001 9.15527e-05C10.415 9.15527e-05 10.751 0.336092 10.751 0.750092V12.7911C10.751 13.2051 10.415 13.5411 10.001 13.5411Z"
      fill="#51459E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.001 13.5411C9.80201 13.5411 9.61001 13.4621 9.47001 13.3201L6.55401 10.3931C6.26201 10.0991 6.26301 9.62409 6.55601 9.33209C6.85001 9.04009 7.32401 9.04009 7.61601 9.33409L10.001 11.7291L12.386 9.33409C12.678 9.04009 13.152 9.04009 13.446 9.33209C13.739 9.62409 13.74 10.0991 13.448 10.3931L10.532 13.3201C10.392 13.4621 10.2 13.5411 10.001 13.5411Z"
      fill="#51459E"
    />
    <mask
      id="mask0_109_398"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="4"
      width="20"
      height="15"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.000213623 4.7326H20V18.4766H0.000213623V4.7326Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_109_398)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5752 18.4766H4.43521C1.99021 18.4766 0.000213623 16.4876 0.000213623 14.0416V9.1566C0.000213623 6.7166 1.98521 4.7326 4.42621 4.7326H5.36721C5.78121 4.7326 6.11721 5.0686 6.11721 5.4826C6.11721 5.89661 5.78121 6.2326 5.36721 6.2326H4.42621C2.81221 6.2326 1.50021 7.5436 1.50021 9.1566V14.0416C1.50021 15.6606 2.81621 16.9766 4.43521 16.9766H15.5752C17.1872 16.9766 18.5002 15.6636 18.5002 14.0516V9.1676C18.5002 7.5486 17.1832 6.2326 15.5662 6.2326H14.6342C14.2202 6.2326 13.8842 5.89661 13.8842 5.4826C13.8842 5.0686 14.2202 4.7326 14.6342 4.7326H15.5662C18.0112 4.7326 20.0002 6.7226 20.0002 9.1676V14.0516C20.0002 16.4916 18.0142 18.4766 15.5752 18.4766Z"
        fill="#51459E"
      />
    </g>
  </svg>
);
class ExportExcel extends Component {
  constructor(props) {
    super(props);
    this.clickRef = React.createRef();
  }

  state = {
    loading: false,
    rangePicker: this.props.rangePicker,
    per_page: this.props.per_page,
    data: [],
    headers: [],
  };

  getData = () => {
    const { exportFilter, endPoint, handleExportContent } = this.props;
    const filter = {
      // ...exportFilter
    };
    this.setState({ loading: true });

    SC.getCall({ url: endPoint, params: filter }).then((response) => {
      if (response.status === 200 && response.data.data) {
        const { data, headers } = handleExportContent({
          data: response.data.data,
        });

        this.setState(
          {
            data,
            headers,
            loading: false,
          },
          () => this.clickRef.click(),
        );
      }
    });
  };

  render() {
    const { data: stateData, loading, headers: stateHeaders } = this.state;
    const {
      apiCall, fileName, headers, data,
    } = this.props;
    const exportHeaders = apiCall ? stateHeaders : headers;
    const exportData = apiCall ? stateData : data;
    return (
      <>
        <PrimaryButton
          onClick={apiCall ? () => this.getData() : () => this.clickRef.click()}
          icon={
            loading
              ? (
                <Spinner className="mr-1" color="light" size={10} />
              )
              : (
                exportIcon
              )
          }
          customClasses="ml-1"
          customIconClasses="path"
          toolTip="Export"
          text={loading ? "Exporting..." : null}
        />

        <ExportSheet
          header={exportHeaders}
          fileName={fileName}
          dataSource={exportData}
          xlsx={XLSX}
          isRequiredNameDate={false}
        >
          <button hidden ref={(r) => (this.clickRef = r)}>
            click me
          </button>
        </ExportSheet>
      </>
    );
  }
}

export default ExportExcel;

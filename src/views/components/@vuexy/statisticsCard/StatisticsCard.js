import React from "react";
import { Card, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

class StatisticsCards extends React.Component {
  statisticsCardOptions = {
    chart: {
      id: this.props?.options?.id || "",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      show: false,
    },
    colors: [this.props?.options?.color || ""],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100],
      },
    },

    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      x: { show: false },
      y: { show: false },
    },
  };

  render() {
    return (
      <Card>
        <CardBody
          className={`${
            this.props.className ? this.props.className : "stats-card-body"
          } d-flex ${
            !this.props.iconRight && !this.props.hideChart
              ? "flex-column align-items-start"
              : this.props.iconRight
                ? "justify-content-between flex-row-reverse align-items-center"
                : this.props.hideChart && !this.props.iconRight
                  ? "justify-content-center flex-column text-center"
                  : null
          } ${!this.props.hideChart ? "pb-0" : "pb-2"} pt-2`}
        >
          <div
            className={`icon-section ${
              this.props.iconClickable ? "icon-clickable" : ""
            }`}
            onClick={this.props.onClick}
          >
            <div
              className={`avatar avatar-stats p-50 m-0 ${
                this.props.iconBg
                  ? `bg-rgba-${this.props.iconBg}`
                  : "bg-rgba-primary"
              }`}
            >
              <div className="avatar-content">{this.props.icon}</div>
            </div>
          </div>
          <div className="title-section">
            <h2 className="text-bold-600 mt-1 mb-25">{this.props.stat}</h2>
            <p className={`mb-0 ${this.props.statTitleClasses}`}>
              {this.props.statTitle}
            </p>
          </div>
        </CardBody>
        {!this.props.hideChart && (
          <Chart
            options={this.statisticsCardOptions}
            series={this.props.series}
            type={this.props.type}
            height={this.props.height ? this.props.height : 100}
          />
        )}
      </Card>
    );
  }
}
export default StatisticsCards;

import React from "react";
import {
  Card, CardHeader, CardTitle, CardBody, Spinner,
} from "reactstrap";
import Chart from "react-apexcharts";

function CustomApexCharts({
  data,
  type,
  loading,
  title,
  horizontal,
  ranges,
  xAxisTitle,
  yAxisTitle,
  height,
  dataLabels,
  colors,
}) {
  const customColors = colors || undefined;
  const customRanges = ranges || [];

  const state = {
    options: {
      plotOptions: {
        bar: {
          // borderRadius: 10,
          horizontal,
          dataLabels: {
            position: "top", // top, center, bottom
          },

          colors: { ranges: customRanges },
        },
      },
      colors: customColors,
      dataLabels: {
        enabled: dataLabels,
        formatter(val) {
          return `${val}%`;
        },
        offsetY: -20,
      },
      xaxis: {
        categories: data.xAxis,
        title: {
          text: xAxisTitle || "",
        },
      },
      yaxis: {
        title: {
          text: yAxisTitle || "",
        },
      },
    },

    series: data.yAxis,
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span>{title}</span>
          {loading && <Spinner color="primary" className="ml-1" />}
        </CardTitle>
      </CardHeader>
      <CardBody className="dashboard-graph">
        <Chart
          options={state.options}
          series={state.series}
          type={type}
          height={height}
        />
      </CardBody>
    </Card>
  );
}

export default CustomApexCharts;

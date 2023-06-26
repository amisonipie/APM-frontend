import React from "react";
import { Row, Col } from "reactstrap";
import BasicSweetAlert from "./SweetAlertBasic";
import SweetAlertTypes from "./SweetAlertTypes";
import SweetAlertOptions from "./SweetAlertOptions";
import SweetAlertCallback from "./SweetAlertCallback";
import "assets/scss/plugins/extensions/sweet-alerts.scss";

class Slider extends React.Component {
  render() {
    return (
      <Row>
        <Col sm="12">
          <BasicSweetAlert />
        </Col>
        <Col sm="12">
          <SweetAlertTypes />
        </Col>
        <Col sm="12">
          <SweetAlertOptions />
        </Col>
        <Col sm="12">
          <SweetAlertCallback />
        </Col>
      </Row>
    );
  }
}

export default Slider;

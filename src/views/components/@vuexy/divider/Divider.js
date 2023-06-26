import React from "react";
import { Row, Col } from "reactstrap";
import Prism from "prismjs";
import BreadCrumbs from "../breadCrumbs/BreadCrumb";
import DividerDefault from "./DividerDefault";
import DividerText from "./DividerText";
import DividerPosition from "./DividerPosition";
import DividerColors from "./DividerColors";
import DividerIcons from "./DividerIcons";
import DividerStyle from "./DividerStyle";
import "prismjs/components/prism-jsx.min";

class Divider extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    return (
      <>
        <BreadCrumbs
          breadCrumbTitle="Divider"
          breadCrumbParent="Extra Components"
          breadCrumbActive="Divider"
        />
        <Row>
          <Col sm="12">
            <DividerDefault />
          </Col>
          <Col sm="12">
            <DividerText />
          </Col>
          <Col sm="12">
            <DividerPosition />
          </Col>
          <Col sm="12">
            <DividerColors />
          </Col>
          <Col sm="12">
            <DividerIcons />
          </Col>
          <Col sm="12">
            <DividerStyle />
          </Col>
        </Row>
      </>
    );
  }
}
export default Divider;

import React from "react";
import { Row, Col } from "reactstrap";
import BreadCrumbs from "../breadCrumbs/BreadCrumb";
import WizardBasic from "./WizardBasic";
import WizardIcons from "./WizardIcons";
import WizardValidation from "./WizardValidation";

class Wizard extends React.Component {
  render() {
    return (
      <>
        <BreadCrumbs
          breadCrumbTitle="Wizard"
          breadCrumbParent="Extra Components"
          breadCrumbActive="Wizard"
        />
        <Row>
          <Col sm="12">
            <WizardBasic />
          </Col>
          <Col sm="12">
            <WizardIcons />
          </Col>
          <Col sm="12">
            <WizardValidation />
          </Col>
        </Row>
      </>
    );
  }
}
export default Wizard;

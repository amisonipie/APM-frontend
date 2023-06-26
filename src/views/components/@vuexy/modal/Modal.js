import React from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, TabContent, TabPane, Label, FormGroup } from "reactstrap";
import { FormattedMessage } from "react-intl";
import CustomSelect from "views/components/@custom/Select";

class ModalBasic extends React.Component {
  state = {
    activeTab: "1",
    modal: false,
  };

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    const { hmcOptions, regionOptions, region, setRegion, hmc, setHmc, loading, getData } = this.props;

    return (
      <React.Fragment>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Button.Ripple color="primary" className="btn-block" size="lg" outline block onClick={this.toggleModal}>
              <FormattedMessage defaultMessage="Filter" id="Filter" />
            </Button.Ripple>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="filter-model">
              <ModalHeader toggle={this.toggleModal}>Filters</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label>Region</Label>
                  <CustomSelect
                    className="basic-single"
                    name="region"
                    value={region}
                    additionalOnChangeHandler={(value) => {
                      setRegion(value);
                    }}
                    customOptionLabel={(e) => e.label}
                    customOptionValue={(e) => e.value}
                    options={regionOptions}
                    isDisabled={loading}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>HMC</Label>
                  <CustomSelect
                    className="basic-single"
                    name="hmc"
                    value={hmc}
                    additionalOnChangeHandler={(value) => {
                      setHmc(value);
                    }}
                    customOptionLabel={(e) => e.label}
                    customOptionValue={(e) => e.value}
                    options={hmcOptions}
                    isDisabled={loading}
                  />
                </FormGroup>
                <FormGroup>
                  <Button
                    color="primary"
                    onClick={() => {
                      getData();
                      this.toggleModal();
                    }}
                    customOptionLabel={(e) => e.label}
                    customOptionValue={(e) => e.value}
                    options={regionOptions}
                    isDisabled={loading}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>HMC</Label>
                  {/* <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="hmc"
                    value={hmc}
                    onChange={(value) => {
                      setHmc(value);
                    }}
                    options={hmcOptions}
                    isDisabled={loading}
                  /> */}
                  <CustomSelect
                    className="basic-single"
                    name="hmc"
                    value={hmc}
                    additionalOnChangeHandler={(value) => {
                      setHmc(value);
                    }}
                    customOptionLabel={(e) => e.label}
                    customOptionValue={(e) => e.value}
                    options={hmcOptions}
                    isDisabled={loading}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    getData();
                    this.toggleModal();
                  }}
                  disabled={loading}
                >
                  <FormattedMessage defaultMessage="Apply Filter" id="Apply Filter" />
                </Button>{" "}
              </ModalFooter>
            </Modal>
          </TabPane>
          <TabPane className="component-code" tabId="2">
            {/* {modalBasic} */}
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}
export default ModalBasic;

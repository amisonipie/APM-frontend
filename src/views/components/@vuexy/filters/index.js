import React from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Label,
  FormGroup,
} from "reactstrap";
import { FormattedMessage } from "react-intl";
import { SC } from "utility/helper";
import CustomSelect from "views/components/@custom/Select";

class Filters extends React.Component {
  state = {
    activeTab: "1",
    modal: false,
    equipment: "",
    status: "",
    lab: "",
    region: "",
    equipmentsOptions: [],
    regionsOptions: [],
    labsOptions: [],
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

  equipmentsOption = () => {
    SC.getCall({
      url: "/equipments",
    }).then((response) => {
      const rowData = response.data.data.map((item) => ({
        label: item.nameEnglish,
        value: item?._id,
      }));

      this.setState({ equipmentsOptions: rowData });
    });
  };

  labsOption = () => {
    SC.getCall({
      url: "/labs",
    }).then((response) => {
      const rowData = response.data.data.map((item) => ({
        label: item.lab_name,
        value: item?._id,
      }));

      this.setState({ labsOptions: rowData });
    });
  };

  regionsOption = () => {
    SC.getCall({
      url: "/regions?isPagination=false",
    }).then((response) => {
      const rowData = response.data.data.map((item) => ({
        label: item.name,
        value: item?._id,
      }));

      this.setState({ regionsOptions: rowData });
    });
  };

  currentStatusOptions = [
    {
      value: "Working",
      label: "Working",
    },
    {
      value: "Down",
      label: "Down",
    },
    {
      value: "Partially Down",
      label: "Partially Down",
    },
    {
      value: "Back Up",
      label: "Back Up",
    },
    {
      value: "Retired",
      label: "Retired",
    },
  ];

  componentDidMount() {
    this.equipmentsOption();
    this.labsOption();
    this.regionsOption();
  }

  render() {
    const { loading, getData } = this.props;

    const filtersss = {
      equipment: this.state.equipment.value || null,
      status: this.state.status.value || null,
      lab: this.state.lab.value || null,
      region: this.state.region.value || null,
    };

    return (
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <Button
            color="primary"
            className="submit-btn"
            size="md"
            outline
            block
            onClick={this.toggleModal}
          >
            <FormattedMessage defaultMessage="Filter" id="Filter" />
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            className="filter-model"
          >
            <ModalHeader toggle={this.toggleModal}>Filters</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Region</Label>
                <CustomSelect
                  className="basic-single"
                  name="region"
                  value={this.state.region}
                  additionalOnChangeHandler={(value) => {
                    this.setState({ region: value });
                  }}
                  options={this.state.regionsOptions}
                  isDisabled={loading}
                />
              </FormGroup>
              <FormGroup>
                <Label>Equipments</Label>
                <CustomSelect
                  className="basic-single"
                  name="equipment"
                  value={this.state.equipment}
                  customOptionLabel={(e) => e.label}
                  customOptionValue={(e) => e.value}
                  additionalOnChangeHandler={(value) => {
                    this.setState({ equipment: value });
                  }}
                  options={this.state.equipmentsOptions}
                  isDisabled={loading}
                />
              </FormGroup>
              <FormGroup>
                <Label>Labs</Label>
                <CustomSelect
                  className="basic-single"
                  name="lab"
                  value={this.state.lab}
                  additionalOnChangeHandler={(value) => {
                    this.setState({ lab: value });
                  }}
                  customOptionLabel={(e) => e.label}
                  customOptionValue={(e) => e.value}
                  options={this.state.labsOptions}
                  isDisabled={loading}
                />
              </FormGroup>
              <FormGroup>
                <Label>status</Label>
                <CustomSelect
                  className="basic-single"
                  name="status"
                  value={this.state.status}
                  additionalOnChangeHandler={(value) => {
                    this.setState({ status: value });
                  }}
                  customOptionLabel={(e) => e.label}
                  customOptionValue={(e) => e.value}
                  options={this.currentStatusOptions}
                  isDisabled={loading}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="submit-btn"
                onClick={() => {
                  this.setState({
                    equipment: "",
                    status: "",
                    lab: "",
                    region: "",
                  });
                  getData({});
                  this.toggleModal();
                }}
                disabled={loading}
              >
                <FormattedMessage
                  defaultMessage="Reset Filter"
                  id="Reset Filter"
                />
              </Button>
              {" "}
              <Button
                color="primary"
                // className="submit-btn"
                onClick={() => {
                  getData({ filtersss });
                  this.toggleModal();
                }}
                disabled={loading}
              >
                <FormattedMessage
                  defaultMessage="Apply Filter"
                  id="Apply Filter"
                />
              </Button>
              {" "}
            </ModalFooter>
          </Modal>
        </TabPane>
        <TabPane className="component-code" tabId="2">
          {/* {modalBasic} */}
        </TabPane>
      </TabContent>
    );
  }
}
export default Filters;

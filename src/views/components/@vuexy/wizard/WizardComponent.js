import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  Button,
} from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";

class VuexyWizard extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.activeStep) {
      if (props.activeStep !== state.activeStep) {
        if (props.validate) {
          if (state.errors.length === 0 && state.submitted) { return { activeStep: props.activeStep }; }
        } else return { activeStep: props.activeStep };
      }
    }
    return null;
  }

  state = {
    activeStep: this.props.activeStep ? this.props.activeStep : 0,
    errors: [],
    values: [],
  };

  handleNextStep = (index, total, errors = []) => {
    const { activeStep } = this.state;
    const validation = this.props.validate;

    if (!validation) {
      if (activeStep <= index && activeStep !== total) {
        this.setState({
          activeStep: activeStep + 1,
        });
      }
    } else if (errors.length === 0 && activeStep <= index && activeStep !== total) {
      this.setState({
        activeStep: activeStep + 1,
      });
    } else if (errors.length && this.props.onValidationError) {
      this.props.onValidationError(this.state.errors);
    } else {

    }
  };

  handlePreviousStep = (index) => {
    const { activeStep } = this.state;
    if (activeStep >= index) {
      this.setState({
        activeStep: activeStep - 1,
      });
    }
  };

  handleEnableAllSteps = (index) => {
    if (this.props.enableAllSteps) {
      this.setState({ activeStep: index });
    }
  };

  handleSubmit = (e) => {
    if (
      this.props.steps.length - 1 === this.state.activeStep
      && this.props.onFinish
    ) {
      this.props.onFinish(e);
    }
  };

  render() {
    const FormTag = this.props.validate ? AvForm : Form;

    return (
      <>
        <Nav
          className={`vx-wizard ${
            this.props.className ? this.props.className : ""
          }`}
          tabs
        >
          {this.props.steps.map((item, i) => (
            <NavItem
              className="step-wrapper"
              key={i}
              onClick={() => this.handleEnableAllSteps(i)}
            >
              <NavLink
                className={classnames(`step step-${i}`, {
                  active: this.state.activeStep === i,
                  done: i < this.state.activeStep,
                })}
              >
                <span className="step-text">{item.title}</span>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent
          className={`vx-wizard-content ${
            this.props.tabPaneClass ? this.props.tabPaneClass : ""
          }`}
          activeTab={this.state.activeStep}
        >
          {this.props.steps.map((item, i) => (
            <TabPane
              className={`step-content step-${i}-content`}
              key={i}
              tabId={i}
            >
              <FormTag
                className="form-horizontal"
                onSubmit={(e, errors, values) => {
                  this.setState({ errors, values });
                  if (!this.props.validate) e.preventDefault();
                  this.handleNextStep(i, this.props.steps.length - 1, errors);
                  this.handleSubmit(e);
                }}
              >
                {item.content}
                {this.props.pagination
                  ? (
                    <div className="wizard-actions d-flex justify-content-between">
                      <Button
                        color="primary"
                        disabled={this.state.activeStep === 0}
                        onClick={() => this.handlePreviousStep(i)}
                      >
                        Prev
                      </Button>
                      <Button type="submit" color="primary">
                        {this.props.steps.length - 1 === i
                        && !this.props.finishBtnText
                          ? "Submit"
                          : this.props.steps.length - 1 === i
                            && this.props.finishBtnText
                            ? this.props.finishBtnText
                            : "Next"}
                      </Button>
                    </div>
                  )
                  : null}
              </FormTag>
            </TabPane>
          ))}
        </TabContent>
      </>
    );
  }
}

VuexyWizard.propTypes = {
  className: PropTypes.string,
  steps: PropTypes.array.isRequired,
  validate: PropTypes.bool,
  enableAllSteps: PropTypes.bool,
  finishBtnText: PropTypes.string,
  onFinish: PropTypes.func,
  pagination: PropTypes.bool,
  onValidationError: PropTypes.func,
  activeStep: PropTypes.number,
};

VuexyWizard.defaultProps = {
  pagination: true,
};

export default VuexyWizard;

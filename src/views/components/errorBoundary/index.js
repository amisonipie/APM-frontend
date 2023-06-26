import { Button } from "reactstrap";
import React, { Component } from "react";
import gear from "assets/img/svg/gear.svg";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="maintenance-page bg-full-screen-image">
          <img
            src={gear}
            alt="ascend health care solutions"
            className="maintenance-page__img"
          />

          <h2 className="error-code">Maintenance Page</h2>
          <div className="d-flex justify-content-between">
            <a href="/">
              <Button.Ripple
                className="btn-primary mb-1 mb-sm-0 w-100 mr-0 mr-sm-1"
                color="primary"
                type="submit"
                // onClick={(e) => {
                //   // e.preventDefault();
                //   this.history.push("/");
                // }}
              >
                <span style={{ color: "#fff" }}>Back to Home page</span>
              </Button.Ripple>
            </a>
            <a href="/login">
              <Button.Ripple
                className="RequestBtton RequestBtton__outline   w-100"
                outline
                type="button"
                // onClick={(e) => {
                //   // e.preventDefault();
                //   this.history.push("/login");
                // }}
              >
                <span style={{ color: "#9b945f" }}>Login</span>
              </Button.Ripple>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

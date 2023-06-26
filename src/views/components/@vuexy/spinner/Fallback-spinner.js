import React from "react";
import logo from "assets/img/logo/smallLogo.png";
import "assets/scss/components/app-loader.scss";

class SpinnerComponent extends React.Component {
  render() {
    const { showLogo } = this.props;
    return (
      <div className="fallback-spinner vh-100">
        {showLogo && <img className="fallback-logo" src={logo} alt="logo" />}
        <div className="loading">
          <div className="effect-1 effects" />
          <div className="effect-2 effects" />
          <div className="effect-3 effects" />
        </div>
      </div>
    );
  }
}

export default SpinnerComponent;

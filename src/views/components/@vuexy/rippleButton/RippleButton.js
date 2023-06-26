import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import Ripples from "react-ripples";

function RippleButton({
  rippleColor, during, block, ...rest
}) {
  return (
    <Ripples
      color={rippleColor || "rgba(255, 255, 255, .5)"}
      during={during}
      className={`${block ? "d-block" : ""}`}
    >
      <Button {...rest} />
    </Ripples>
  );
}

RippleButton.propTypes = {
  ...Button.propTypes,
  rippleColor: PropTypes.string,
  during: PropTypes.number,
};

Button.Ripple = RippleButton;

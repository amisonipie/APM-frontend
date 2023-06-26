import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import logo from "assets/imgs/enoviimaxWhite.svg";
import PoweredByLogo from "assets/imgs/poweredBy.svg";
import layoutImg from "assets/imgs/Illustrations.svg";

function AuthLayout({ children }) {
  useEffect(() => {
    // handling trengo styling
    const trengo = document.getElementById("trengo-web-widget");
    if (trengo) {
      trengo.classList.remove("vertical-layout-trengo");
    }
  }, []);
  return (
    <Container fluid className="authLayout">
      <Row className="">
        <Col xs="12" className="authLayout__logo">
          <Link to="/">
            {" "}
            <img src={logo} alt="logo" />
          </Link>
        </Col>
        <Row className="authLayout__content w-100">
          <Col lg="6" className="d-none d-lg-flex authLayout__imageContainer">
            <img src={layoutImg} alt="loginImg" />
            <p>
              Manage your assets performance
              {" "}
              <br />
              {" "}
              with maximum capabilities
            </p>
          </Col>
          <Col
            md="8"
            lg="4"
            className="  offset-1 offset-lg-1 authLayout__formContainer"
          >
            <div className="authLayout__formContainer__box ">
              <div className="authLayout__formContainer__box__children">
                {children}
              </div>
            </div>
          </Col>
        </Row>
        <Col xs="12" className="authLayout__footer">
          {/* <p className="authLayout__footer--poweredBy">Powered by</p> */}
          <a
            href="https://ascend.com.sa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={PoweredByLogo}
              alt="logo"
              className="authLayout__footer--logo"
            />
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthLayout;

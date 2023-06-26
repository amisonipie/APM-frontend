import React from "react";
import classnames from "classnames";
import { Button } from "reactstrap";
import { ArrowUp } from "react-feather";
import ScrollToTop from "react-scroll-up";

function Footer(props) {
  const footerTypeArr = ["sticky", "static", "hidden"];
  return (
    <footer
      className={classnames("footer footer-light d-xl-none", {
        "footer-static":
          props.footerType === "static"
          || !footerTypeArr.includes(props.footerType),
        "d-none": props.footerType === "hidden",
      })}
    >
      <div className="mt-25 clearfix d-flex justify-content-start align-items-center font-weight-normal ">
        Powered&nbsp;by
        <a
          href="https://ascend.com.sa/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ascend
        </a>
      </div>
      {/* <span className="mt-25">v1.31.0.1</span> */}
      {props.hideScrollToTop === false
        ? (
          <ScrollToTop showUnder={160}>
            <Button color="primary" className="btn-icon scroll-top">
              <ArrowUp size={15} />
            </Button>
          </ScrollToTop>
        )
        : null}
    </footer>
  );
}

export default Footer;

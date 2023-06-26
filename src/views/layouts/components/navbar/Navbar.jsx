import { Navbar } from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";
import React from "react";
import ClientLogo from "views/components/ClientLogo/ClientLogo";

import { userRole } from "utility/config";
import NavbarUser from "./NavbarUser";
import NavbarBookmarks from "./NavbarBookmarks";

function ThemeNavbar(props) {
  const colorsArr = ["primary", "danger", "success", "info", "warning", "dark"];
  const navbarTypes = ["floating", "static", "sticky", "hidden"];
  // end Site/ Region in Navbar //

  window.onscroll = () => {
    if (document) {
      if (
        document.getElementById("navbar")
        && (document.body.scrollTop > 15
          || document.documentElement.scrollTop > 15)
      ) {
        document.getElementById("navbar").classList.add("navbar-shadow");
      } else if (document.getElementById("navbar")) {
        document.getElementById("navbar").classList.remove("navbar-shadow");
      }
    }
  };

  return (
    <>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar
        id="navbar"
        className={classnames(
          "header-navbar navbar-expand-lg navbar navbar-with-menu py-0",
          {
            "navbar-light":
              props.navbarColor === "default"
              || !colorsArr.includes(props.navbarColor),
            "navbar-dark": colorsArr.includes(props.navbarColor),
            "bg-primary":
              props.navbarColor === "primary" && props.navbarType !== "static",
            "bg-danger":
              props.navbarColor === "danger" && props.navbarType !== "static",
            "bg-success":
              props.navbarColor === "success" && props.navbarType !== "static",
            "bg-info":
              props.navbarColor === "info" && props.navbarType !== "static",
            "bg-warning":
              props.navbarColor === "warning" && props.navbarType !== "static",
            "bg-dark":
              props.navbarColor === "dark" && props.navbarType !== "static",
            "d-none": props.navbarType === "hidden" && !props.horizontal,
            "floating-nav":
              (props.navbarType === "floating" && !props.horizontal)
              || (!navbarTypes.includes(props.navbarType) && !props.horizontal),
            "navbar-static-top":
              props.navbarType === "static" && !props.horizontal,
            "fixed-top": props.navbarType === "sticky" || props.horizontal,
            scrolling: props.horizontal && props.scrolling,
          },
        )}
      >
        <div className="navbar-wrapper h-100">
          <div className="navbar-container content h-100">
            <div
              className="navbar-collapse d-flex justify-content-end align-items-center h-100"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper mr-auto">
                <NavbarBookmarks
                  sidebarVisibility={props.sidebarVisibility}
                  handleAppOverlay={props.handleAppOverlay}
                  currentActiveGroup={props.currentActiveGroup}
                />
              </div>
              {props?.user?.data?.role
                && props?.user?.data?.role !== userRole.superAdmin && (
                <ClientLogo />
              )}
              <NavbarUser
                handleAppOverlay={props.handleAppOverlay}
                changeCurrentLang={props.changeCurrentLang}
                activePath={props.activePath}
                user={props.user?.data}
              />
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.login,
});

export default connect(mapStateToProps)(ThemeNavbar);

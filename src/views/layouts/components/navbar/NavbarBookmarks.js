import React from "react";
import { history } from "utility/helper/history";
import * as Icon from "react-feather";
import { NavItem, NavLink } from "reactstrap";
import { arrowLeft } from "assets/icons/svgIcons";
import { useLocation, useParams } from "react-router-dom";

import { getPageTitle } from "./data";

function NavbarBookmarks(props) {
  const { pathname } = useLocation();
  const params = useParams();
  const { sidebarVisibility } = props;
  const currentPageName = getPageTitle({ pathName: pathname, query: params });
  return (
    <div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
      <ul className="navbar-nav  mr-auto align-items-center">
        <NavItem className="mobile-menu  d-xl-none navbar--menuIcon">
          <NavLink
            className="nav-menu-main menu-toggle hidden-xs is-active"
            onClick={sidebarVisibility}
          >
            <Icon.Menu className="ficon" color="#2a347b" />
          </NavLink>
        </NavItem>
        <NavItem className="mobile-menu">
          <NavLink className="nav-menu-main navbar--backBtn">
            <figure onClick={() => history.goBack()}>{arrowLeft}</figure>
          </NavLink>
        </NavItem>
        {(!params?.workOrderId && (
          <NavItem className="mobile-menu">
            <NavLink className="nav-menu-main navbar--title">
              {/* {currentPageName === "Work Order - Details" ? ( */}
              {currentPageName}
            </NavLink>
          </NavItem>
        )) || <div />}
      </ul>
    </div>
  );
}

export default NavbarBookmarks;

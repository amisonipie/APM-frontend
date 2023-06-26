import React from "react";
import { NavLink } from "react-router-dom";
import smallLogo from "assets/imgs/smallLogo.svg";
import logo from "assets/imgs/enoviimaxWhite.svg";
import { hamburgerMenu } from "assets/icons/svgIcons";

function SidebarHeader(props) {
  const { collapsed, sidebarState, scrollFromTop } = props;
  const isSmallLogo = collapsed && sidebarState;
  const homePageLink = "/";

  return (
    <div className={`navbar-header d-flex w-100 justify-content-${isSmallLogo ? "start" : "center"} align-items-center ${scrollFromTop > 5 && !collapsed && "navbar-header-shadow"}`}>
      <ul className={`navbar-nav pl-1 pr-1 w-100 ${isSmallLogo ? "" : "justify-content-between align-items-center"}`}>
        <li className="nav-item">
          <NavLink
            to={homePageLink}
            className={`d-flex justify-content-${
              isSmallLogo ? "center" : "between"
            } align-items-center `}
          >
            {isSmallLogo ? (
              <img src={smallLogo} alt="logo" className="sidebar-small-logo" />
            ) : (
              <>
                <img src={logo} alt="logo" className="sidebar-logo" />
                {/* <img src={smallLogo} alt="logo" className="w-50 d-sm-none d-md-block d-xl-none mt-2" /> */}
              </>
            )}
          </NavLink>
        </li>
        <li className="nav-item">
          {!isSmallLogo && (
            <span>
              {/* // ! TODO : handle click */}
              {hamburgerMenu}
            </span>
          )}
        </li>
      </ul>
    </div>
  );
}

export default SidebarHeader;

import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

function ListingTabs({
  activeTab, toggle, isDisabled, tabs, sideBarTabs,
}) {
  return (
    <Nav tabs className={`listing-navbar ${sideBarTabs ? "sideBarTabs" : ""}`}>
      {tabs.map((item, index) => {
        const tabsCount = (index + 1).toString();
        return (
          <NavItem key={index} className="listing-navbar__item">
            <NavLink
              className={`${
                tabsCount === activeTab ? "active" : ""
              } listing-navbar__item--link`}
              disabled={isDisabled}
              onClick={() => toggle({
                count: tabsCount,
                status: item?.value,
                site_models: item?.site_models,
              })}
            >
              {/* {item.icon && (
                <figure className="listing-navbar__item--link--icon">
                  {item.icon}
                </figure>
              )} */}
              {item.color && (
                <span className="listing-navbar__item--link--color" style={{ backgroundColor: item.color }} />
              )}
              <span className="listing-navbar__item--link--text">
                {item.title}
              </span>
            </NavLink>
          </NavItem>
        );
      })}
    </Nav>
  );
}

export default ListingTabs;

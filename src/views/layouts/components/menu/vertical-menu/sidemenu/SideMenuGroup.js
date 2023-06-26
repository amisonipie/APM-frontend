import React from "react";
import { Badge } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-feather";
import { FormattedMessage } from "react-intl";
import { PAGE } from "utility/helper/constants";
import { UncontrolledTooltip } from "reactstrap/lib";

class SideMenuGroup extends React.Component {
  constructor(props) {
    super(props);
    this.flag = true;
    this.parentArray = [];
    this.childObj = {};
  }

  state = {
    isOpen: false,
    activeItem: this.props.activePath,
  };

  handleActiveItem = (url) => {
    this.setState({
      activeItem: url,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath) {
      if (this.childObj.navLink && this.childObj.collapsed) {
        this.props.collapsedMenuPaths(this.childObj.navLink);
      }
      if (
        this.props.activePath === this.childObj.navLink
        && !this.props.parentArr.includes(this.parentArray[0])
      ) {
        this.props.parentArr.splice(0, this.props.parentArr.length);
        this.props.parentArr.push(this.parentArray);
      } else if (this.props.parentArr.includes(this.parentArray)) {
        this.props.parentArr.splice(0, this.props.parentArr.length);
      }
    }
  }

  renderChild(
    item,
    activeGroup,
    handleGroupClick,
    handleActiveItem,
    parent,
    listClassName,
  ) {
    return (
      <ul className={`${listClassName || "menu-content"} has-tree`}>
        {item.children
          ? item.children.map((child) => {
            const CustomAnchorTag = child.type === "external-link" ? "a" : Link;
            if (!this.parentArray.includes(item.id) && this.flag) {
              this.parentArray.push(item.id);
            }

            if (child.navLink && child.collapsed) {
              this.props.collapsedMenuPaths(child.navLink);
            }

            if (this.props.activeItemState === child.navLink) {
              this.childObj = child;
              this.props.parentArr.push(this.parentArray);
              this.flag = false;
            }

            if (
              (child.permissions
                  && child.permissions.includes(
                    this.props.currentUser?.data?.role,
                  ))
                || child.permissions === undefined
            ) {
              return (
                <li
                  key={child.id}
                  className={classnames({
                    "has-sub": child.type === "collapse",
                    open:
                        child.type === "collapse"
                        && activeGroup.includes(child.id),
                    "sidebar-group-active":
                        this.props.currentActiveGroup.includes(child.id),
                    active:
                        (this.props.activeItemState === child.navLink
                          && child.type === "item")
                        || (item.parentOf
                          && item.parentOf.includes(this.props.activeItemState)),
                    disabled: child.disabled,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGroupClick(child.id, item.id, child.type);
                    if (child.navLink && child.navLink !== undefined) {
                      handleActiveItem(child.navLink);
                    }
                    if (
                      this.props.deviceWidth <= 1200
                        // this.props.deviceWidth <= 768 &&
                        && child.type === "item"
                    ) {
                      this.props.toggleMenu();
                    }
                  }}
                >
                  <CustomAnchorTag
                    className={classnames({
                      "d-flex justify-content-between":
                          child.type === "collapse",
                    })}
                    to={
                      child.navLink && child.type === "item"
                        ? child.navLink
                        : ""
                    }
                    href={child.type === "external-link" ? child.navLink : ""}
                    onMouseEnter={() => {
                      this.props.handleSidebarMouseEnter(child.id);
                    }}
                    onMouseLeave={() => {
                      this.props.handleSidebarMouseEnter(child.id);
                    }}
                    key={child.id}
                    onClick={(e) => {
                      // ! added this localstorage event to handle the previous and current url location
                      const currentPath = localStorage.getItem(PAGE.CURRENT);
                      localStorage.setItem(PAGE.PREVIOUS, currentPath);
                      localStorage.setItem(
                        PAGE.CURRENT,
                        child.navLink && child.type === "item"
                          ? child.navLink
                          : "/",
                      );
                      return child.type === "collapse"
                        ? e.preventDefault()
                        : "";
                    }}
                    target={child.newTab ? "_blank" : undefined}
                  >
                    <div className="menu-text" id={`${item?.id}${child?.id}`}>
                      {item.title ? (
                        <UncontrolledTooltip
                          placement="top"
                          target={`${item?.id}${child?.id}`}
                        >
                          <FormattedMessage
                            id={`${child?.id}Z${item?.id}`}
                            defaultMessage={`${item?.title} - ${child?.title}`}
                          />
                        </UncontrolledTooltip>
                      ) : null}
                      {/* {child.icon} */}
                      <span className="menu-tree-icon" />
                      <span className="menu-item menu-title">
                        <FormattedMessage
                          id={child.title}
                          defaultMessage={child.title}
                        />
                      </span>
                    </div>
                    {child.badge ? (
                      <Badge
                        color={child.badge}
                        className="float-right mr-2"
                        pill
                      >
                        {child.badgeText}
                      </Badge>
                    ) : (
                      ""
                    )}
                    {child.type === "collapse" ? (
                      <ChevronRight className="menu-toggle-icon" size={13} />
                    ) : (
                      ""
                    )}
                  </CustomAnchorTag>

                  {child.children
                    ? this.renderChild(
                      child,
                      activeGroup,
                      handleGroupClick,
                      handleActiveItem,
                      item.id,
                    )
                    : ""}
                </li>
              );
            }
            if (
              child.navLink === this.props.activePath
                && !child.permissions.includes(this.props.currentUser?.data?.role)
            ) {
              return this.props.redirectUnauthorized(
                this.props?.currentUser?.requestLoading,
              );
            }
            return null;
          })
          : null}
      </ul>
    );
  }

  render() {
    return (
      <>
        {this.renderChild(
          this.props.group,
          this.props.activeGroup,
          this.props.handleGroupClick,
          this.props.handleActiveItem,
          null,
        )}
        {this.renderChild(
          this.props.group,
          this.props.activeGroup,
          this.props.handleGroupClick,
          this.props.handleActiveItem,
          null,
          "menu-content-hoverboard",
        )}
      </>
    );
  }
}
export default SideMenuGroup;

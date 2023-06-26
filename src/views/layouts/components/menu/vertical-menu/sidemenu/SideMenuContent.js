import React from "react";
import { history } from "utility/helper/history";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { VscChevronRight } from "react-icons/vsc";
import { Badge, UncontrolledTooltip } from "reactstrap";
import navigationConfig from "configs/navigationConfig";
import { loadTheme } from "redux/actions/customizer";
import { PAGE } from "utility/helper/constants";
import { getModuleName } from "views/components/generalHelper";
import SideMenuGroup from "./SideMenuGroup";

class SideMenuContent extends React.Component {
  constructor(props) {
    super(props);
    this.parentArr = [];

    this.collapsedPath = null;
    this.redirectUnauthorized = (loading) => {
      const token = localStorage.getItem("token");

      if (!token) {
        props.logout({ reason: "unAuthorized" });
      } else if (!loading) {
        history.push("not-authorized");
      }
    };
  }

  state = {
    flag: true,
    isHovered: false,
    activeGroups: [],
    currentActiveGroup: [],
    tempArr: [],
    isHoverBoardActive: {},
  };

  handleGroupClick = (id, parent = null, type = "") => {
    let open_group = this.state.activeGroups;
    let active_group = this.props.currentActiveGroup;
    let temp_arr = this.state.tempArr;
    // Active Group to apply sidebar-group-active class
    if (type === "item" && parent === null) {
      active_group = [];
      temp_arr = [];
    } else if (type === "item" && parent !== null) {
      active_group = [];
      if (temp_arr.includes(parent)) {
        temp_arr.splice(temp_arr.indexOf(parent) + 1, temp_arr.length);
      } else {
        temp_arr = [];
        temp_arr.push(parent);
      }
      active_group = temp_arr.slice(0);
    } else if (type === "collapse" && parent === null) {
      temp_arr = [];
      temp_arr.push(id);
    } else if (type === "collapse" && parent !== null) {
      if (active_group.includes(parent)) {
        temp_arr = active_group.slice(0);
      }
      if (temp_arr.includes(id)) {
        // temp_arr.splice(temp_arr.indexOf(id), 1)
        temp_arr.splice(temp_arr.indexOf(id), temp_arr.length);
      } else {
        temp_arr.push(id);
      }
    } else {
      temp_arr = [];
    }

    if (type === "collapse") {
      // If open group does not include clicked group item
      if (!open_group.includes(id)) {
        // Get unmatched items that are not in the active group
        const temp = open_group.filter((obj) => active_group.indexOf(obj) === -1);
        // Remove those unmatched items from open group
        if (temp.length > 0 && !open_group.includes(parent)) {
          open_group = open_group.filter((obj) => !temp.includes(obj));
        }
        if (open_group.includes(parent) && active_group.includes(parent)) {
          open_group = active_group.slice(0);
        }
        // Add group item clicked in open group
        if (!open_group.includes(id)) {
          open_group.push(id);
        }
      } else {
        // If open group includes click group item, remove it from open group
        open_group.splice(open_group.indexOf(id), 1);
      }
    }
    if (type === "item") {
      open_group = active_group.slice(0);
    }

    this.setState({
      activeGroups: open_group,
      tempArr: temp_arr,
      currentActiveGroup: active_group,
    });
  };

  initRender = (parentArr) => {
    this.setState({
      activeGroups: parentArr.slice(0),
      // currentActiveGroup:  parentArr.slice(0),
      flag: false,
    });
    this.props.setCurrentActiveGroup(parentArr.slice(0));
  };

  componentDidMount() {
    this.initRender(this.parentArr[0] ? this.parentArr[0] : []);
    // checkOTP(this.props?.user?.data?.OTPUsed);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath) {
      if (this.collapsedMenuPaths !== null) {
        this.props.collapsedMenuPaths(this.collapsedMenuPaths);
      }
      this.initRender(
        this.parentArr[0] ? this.parentArr[this.parentArr.length - 1] : [],
      );
    }

    // opening work order dropdown one time on app load
    if (!this.props.customizer.loaded) {
      const module = getModuleName(history);
      if (module === "work-orders") {
        this.initRender(["workOrders"]);
      } else if (module === "inventories") {
        this.initRender(["inventory"]);
      }
      this.props.loadTheme(true);
    }
  }

  resetHoverBoardState() {
    const hoverState = this.state.isHoverBoardActive;
    for (const key of Object.keys(hoverState)) {
      hoverState[key] = false;
    }
    this.setState({ isHoverBoardActive: hoverState });
  }

  render() {
    // Loop over sidebar items
    // eslint-disable-next-line

    const authRoutes = navigationConfig.filter((auth) => {
      if (this.props.user.userRole === "super_admin") return auth;

      return auth.id !== "lab" && auth.id !== "region" && auth.id !== "hmc";
    });

    const menuItems = authRoutes.map((item, index) => {
      if (item.isDisabledFromSideMenu) return null;
      const CustomAnchorTag = item.type === "external-link" ? "a" : Link;
      // checks if item has groupheader

      if (item.type === "groupHeader") {
        return (
          <li
            className="navigation-header"
            key={`group-header-${item.groupTitle}`}
          >
            <span>
              {" "}
              <FormattedMessage
                id={item?.groupTitle}
                defaultMessage={item?.groupTitle}
              />
            </span>
          </li>
        );
      }
      const renderItem = (
        <li
          className={classnames("nav-item", {
            "has-sub": item.type === "collapse",
            "active-hover": this.state.isHoverBoardActive[item.id],
            // "active-hover" : true,
            open:
              this.state.activeGroups.includes(item.id)
              || item.isActive === true,
            "sidebar-group-active": this.props.currentActiveGroup.includes(
              item.id,
            ),
            // hover: this.props.hoverIndex === item.id,
            active:
              (this.props.activeItemState === item.navLink
                && item.type === "item")
              || (item.parentOf
                && item.parentOf.includes(this.props.activeItemState)),
            disabled: item.disabled,
          })}
          key={item.id}
          onClick={(e) => {
            e.stopPropagation();
            if (item.type === "item") {
              this.props.handleActiveItem(item.navLink);
              this.handleGroupClick(item.id, null, item.type);
              if (this.props.deviceWidth <= 1200 && item.type === "item") {
                // if (this.props.deviceWidth <= 768 && item.type === "item") {
                this.props.toggleMenu();
              }
            } else {
              this.handleGroupClick(item.id, null, item.type);
            }
          }}
          onMouseEnter={() => {
            this.resetHoverBoardState();
            this.setState({ isHoverBoardActive: { [item.id]: true } });
          }}
          onMouseLeave={() => {
            this.resetHoverBoardState();
            this.setState({ isHoverBoardActive: { [item.id]: false } });
          }}
        >
          <CustomAnchorTag
            to={
              item.filterBase
                ? item.filterBase
                : item.navLink && item.type === "item"
                  ? item.navLink
                  : ""
            }
            href={item.type === "external-link" ? item.navLink : ""}
            className={`d-flex align-items-center ${
              item.badgeText
                ? "justify-content-between"
                : "justify-content-start"
            }`}
            onMouseEnter={() => {
              this.props.handleSidebarMouseEnter(item.id);
            }}
            onMouseLeave={() => {
              this.props.handleSidebarMouseEnter(item.id);
            }}
            key={item.id}
            onClick={(e) => {
              // ! added this localstorage event to handle the previous and current url location
              const currentPath = localStorage.getItem(PAGE.CURRENT);
              localStorage.setItem(PAGE.PREVIOUS, currentPath);
              localStorage.setItem(
                PAGE.CURRENT,
                item.filterBase
                  ? item.filterBase
                  : item.navLink && item.type === "item"
                    ? item.navLink
                    : "/",
              );
              return item.type === "collapse" ? e.preventDefault() : "";
            }}
            target={item.newTab ? "_blank" : undefined}
          >
            <div className="menu-text" id={item.id}>
              {item.icon}
              <span className="menu-item menu-title">
                <FormattedMessage
                  id={item?.title}
                  defaultMessage={item?.title}
                />
              </span>
            </div>

            {item.title ? (
              <UncontrolledTooltip placement="top" target={item.id}>
                <FormattedMessage
                  id={item?.title}
                  defaultMessage={item?.title}
                />
              </UncontrolledTooltip>
            ) : null}

            {item.badge ? (
              <div className="menu-badge">
                <Badge color={item.badge} className="mr-1" pill>
                  {item.badgeText}
                </Badge>
              </div>
            ) : (
              ""
            )}
            {item.type === "collapse" ? (
              <VscChevronRight className="menu-toggle-icon" size={13} />
            ) : (
              ""
            )}
          </CustomAnchorTag>
          {item.type === "collapse" ? (
            <SideMenuGroup
              group={item}
              handleGroupClick={this.handleGroupClick}
              activeGroup={this.state.activeGroups}
              handleActiveItem={this.props.handleActiveItem}
              activeItemState={this.props.activeItemState}
              handleSidebarMouseEnter={this.props.handleSidebarMouseEnter}
              activePath={this.props.activePath}
              hoverIndex={this.props.hoverIndex}
              parentArr={this.parentArr}
              triggerActive={undefined}
              currentActiveGroup={this.props.currentActiveGroup}
              permission={this.props.permission}
              currentUser={this.props.currentUser}
              redirectUnauthorized={this.redirectUnauthorized}
              collapsedMenuPaths={this.props.collapsedMenuPaths}
              toggleMenu={this.props.toggleMenu}
              deviceWidth={this.props.deviceWidth}
            />
          ) : (
            ""
          )}
        </li>
      );
      if (
        item.navLink
        && item.collapsed !== undefined
        && item.collapsed === true
      ) {
        this.collapsedPath = item.navLink;
        this.props.collapsedMenuPaths(item.navLink);
      }
      if (
        item.type === "external-link"
        || ((item.type === "collapse" || item.type === "item")
          && item.permissions
          && item.permissions.includes(this.props.currentUser?.data?.role))
      ) {
        return renderItem;
      } if (
        item.type === "item"
        && item.navLink === this.props.activePath
        && !item.permissions.includes(this.props.currentUser?.data?.role)
      ) {
        return this.redirectUnauthorized(
          this.props?.currentUser?.requestLoading,
        );
      }
    });

    return <>{menuItems}</>;
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.login,
  customizer: state.customizer.customizer,
});
export default connect(mapStateToProps, { loadTheme })(SideMenuContent);

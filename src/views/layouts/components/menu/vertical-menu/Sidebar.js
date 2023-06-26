import Hammer from "react-hammerjs";
import classnames from "classnames";
import { connect } from "react-redux";
import React, { Component } from "react";
import SupportForm from "views/components/Support";
import { ContextLayout } from "utility/context/Layout";
import PerfectScrollbar from "react-perfect-scrollbar";
import { logout } from "redux/actions/auth/loginActions";

import { ChevronRight } from "react-feather";
import { UncontrolledTooltip } from "reactstrap";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SideMenuContent from "./sidemenu/SideMenuContent";
import { changeScrollPosition } from "redux/actions/customizer";

class Sidebar extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.activePath !== state.activeItem) {
      return {
        activeItem: props.activePath,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  state = {
    width: window.innerWidth,
    activeIndex: null,
    hoveredMenuItem: null,
    activeItem: this.props.activePath,
    menuShadow: null,
    ScrollbarTag: PerfectScrollbar,
    scrollFromTop: 0,
    isReachedEnd: null,
    isSupportvisible: false,
  };

  mounted = false;

  updateWidth = () => {
    if (this.mounted) {
      this.setState((prevState) => ({
        width: window.innerWidth,
      }));
      this.checkDevice();
    }
  };

  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
      }
      this.checkDevice();
    }
    // sidebar content scrolling and shadows
    // const menuContent = document.getElementsByClassName("main-menu-content");
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate() {
    if (this.props.offset) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(function() {
        const el = document.getElementsByClassName("main-menu-content")[0];
        el.scroll(0, this.props.offset);
      }.bind(this), 50);
      
      // ...elsewhere...
      
      
    }
  }

  checkDevice = () => {
    const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
    const mq = function (query) {
      return window.matchMedia(query).matches;
    };

    if ("ontouchstart" in window || window.DocumentTouch) {
      this.setState({
        ScrollbarTag: "div",
      });
    } else {
      this.setState({
        ScrollbarTag: PerfectScrollbar,
      });
    }
    const query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(
      "",
    );
    return mq(query);
  };

  changeActiveIndex = (id) => {
    if (id !== this.state.activeIndex) {
      this.setState({
        activeIndex: id,
      });
    } else {
      this.setState({
        activeIndex: null,
      });
    }
  };

  handleSidebarMouseEnter = (id) => {
    if (id !== this.state.hoveredMenuItem) {
      this.setState({
        hoveredMenuItem: id,
      });
    } else {
      this.setState({
        hoveredMenuItem: null,
      });
    }
  };

  handleActiveItem = (url) => {
    this.setState({
      activeItem: url,
    });
  };

  render() {
    const {
      visibilityState,
      toggleSidebarMenu,
      sidebarHover,
      toggle,
      color,
      sidebarVisibility,
      activeTheme,
      collapsed,
      activePath,
      sidebarState,
      currentLang,
      permission,
      currentUser,
      themeColor,
      offset,
      collapsedMenuPaths,
    } = this.props;

    const {
      menuShadow,
      activeIndex,
      hoveredMenuItem,
      activeItem,
      ScrollbarTag,
    } = this.state;
    const scrollShadow = (container, dir) => {
      this.setState({
        scrollFromTop: container.scrollTop,
        isReachedEnd:
          container.scrollHeight - container.scrollTop
          < container.offsetHeight + 30,
      });

      // // let bottomShadowLimitOffset =
      // if (container && dir === "up" && container.scrollTop >= 50) {
      //   this.setState({ menuShadow: true });
      // } else if (container && dir === "down" && container.scrollTop < 200) {
      //   this.setState({ menuShadow: false });
      // } else {
      //   this.setState({ menuShadow: null });
      // }
    };
    return (
      <ContextLayout.Consumer>
        {(context) => {
          const dir = context.state.direction;
          return (
            <>
              <Hammer
                onSwipe={(e) => {
                  sidebarVisibility();
                }}
                direction={dir === "rtl" ? "DIRECTION_LEFT" : "DIRECTION_RIGHT"}
              >
                <div className="menu-swipe-area d-xl-none d-block vh-100" />
              </Hammer>

              <div
                className={classnames(
                  `main-menu menu-fixed menu-light menu-accordion menu-shadow theme-${activeTheme}`,
                  {
                    collapsed: sidebarState === true,
                    "hide-sidebar": this.state.width < 1200 && visibilityState === false,
                    // this.state.width < 768 && visibilityState === false,
                  },
                )}
                onScroll={(e) => {
                  const el = document.getElementsByClassName("main-menu-content")[0];
                  this.props.changeScrollPosition(el?.scrollTop || 0);
                }}
              // ! TODO : handle this function in arrow
              // onMouseEnter={() => sidebarHover(false)}
              // onMouseLeave={() => sidebarHover(true)}
              >
                <span className="main-menu--toggler d-none d-xl-flex" onClick={() => toggleSidebarMenu(!collapsed)} id="toggler">
                  {/* <span className={`main-menu--toggler d-none d-xl-flex`} id="toggler"> */}
                  {/* {downArrowIcon} */}
                  <ChevronRight size={15} className={`${!collapsed ? "rotate-180" : ""}`} />
                  <UncontrolledTooltip placement="right" target="toggler">
                    {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                  </UncontrolledTooltip>
                </span>
                <SidebarHeader
                  toggleSidebarMenu={toggleSidebarMenu}
                  toggle={toggle}
                  sidebarBgColor={color}
                  sidebarVisibility={sidebarVisibility}
                  activeTheme={activeTheme}
                  collapsed={collapsed}
                  menuShadow={menuShadow}
                  activePath={activePath}
                  sidebarState={sidebarState}
                  themeColor={themeColor}
                  scrollFromTop={this.state.scrollFromTop}
                />
                <ScrollbarTag
                  className={classnames("main-menu-content", {
                    "overflow-hidden": ScrollbarTag !== "div",
                    "overflow-scroll": ScrollbarTag === "div",
                  })}
                  {...(ScrollbarTag !== "div" && {
                    options: { wheelPropagation: false },
                    onScrollDown: (container) => scrollShadow(container, "down"),
                    onScrollUp: (container) => scrollShadow(container, "up"),
                    onYReachStart: () => (menuShadow === true || menuShadow === null)
                      && this.setState({ menuShadow: false }),
                  })}
                >
                  <Hammer
                    onSwipe={() => {
                      sidebarVisibility();
                    }}
                    direction={
                      dir === "rtl" ? "DIRECTION_RIGHT" : "DIRECTION_LEFT"
                    }
                  >
                    <ul className="navigation navigation-main">
                      <SideMenuContent
                        setActiveIndex={this.changeActiveIndex}
                        activeIndex={activeIndex}
                        hoverIndex={hoveredMenuItem}
                        handleSidebarMouseEnter={this.handleSidebarMouseEnter}
                        activeItemState={activeItem}
                        handleActiveItem={this.handleActiveItem}
                        activePath={activePath}
                        lang={currentLang}
                        permission={permission}
                        currentUser={currentUser}
                        collapsedMenuPaths={collapsedMenuPaths}
                        toggleMenu={sidebarVisibility}
                        deviceWidth={this.props.deviceWidth}
                        logout={this.props.logout}
                        setCurrentActiveGroup={this.props.setCurrentActiveGroup}
                        currentActiveGroup={this.props.currentActiveGroup}
                      />
                    </ul>
                  </Hammer>
                </ScrollbarTag>
                {/* <div
                  className={classnames("shadow-bottom", {
                    "d-none":
                      this.state.isReachedEnd || this.state.scrollFromTop === 0,
                  })}
                /> */}
                <SidebarFooter
                  // changeCurrentLang={props.changeCurrentLang}
                  user={currentUser?.data}
                  onClick={() => this.setState({
                    isSupportvisible: true,
                  })}
                  isBottomShadow={
                    !this.state.isReachedEnd && /* UL child menus */document.getElementsByClassName("navigation-main")[0]?.clientHeight > /* Parent menu contianer */document.getElementsByClassName("main-menu-content")[0]?.clientHeight && !collapsed
                    // && this.state.scrollFromTop > 0
                  }
                />
                {process.env.NODE_ENV === "production" && (
                  <div>
                    <SupportForm
                      visible={this.state.isSupportvisible}
                      setVisible={() => this.setState({
                        isSupportvisible: !this.state.isSupportvisible,
                      })}
                    />
                  </div>
                )}
              </div>
            </>
          );
        }}
      </ContextLayout.Consumer>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.login,
  themeColor: state.customizer.customizer.theme,
  offset: state.customizer.customizer.offset,
});

export default connect(mapStateToProps, { logout, changeScrollPosition })(Sidebar);

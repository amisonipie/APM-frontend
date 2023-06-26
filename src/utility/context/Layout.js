import React from "react";
import themeConfig from "configs/themeConfig";
import AuthLayout from "views/layouts/Auth";
import FullLayout from "views/layouts/FullPageLayout";
import VerticalLayout from "views/layouts/VerticalLayout";

const layouts = {
  vertical: VerticalLayout,
  full: FullLayout,
  auth: AuthLayout,
};

const ContextLayout = React.createContext();

class Layout extends React.Component {
  state = {
    activeLayout: themeConfig.layout,
    width: window.innerWidth,
    lastLayout: null,
    direction: themeConfig.direction,
  };

  updateWidth = () => {
    this.setState({
      width: window.innerWidth,
    });
  };

  handleWindowResize = () => {
    this.updateWidth();
    // if (this.state.activeLayout === "horizontal" && this.state.width <= 1199) {
    if (this.state.activeLayout === "horizontal" && this.state.width <= 767) {
      this.setState({
        activeLayout: "vertical",
        lastLayout: "horizontal",
      });
    }

    // if (this.state.lastLayout === "horizontal" && this.state.width >= 1199) {
    if (this.state.lastLayout === "horizontal" && this.state.width >= 767) {
      this.setState({
        activeLayout: "horizontal",
        lastLayout: "vertical",
      });
    }
  };

  componentDidMount() {
    if (window !== "undefined") {
      window.addEventListener("resize", this.handleWindowResize);
    }
    this.handleDirUpdate();
    // if (this.state.activeLayout === "horizontal" && this.state.width <= 1199) {
    if (this.state.activeLayout === "horizontal" && this.state.width <= 767) {
      this.setState({
        activeLayout: "vertical",
      });
    } else if (
      themeConfig.layout === "horizontal"
      && this.state.width >= 1200
      // this.state.width >= 768
    ) {
      this.setState({
        activeLayout: "horizontal",
      });
    } else {
      this.setState({
        activeLayout: "vertical",
      });
    }
  }

  componentDidUpdate() {
    this.handleDirUpdate();
  }

  handleDirUpdate = () => {
    const dir = this.state.direction;
    if (dir === "rtl") {
      document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    } else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
  };

  render() {
    const { children } = this.props;
    return (
      <ContextLayout.Provider
        value={{
          state: this.state,
          fullLayout: layouts.full,
          authLayout: layouts.auth,
          VerticalLayout: layouts.vertical,
          switchLayout: (layout) => {
            this.setState({ activeLayout: layout });
          },
          switchDir: (dir) => {
            this.setState({ direction: dir });
          },
        }}
      >
        {children}
      </ContextLayout.Provider>
    );
  }
}

export { Layout, ContextLayout };

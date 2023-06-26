import { connect } from "react-redux";
import React, { Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Routes } from "routes";
import { history } from "utility/helper/history";
import { ContextLayout } from "utility/context/Layout";
import Spinner from "views/components/@vuexy/spinner/Fallback-spinner";
import CommonDrawer from "views/components/CommonDrawer/CommonDrawer";
import DiscardConfirmationModal from "views/components/CommonDrawer/DiscardConfirmationModal";

// Set Layout and Component Using App Route
function RouteConfig({
  component: Component,
  fullLayout,
  authLayout,
  permission,
  user,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <ContextLayout.Consumer>
          {(context) => {
            const LayoutTag = fullLayout === true
              ? context.fullLayout
              : authLayout === true
                ? context.authLayout
                : context.VerticalLayout;

            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      )}
    />
  );
}
const mapStateToProps = (state) => ({
  user: state.auth.login.data.role,
});

const AppRoute = connect(mapStateToProps)(RouteConfig);

function AppRouter() {
  return (
    <Router history={history}>
      <Switch>
        {/* main dashboard */}
        {Routes.map((route, index) => (
          <AppRoute
            exact={route.exact}
            path={route.path}
            component={route.component}
            key={index}
            fullLayout={route.fullLayout}
            authLayout={route.authLayout}
          />
        ))}
      </Switch>
      <CommonDrawer />
      <DiscardConfirmationModal />
    </Router>
  );
}

export default AppRouter;

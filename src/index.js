import Bugsnag from "@bugsnag/js";
import ReactDOM from "react-dom";
import { env } from "utility/config";
import { Provider } from "react-redux";
import React, { Suspense, lazy } from "react";
import { Layout } from "utility/context/Layout";
import { ToastContainer } from "react-toastify";
import { store } from "redux/storeConfig/store";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import { getUser } from "redux/actions/auth/loginActions";
import ErrorBoundary from "views/components/errorBoundary";
import Spinner from "views/components/@vuexy/spinner/Fallback-spinner";
import { IntlProviderWrapper } from "utility/context/Internationalization";

import "index.scss";
import "assets/icons/style.css";
import "flatpickr/dist/themes/light.css";
import "assets/scss/pages/data-list.scss";
import "react-toastify/dist/ReactToastify.css";
import "assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "assets/scss/plugins/forms/react-select/_react-select.scss";

Bugsnag.start({
  apiKey: env.BUGSNAG_KEY,
  plugins: [new BugsnagPluginReact()],
  enabledReleaseStages: ["production", "staging"],
});
const BugSnagBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

const LazyApp = lazy(() => import("App"));

const token = localStorage.getItem("token");

if (token) store.dispatch(getUser());

ReactDOM.render(
  <BugSnagBoundary>
    <ErrorBoundary>
      <Provider store={store}>
        <Suspense fallback={<Spinner />}>
          <Layout>
            <IntlProviderWrapper>
              {/* <ReduxApis /> */}
              <LazyApp />
              <ToastContainer />
            </IntlProviderWrapper>
          </Layout>
        </Suspense>
      </Provider>
    </ErrorBoundary>
  </BugSnagBoundary>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

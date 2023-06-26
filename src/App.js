import React from "react";
import Router from "./Router";

import "react-perfect-scrollbar/dist/css/styles.css";
import "views/components/@vuexy/rippleButton/RippleButton";
import { history } from "utility/helper/history";

function App(props) {
  React.useEffect(() => {
    history.listen((e) => {
      // scroll up page on every route change
      window.scroll(0, 0);
    });
  }, []);

  return <Router />;
}

export default App;

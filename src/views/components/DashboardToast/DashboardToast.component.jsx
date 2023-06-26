import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ToastErrorIcon from "assets/icons/toast_error.svg";

import "./DashboardToast.styles.scss";

export function DashboardToast({ card }) {
  const [isToastAlert, setIsToastAlert] = useState(true);
  const history = useHistory();

  return (
    <CSSTransition
      in={isToastAlert}
      timeout={300}
      classNames="dashboard-toast-alert"
      unmountOnExit
    >
      <div className="dashboard-toast">
        <div className="dashboard-toast-body">
          <div className="dashboard-toast-body-item">
            <img
              src={ToastErrorIcon}
              alt={card.text}
              onClick={() => setIsToastAlert(false)}
            />
            <p className="dashboard-toast-body-item-text">{card.text}</p>
            <p className="dashboard-toast-body-item-number">{card.value}</p>
          </div>
          <div
            className="dashboard-toast-body-button"
            onClick={() => history.push("/inventories-upcoming")}
          >
            <p>View Assets</p>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

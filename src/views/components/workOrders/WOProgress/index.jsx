import React from "react";
import { Progress } from "reactstrap";
import { getColor, getUserType } from "views/components/generalHelper";

function WOProgress({ item, customClasses }) {
  const color = getColor(item?.status);
  const steps = item?.work_order_classification?.steps;

  const totalSteps = steps?.length;
  const { currentStep } = item?.work_order_steps;
  const { label, icon } = getUserType({
    step: currentStep,
    woClassification: item?.classification,
    siteModel: item?.site_model,
  });

  return (
    <div className={`cardView__main__stepAndLA ${customClasses}`}>
      {/* //step and LastAction */}
      <div className="cardView__main__stepAndLA__progressAndUser">
        {/* // Current User */}
        <div
          className={`cardView__main__stepAndLA__progressAndUser__user ${color}`}
        >
          <figure className="cardView__main__stepAndLA__progressAndUser__user--icon">
            {icon}
          </figure>
          <span className="cardView__main__stepAndLA__progressAndUser__user--text">
            {label}
          </span>
        </div>
        {/* // Active step */}
        <div className="cardView__main__stepAndLA__progressAndUser__countAndProgress">
          <Progress
            className={`progress-lg ${color} ${item.status === "closed" ? "closed" : ""}`}
            striped
            value={parseInt(item?.work_order_steps?.currentStep, 10) * (100 / totalSteps)}
          />
        </div>
      </div>
      <div className="cardView__main__stepAndLA__step">
        <p className="cardView__main__stepAndLA__step--text">step</p>
        <h3>{(`0${item?.work_order_steps?.currentStep}`).slice(-2)}</h3>
      </div>
    </div>
  );
}

export default WOProgress;

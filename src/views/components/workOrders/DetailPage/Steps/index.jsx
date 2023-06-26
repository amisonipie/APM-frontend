import React from "react";
import { stepsActivity } from "views/components/workOrders/DetailPage/Steps/stepsActivity";

function WorkOrderSteps({ workOrder }) {
  return (
    <div className="workOrder_detail__steps__header">
      {workOrder?.work_order_classification?.steps?.map((item, sIndex) => {
        const {
          isUpcomingStep, stepColor, stepIcon, isStepCompleted,
        } = stepsActivity({
          item,
          workOrder,
        });
        return (
          <div key={sIndex} className="workOrder_detail__steps__header__box">
            <div
              className={`workOrder_detail__steps__header__box__item ${
                (isStepCompleted || isUpcomingStep) && "active"
              } ${stepColor}`}
            >
              <figure>{stepIcon}</figure>
              <h4>{item?.title}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WorkOrderSteps;

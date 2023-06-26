import { getIcon } from "views/components/generalHelper";
import { classification, site_model } from "utility/config";

export const stepsActivity = ({ item, workOrder }) => {
  const allSteps = workOrder?.work_order_classification?.steps;
  const stepIcon = getIcon(item?.key === allSteps?.length ? "closed" : item?.role);
  const stepKey = item?.key;
  const isStepCompleted = stepKey <= workOrder?.work_order_steps?.currentStep;
  const upcomingStep = getUpcomingStep(workOrder);
  const isUpcomingStep = stepKey === upcomingStep;
  const stepColor = isUpcomingStep ? "yellow" : "green";
  return {
    stepIcon,
    isUpcomingStep,
    stepColor,
    isStepCompleted,
  };
};

export const getUpcomingStep = (workOrder) => {
  let step = workOrder?.work_order_steps?.currentStep;
  switch (workOrder.site_model) {
    case site_model.imc:
      if (step === 1 || step === 2 || step === 5) {
        step += 1;
      }
      return step;
    case site_model.makeShift:
      if (step === 1 || step === 4) {
        step += 1;
      }
      return step;
    case site_model.permanent:
      step = getPermanentUpcomingStep(workOrder);
      return step;
    default:
      return step;
  }
};

const getPermanentUpcomingStep = (workOrder) => {
  let step = workOrder?.work_order_steps?.currentStep;
  switch (workOrder?.classification) {
    case classification.medical:
    case classification.nonMedical:
      if (step === 1 || step === 2 || step === 7) {
        step += 1;
      }
      return step;
    case classification.generic:
      if (step === 1 || step === 2 || step === 3 || step === 7) {
        step += 1;
      }
      return step;
    default:
      return step;
  }
};

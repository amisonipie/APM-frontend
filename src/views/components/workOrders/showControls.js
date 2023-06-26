import { classification, site_model, userRole as userRoleGlob, woType } from "utility/config";

// start showControls
export const showControls = ({ user, currentStep, isRequester, workOrder, siteModel, woClassification }) => {
  let show = false;
  const userRole = user?.role;
  const creator = workOrder?.creator;
  const assignedTo = workOrder?.work_order_steps?.technician_user
    ? workOrder?.work_order_steps?.technician_user?.role
    : "hmc_supervisor";
  const workOrderUsers = workOrder?.work_order_steps;
  const workOrderRating = workOrder?.rating;
  switch (siteModel) {
    case site_model.makeShift:
      show = makeShiftStepCase(currentStep, userRole, user, workOrderUsers, creator, workOrderRating);
      return show;
    case site_model.permanent:
      show = permanentStepCase(
        currentStep,
        userRole,
        woClassification,
        assignedTo,
        creator,
        user,
        workOrderUsers,
        workOrderRating,
        workOrder
      );
      return show;
    case site_model.imc:
      show = imcStepCase(
        currentStep,
        userRole,
        woClassification,
        assignedTo,
        creator,
        user,
        workOrderUsers,
        workOrderRating,
        workOrder
      );
      return show;
    case site_model.ascendServices:
      show = ascendServicesStepCase(
        currentStep,
        userRole,
        woClassification,
        assignedTo,
        creator,
        user,
        workOrderUsers,
        workOrderRating,
        workOrder
      );
      return show;
    default:
      return show;
  }
};

const makeShiftStepCase = (currentStep, userRole, user, workOrderUsers, creator, workOrderRating) => {
  let show = false;
  switch (currentStep) {
    case 1: // starting/accepting
      if (userRole === "hmc_supervisor") {
        show = true;
      }
      return show;
    case 2: // completion
      if (userRole === "hmc_supervisor" && user?._id === workOrderUsers?.technician?.assignedTo) {
        show = true;
      }
      return show;
    case 3: // approval
      if (userRole === "engineer") {
        show = true;
      }
      return show;
    case 4: // rating
      // if ((creator?._id === user?._id && !workOrderRating) || workOrderRating) {
      // requestor
      show = true;
      // }
      return show;
    default:
      return show;
  }
};

const permanentStepCase = (
  currentStep,
  userRole,
  woClassification,
  assignedTo,
  creator,
  user,
  workOrderUsers,
  workOrderRating,
  workOrder
) => {
  let show = false;

  switch (woClassification) {
    case classification.medical:
    case classification.nonMedical:
      show = permanentMedicalStepCase(
        currentStep,
        userRole,
        assignedTo,
        creator,
        user,
        workOrderUsers,
        workOrderRating,
        workOrder
      );
      return show;
    case classification.generic:
      show = permanentGenericStepCase(
        currentStep,
        userRole,
        assignedTo,
        user,
        workOrderUsers,
        creator,
        workOrderRating
      );

      return show;
    default:
      return show;
  }
};

// medical/non_medical start
const permanentMedicalStepCase = (
  currentStep,
  userRole,
  assignedTo,
  creator,
  user,
  workOrderUsers,
  workOrderRating,
  workOrder
) => {
  let show = false;
  switch (assignedTo) {
    case "hmc_supervisor": //  HMC super visor Assigned
      show = permanentMedicalSuperVisorAssignedStepCase(
        currentStep,
        userRole,
        creator,
        user,
        workOrderUsers,
        workOrderRating,
        workOrder
      );
      return show;
    case "hmc_technician": // HMC technician Assigned
      show = permanentMedicalTechnicianAssignedStepCase(
        currentStep,
        userRole,
        creator,
        user,
        workOrderUsers,
        workOrderRating,
        workOrder
      );
      return show;
    default:
      return show;
  }
};

const permanentMedicalSuperVisorAssignedStepCase = (
  currentStep,
  userRole,
  creator,
  user,
  workOrderUsers,
  workOrderRating,
  workOrder
) => {
  let show = false;
  switch (currentStep) {
    case 1: // assigning
      if (userRole === "hmc_supervisor") {
        show = true;
      }
      return show;
    case 2: // acceptance skipped
    case 3: // completion
      if (userRole === "hmc_supervisor" && user?._id === workOrderUsers?.technician?.assignedTo) {
        show = true;
      }
      return show;

    // step/case 4: approval_hmc_supervisor skipped

    case 5: // approval
      if (userRole === "engineer") {
        show = true;
      }
      return show;
    case 6: // REQUESTOR APPROVAL, IF SUPERVISOR IS REQUESTOR THEN THIS STEP WILL BE SKIPPED
      if (creator?._id === user?._id || (userRole === userRoleGlob.staff && workOrder?.type === woType.corrective)) {
        // requestor
        show = true;
      }
      return show;
    case 7: // RATING(CONTROLS MANAGED BY ACTION_BUTTONS_OBJ) + DOWNLOAD + PRINT
      show = true;
      // }
      return show;
    default:
      return show;
  }
};

const permanentMedicalTechnicianAssignedStepCase = (
  currentStep,
  userRole,
  creator,
  user,
  workOrderUsers,
  workOrderRating,
  workOrder
) => {
  let show = false;
  switch (currentStep) {
    case 1: // assign
      if (userRole === "hmc_supervisor") {
        show = true;
      }
      return show;
    case 2: // accept
    case 3: // complete
      if (userRole === "hmc_technician" && user?._id === workOrderUsers?.technician?.assignedTo) {
        show = true;
      }
      return show;
    case 4: // approve
      if (userRole === "hmc_supervisor") {
        show = true;
      }
      return show;
    case 5: // approve
      if (userRole === "engineer") {
        show = true;
      }
      return show;
    case 6: // REQUESTOR APPROVAL, IF SUPERVISOR IS REQUESTOR THEN THIS STEP WILL BE SKIPPED
      if (creator?._id === user?._id || (userRole === userRoleGlob.staff && workOrder?.type === woType.corrective)) {
        // requestor
        show = true;
      }
      return show;
    case 7: // rating
      show = true;
      // }
      return show;
    default:
      return show;
  }
};
// medical/non_medical end

// Generic start
const permanentGenericStepCase = (
  currentStep,
  userRole,
  assignedTo,
  user,
  workOrderUsers,
  creator,
  workOrderRating
) => {
  let show = false;
  switch (assignedTo) {
    case "hmc_supervisor":
      show = permanentGenericSuperVisorAssignedStepCase(
        currentStep,
        userRole,
        user,
        workOrderUsers,
        creator,
        workOrderRating
      );
      return show;
    case "hmc_technician":
      show = permanentGenericTechnicianAssignedStepCase(
        currentStep,
        userRole,
        user,
        workOrderUsers,
        creator,
        workOrderRating
      );
      return show;
    default:
      return show;
  }
};

const permanentGenericSuperVisorAssignedStepCase = (
  currentStep,
  userRole,
  user,
  workOrderUsers,
  creator,
  workOrderRating
) => {
  let show = false;
  switch (currentStep) {
    case 1: // assigning
      if (userRole === "helpdesk") {
        show = true;
      }
      return show;
    // case 2: // acceptance
    case 2: // assigning
      if (userRole === "hmc_supervisor") {
        show = true;
      }
      return show;
    case 3: // acceptance hmc_supervisor skipped
    case 4: // completion
      if (userRole === "hmc_supervisor" && user?._id === workOrderUsers?.technician?.assignedTo) {
        show = true;
      }
      return show;
    // case 5:  //approval hmc_supervisor skipped
    case 6: // approval
      if (userRole === "engineer") {
        show = true;
      }
      return show;
    // REQUESTOR APPROVAL SKIPPED FOR GENERIC
    case 7: // rating
      show = true;
      // }
      return show;

    default:
      return show;
  }
};

const permanentGenericTechnicianAssignedStepCase = (
  currentStep,
  userRole,
  user,
  workOrderUsers,
  creator,
  workOrderRating
) => {
  let show = false;
  switch (currentStep) {
    case 1: // assigning
      if (userRole === "helpdesk") {
        show = true;
      }
      return show;
    case 2: // assigning
      if (userRole === "hmc_supervisor") {
        show = true;
      }
      return show;
    case 3: // acceptance
    case 4: // completion
      if (userRole === "hmc_technician" && user?._id === workOrderUsers?.technician?.assignedTo) {
        show = true;
      }
      return show;
    case 5: // approval hmc_supervisor
      if (userRole === "hmc_supervisor") {
        show = true;
      }
      return show;

    case 6: // approval
      if (userRole === "engineer") {
        show = true;
      }
      return show;
    // REQUESTOR APPROVAL SKIPPED FOR GENERIC
    case 7: // rating
      show = true;
      // }
      return show;

    default:
      return show;
  }
};

// IMC WO controls
const imcStepCase = (
  currentStep,
  userRole,
  woClassification,
  assignedTo,
  creator,
  user,
  workOrderUsers,
  workOrderRating,
  workOrder
) => {
  let show = false;

  switch (woClassification) {
    case classification.medical:
    case classification.nonMedical:
    case classification.generic:
      show = imcMedicalStepCase(
        currentStep,
        userRole,
        assignedTo,
        creator,
        user,
        workOrderUsers,
        workOrderRating,
        workOrder
      );
      return show;
    default:
      return show;
  }
};

// medical/non_medical start/generic
const imcMedicalStepCase = (
  currentStep,
  userRole,
  assignedTo,
  creator,
  user,
  workOrderUsers,
  workOrderRating,
  workOrder
) => {
  let show = false;
  switch (assignedTo) {
    case "hmc_supervisor": //  HMC super visor Assigned
      show = imcMedicalSuperVisorAssignedStepCase(
        currentStep,
        userRole,
        creator,
        user,
        workOrderUsers,
        workOrderRating,
        workOrder
      );
      return show;
    case "hmc_technician": // HMC technician Assigned
      show = imcMedicalTechnicianAssignedStepCase(
        currentStep,
        userRole,
        creator,
        user,
        workOrderUsers,
        workOrderRating,
        workOrder
      );
      return show;
    default:
      return show;
  }
};

const imcMedicalSuperVisorAssignedStepCase = (
  currentStep,
  userRole,
  creator,
  user,
  workOrderUsers,
  workOrderRating,
  workOrder
) => {
  let show = false;
  switch (currentStep) {
    case 1: // assigning
      if (userRole === "hmc_supervisor") {
        show = true;
      }
      return show;
    case 2: // acceptance skipped
    case 3: // completion
      if (userRole === "hmc_supervisor" && user?._id === workOrderUsers?.technician?.assignedTo) {
        show = true;
      }
      return show;

    case 4: // approval requestor
      if (userRole === userRoleGlob.staff || creator?._id === user?._id) {
        // requestor
        show = true;
      }
      return show;
    case 5:
      show = true;
      return show;
    default:
      return show;
  }
};

const imcMedicalTechnicianAssignedStepCase = (
  currentStep,
  userRole,
  creator,
  user,
  workOrderUsers,
  workOrderRating,
  workOrder
) => {
  let show = false;
  switch (currentStep) {
    case 1: // assign
      if (userRole === "hmc_supervisor") {
        show = true;
      }
      return show;
    case 2: // accept
    case 3: // complete
      if (userRole === "hmc_technician" && user?._id === workOrderUsers?.technician?.assignedTo) {
        show = true;
      }
      return show;
    case 4: // approval requestor
      if (userRole === userRoleGlob.staff || creator?._id === user?._id) {
        // requestor
        show = true;
      }
      return show;
    case 5: // rating
      show = true;
      return show;
    default:
      return show;
  }
};
// medical/non_medical/generic  end

// Generic end

// end showControls

const ascendServicesStepCase = (currentStep, userRole, user, workOrderUsers, creator, workOrderRating) => {
  let show = false;
  switch (currentStep) {
    case 1: // starting/accepting
      if (userRole === "call_center") {
        show = true;
      }
      return show;
    case 2: // completion
      if (userRole === "hmc_supervisor" && user?._id === workOrderUsers?.technician?.assignedTo) {
        show = true;
      }
      return show;
    case 3: // approval
      // if (userRole === "engineer") {
      show = true;
      // }
      return show;
    case 4: // rating
      // if ((creator?._id === user?._id && !workOrderRating) || workOrderRating) {
      // requestor
      show = true;
      // }
      return show;
    default:
      return show;
  }
};

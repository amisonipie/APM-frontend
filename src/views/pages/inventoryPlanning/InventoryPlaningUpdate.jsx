import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { TR } from "utility/transformers";
import { GiAutoRepair } from "react-icons/gi";
import { errorHandler, SC } from "utility/helper";
import React, { useState, useEffect } from "react";
import PrimaryButton from "views/components/PrimaryButton";
import FormContainer from "views/components/sidebar/FormContainer";
import { Form, Row } from "reactstrap";
import {
  toggleGetData,
  getListingData,
  editConfirmation,
} from "redux/actions/renderList/renderListAction";
import { commonDrawer } from "redux/actions/drawer/drawerActions";
import {
  inventoriesPlanning,
  getInventory,
  inventoryFormOptions,
} from "utility/helper/endpoints";
import CustomInput from "views/components/@custom/Input";
import CustomSelect from "views/components/@custom/Select";
import SideBarFormHeading from "views/components/sidebar/FormHeading";

const IO = {
  id: "",
  inventoryId: "",
  name: "",
  utilization: null,
  technicalPerformance: null,
  failureFrequency: null,
  estimatedAge: null,
  dueForReplacement: null,
};
const op = {
  UTILIZATION: {
    LOW: {
      LABEL: "Low (0 - 30%)",
      value: "LOW",
    },
    MEDIUM: {
      LABEL: "Medium (31 - 60%)",
      value: "MEDIUM",
    },
    HIGH: {
      LABEL: "High (>60%)",
      value: "HIGH",
    },
  },
  TECHNICAL_PERFORMANCE: {
    LOW: {
      LABEL: "Low",
      value: "LOW",
    },
    MEDIUM: {
      LABEL: "Medium",
      value: "MEDIUM",
    },
    HIGH: {
      LABEL: "High",
      value: "HIGH",
    },
  },
  FAILURE_FREQUENCY: {
    LOW: {
      LABEL: "Low (0 - 2 Failures)",
      value: "LOW",
    },
    MEDIUM: {
      LABEL: "Medium (3 - 4 Failures)",
      value: "MEDIUM",
    },
    HIGH: {
      LABEL: "High (>4 Failures)",
      value: "HIGH",
    },
  },
  ESTIMATED_AGE: {
    0: {
      LABEL: "0 - 2 years old",
      value: "0",
    },
    1: {
      LABEL: "3 - 7 years old",
      value: "1",
    },
    2: {
      LABEL: "+7 years old",
      value: "2",
    },
  },
  DUE_FOR_REPLACEMENT: {
    PHASE_1: {
      LABEL: "Phase 1",
      value: "PHASE_1",
    },
    PHASE_2: {
      LABEL: "Phase 2",
      value: "PHASE_2",
    },
    PHASE_3: {
      LABEL: "Phase 3",
      value: "PHASE_3",
    },
  },
};
function InventoryPlaningUpdate(props) {
  const dispatch = useDispatch();
  const idToUpdate = props?.row?._id;
  const rowToUpdate = props?.row;
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    ...IO,
    loading: !!idToUpdate,
  });
  const [formOptions, setFormOptions] = useState({ data: op, loading: false });

  // functions

  useEffect(() => {
    const myPromises = [getFormOptions(), getData()];

    Promise.all(myPromises).then((response) => {
      const options = response[0]?.data?.inventory;
      const data = response[1];

      setFormOptions({ data: options, loading: false });
      setState({
        ...IO,
        id: data?._id,
        inventoryId: data?.inventoryId,
        name: data?.equipment?.nameEnglish,
        utilization: options?.UTILIZATION[data?.utilization] || null,
        technicalPerformance:
          options?.TECHNICAL_PERFORMANCE[data?.technicalPerformance] || null,
        failureFrequency:
          options?.FAILURE_FREQUENCY[data?.failureFrequency] || null,
        estimatedAge: options?.ESTIMATED_AGE[data?.estimatedAge] || null,
        dueForReplacement:
          options?.DUE_FOR_REPLACEMENT[data?.dueForReplacement] || null,
      });
    });
  }, []);

  const handleChange = ({ key, value }) => {
    let temp = { ...state, [key]: value }; 
    setState(temp);
    if(idToUpdate){
      if(((temp["utilization"] !== null ? temp["utilization"]?.VALUE : null) === (rowToUpdate?.utilization)) &&
        ((temp["estimatedAge"] !== null ? +temp["estimatedAge"]?.VALUE : null) === (rowToUpdate?.estimatedAge && +rowToUpdate?.estimatedAge)) && 
        ((temp["failureFrequency"] !== null ? temp["failureFrequency"]?.VALUE : null) === (rowToUpdate?.failureFrequency)) &&
        ((temp["technicalPerformance"] !== null ? temp["technicalPerformance"]?.VALUE : null) === (rowToUpdate?.technicalPerformance)) &&
        ((temp["dueForReplacement"] !== null ? temp["dueForReplacement"]?.VALUE : null) === (rowToUpdate?.dueForReplacement))
      ) {
        dispatch(editConfirmation(false));
      }else{
        dispatch(editConfirmation(true));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = inventoriesPlanning;
    const responseMessage = "Asset Plan Updated Successfully!";
    const data = TR.dataToSubmit(state);
    delete data.name;
    delete data.inventoryId;
    data.estimatedAge = typeof state?.estimatedAge?.VALUE === "number"
      ? state?.estimatedAge?.VALUE.toString()
      : IO.estimatedAge;

    try {
      setLoading(true);
      await SC.postCall({
        url: endpoint,
        data,
      });
      setLoading(false);
      toast.success(responseMessage);
      dispatch(commonDrawer({ isOpen: false }));
      dispatch(getListingData());
      dispatch(toggleGetData(false));
    } catch (error) {
      const errorMessage = errorHandler(error);
      setLoading(false);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  const getData = async () => {
    try {
      const response = await SC.getCall({
        url: `${getInventory}/${idToUpdate}`,
      });
      return response.data;
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  const getFormOptions = async () => {
    try {
      const response = await SC.getCall({
        url: `${inventoryFormOptions}`,
      });
      return response;
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="sidebarForm">
      {/* Heading  */}
      <SideBarFormHeading
        icon={<GiAutoRepair size={30} />}
        title="Update Asset Plan"
      />
      {/* user create */}
      <FormContainer disableToggle>
        <Row>
          <CustomInput
            col
            name="inventoryId"
            label="Inventory ID"
            value={state?.inventoryId}
            handleChange={() => null}
            isDisabled
          />

          <CustomInput
            col
            name="name"
            label="Asset Name"
            value={state?.name}
            handleChange={() => null}
            isDisabled
          />
          <CustomSelect
            col
            name="utilization"
            label="Utilization"
            isLoading={formOptions.loading}
            handleChange={handleChange}
            value={state.utilization}
            options={formOptions?.data?.UTILIZATION}
          />

          <CustomSelect
            col
            name="technicalPerformance"
            label="Technical Performance"
            isLoading={formOptions.loading}
            handleChange={handleChange}
            value={state.technicalPerformance}
            options={formOptions?.data?.TECHNICAL_PERFORMANCE}
          />

          <CustomSelect
            col
            name="failureFrequency"
            label="Failure Frequency"
            isLoading={formOptions.loading}
            handleChange={handleChange}
            value={state.failureFrequency}
            options={formOptions?.data?.FAILURE_FREQUENCY}
          />

          <CustomSelect
            col
            name="estimatedAge"
            label="Estimated Age"
            isLoading={formOptions.loading}
            handleChange={handleChange}
            value={state.estimatedAge}
            options={formOptions?.data?.ESTIMATED_AGE}
          />

          <CustomSelect
            col
            name="dueForReplacement"
            label="Due for Replacement"
            isLoading={formOptions.loading}
            handleChange={handleChange}
            value={state.dueForReplacement}
            options={formOptions?.data?.DUE_FOR_REPLACEMENT}
          />
        </Row>
      </FormContainer>

      <PrimaryButton
        onClick={() => null}
        isDisabled={loading || state?.loading}
        type="submit"
        customClasses="solid w-100 py-2"
        text={`${!loading ? "Submit" : "Submitting.."}`}
      />
    </Form>
  );
}
export default InventoryPlaningUpdate;

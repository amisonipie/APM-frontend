/* eslint-disable multiline-ternary */
import { Form } from "reactstrap";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { TR } from "utility/transformers";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import HeadingIC from "views/components/Heading";
import { closeFileIcon } from "assets/icons/svgIcons";
import PrimaryButton from "views/components/PrimaryButton";
import FormContainer from "views/components/sidebar/FormContainer";
import { SC, errorHandler, handleEmptyFields } from "utility/helper";
import { toggleGetData } from "redux/actions/renderList/renderListAction";

import CreateForm from "./CreateForm";

function RenderForm({
  states,
  endPoint,
  options,
  HandleChangeConditions,
  edit,
  id,
  getData,
  initialStates,
}) {
  const dispatch = useDispatch();
  const [values, setValues] = useState(states);
  const [finalValuestoSubmit, setFinalValues] = useState(initialStates);
  const history = useHistory();
  const [emptyField, setEmptyField] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({
    key, value, fieldStep, stepIndex,
  }) => {
    const valuesArr = [...values];
    const stepToUpdate = valuesArr[stepIndex];
    let indexOfUpdatedOption;
    let stateToUpdate;
    indexOfUpdatedOption = stepToUpdate.fields.findIndex(
      (op) => op.name === key,
    );
    stateToUpdate = stepToUpdate.fields[indexOfUpdatedOption];
    setFinalValues({ ...finalValuestoSubmit, [key]: value });
    const { updatedStep } = HandleChangeConditions({
      key,
      stepToUpdate,
      stateToUpdate,
      indexOfUpdatedOption,
      valuesArr,
      finalValuestoSubmit,
    });

    valuesArr[stepIndex] = updatedStep;
    setValues(valuesArr);
  };

  const handleSubmit = async () => {
    const isEmpty = handleEmptyFields({ fields: values, finalValuestoSubmit });
    if (isEmpty) {
      setEmptyField(true);
    } else {
      setEmptyField(false);
      setLoading(true);
      try {
        const response = await SC.postCall({
          url: edit ? `${endPoint}/update/${id}` : endPoint,
          data: TR.dataToSubmit(finalValuestoSubmit),
        });
        setFinalValues(initialStates);
        getData({});
        toast.success("Data created successfully!");
        setLoading(false);
        dispatch(toggleGetData(false));
      } catch (error) {
        const errorMessage = errorHandler(error);
        if (errorMessage) toast.error(errorMessage);
        setLoading(false);
      }
    }
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="sidebarForm"
    >
      {values.map((step, index) => (
        <div className="background" key={index}>
          {/* Heading  */}
          <div className="sidebarForm__container">
            <HeadingIC
              className="sidebarForm__container__heading"
              icon={step?.icon}
              label={step?.title}
            />
            <figure
              className="sidebarForm__container--close"
              onClick={() => dispatch(toggleGetData(false))}
            >
              {closeFileIcon}
            </figure>
          </div>

          <FormContainer disableToggle>
            <CreateForm
              finalValues={finalValuestoSubmit}
              values={step.fields}
              handleChange={handleChange}
              emptyField={emptyField}
              options={options || []}
              stepIndex={index}
            />
          </FormContainer>
        </div>
      ))}

      {/* <div className="button"> */}
      <PrimaryButton
        onClick={() => null}
        isDisabled={loading}
        type="submit"
        customClasses="solid w-100 py-2 mt-2"
        text={`${
          loading
            ? edit
              ? "Updating"
              : "Creating"
            : edit
              ? "Update"
              : "Create"
        }`}
      />
      {/* </div> */}
    </Form>
    //   </CardBody>
    // </Card>
  );
}

export default RenderForm;

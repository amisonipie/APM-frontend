import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import HeadingIC from "views/components/Heading";
import { errorHandler, SC } from "utility/helper";
import React, { useEffect, useState } from "react";
import FileUploader from "views/components/DropZone";
import { VF } from "utility/securePass/validatePassword";
import PrimaryButton from "views/components/PrimaryButton";
import { replacedPartIO } from "views/components/workOrders/data";
import FormContainer from "views/components/sidebar/FormContainer";
import {
  Col, Form, FormGroup, Row, Label,
} from "reactstrap";
import { toggleGetData } from "redux/actions/renderList/renderListAction";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import {
  fiveRandomNumbers,
  getFileObj,
  splitData,
  TR,
} from "utility/transformers";

import {
  getTechnicianFormOptions,
  workOrderResolveTechnician,
  workOrderResolveTechnicianAsDraft,
} from "utility/helper/endpoints";

import { woType } from "utility/config";
import CustomFormSwitchButtons from "views/components/CustomSwitch/FormSwitchButtons";
import { toggleTechnicianForm } from "redux/actions/workOrder";
import { woFormIcon } from "assets/icons/svgIcons";
import { cloneDeep } from "lodash";
import CustomInput from "views/components/@custom/Input";
import CustomSelect from "views/components/@custom/Select";
import ReplacedParts from "./ReplacedParts";
import Labour from "./Labour";

const FVIO = {
  status: [],
  failureType: [],
  actionTaken: [],
  foundFailure: [],
  workOrderSummary: [],
  hours: [],
  minutes: [],
};

const IO = {
  status: null,
  failureType: [],
  foundFailure: "",
  physicalCondition: null,
  functionality: null,
  equipmentRecordValidated: null,
  labeling: null,
  safetyCheck: null,

  actionTaken: [],
  replacedParts: [
    // replacedPartIO
  ],
  workOrderSummary: "",
  hours: "",
  minutes: "",
  other_text: "",
  files: [],
};

function WOSolutionFOrm(props) {
  const dispatch = useDispatch();
  const [formOptions, setFormOptions] = useState({ data: {}, loading: true });
  const [state, setState] = useState(IO);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileUploading, setFileLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [validation, setValidation] = useState(FVIO);
  const [isValidationError, setIsValidationError] = useState(false);
  const [activeRP, setActiveRP] = useState([]);
  const { toggleDrawer } = useSelector((state) => ({
    toggleDrawer: state?.renderList?.toggleDrawer,
  }));
  const technicianForm = props?.workOrder?.work_order_steps?.technician_form;
  // functions
  const isOtherType = (value) => {
    let response = false;
    const failureOtherType = value?.filter((item) => item.value === "other");
    if (failureOtherType?.length > 0) {
      response = true;
    }
    return response;
  };
  const handleChange = ({ key, value }) => {
    let stateToUpdate = { ...state };
    if (key === "actionTaken" && !showParts(value)) {
      stateToUpdate = {
        ...stateToUpdate,
        replacedParts: [],
      };
    }
    if (key === "failureType" && !isOtherType(value) && state.other_text) {
      stateToUpdate = {
        ...stateToUpdate,
        other_text: "",
      };
    }
    setState({ ...stateToUpdate, [key]: value });

    handleValidationOnChange({ key, value });
  };

  const handleValidationOnChange = ({ key, value }) => {
    const response = VF.validateFields({
      value,
      not: true,
    });
    setValidation({ ...validation, [key]: response });
  };

  const getFormOptions = async () => {
    try {
      const response = await SC.getCall({
        url: getTechnicianFormOptions,
      });
      const data = response?.data?.data || {};
      setFormOptions({ loading: false, data });
      if (!technicianForm) initializeForm(data);
      return data;
    } catch (err) {
      const error = errorHandler(err);
      toast.error(error);
      setFormOptions({ ...formOptions, loading: false });
    }
  };
  const addPart = () => {
    const currentReplacedParts = [...state?.replacedParts];
    const newRPID = fiveRandomNumbers();
    const newPart = {
      ...replacedPartIO,
      id: newRPID,
    };
    setState({
      ...state,
      replacedParts: [...currentReplacedParts, newPart],
    });
    setActiveRP([...activeRP, newRPID]);
  };

  const deleteRP = (idToDelete) => {
    const filteredReplacedParts = state?.replacedParts.filter(
      (item) => item?.id !== idToDelete,
    );
    const filteredActiveRP = activeRP.filter((item) => item !== idToDelete);

    setState({
      ...state,
      replacedParts: filteredReplacedParts,
    });
    setActiveRP(filteredActiveRP);
  };

  const handleSubmit = async (isDraft) => {
    const endpoint = isDraft
      ? workOrderResolveTechnicianAsDraft
      : workOrderResolveTechnician;

    let stateToClone = cloneDeep(state);

    stateToClone = {
      ...stateToClone,
      files: stateToClone.files.filter((item) => !item?.error),
    };
    const dataToSubmit = TR.dataToSubmit(stateToClone);

    // VO === Validation Object
    let VO = {};
    if (!isDraft) {
      let VIO = FVIO;
      if (isOtherType(state.failureType)) {
        VIO = {
          ...VIO,
          other_text: [],
        };
      }

      // validating All required fields
      Object.keys(VIO).map((item) => {
        const response = VF.validateFields({
          value: dataToSubmit[item],
          not: true,
        });
        if (response?.length > 0) {
          VO = {
            ...VO,
            [item]: response,
          };
        }
      });
    }

    if (Object.keys(VO).length) {
      // set validation
      setValidation(VO);
      setIsValidationError(true);
    } else {
      if (isDraft) {
        setDraftLoading(true);
      } else {
        setLoading(true);
      }
      setIsValidationError(false);
      // making action taken object form action Taken array
      let action_taken = {};
      state.actionTaken.map((item) => {
        action_taken = {
          ...action_taken,
          [item?.value]: 1,
        };
      });

      // making failure type object form failure type array
      let failure_type = {};
      state.failureType.map((item) => {
        failure_type = {
          ...failure_type,
          [item?.value]: 1,
        };
      });
      if (failure_type.other) {
        failure_type = {
          ...failure_type,
          other_text: state.other_text,
        };
      }

      const data = {
        status: dataToSubmit?.status,
        checklist: {
          physical_condition: state?.physicalCondition,
          functional_check_functionality: state?.functionality,
          equipment_record_validated: state?.equipmentRecordValidated,
          labeling: state?.labeling,
          safety_check: state?.safetyCheck,
        },
        action_taken,
        failure_type,
        found_failure: dataToSubmit?.foundFailure,
        replaced_parts: dataToSubmit?.replacedParts?.map((item) => ({
          part_name: item?.part_name,
          part_number: item?.part_number,
          cost: item?.cost,
          quantity: item?.quantity,
        })),
        work_order_summary: dataToSubmit?.workOrderSummary,
        fileUpload: dataToSubmit?.files,

        hours: parseInt(dataToSubmit?.hours, 10),
        minutes: parseInt(dataToSubmit?.minutes, 10),
        workOrderId: props?.workOrder?._id,
        flag: 1,
        comment: "",
      };

      try {
        const response = await SC.postCall({
          url: endpoint,
          data,
        });
        dispatch(toggleGetData({ isToggle: !toggleDrawer }));
        setLoading(false);
        setDraftLoading(false);
        if (isDraft) dispatch(toggleTechnicianForm(false));

        // toast.success("Workorder created successfully!");
      } catch (error) {
        const errorMessage = errorHandler(error);
        if (errorMessage) toast.error(errorMessage);
        setLoading(false);
        setDraftLoading(false);
      }
    }
  };

  const updatedForm = (e) => {
    // getting labour time in hours and minutes
    let minutes = e?.labor_time / 60;
    const hours = e?.labor_time
      ? (minutes / 60)?.toString().split(".")[0]
      : IO.hours;
    minutes = e?.labor_time ? minutes % 60 : IO.minutes;
    const submittedTechForm = {
      hours,
      minutes,
      status: e?.status
        ? {
          value: e?.status,
          label: splitData(e?.status, "_", " "),
        }
        : IO.status,
      failureType: e?.failure_type
        ? Object.keys(e?.failure_type)
          ?.filter((item) => e?.failure_type[item])
          ?.map((item) => ({
            value: item,
            label: splitData(item, "_", " "),
          }))
        : IO.failureType,
      other_text: e?.failure_type?.other
        ? e?.failure_type?.other_text
        : IO.other_text,
      physicalCondition: e?.checklist?.physical_condition,
      functionality: e?.checklist?.functional_check_functionality,
      equipmentRecordValidated: e?.checklist?.equipment_record_validated,
      labeling: e?.checklist?.labeling,
      safetyCheck: e?.checklist?.safety_check,
      actionTaken: e?.action_taken
        ? Object.keys(e?.action_taken)
          ?.filter((item) => e?.action_taken[item])
          ?.map((item) => ({
            value: item,
            label: splitData(item, "_", " "),
          }))
        : IO.actionTaken,
      replacedParts: e?.replaced_parts
        ? e?.replaced_parts?.map((item) => ({
          ...item,
          id: fiveRandomNumbers(),
          cost: item?.cost || 0,
        }))
        : IO.replacedParts,

      foundFailure: e?.found_failure || IO.foundFailure,
      workOrderSummary: e?.work_order_summary || IO.workOrderSummary,
      files: e?.fileUpload?.filter((item) => !item?.error)
        ? e?.fileUpload?.map((item) => getFileObj(item))
        : IO.files,
    };

    setState(submittedTechForm);
  };

  useEffect(() => {
    if (technicianForm) updatedForm(technicianForm);
  }, []);

  useEffect(() => {
    getFormOptions();
  }, []);

  const initializeForm = (e) => {
    let stateObj = { ...state };

    if (props?.workOrder?.type === woType.corrective) {
      stateObj = {
        ...stateObj,
        status: {
          value: "pending_for_repair",
          label: e?.status?.values?.pending_for_repair,
        },
      };
    }

    if (props?.workOrder?.type === woType.preventive) {
      stateObj = {
        ...stateObj,
        status: {
          value: "awaiting_parts",
          label: e?.status?.values?.awaiting_parts,
        },
        failureType: [
          {
            value: "no_failure_pm_needed",
            label: e?.failure_type?.list?.no_failure_pm_needed?.label,
          },
        ],
        foundFailure: "No Failure, PM Needed",
      };
    }

    setState(stateObj);
  };

  // TOGGLE ACTION TAKEN PARTS SECTION
  const showParts = (data) => {
    const actionsTakenArray = data || state?.actionTaken;
    let showPart = false;
    ["replaced_parts", "replace_accessory", "replace_consumable"].map(
      (rpItem) => actionsTakenArray?.map((item) => {
        if (item.value === rpItem) {
          showPart = true;
        }
      }),
    );
    return showPart;
  };

  const handleCancel = () => {
    dispatch(toggleTechnicianForm(false));
  };
  return (
    <Form className="sidebarForm">
      {/* Heading  */}
      <div className="sidebarForm__container Workorder-Container">
        <HeadingIC
          className="sidebarForm__container__heading "
          icon={woFormIcon}
          label="Workorder Form"
        />
        {/* <figure
          className="sidebarForm__container--close"
          onClick={() => dispatch(toggleGetData({ isToggle: false }))}
        >
          {closeFileIcon}
        </figure> */}
      </div>

      {/* technician/supervisor form to solve workorder */}
      <FormContainer disableToggle>
        <Row>
          <Col className="p-0" xs="12">
            <FormGroup>
              <Label className="required">Status</Label>
              {/* <Select
                className="basic-single text-capitalize"
                classNamePrefix="select"
                isSearchable={true}
                isClearable={true}
                components={{
                  IndicatorSeparator: () => null,
                }}
                name="status"
                instanceId="status"
                placeholder="Select Status"
                value={state.status}
                isLoading={formOptions.loading}
                isDisabled={formOptions.loading}
                options={
                  (formOptions?.data?.status &&
                    Object.keys(formOptions?.data?.status?.values)?.map(
                      (item) => {
                        return {
                          value: item,
                          label: formOptions?.data?.status?.values[item],
                        };
                      }
                    )) ||
                  []
                }
                onChange={(e) => {
                  handleChange({ key: "status", value: e });
                }}
              /> */}
              <CustomSelect
                customClasses="basic-single text-capitalize"
                isSearchable
                isClearable
                name="status"
                instanceId="status"
                placeholder="Select Status"
                value={state.status}
                isLoading={formOptions.loading}
                isDisabled={formOptions.loading}
                optionsCustoms={{
                  value: "value",
                  label: "label",
                }}
                options={
                  (formOptions?.data?.status
                    && Object.keys(formOptions?.data?.status?.values)?.map(
                      (item) => ({
                        value: item,
                        label: formOptions?.data?.status?.values[item],
                      }),
                    ))
                  || []
                }
                customOptionLabel={(e) => e.label}
                customOptionValue={(e) => e.value}
                additionalOnChangeHandler={(e) => {
                  handleChange({ key: "status", value: e });
                }}
              />
              {isValidationError && (
                <FieldValidation
                  id="status"
                  validations={validation.status}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
          {" "}
          <Col className="p-0" xs="12">
            <FormGroup>
              <Label className="required">Failure Type</Label>
              {/* <Select
                className="basic-single text-capitalize"
                classNamePrefix="select"
                isSearchable={true}
                isClearable={true}
                components={{
                  IndicatorSeparator: () => null,
                }}
                name="failureType"
                instanceId="failureType"
                placeholder="Select Failure Type"
                value={state.failureType}
                isLoading={formOptions.loading}
                isDisabled={formOptions.loading}
                isMulti={true}
                options={
                  (formOptions?.data?.failure_type &&
                    Object.keys(formOptions?.data?.failure_type?.list)?.map(
                      (item) => {
                        return {
                          value: item,
                          label:
                            formOptions?.data?.failure_type?.list[item]?.label,
                        };
                      }
                    )) ||
                  []
                }
                onChange={(e) => {
                  handleChange({ key: "failureType", value: e });
                }}
              /> */}
              <CustomSelect
                customClasses="basic-single text-capitalize"
                isSearchable
                isClearable
                name="failureType"
                instanceId="failureType"
                placeholder="Select Failure Type"
                value={state.failureType}
                isLoading={formOptions.loading}
                isDisabled={formOptions.loading}
                isMulti
                optionsCustoms={{
                  value: "value",
                  label: "label",
                }}
                options={
                  (formOptions?.data?.failure_type
                    && Object.keys(formOptions?.data?.failure_type?.list)?.map(
                      (item) => ({
                        value: item,
                        label:
                            formOptions?.data?.failure_type?.list[item]?.label,
                      }),
                    ))
                  || []
                }
                customOptionLabel={(e) => e.label}
                customOptionValue={(e) => e.value}
                additionalOnChangeHandler={(e) => {
                  handleChange({ key: "failureType", value: e });
                }}
              />
              {isValidationError && (
                <FieldValidation
                  id="failureType"
                  validations={validation.failureType}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
          {isOtherType(state.failureType) && (
            <Col className="p-0" xs="12">
              <FormGroup>
                <CustomInput
                  type="text"
                  name="other_text"
                  placeholder="Enter other failure type"
                  value={state.other_text}
                  eventOnChangeHandler={(e) => handleChange({ key: "other_text", value: e.target.value })}
                />
                {isValidationError && (
                  <FieldValidation
                    id="other_text"
                    validations={validation.other_text}
                    isTransparent
                  />
                )}
              </FormGroup>
            </Col>
          )}
          <Col className="p-0" xs="12">
            <FormGroup>
              <Label className="required">Found Failure</Label>
              <CustomInput
                bsSize="lg"
                type="textarea"
                placeholder="Write more detail about the Failure"
                value={state.foundFailure}
                rows="5"
                eventOnChangeHandler={(e) => handleChange({ key: "foundFailure", value: e.target.value })}
              />
              {isValidationError && (
                <FieldValidation
                  id="foundFailure"
                  validations={validation.foundFailure}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
          <Col className="p-0" xs="12">
            <FormGroup>
              <Label className="">Checklist</Label>
              <CustomFormSwitchButtons
                name="physicalCondition"
                label="Physical Condition"
                value={state?.physicalCondition}
                onSwitch={handleChange}
                customFormGroupClasses="form-control px-1"
              />
              <CustomFormSwitchButtons
                name="functionality"
                label="Functional Check / Functionality"
                value={state?.functionality}
                onSwitch={handleChange}
                customFormGroupClasses="form-control px-1"
              />

              <CustomFormSwitchButtons
                name="equipmentRecordValidated"
                label="Equipment Record Validated"
                value={state?.equipmentRecordValidated}
                onSwitch={handleChange}
                customFormGroupClasses="form-control px-1"
              />

              <CustomFormSwitchButtons
                name="labeling"
                label="Labeling"
                value={state?.labeling}
                onSwitch={handleChange}
                customFormGroupClasses="form-control px-1"
              />

              <CustomFormSwitchButtons
                name="safetyCheck"
                label="Safety Check"
                value={state?.safetyCheck}
                onSwitch={handleChange}
                customFormGroupClasses="form-control px-1"
              />
            </FormGroup>
          </Col>
          <Col className="p-0" xs="12">
            <FormGroup>
              <Label className="required">Action Taken</Label>
              <CustomSelect
                customClasses="basic-single text-capitalize"
                isSearchable
                isClearable
                name="actionTaken"
                instanceId="actionTaken"
                placeholder="Select Action Taken"
                value={state.actionTaken}
                isLoading={formOptions.loading}
                isDisabled={formOptions.loading}
                isMulti
                optionsCustoms={{
                  value: "value",
                  label: "label",
                }}
                options={
                  (formOptions?.data?.action_taken
                    && Object.keys(formOptions?.data?.action_taken?.list)?.map(
                      (item) => ({
                        value: item,
                        label:
                            formOptions?.data?.action_taken?.list[item]?.label,
                      }),
                    ))
                  || []
                }
                customOptionLabel={(e) => e.label}
                customOptionValue={(e) => e.value}
                additionalOnChangeHandler={(e) => {
                  handleChange({ key: "actionTaken", value: e });
                }}
              />
              {isValidationError && (
                <FieldValidation
                  id="actionTaken"
                  validations={validation.actionTaken}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
          {state?.actionTaken
            ?.map((item) => item?.value)
            .includes("replaced_parts") && (
            <Col className="p-0" xs="12">
              <FormGroup>
                <Label className="optional">Replaced Parts</Label>
                <ReplacedParts
                  replacedParts={state?.replacedParts}
                  addPart={addPart}
                  activeRP={activeRP}
                  setActiveRP={setActiveRP}
                  handleChange={handleChange}
                  deleteRP={deleteRP}
                />
              </FormGroup>
            </Col>
          )}
          <Col className="p-0" xs="12">
            <FormGroup>
              <Label className="required">Work Order Summary</Label>
              <CustomInput
                bsSize="lg"
                type="textarea"
                placeholder="Write more detail about the Failure"
                value={state.workOrderSummary}
                rows="7"
                eventOnChangeHandler={(e) => handleChange({
                  key: "workOrderSummary",
                  value: e.target.value,
                })}
              />
              {isValidationError && (
                <FieldValidation
                  id="workOrderSummary"
                  validations={validation.workOrderSummary}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
        </Row>
      </FormContainer>

      {/* <Col xs="12"> */}
      <FormGroup>
        <Label className="">Labour</Label>
        <Labour
          workorder={props.workOrder}
          user={props.user}
          state={state}
          handleChange={handleChange}
          isValidationError={isValidationError}
          validation={validation}
        />
      </FormGroup>
      {/* </Col> */}
      {/* files upload */}
      <div className="fileUploadContainer">
        <FormGroup>
          <Label className="">Add Attachments</Label>

          <FileUploader
            handleChange={(e) => handleChange({ key: "files", value: e })}
            accept=".jpg, .jpeg, .png, .svg, .pdf, .xlsx, .xls"
            size={5000000}
            onlyUploader
            value={state.files}
            uploaderText="Upload"
            setFileLoading={setFileLoading}
          />
        </FormGroup>
      </div>
      <div className="btn-group">
        <PrimaryButton
          onClick={() => handleCancel()}
          isDisabled={loading || draftLoading || fileUploading}
          type="button"
          customClasses="primary-outline w-100 py-2"
          text="Cancel"
        />
        <PrimaryButton
          onClick={() => handleSubmit("isDraft")}
          isDisabled={loading || draftLoading || fileUploading}
          type="button"
          customClasses="primary w-100 py-2"
          text={`${!draftLoading ? "Save" : "Submitting.."}`}
        />
      </div>

      <PrimaryButton
        onClick={() => handleSubmit()}
        isDisabled={loading || draftLoading || fileUploading}
        type="button"
        customClasses="solid w-100 py-2 mt-2"
        text={`${!loading ? "Submit" : "Submitting.."}`}
      />
    </Form>
  );
}
export default WOSolutionFOrm;

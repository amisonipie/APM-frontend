import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getFileObj, TR } from "utility/transformers";
import { errorHandler, SC } from "utility/helper";
import React, { useState, useEffect } from "react";
import FileUploader from "views/components/DropZone";
import { VF } from "utility/securePass/validatePassword";
import PrimaryButton from "views/components/PrimaryButton";
import FormContainer from "views/components/sidebar/FormContainer";
import { hospitalIcon } from "assets/icons/svgIcons";
import {
  Col, Form, FormGroup, Label, Row,
} from "reactstrap";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import {
  toggleGetData,
  getListingData,
  editConfirmation,
} from "redux/actions/renderList/renderListAction";
import { commonDrawer } from "redux/actions/drawer/drawerActions";
import {
  createSite,
  siteFormOptions,
  getSite,
  updateSite,
} from "utility/helper/endpoints";
import { site_model } from "utility/config";
import { cloneDeep } from "lodash";
import SideBarFormHeading from "views/components/sidebar/FormHeading";
import CustomInput from "views/components/@custom/Input";
import CustomSelect from "views/components/@custom/Select";

const FVIO = {
  site_name: [],
  region_id: [],
  type: [],
  model: [],
  city: [],
  // latitude: [],
  // longitude: [],
};
const IO = {
  city: "",
  site_name: "",
  region_id: null,
  type: null,
  model: null,
  latitude: "",
  longitude: "",
  siteLogo: [],
};
function SiteCreate(props) {
  const idToUpdate = props?.row?._id;
  const  rowName = props?.row;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    ...IO,
    loading: !!idToUpdate,
  });
  const [options, setOptions] = useState({ data: {}, loading: true });
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(FVIO);
  const [isValidationError, setIsValidationError] = useState(false);
  // functions
  const handleChange = ({ key, value }) => {
    let stateToUpdate = cloneDeep({ ...state });
    if (key === "model" && value?.value !== site_model.imc) {
      stateToUpdate = {
        ...stateToUpdate,
        siteLogo: [],
      };
    }
    let temp = { ...stateToUpdate, [key]: value };
    setState(temp);
    handleValidationOnChange({ key, value });
    if(idToUpdate){
      if(temp["city"] === rowName?.city &&
        temp["region_id"]?._id === rowName?.region_id && 
        temp["type"]?.value === rowName?.type &&
        temp["city"] ===  rowName?.city &&
        temp["site_name"] === rowName?.site_name &&
        temp["latitude"] === rowName?.coordinates?.latitude &&
        temp["longitude"] === rowName?.coordinates?.longitude 
      ) {
        dispatch(editConfirmation(false));
      }else{
       dispatch(editConfirmation(true));
      }
    }else{
     if (temp["city"] || temp["site_name"] || temp["region_id"] || temp["type"] || temp["model"] || temp["latitude"] || temp["longitude"]) 
     {
         dispatch(editConfirmation(true));
     } else {
        dispatch(editConfirmation(false));
     }
   }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = createSite;
    let responseMessage = "Site Created Successfully!";
    let data = TR.dataToSubmit(state);
    data = {
      ...data,
      siteLogo: data?.siteLogo?.length > 0 ? data?.siteLogo[0] : "",
    };
    // VO === Validation Object
    let VO = {};

    // validating All required fields
    Object.keys(FVIO).map((item) => {
      const response = VF.validateFields({
        value: data[item],
        not: true,
      });
      if (response?.length > 0) {
        VO = {
          ...VO,
          [item]: response,
        };
      }
    });
    if (Object.keys(VO).length) {
      // set validation
      setValidation(VO);
      setIsValidationError(true);
    } else {
      setLoading(true);
      setIsValidationError(false);
      if (idToUpdate) {
        endpoint = updateSite;
        data = {
          ...data,
          id: idToUpdate,
        };
        responseMessage = "Site Updated Successfully!";
      }
      try {
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
    }
  };
  const handleValidationOnChange = ({ key, value }) => {
    const response = VF.validateFields({
      value,
      not: true,
    });
    setValidation({ ...validation, [key]: response });
  };

  const getOptions = async () => {
    try {
      const response = await SC.getCall({
        url: siteFormOptions,
      });
      const data = response?.data || {};
      setOptions({ loading: false, data });
    } catch (error) {
      const errorMessage = errorHandler(error);
      setOptions({ ...options, loading: false });
      if (errorMessage) toast.error(errorMessage);
    }
  };
  const getData = async () => {
    try {
      const response = await SC.getCall({
        url: `${getSite}/${idToUpdate}`,
      });
      const { data } = response;
      setState({
        city: data?.city || IO.city,
        site_name: data?.site_name,
        region_id: data?.region,
        model: { label: data?.model, value: data?.model },
        type: { label: data?.type, value: data?.type },
        longitude: data?.coordinates?.longitude,
        latitude: data?.coordinates?.latitude,
        siteLogo: data?.siteLogo
          ? [getFileObj(data?.siteLogo)]
          : state.siteLogo,
        loading: false,
      });
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (idToUpdate) getData();
    if (options.loading) getOptions();
  }, []);
  return (
    <Form onSubmit={handleSubmit} className="sidebarForm">
      {/* Heading  */}

      <SideBarFormHeading
        icon={hospitalIcon}
        title={`${idToUpdate ? "Update" : "Create"} Site`}
      />

      {/* user create */}
      <FormContainer disableToggle>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Select Region</Label>
              <CustomSelect
                customClasses="basic-single text-capitalize"
                isSearchable
                name="region_id"
                instanceId="region_id"
                placeholder="Select"
                value={state?.region_id}
                additionalOnChangeHandler={(value) => {
                  handleChange({ key: "region_id", value });
                }}
                optionsCustoms={{
                  value: "region_id",
                  label: "name",
                }}
                isLoading={options.loading}
                options={
                  options?.data?.regions
                  // ?.map((item) => {
                  //   return { label: item?.name, value: item?._id };
                  // })
                  || []
                }
                customOptionLabel={(e) => e.name}
                customOptionValue={(e) => e._id}
              />
              {isValidationError && (
                <FieldValidation
                  id="region_id"
                  validations={validation.region_id}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Select Model</Label>
              <CustomSelect
                customClasses="basic-single text-capitalize"
                isSearchable
                name="model"
                instanceId="model"
                placeholder="Select"
                value={state?.model}
                additionalOnChangeHandler={(value) => {
                  handleChange({ key: "model", value });
                }}
                isLoading={options.loading}
                isDisabled={idToUpdate}
                optionsCustoms={{
                  value: "value",
                  label: "label",
                }}
                options={
                  Object.keys(options?.data?.model || {})?.map((item) => ({
                    label: options?.data?.model[item]?.NAME,
                    value: options?.data?.model[item]?.MODEL,
                  })) || []
                }
                customOptionLabel={(e) => e.label}
                customOptionValue={(e) => e.value}
              />
              {isValidationError && (
                <FieldValidation
                  id="model"
                  validations={validation.model}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>

          <Col xs="12">
            <FormGroup>
              <Label className="required">Select Type</Label>
              <CustomSelect
                customClasses="basic-single text-capitalize"
                isSearchable
                name="type"
                instanceId="type"
                placeholder="Select"
                value={state?.type}
                additionalOnChangeHandler={(value) => {
                  handleChange({ key: "type", value });
                }}
                optionsCustoms={{
                  value: "value",
                  label: "label",
                }}
                isLoading={options.loading}
                customOptionLabel={(e) => e.label}
                customOptionValue={(e) => e.value}
                options={
                  Object.keys(options?.data?.type || {})?.map((item) => ({
                    label: options?.data?.type[item]?.NAME,
                    value: options?.data?.type[item]?.TYPE,
                  })) || []
                }
              />
              {isValidationError && (
                <FieldValidation
                  id="type"
                  validations={validation.type}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>

          <Col xs="12">
            <FormGroup>
              <Label className="required">City</Label>
              <CustomInput
                type="text"
                name="city"
                placeholder="Enter city name"
                value={state.city}
                eventOnChangeHandler={(e) => {
                  handleChange({ key: "city", value: e.target.value });
                }}
              />
              {isValidationError && (
                <FieldValidation
                  id="city"
                  validations={validation.city}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>

          <Col xs="12">
            <FormGroup>
              <Label className="required">Name</Label>
              <CustomInput
                type="text"
                name="site_name"
                placeholder="Enter site name"
                value={state.site_name}
                eventOnChangeHandler={(e) => {
                  handleChange({ key: "site_name", value: e.target.value });
                }}
              />
              {isValidationError && (
                <FieldValidation
                  id="site_name"
                  validations={validation.site_name}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>

          <Col xs="12">
            <FormGroup>
              <Label className="">Latitude</Label>
              <CustomInput
                type="number"
                name="latitude"
                placeholder="Enter latitude of site"
                value={state.latitude}
                eventOnChangeHandler={(e) => {
                  handleChange({ key: "latitude", value: e.target.value });
                }}
              />
              {/* {isValidationError && (
                <FieldValidation
                  id="latitude"
                  validations={validation.latitude}
                  isTransparent={true}
                />
              )} */}
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup>
              <Label className="">Longitude</Label>
              <CustomInput
                type="number"
                name="longitude"
                placeholder="Enter longitude of site"
                value={state.longitude}
                eventOnChangeHandler={(e) => {
                  handleChange({
                    key: "longitude",
                    value: e.target.value,
                  });
                }}
              />
              {/* {isValidationError && (
                <FieldValidation
                  id="longitude"
                  validations={validation.longitude}
                  isTransparent={true}
                />
              )} */}
            </FormGroup>
          </Col>
          {/* files upload */}
          {state?.model?.value === site_model.imc && (
            <Col xs="12">
              <FormGroup>
                <Label className="">Site Logo</Label>
                <div className="fileUploadContainer">
                  <FileUploader
                    handleChange={(e) => handleChange({ key: "siteLogo", value: e })}
                    onlyUploader
                    single
                    accept=".jpg, .jpeg, .png, .svg"
                    size={50000}
                    value={state.siteLogo}
                  />
                </div>
              </FormGroup>
            </Col>
          )}
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
export default SiteCreate;

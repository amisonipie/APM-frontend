import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { FaGlobe } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { TR } from "utility/transformers";
import { errorHandler, SC } from "utility/helper";
import { VF } from "utility/securePass/validatePassword";
import PrimaryButton from "views/components/PrimaryButton";
import FormContainer from "views/components/sidebar/FormContainer";
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
  createRegion,
  getRegion,
  updateRegion,
} from "utility/helper/endpoints";
import SideBarFormHeading from "views/components/sidebar/FormHeading";
import CustomInput from "views/components/@custom/Input";

const FVIO = {
  name: [],
  // latitude: [],
  // longitude: [],
};
const IO = {
  name: "",
  latitude: "",
  longitude: "",
};
function RegionCreate(props) {
  const idToUpdate = props?.row?._id;
  const rowToUpdate = props?.row;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    ...IO,
    loading: !!idToUpdate,
  });
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(FVIO);
  const [isValidationError, setIsValidationError] = useState(false);
  // functions
  const handleChange = ({ key, value }) => {
    let stateToUpdate = { ...state };
    let temp = { ...stateToUpdate, [key]: value };
    setState(temp);
    handleValidationOnChange({ key, value });
    if(idToUpdate){
      if(temp["name"] === rowToUpdate?.name &&
      temp["latitude"] === rowToUpdate?.coordinates?.latitude &&
      temp["longitude"] === rowToUpdate?.coordinates?.longitude
      ) {
        dispatch(editConfirmation(false));
      }else{
        dispatch(editConfirmation(true));
      }
    }else{
    if(temp["name"] || temp["latitude"] || temp["longitude"]) {
      dispatch(editConfirmation(true));
    } else {
      dispatch(editConfirmation(false));
    }
  }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = createRegion;
    let responseMessage = "Region Created Successfully!";
    let data = TR.dataToSubmit(state);
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
        endpoint = updateRegion;
        data = {
          ...data,
          id: idToUpdate,
        };

        responseMessage = "Region Updated Successfully!";
      }
      try {
        const response = await SC.postCall({
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
      isEmail: key === "email",
      digits: key === "phone" ? 12 : false,
    });
    setValidation({ ...validation, [key]: response });
  };

  const getData = async () => {
    try {
      const response = await SC.getCall({
        url: `${getRegion}/${idToUpdate}`,
      });
      const { data } = response;
      setState({
        name: data?.name,
        longitude: data?.coordinates?.longitude,
        latitude: data?.coordinates?.latitude,
        loading: false,
      });
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };
  useEffect(() => {
    if (idToUpdate) getData();
  }, []);
  return (
    <Form onSubmit={handleSubmit} className="sidebarForm">
      {/* Heading  */}
      <SideBarFormHeading
        icon={<FaGlobe />}
        title={`${idToUpdate ? "Update" : "Create"} Region`}
      />
      {/* user create */}
      <FormContainer disableToggle>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Name</Label>
              <CustomInput
                type="text"
                name="name"
                placeholder="Enter region name"
                value={state.name}
                eventOnChangeHandler={(e) => {
                  handleChange({ key: "name", value: e.target.value });
                }}
              />
              {isValidationError && (
                <FieldValidation
                  id="name"
                  validations={validation.name}
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
                placeholder="Enter latitude of region"
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
                placeholder="Enter longitude of region"
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
export default RegionCreate;

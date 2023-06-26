import { toast } from "react-toastify";
import { userRole } from "utility/config";
import { TR } from "utility/transformers";
import { IoLayers } from "react-icons/io5";
import { arrayHead, errorHandler, SC } from "utility/helper";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  createDepartment,
  getDepartment,
  sitesList,
  updateDepartment,
} from "utility/helper/endpoints";
import SideBarFormHeading from "views/components/sidebar/FormHeading";
import CustomInput from "views/components/@custom/Input";
import CustomSelect from "views/components/@custom/Select";

const FVIO = {
  name: [],
  site_id: [],
};
const IO = {
  name: "",
  site_id: null,
};

function SiteDepartmentCreate(props) {
  const dispatch = useDispatch();
  const idToUpdate = props?.row?._id;
  const rowName = props?.row;
  const [state, setState] = useState({
    ...IO,
    loading: !!idToUpdate,
  });
  const [labs, setLabs] = useState({ data: [] });
  const [validation, setValidation] = useState(FVIO);
  const [labsLoading, setLabsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidationError, setIsValidationError] = useState(false);

  // Getting user from Redux
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));

  // Getting Departments Data By ID
  useEffect(() => {
    if (idToUpdate) getData();
  }, []);

  // Getting Labs for Super admin Selection
  useEffect(() => {
    if (user?.role !== userRole.siteAdmin) {
      getLabs();
    }
  }, []);

  // updating Lab field for site admin
  useEffect(() => {
    if (user?.role === userRole.siteAdmin && !idToUpdate) {
      setState({
        ...state,
        site_id: user?.lab,
      });
    }
  }, [user?._id]);

  const getLabs = async () => {
    try {
      setLabsLoading(true);
      const response = await SC.getCall({
        url: sitesList,
      });
      const data = response?.data || [];
      setLabs({ data });
      setLabsLoading(false);
    } catch (error) {
      const errorMessage = errorHandler(error);
      setLabsLoading(false);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  const getData = async () => {
    try {
      const response = await SC.getCall({
        url: `${getDepartment}/${idToUpdate}`,
      });
      const { data } = response;
      setState({
        name: data?.name,
        site_id: arrayHead(data?.sites),
        loading: false,
      });
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
      setState({ ...state, loading: false });
    }
  };

  // functions
  const handleChange = ({ key, value }) => {
    const stateToUpdate = { ...state };
    let temp = { ...stateToUpdate, [key]: value };
    setState(temp);
    handleValidationOnChange({ key, value });
    if(idToUpdate){
      if(temp["name"] === rowName?.name && temp["site_id"]?._id === rowName?.site_id)
      {
        dispatch(editConfirmation(false));
      }else{
        dispatch(editConfirmation(true));
      }
    }else{
    if(temp["name"] || temp["site_id"]) {
      dispatch(editConfirmation(true));
    } else {
      dispatch(editConfirmation(false));
    }
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = createDepartment;
    let responseMessage = "Site Department Created Successfully!";

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
        endpoint = updateDepartment;
        data = {
          ...data,
          id: idToUpdate,
        };

        responseMessage = "Site Department Updated Successfully!";
      }
      try {
        await SC.postCall({
          url: endpoint,
          data,
        });
        setLoading(false);
        toast.success(responseMessage);
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

  return (
    <Form onSubmit={handleSubmit} className="sidebarForm">
      {/* Heading  */}
      <SideBarFormHeading
        icon={<IoLayers />}
        title={`${idToUpdate ? "Update" : "Create"} Site Department`}
      />
      {/* user create */}
      <FormContainer disableToggle>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Department name</Label>
              <CustomInput
                type="text"
                name="name"
                placeholder="Enter department name"
                value={state.name}
                eventOnChangeHandler={(e) => {
                  handleChange({
                    key: "name",
                    value: e.target.value,
                  });
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
              <Label className="required">Site</Label>
              {/* <Select
                className="basic-single text-capitalize"
                classNamePrefix="select"
                isSearchable={true}
                isDisabled={user?.role === userRole.siteAdmin}
                components={{
                  IndicatorSeparator: () => null,
                }}
                name="site_id"
                instanceId="site_id"
                placeholder="Select"
                value={state?.site_id}
                onChange={(value) => {
                  handleChange({ key: "site_id", value });
                }}
                isLoading={labsLoading}
                getOptionLabel={(item) => item?.site_name}
                getOptionValue={(item) => item?._id}
                options={labs.data || []}
              /> */}
              <CustomSelect
                customClasses="basic-single text-capitalize"
                isSearchable
                isDisabled={user?.role === userRole.siteAdmin}
                name="site_id"
                instanceId="site_id"
                placeholder="Select"
                value={state?.site_id}
                additionalOnChangeHandler={(value) => {
                  handleChange({ key: "site_id", value });
                }}
                isLoading={labsLoading}
                optionsCustoms={{
                  value: "_id",
                  label: "site_name",
                }}
                options={labs.data || []}
                customOptionLabel={(e) => e.site_name}
                customOptionValue={(e) => e._id}
              />
              {isValidationError && (
                <FieldValidation
                  id="site_id"
                  validations={validation.site_id}
                  isTransparent
                />
              )}
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
export default SiteDepartmentCreate;

import { debounce } from "lodash";
import { toast } from "react-toastify";
import { TR } from "utility/transformers";
import { useDispatch } from "react-redux";
import { GoOrganization } from "react-icons/go";
import { errorHandler, SC } from "utility/helper";
import React, { useState, useEffect } from "react";
import { VF } from "utility/securePass/validatePassword";
import PrimaryButton from "views/components/PrimaryButton";
import {
  Col, Form, FormGroup, Label, Row,
} from "reactstrap";
import FormContainer from "views/components/sidebar/FormContainer";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import { commonDrawer } from "redux/actions/drawer/drawerActions";

import {
  toggleGetData,
  getListingData,
  editConfirmation,
} from "redux/actions/renderList/renderListAction";

import {
  assignLabs,
  getOrganizationAdmin,
  sitesList,
} from "utility/helper/endpoints";
import SideBarFormHeading from "views/components/sidebar/FormHeading";
import CustomSelect from "views/components/@custom/Select";

const FVIO = {
  site_ids: [],
};
const IO = {
  site_ids: [],
};
function OrganizationAdminAssignSites(props) {
  const idToUpdate = props?.row?._id;
  const SitesToUpdate = props?.row?.sites;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    ...IO,
    loading: true,
  });

  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(FVIO);
  const [isValidationError, setIsValidationError] = useState(false);
  const [sites, setSites] = useState({ data: [] });
  const [sitesLoading, setSitesLoading] = useState(true);
  // functions

  useEffect(() => {
    if (sitesLoading) getSites({});
    if (idToUpdate) getData();
  }, []);

  const getSites = async ({ keyword }) => {
    try {
      const response = await SC.getCall({
        url: sitesList,
        params: { keyword, isPagination: 1 },
      });
      const data = response?.data?.data || [];
      setSites({ data });
      setSitesLoading(false);
    } catch (error) {
      const errorMessage = errorHandler(error);
      setSitesLoading(false);

      if (errorMessage) toast.error(errorMessage);
    }
  };

  const getData = async () => {
    try {
      const response = await SC.getCall({
        url: `${getOrganizationAdmin}/${idToUpdate}`,
      });
      const { data } = response;
      setState({
        site_ids: data?.sites || state?.site_ids,
        loading: false,
      });
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  const handleChange = ({ key, value }) => {
    const stateToUpdate = { ...state };

    setState({ ...stateToUpdate, [key]: value });
    handleValidationOnChange({ key, value });
    let tableData = SitesToUpdate.map((val) =>val?.site_name)
    let valueData = value.map((data) => data?.site_name)
    const filterData = (valueData.length === tableData.length) && (valueData.every(val => tableData.includes(val)));
   
    if(filterData) {
      dispatch(editConfirmation(false));
    }else{
      dispatch(editConfirmation(true));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = TR.dataToSubmit(state);
    const endpoint = assignLabs;
    const responseMessage = "Organization sites assigned successfully!";

    // VO === Validation Object
    let VO = {};

    // IVO === Initial Validation Object
    const IVO = { ...FVIO };
    // validating All required fields
    Object.keys(IVO).map((item) => {
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
      data = {
        ...data,
        id: idToUpdate,
      };
      delete data.loading;
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

  const filterSites = debounce((e) => {
    setSitesLoading(true);
    getSites({ keyword: e });
  }, 1000);

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
        setIsOpen={props.setIsOpen}
        icon={<GoOrganization />}
        title="Assign Organization Sites"
      />
      {/* user create */}
      <FormContainer disableToggle>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Select Sites</Label>
              {/* <Select
                className="basic-single text-capitalize"
                classNamePrefix="select"
                isSearchable={true}
                components={{
                  IndicatorSeparator: () => null,
                }}
                name="site_ids"
                isMulti={true}
                instanceId="site_ids"
                placeholder="Select"
                value={state?.site_ids}
                onChange={(value) => {
                  handleChange({ key: "site_ids", value });
                }}
                onInputChange={(e) => filterSites(e)}
                isLoading={sitesLoading}
                getOptionLabel={(item) => item?.site_name}
                getOptionValue={(item) => item?._id}
                options={sites.data || []}
              /> */}
              <CustomSelect
                customClasses="basic-single text-capitalize"
                isSearchable
                name="site_ids"
                isMulti
                instanceId="site_ids"
                placeholder="Select"
                value={state?.site_ids}
                additionalOnChangeHandler={(value) => {
                  handleChange({ key: "site_ids", value });
                }}
                debounceSearch={(e) => filterSites(e)}
                isLoading={sitesLoading}
                optionsCustoms={{
                  value: "_id",
                  label: "site_name",
                }}
                options={sites.data || []}
                customOptionLabel={(e) => e.site_name}
                customOptionValue={(e) => e._id}
              />
              {isValidationError && (
                <FieldValidation
                  id="site_ids"
                  validations={validation.site_ids}
                  isTransparent
                />
              )}
            </FormGroup>
          </Col>
        </Row>
      </FormContainer>

      <PrimaryButton
        onClick={() => null}
        isDisabled={loading}
        type="submit"
        customClasses="solid w-100 py-2"
        text={`${!loading ? "Submit" : "Submitting.."}`}
      />
    </Form>
  );
}
export default OrganizationAdminAssignSites;

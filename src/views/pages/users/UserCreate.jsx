import { toast } from "react-toastify";
import { classification, userRole } from "utility/config";
import { getOptionObject, getSelectOptions, TR } from "utility/transformers";
import { errorHandler, SC } from "utility/helper";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VF } from "utility/securePass/validatePassword";
import PrimaryButton from "views/components/PrimaryButton";
import {
  getUserClassification,
  getUserRole,
} from "views/components/generalHelper";
import FormContainer from "views/components/sidebar/FormContainer";
import {
  Col,
  Form,
  CustomInput as CustomRadio,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { inventoryStrokeIcon } from "assets/icons/svgIcons";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import {
  toggleGetData,
  getListingData,
  editConfirmation,
} from "redux/actions/renderList/renderListAction";
import { commonDrawer } from "redux/actions/drawer/drawerActions";
import {
  createUser,
  getMaintenanceDepartmentsList,
  getUser,
  sitesList,
  updateUser,
  userSubRoles,
} from "utility/helper/endpoints";
import CustomBadge from "views/components/CustomBadge";
import SideBarFormHeading from "views/components/sidebar/FormHeading";
import { classificationTabs } from "utility/helper/constants";
import CustomInput from "views/components/@custom/Input";
import CustomSelect from "views/components/@custom/Select";

const FVIO = {
  name: [],
  email: [],
  role: [],
  field: [],
  phone: [],
  classification: [],
};

const IO = {
  name: "",
  email: "",
  site_ids: [],
  maintenance_department_ids: [],
  role: null,
  field: null,
  classification: "",
  phone: "+966 __ ___ ____",
  direct_permissions: [],
};

function UserCreate(props) {
  const idToUpdate = props?.row?._id;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state?.auth.login?.data,
  }));
  const [state, setState] = useState({
    ...IO,
    loading: !!idToUpdate,
  });
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({ data: {}, loading: true });
  const [validation, setValidation] = useState(FVIO);
  const [isValidationError, setIsValidationError] = useState(false);
  const [sites, setSites] = useState({ data: [] });
  const [maintenanceDepartments, setMaintenanceDepartments] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  const [selectedMDs, setSelectedMDs] = useState([]);
  const [MDLoading, setMDLoading] = useState(false);
  const [MDRequired, setMDR] = useState(false);
  const [sitesLoading, setSitesLoading] = useState(true);
  const isSuperAdmin = user?.role === userRole.superAdmin;

  // functions

  const handleChange = ({ key, value }) => {
    let stateToUpdate = { ...state };
    let rowName = props?.row;
    const isEmail = key === "email";

    if (key === "site_ids") {
      // empty maintenanceDepartments
      stateToUpdate = {
        ...stateToUpdate,
        maintenance_department_ids: IO.maintenance_department_ids,
      };

      // if updating user get MDs
      if (idToUpdate) {
        getMaintenanceDepartments(value);
      }
      // no sites selected then make MD options empty
      if (!value) setMaintenanceDepartments([]);

      // if role exist and  technician + supervisor get MD options
      if (
        (state?.role?.role === userRole.hmcTechnician
          || state?.role?.role === userRole.hmcSupervisor)
        && value
      ) {
        getMaintenanceDepartments(value);
      }
    }

    if (key === "field") {
      //  empty role + maintenance_department_ids
      stateToUpdate = {
        ...stateToUpdate,
        role: IO.role,
        maintenance_department_ids: IO.maintenance_department_ids,
      };
    }

    if (key === "role") {
      //  empty maintenance_department_ids
      stateToUpdate = {
        ...stateToUpdate,
        maintenance_department_ids: IO.maintenance_department_ids,
      };

      //  if changing role  with technician + supervisor show MD
      if (
        value?.role === userRole.hmcTechnician
        || value?.role === userRole.hmcSupervisor
      ) {
        setMDR(true);
        getMaintenanceDepartments();
      } else {
        setMDR(false);
        stateToUpdate = {
          ...stateToUpdate,
          maintenance_department_ids: IO.maintenance_department_ids,
        };
      }
    }
    let temp = { ...stateToUpdate, [key]: value }; 
    setState({ ...stateToUpdate, [key]: value });
    handleValidationOnChange({ key, value, isEmail });

    if(idToUpdate){
      if(temp?.name === rowName?.name && 
        temp?.email === rowName?.email && 
        (!temp?.site_ids?.length > 0) &&
        (!temp?.maintenance_department_ids?.length > 0) &&
        (temp?.phone.replaceAll("+","").replaceAll(" ","") === rowName?.phone.replaceAll("+","").replaceAll(" ",""))   &&
        (!temp["classification"])
        ){
        dispatch(editConfirmation(false));
      }else{
        dispatch(editConfirmation(true));
      }
    }else{
      if(temp["name"] || temp["email"] || temp["field"] || temp["role"] || (temp['site_ids']?.length > 0) || (temp["maintenance_department_ids"]?.length > 0) || ((temp["role"] !== null) && (temp["classification"] !== "")) || ((temp["phone"] !== "+966 __ ___ ____") && (temp["phone"] !== ""))  )
      {
        dispatch(editConfirmation(true));
      } else {
        dispatch(editConfirmation(false));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = TR.dataToSubmit({
      ...state,
      site_ids: [...(state.site_ids || []), ...selectedSites],
      maintenance_department_ids: [
        ...state.maintenance_department_ids,
        ...selectedMDs,
      ],
    });

    let endpoint = createUser;
    let responseMessage = "User Created Successfully!";

    // VO === Validation Object
    let VO = {};

    // IVO === Initial Validation Object
    let IVO = { ...FVIO };
    if (isSuperAdmin) {
      IVO = {
        ...IVO,
        site_ids: [],
      };
    }
    if (MDRequired) {
      IVO = {
        ...IVO,
        maintenance_department_ids: [],
      };
    }
    const includeClassification = state?.field?.VALUE === classification.medical
      && (state?.role?.VALUE === userRole.siteAdmin
        || state?.role?.VALUE === userRole.staff);

    if (!includeClassification) {
      delete IVO.classification;
      delete data.classification;
    }

    // validating All required fields
    Object.keys(IVO).map((item) => {
      const response = VF.validateFields({
        value: data[item],
        not: true,
        isEmail: item === "email",
        digits: item === "phone" ? 12 : false,
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
      // setLoading(true);
      setIsValidationError(false);
      if (idToUpdate) {
        endpoint = updateUser;
        data = {
          ...data,
          id: idToUpdate,
        };

        responseMessage = "User Updated Successfully!";
      }

      if (!MDRequired) {
        delete data.maintenance_department_ids;
      }
      delete data.loading;

      try {
        setLoading(true);
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
  const getOptions = async () => {
    try {
      const response = await SC.getCall({
        url: userSubRoles,
      });
      const data = response?.data || {};
      setOptions({ loading: false, data });
      return data;
    } catch (error) {
      const errorMessage = errorHandler(error);
      setOptions({ ...options, loading: false });
      if (errorMessage) toast.error(errorMessage);
    }
  };

  const getSites = async ({ keyword }) => {
    try {
      const response = await SC.getCall({
        url: sitesList,
      });
      // const data = response?.data?.data || [];
      const data = response?.data || [];
      return data;
    } catch (error) {
      const errorMessage = errorHandler(error);
      setSitesLoading(false);

      if (errorMessage) toast.error(errorMessage);
    }
  };

  const getMaintenanceDepartments = async (siteIds, userPreDefinedMD) => {
    setMDLoading(true);
    siteIds = siteIds || state.site_ids;
    siteIds = [...siteIds, ...selectedSites];
    try {
      const response = await SC.getCall({
        url: getMaintenanceDepartmentsList,
        params: {
          site_ids:
            siteIds?.length > 0 ? siteIds?.map((item) => item?._id) : undefined,
        },
      });
      // pre defined maintenance departments

      let PDMD = userPreDefinedMD || selectedMDs;
      PDMD = PDMD?.map((item) => item?._id);
      const data = response?.data
        ?.filter((item) => !PDMD?.includes(item?._id))
        ?.map((item) => ({
          ...item,
          VALUE: item?._id,
          LABEL: `${item?.name} ${
            item?.labs?.length > 0 ? `(${item?.labs[0]?.site_name})` : ""
          }`,
        }));

      setMaintenanceDepartments(
        getSelectOptions(data, {
          value: "_id",
          label: "name",
        }),
      );
      setMDLoading(false);
    } catch (error) {
      const errorMessage = errorHandler(error);
      setMDLoading(false);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  const getData = async () => {
    try {
      const response = await SC.getCall({
        url: `${getUser}/${idToUpdate}`,
      });
      const data = response.data?.data;
      return data;
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };
  const updateSites = (data, userSites) => {
    data = data?.filter((item) => !userSites?.includes(item?._id));
    setSites({ data });
    setSitesLoading(false);
  };

  const updateUserData = (data, opts) => {
    // GETTING USER CLASSIFICATION FROM DIRECT PERMISSIONS
    const userClassification = getUserClassification(
      data?.direct_permissions || [],
    );
    let role = getOptionObject(data, "role", "role") || state?.role;
    role = {
      VALUE: role?.VALUE,
      LABEL: getUserRole(role?.LABEL),
    };

    let field = getOptionObject(data, "field", "field") || state?.field;
    field = {
      VALUE: field?.VALUE,
      LABEL: opts?.fields?.find((item) => item?.field === field?.VALUE)?.name,
    };
    setState({
      ...state,
      name: data?.name || state?.name,
      email: data?.email || state?.email,
      site_ids: state?.site_ids,
      role,
      field,
      classification: userClassification,
      phone: data?.phone || state?.phone,
      maintenance_department_ids: IO.maintenance_department_ids,
      direct_permissions: data?.direct_permissions || IO.direct_permissions,
      loading: false,
    });
    setSelectedSites(
      getSelectOptions(data?.sites, {
        value: "_id",
        label: "site_name",
      }),
    );

    setSelectedMDs(
      getSelectOptions(data?.maintenance_departments, {
        value: "_id",
        label: "name",
      }),
    );
    if (
      data?.role === userRole.hmcTechnician
      || data?.role === userRole.hmcSupervisor
    ) {
      setMDR(true);
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
  useEffect(() => {
    let promises = [getOptions(), getSites({})];

    if (idToUpdate) {
      promises = [...promises, getData()];
    }
    Promise.all(promises).then((response) => {
      const userData = (response?.length > 2 && response[2]) || {};

      if (response?.length > 1) {
        updateSites(
          response[1],
          userData?.sites?.map((item) => item?._id),
        );
      }

      if (response?.length > 2) {
        updateUserData(userData, response[0]);

        // check if user linked with MD then call MD list on the bases of assign sites
        if (
          userData?.role === userRole.hmcTechnician
          || userData?.role === userRole.hmcSupervisor
        ) {
          getMaintenanceDepartments(
            userData?.sites,
            userData?.maintenance_departments,
          );
        }
      }
    });
  }, []);
  // EVENT CHANGE HANDLERS======================

  const getValidationObject = (key) => ({
    isValidationError,
    error: validation[key],
  });

  return (
    <Form onSubmit={handleSubmit} className="sidebarForm">
      {/* Heading  */}
      <SideBarFormHeading
        icon={inventoryStrokeIcon}
        title={`${idToUpdate ? "Update" : "Create"} User`}
      />

      {/* user create */}
      <FormContainer disableToggle>
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Name</Label>
              <CustomInput
                type="text"
                required="true"
                name="name"
                placeholder="John doe"
                value={state?.name}
                handleChange={handleChange}
                validation={getValidationObject}
              />
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Email</Label>
              <CustomInput
                type="email"
                required="true"
                name="email"
                placeholder="somone@example.com"
                value={state?.email}
                handleChange={handleChange}
                validation={getValidationObject}
              />
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Site</Label>
              {idToUpdate && selectedSites?.length > 0 && (
                <div>
                  <CustomBadge
                    text={selectedSites}
                    sites="sites"
                    isEdit={props?.customProps?.isEdit}
                    color="light"
                  />
                </div>
              )}
              <CustomSelect
                isSearchable
                placeholder="Select Sites"
                isMulti
                value={state?.site_ids}
                isLoading={sitesLoading}
                name="site_ids"
                isClearable
                validation={getValidationObject}
                handleChange={handleChange}
                options={sites.data}
                optionsCustoms={{
                  value: "_id",
                  label: "site_name",
                }}
              />
            </FormGroup>
          </Col>

          <Col xs="12">
            <FormGroup>
              <Label className="required">Field</Label>
              <CustomSelect
                isSearchable
                placeholder="Select Field"
                value={state?.field}
                isLoading={options.loading}
                name="field"
                isDisabled={!!idToUpdate}
                isClearable
                validation={getValidationObject}
                handleChange={handleChange}
                options={options?.data?.fields}
                optionsCustoms={{
                  value: "field",
                  label: "name",
                }}
              />
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup>
              <Label className="required">Role</Label>
              <CustomSelect
                isSearchable
                placeholder="Select Role"
                value={state?.role}
                isLoading={options.loading}
                name="role"
                isDisabled={!!(state?.field === null || idToUpdate)}
                isClearable
                validation={getValidationObject}
                handleChange={handleChange}
                options={options?.data?.roles?.filter(
                  (item) => item?.field === state?.field?.VALUE,
                )}
                optionsCustoms={{
                  value: "role",
                  label: "name",
                }}
              />
            </FormGroup>
          </Col>
          {state?.role?.VALUE === userRole.siteAdmin
          || (state?.role?.VALUE === userRole.staff
            && state?.field?.VALUE === classification.medical) ? (
              <Col xs="12" className="custom-radio">
                <FormGroup>
                  <Label className="required">Accessed Data</Label>
                  <div className="d-flex flex-wrap  me-1 my-2">
                    {Object.values(classificationTabs)
                      ?.filter((item) => !item.all)
                      ?.map((item, index) => (
                        <CustomRadio
                          key={index}
                          className="form-check mr-1"
                          type="radio"
                          label={item.title}
                          disabled={state.direct_permissions?.length !== 0}
                          id={item.tabId}
                          name="classification"
                          checked={state.classification === item.tabId}
                          onChange={() => {
                            handleChange({
                              key: "classification",
                              value: item.tabId,
                            });
                          }}
                        />
                      ))}
                  </div>

                  {isValidationError && (
                    <FieldValidation
                      id="classification"
                      validations={validation.classification}
                      isTransparent
                    />
                  )}
                </FormGroup>
              </Col>
            ) : null}
          {MDRequired && (
            <Col xs="12">
              <FormGroup>
                <Label className="required">Maintenance Department</Label>
                {idToUpdate && selectedMDs?.length > 0 && (
                  <div>
                    <CustomBadge
                      sites="MDs"
                      text={selectedMDs?.map((d, idx) => {
                        const maintenanceData = {
                          name: `${d?.name} ( ${d?.labs?.map(
                            (item, index) => item?.site_name,
                          )} ) `,
                        };
                        return maintenanceData;
                      })}
                      isEdit={props?.customProps?.isEdit}
                      color="light"
                    />
                  </div>
                )}
                <CustomSelect
                  isSearchable
                  placeholder="Select Maintenance Departments"
                  isMulti
                  value={state?.maintenance_department_ids}
                  isLoading={MDLoading}
                  name="maintenance_department_ids"
                  isClearable
                  validation={getValidationObject}
                  handleChange={handleChange}
                  customOptions={maintenanceDepartments}
                />
              </FormGroup>
            </Col>
          )}
          <Col xs="12">
            <FormGroup>
              <CustomInput
                required
                label="Phone"
                type="tel"
                name="phone"
                placeholder="i.e. +966 99 999 9999"
                value={state.phone}
                handleChange={handleChange}
                validation={getValidationObject}
              />
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
export default UserCreate;

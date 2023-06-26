import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { observer } from "mobx-react-lite";
import { cloneDeep, debounce } from "lodash";
import { getSelectOptions, splitData, TR } from "utility/transformers";
import { errorHandler, SC } from "utility/helper";
import { editIcon, exportIcon } from "assets/icons/svgIcons";
import DataTable from "react-data-table-component";
import { apmModules, modWorkOrders } from "utility/helper/apmModules";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PrimaryButton from "views/components/PrimaryButton";
import { addSquare } from "views/layouts/components/navbar/data";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import RenderModuleForm from "views/components/RenderForm/ModuleForm";
import {
  activateUsers,
  allSites,
  exportInventory,
  userSubRoles,
} from "utility/helper/endpoints";
import {
  filterListingData,
  toggleReduxFilterModal,
} from "redux/actions/renderList/renderListAction";
import {
  Card, TabContent, TabPane, UncontrolledTooltip,
} from "reactstrap";

import ListingTabs from "views/components/ListingTabs";
import { classificationTabs, UI, woFilterTabs } from "utility/helper/constants";
import isValidJSON from "utility/helper/isValidJSON";
import { store } from "redux/storeConfig/store";
import ListColumns from "./listColumns";
import CardViewList from "./CardViewList";
import {
  filterIcon,
  reloadIcon,
  initialFilters,
  cardViewLogo,
  initialPaginationObject,
  initialActiveTabObject,
  rowViewLogo,
} from "./data";
import { woTabs } from "../ListingTabs/data";
import CustomTabs from "../@custom/Tabs";
import SearchField from "./SearchField";
import RenderFilters from "../RenderForm/RenderFilters";
import { commonDrawer } from "redux/actions/drawer/drawerActions";

const RenderList = observer((props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { lab_name } = useParams();
  // const { isOpen } = store.getState()
  // const [a, sa] = useState(false)̥;

  // setTimeout(() => {
  //   sa(!a)
  // }, 5000);

  const {
    callListingData,
    filteredFields,
    moduleFilterData,
    user,
    renderFormData,
    isOpen,
    toggleDrawer,
  } = useSelector((state) => {
    return {
      callListingData: state?.renderList?.callListingData,
      filteredFields:
        state?.renderList?.filterSideBarRight[props.module]?.filteredFields ||
        {},
      moduleFilterData:
        state?.renderList?.filterSideBarRight[props.module] || {},
      user: state?.auth?.login?.data,
      toggleDrawer: state?.renderList?.toggleDrawer,
      renderFormData: state?.renderList?.renderFormData,
      isOpen: state?.drawer?.drawer,
    };
  });
  const [pagination, setPagination] = useState(initialPaginationObject);
  const [pageCount, setPageCount] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const [filters, setFilters] = useStateWithCallbackLazy(initialFilters);
  const [cardView, setCardView] = useState(props?.isCardView || false);

  const [classificationTab, setClassificationTab] = useState(
    moduleFilterData?.uiTabFilteredFields?.classificationTab ??
      "MEDICALNONMEDICAL"
  );
  const [woTab, setWoTab] = useState(
    moduleFilterData?.uiTabFilteredFields?.woTab ?? "MEDICALNONMEDICAL"
  );
  const [activeTab, setActiveTab] = useState(
    moduleFilterData?.uiTabFilteredFields?.activeTab ?? initialActiveTabObject
  );

  const [sites, setSites] = useState([]);
  const [roles, setRoles] = useState([]);

  // ! Function to persist filters
  const getStoreFilterData = () => {
    if (moduleFilterData?.localStateFilteredFields) {
      const filteredData = JSON.parse(moduleFilterData?.localStateFilteredFields);

      filteredData.startDateFrom = filteredData?.startDateFrom
        ? new Date(filteredData?.startDateFrom)
        : "";
      filteredData.startDateTo = filteredData?.startDateTo
        ? new Date(filteredData?.startDateTo)
        : "";

      return filteredData;
    }
    return {};
  };
  const getStoreUIFilterData = () => {
    if (moduleFilterData?.uiTabFilteredFields) {
      return moduleFilterData?.uiTabFilteredFields;
    }
    return {};
  };

  const persistUIandFilters = (key, payload = {}) => {
    const localData = getStoreFilterData();
    const stateToSubmit = cloneDeep({ ...localData });
    const data = cloneDeep(TR.dataToSubmit(stateToSubmit));

    const uiFilters = getStoreUIFilterData();

    if (key && typeof key === "string") {
      uiFilters[key] = payload;
    }
    store.dispatch(
      filterListingData({
        filteredData: data,
        localState: stateToSubmit,
        module: props?.module,
        uiTabFilteredData: uiFilters,
      })
    );
  };

  // HANDLING CLASSIFICATION TOGGLE
  const toggleClassification = (payload) => {
    getData({ filtersss: { classification_filter: payload } });
    setClassificationTab(payload);
    persistUIandFilters("classificationTab", payload);
  };

  // HANDLING CLASSIFICATION TOGGLE
  const toggleWOFilter = (payload) => {
    getData({ filtersss: { woTab: payload } });
    setWoTab(payload);
    persistUIandFilters("woTab", payload);
  };

  const toggle = ({ count, status, site_models }) => {
    getData({ filtersss: { status, site_models } });
    const payload = { count, status, site_models };
    setActiveTab(payload);
    persistUIandFilters("activeTab", payload);
  };

  const [values, setValues] = useState({
    data: [],
    to: 0,
    total: 0,
  });
  const [valuesLoading, setValuesLoading] = useState(true);
  const [valuesReLoading, setValuesReLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState({});
  const [activeUsersLoading, setActiveUsersLoading] = useState(false);
  const [paramsOnReload, setParamsOnReload] = useState(false);

  // ! Filter data as search term changes

  const ExpandableComponent = props?.ExpandableComponent;

  const workOrderTabs = woTabs({
    sites: filters?.site_ids,
    user,
    isOverdue: history.location.pathname.split("/").includes("overdue"),
  });
  // gET DATA ON MOUNT AND ON EVERY REDUX-CALL LISTING STATE UPDATE
  useEffect(() => {
    const filterArgs = {};
    if (!props?.data) {
      getData(filterArgs);
    } else {
      props.getListingData();
    }
  }, [callListingData]);
  // GET DATA ON MOUNT AND ON EVERY REDUX-CALL LISTING STATE UPDATE
  useEffect(() => {
    if (props?.isLocalData) {
      if (!props?.data?.loading) {
        setValues({
          data: props?.data?.data,
          to: props?.data?.to,
          total: props?.data?.total,
        });
        setPageCount(props?.data?.last_page);
        setTotalPages(props?.data?.total);
      }
      setValuesLoading(props?.data?.loading || false);
      setValuesReLoading(props?.data?.loading || false);
    }
  }, [props?.data?.dataTime]);

  // INITIALIZING CARD VIEW
  useEffect(() => {
    if (isValidJSON(localStorage.getItem(UI.cardView))) {
      const LS_CV = JSON.parse(localStorage.getItem(UI.cardView))?.[props?.module] || null;
      const PCV_NOT_LS_CV = props?.isCardView && !LS_CV;
      const PCV_LS_CV = props?.isCardView && LS_CV === "true";
      const CV_Modules = [
        apmModules.workorders.id,
        apmModules.organizationAdmins.id,
      ].includes(props?.module);
      const localStorageCardView = !!((PCV_NOT_LS_CV || PCV_LS_CV) && CV_Modules);

      setCardView(localStorageCardView);
    }
  }, []);

  useEffect(() => {
    if (props?.isSiteFilter) getSitesData();
    if (props?.isRoleFilter) getRolesData();
  }, []);

  const getData = async ({
    per_page, page, keyword, filtersss,
  }) => {
    let params = {
      per_page: per_page || pagination.per_page,
      page: page || pagination.page,
      isPagination: 1,
      keyword:
        keyword !== null && keyword !== undefined ? keyword : filters.keyword,
      labName: lab_name?.split("+")?.join(" "),
      site_ids: filters.site_ids?.length
        ? filters.site_ids?.map((item) => item?.VALUE)
        : filteredFields?.site_ids,
      ...filtersss,
      ...(props?.otherParams && { ...props?.otherParams }),
      status:
        props.module === apmModules.workorders.id
          ? filtersss?.status === "all"
            ? ""
            : filtersss?.status || activeTab.status
          : null,
      site_models:
        props.module === apmModules.workorders.id
          ? filtersss?.site_models || activeTab.site_models
          : null,
    };

    const value = filtersss?.woTab
      ? filtersss?.woTab === "MYWO"
      : woTab === "MYWO";
    if (value) {
      params = {
        ...params,
        my_workorder_filter: value,
      };
    }
    delete filtersss?.woTab;
    delete params?.woTab;

    if (props?.isClassificationFilter) {
      params = {
        ...params,
        classification_filter:
          filtersss?.classification_filter || classificationTab,
      };
      if (filtersss?.classification_filter) {
        params = {
          ...params,
          ...initialPaginationObject,
        };
        setPagination({ ...pagination, page: params.page });
      }
    }
    // SITE IDS

    if (filtersss?.site_ids) {
      params = {
        ...params,
        site_ids: filtersss?.site_ids,
        ...initialPaginationObject,
      };
      setPagination({ ...pagination, page: params.page });
    }
    // ! ROLE FILTER
    if (props?.isRoleFilter) {
      let rolesArr = { roles: filters?.roles?.map((item) => item?.VALUE) };
      if (filtersss?.roles) {
        rolesArr = {
          roles: filtersss?.role,
          ...initialPaginationObject,
        };
        setPagination({ ...pagination, page: params.page });
      }
      params = {
        ...params,
        ...rolesArr,
      };
    }
    // SEARCH FIELD ACTIVE , ALL FILTERS SET TO INITIAL STATE
    if (keyword) {
      params = {
        ...params,
        ...initialPaginationObject,
        status: initialActiveTabObject.status,
        filteredFields: null,
      };
      setPagination({ ...pagination, page: params.page });
      // setActiveTab(initialActiveTabObject);
      // dispatch(resetListingData());
    }
    // STATUS CHANGES , PAGINATION AND SIDEBAR FILTERS SET TO INITIAL STATE
    if (filtersss?.status) {
      params = {
        ...params,
        ...initialPaginationObject,
        status: filtersss?.status === "all" ? "" : filtersss?.status,
        filteredFields: null,
      };
      setPagination({ ...pagination, page: params.page });

      // dispatch(resetListingData());
    }
    // ! if clicked on pending tab
    if (filtersss?.status === "pending" || params?.status === "pending") {
      delete params.status;
      params = {
        ...params,
        my_pending_workorder_filter: true,
      };
    }
    // SIDEBAR FILTER CHANGES , PAGINATION SET TO INITIAL STATE

    if (Object.keys(filteredFields)?.length > 0) {
      params = {
        ...filteredFields,
        ...params,
        keyword: keyword === undefined ? filteredFields.keyword : keyword,
      };
    }

    const workOrderTypeUrlIncludes = history?.location?.pathname.split("/");
    const woType = workOrderTypeUrlIncludes.includes("work-orders")
      && workOrderTypeUrlIncludes[workOrderTypeUrlIncludes?.length - 1];

    if (woType) {
      params = {
        ...params,
        type: woType === "list" ? "all" : woType,
      };
    }

    setValuesReLoading(true);
    try {
      const response = await SC.getCall({
        url: `${props?.endpoint || `/${props.module}`}`,
        params,
      });

      let data = response.data.data || [];
      const paginationData = response.data;
      const pageCount = response.data?.last_page || 0;
      const totalPageCount = response.data?.total || 0;
      if (props?.formatData) {
        data = props?.formatData(data);
      }

      data = data?.map((item) => ({
        ...item,
        isEditable: props?.isEditable,
        isRemoveAble: props?.isRemoveAble,
      }));
      setValues({
        ...paginationData,
        data,
      });
      setValuesLoading(false);
      setValuesReLoading(false);
      setPageCount(pageCount);
      setTotalPages(totalPageCount);
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
      setValuesLoading(false);
      setValuesReLoading(false);
    }
  };

  const getSitesData = async () => {
    try {
      const response = await SC.getCall({
        url: `${allSites}`,
      });
      const data = response?.data || [];
      setSites(
        getSelectOptions(data, {
          label: "site_name",
          value: "_id",
        })
      );
    } catch (error) {}
  };
  // get roles data
  const getRolesData = async () => {
    try {
      const response = await SC.getCall({
        url: `${userSubRoles}`,
      });
      let data = response?.data?.roles || [];
      data = data.filter((item) => {
        if (item?.field === user?.field) {
          return item;
        }
      });
      // ! TODO
      setRoles(
        getSelectOptions(data, {
          label: "name",
          value: "role",
        })
      );
    } catch (error) {}
  };
  const handleReload = () => {
    getData({ filtersss: { status: activeTab?.status } });
  };

  const handleDelete = async (id) => {
    setValuesReLoading(true);
    try {
      const response = await SC.deleteCall({
        url: `/${props?.module}/delete`,
        data: { id },
      });

      const data = values.data.filter((val) => val._id !== id);

      setValues({
        data,
      });
      setValuesReLoading(false);
      toast.success("Item deleted Successfully!");
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
      setValuesReLoading(false);
    }
  };

  const handleUserActivation = async (userToIdActivate, value) => {
    setActiveUsersLoading(true);
    const dataToSubmit = {
      userId: userToIdActivate,
      active: value ? 1 : 0,
    };
    try {
      const response = await SC.postCall({
        url: activateUsers,
        data: dataToSubmit,
      });
      const responseMessage = response.data?.message || "User updated successfully!";
      getData({});
      setActiveUsersLoading(false);
      toast.success(responseMessage);
    } catch (error) {
      const activeUsersArr = cloneDeep({ ...activeUsers });
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
      delete activeUsersArr[userToIdActivate];
      setActiveUsers({});
      setActiveUsersLoading(false);
    }
  };

  const columns = ListColumns({
    module: props?.module,
    customCols: props?.customCols,
    handleDelete,
    endPoint: props?.endPoint,
    isCWO: props?.isCWO, // CWO = Create-Work-Order ONLY FOR INVENTORY LISTING ACTIONS
    isDelete: props?.isDelete,
    isEdit: props?.isEdit,
    isActivation: props?.isActivation,
    resendEmail: props?.resendEmail,
    activeUsers,
    setActiveUsers,
    activeUsersLoading,
    handleUserActivation,
  });

  const handlePageChange = (page) => {
    const activePage = page.selected >= 0 ? page.selected + 1 : 0;
    setPagination({ ...pagination, page: activePage });
    if (props?.isLocalData) {
      props.getListingData({ page: activePage });
    } else {
      getData({ page: activePage });
    }
  };

  function CustomPagination() {
    return (
      <div
        className={`table-Pagination ${values?.data?.length === 0 && "d-none"}`}
      >
        <div>
          <ReactPaginate
            initialPage={pagination.page - 1}
            previousLabel="<"
            nextLabel=">"
            forcePage={pagination.page - 1}
            onPageChange={handlePageChange}
            pageCount={pageCount}
            disableInitialCallback
            breakLabel="..."
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName="active"
            pageClassName="page-item"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            nextLinkClassName="page-link"
            nextClassName="page-item next"
            previousClassName="page-item prev"
            previousLinkClassName="page-link"
            pageLinkClassName="page-link"
            containerClassName={`${
              !totalPages && "hidden"
            } pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1`}
          />
        </div>
        <div className="count">
          <span className="primary">
            {values.to || 0}
            {" "}
          </span>
          {`of ${values.total} `}
          <span className="module">
            {apmModules[props?.module]?.shortId}
          </span>
          {" "}
        </div>
      </div>
    );
  }
  const getColumns = ({ cols, isExpandable }) => {
    let tableCols = cols;
    if (isExpandable) {
      tableCols = tableCols.filter((item) => item.isListing);
    }
    return tableCols;
  };

  // HANDLE CARD VIEW SWITCH
  const handleCardView = (flag) => {
    let LS_CVS = {};
    const localCardView = !flag ? "false" : "true";

    if (isValidJSON(localStorage.getItem(UI.cardView))) {
      LS_CVS = JSON.parse(localStorage.getItem(UI.cardView));
    }
    const CV = JSON.stringify({
      ...LS_CVS,
      [props?.module]: localCardView,
    });
    localStorage.setItem(UI.cardView, CV);
    setCardView(flag);
  };

  const handleModalShow = () => {
    dispatch(
      toggleReduxFilterModal({
        module: props?.module,
      })
    );
  };

  const bounceKeyword = debounce((e) => {
    setFilters(
      {
        ...filters,
        keyword: e,
      },
      (value) => {
        getData({ keyword: value.keyword });
      }
    );
    const uiFilters = getStoreUIFilterData();
    const localData = getStoreFilterData();
    const stateToSubmit = cloneDeep({ ...localData });
    const data = cloneDeep(TR.dataToSubmit(stateToSubmit));
    data.keyword = e;
    store.dispatch(
      filterListingData({
        filteredData: data,
        localState: stateToSubmit,
        module: props?.module,
        uiTabFilteredData: uiFilters,
      })
    );
  }, 1000);

  return (
    <div className="listing">
      {!props.hideListingAction && (
        <div className="listing__actions">
          <div className="filter-group2">
            {props?.isWOFilter && (
              <CustomTabs
                tabs={Object.values(woFilterTabs).filter((item) => item.filter)}
                toggle={toggleWOFilter}
                customClasses="customTabs-margin"
                activeTab={woTab}
                // customClasses="pb-1"
                // customClasses="mr-lg-auto"
              />
            )}
            {props?.isClassificationFilter && (
              <CustomTabs
                tabs={Object.values(classificationTabs).filter(
                  (item) => item.filter
                )}
                toggle={toggleClassification}
                activeTab={classificationTab}
                customClasses="pill ml-2 ml-medium-0  mb-1 mt-1"
                // customClasses="pill mr-lg-auto mt-1 mt-lg-0 ml-0 ml-lg-2"
              />
            )}

            {props?.isSmartSearch && (
              <div className="d-flex customTabs-margin-top">
                <span className="pr-medium-0 pr-1" />
                <SearchField
                  {...props}
                  bouncer={bounceKeyword}
                  customGroupClasses="d-none d-md-none d-lg-flex"
                />
              </div>
            )}
            {/* // card View controller */}
            <div className="listing__actions__cardViewContainer w-medium-350 justify-content-medium-between auto-grid-flex-set ml-2">
              {props?.isCreate && (
                <PrimaryButton
                  isDisabled={props?.isDisabled}
                  text={props?.createBtnText || "Create"}
                  icon={addSquare}
                  toolTip={
                    splitData(props?.createBtnText, " ", "_") || "Create"
                  }
                  customClasses={`solid mr-0 ml-medium-0 ml-1  mb-sm-0 h-44 ${props?.customCreateBtnClasses}`}
                  customTextClasses={"d-none d-sm-block"}
                  customIconClasses={"stroke"}
                  onClick={() =>
                    dispatch(
                      commonDrawer({
                        isOpen: true,
                        type: "create",
                        module: props?.module,
                      })
                    )
                  }
                />
                // <RenderModuleForm
                //   module={props?.module}
                //   icon={addSquare}
                //   text={props?.createBtnText || "Create"}
                //   toolTip={splitData(props?.createBtnText, " ", "_") || "Create"}
                //   customClasses={`h-44 ${props?.customCreateBtnClasses}`}
                //   showDrawerToggler={true}
                // />
              )}

              {props?.isFilter && (
                <PrimaryButton
                  isDisabled={valuesReLoading}
                  text="Filters"
                  icon={filterIcon}
                  toolTip="Filters"
                  customClasses="d-sm-block d-md-block d-lg-none solid mr-0 ml-1 mb-sm-0 mb-1 h-44"
                  customTextClasses="d-none d-xs-block"
                  customIconClasses="stroke"
                  onClick={handleModalShow}
                />
              )}

              {props?.isCardView && (
                <div className="listing__actions__cardViewContainer__cardView ml-medium-0 ml-1 mb-1 mb-lg-0">
                  <div
                    className={`listing__actions__cardViewContainer__cardView--content ${
                      !cardView ? "active" : ""
                    }`}
                    onClick={() => handleCardView(false)}
                    id="row-view"
                  >
                    <figure className="listing__actions__cardViewContainer__cardView--content--icon">
                      {rowViewLogo}
                    </figure>
                    <UncontrolledTooltip placement="bottom" target="row-view">
                      Row View
                    </UncontrolledTooltip>
                  </div>
                  <div
                    className={`listing__actions__cardViewContainer__cardView--content ${
                      cardView ? "active" : ""
                    }`}
                    onClick={() => handleCardView(true)}
                    id="card-view"
                  >
                    <figure className="listing__actions__cardViewContainer__cardView--content--icon">
                      {cardViewLogo}
                    </figure>
                    <UncontrolledTooltip
                      placement="bottom"
                      target="card-view"
                    >
                      Card View
                    </UncontrolledTooltip>
                  </div>
                </div>
                // <CustomSwitch
                //   switchClasses="listing__actions__cardViewContainer__cardView--switch"
                //   checked={cardView}
                //   handleChange={handleCardView}
                // />
              )}

              {!props?.hideReset && (
                <div className="value_reloading mr-medium-0 ml-medium-0 mr-1  mb-1 mb-lg-0">
                  <div className="reset_btn">
                    <PrimaryButton
                      isDisabled={valuesReLoading}
                      onClick={handleReload}
                      icon={reloadIcon}
                      toolTip="Refresh"
                      // customClasses={"ml-2"}
                      customIconClasses={`resetButton--icon stroke ${
                        valuesReLoading && "reloading"
                      }`}
                    />
                  </div>
                </div>
              )}

              {props.isExport && (
                <div className="export_btn">
                  <PrimaryButton
                    isDisabled={valuesReLoading}
                    onClick={() => SC.downloadCall({
                      url: exportInventory,
                      fileName: "Inventory",
                      fileExtension: ".xlsx",
                      isDownload: true,
                    })}
                    icon={exportIcon}
                    toolTip="Export"
                    customClasses="solid"
                    customIconClasses="path"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {props?.isTabs && (
        <div className="tabsAndFilter">
          {/* // Nav tbs ---start */}
          {/* // LIST */}
          <ListingTabs
            toggle={toggle}
            activeTab={activeTab?.count}
            isDisabled={valuesReLoading || valuesLoading}
            tabs={workOrderTabs}
          />
          {/* // Nav tbs ---end */}
        </div>
      )}

      {props?.isFilter && (
        <RenderFilters {...props}>
          <SearchField
            {...props}
            bouncer={bounceKeyword}
            customGroupClasses="w-100 mb-2 mr-1"
            customColClasses="w-100 mr-1"
          />
        </RenderFilters>
      )}

      <TabContent activeTab={activeTab?.count} className="tab-content-header">
        <TabPane tabId={activeTab?.count}>
          {valuesLoading || valuesReLoading ? (
            <div className="custom-card p-2 text-center text-bold rounded">
              <b>Loading...</b>
            </div>
          ) : cardView ? (
            <>
              <CardViewList
                data={values.data}
                cardViewChildren={props?.cardViewChild}
                isEdit={props?.isEdit}
              />
              {CustomPagination()}
            </>
          ) : (
            <Card>
              <DataTable
                columns={getColumns({
                  cols: columns,
                  isExpandable: props?.ExpandableComponent || false,
                })}
                className={`react-dataTable ${
                  props?.noHeader ? "hide_header" : ""
                } ${props?.customTableClasses}`}
                data={values.data}
                pagination
                paginationPerPage={20}
                paginationDefaultPage={pagination.page}
                paginationComponent={CustomPagination}
                expandableRows={!!props?.ExpandableComponent}
                expandableRowsComponent={
                  props?.ExpandableComponent && <ExpandableComponent />
                }
                fixedHeader
                noHeader
                // progressPending={valuesLoading || valuesReLoading}
              />
            </Card>
          )}
        </TabPane>
      </TabContent>
    </div>
  );
});

export default RenderList;

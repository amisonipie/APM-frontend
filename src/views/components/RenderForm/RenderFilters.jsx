import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkOrderFilter from "views/pages/workOrders/WorkOrderFilter";
import InventoryFilter from "views/pages/inventories/InventoryFilter";
import UserFilter from "views/pages/users/UserFilter";
import {
  modInventories,
  modUsers,
  modWorkOrders,
} from "utility/helper/apmModules";
import CloseModal from "assets/icons/close-circle-PMC.svg";
import { Row } from "reactstrap";
import { Modal } from "react-bootstrap";
import {
  filterListingData,
  getListingData,
  toggleReduxFilterModal,
} from "redux/actions/renderList/renderListAction";
import { TR } from "utility/transformers";
import { observer } from "mobx-react-lite";
import { cloneDeep } from "lodash";
import { filterIcon } from "assets/icons/svgIcons";
import { history } from "utility/helper/history";
import { store } from "redux/storeConfig/store";
import { isSameModule } from "../generalHelper";
import { downArrowIcon } from "../RenderList/data";
import PrimaryButton from "../PrimaryButton";

const RenderChildForm = observer((props) => {
  // ! if you change width here then change first in src\views\pages\inventories\style.scss .w-350 class and check filter ui
  // ! then change it
  const width = 236;

  switch (props?.module) {
  case modInventories.id:
    return <InventoryFilter {...props} width={width} />;
  case modWorkOrders.id:
    return <WorkOrderFilter {...props} width={width} />;
  case modUsers.id:
    return <UserFilter {...props} width={width} />;
  default:
    return <div />;
  }
});

const RenderFilters = observer((props) => {
  const dispatch = useDispatch();
  const { reduxFilter } = useSelector((state) => ({
    reduxFilter: state?.renderList?.filterSideBarRight[props?.module],
  }));

  let reduxSavedFilters = null;
  if (reduxFilter?.localStateFilteredFields) {
    reduxSavedFilters = JSON.parse(reduxFilter?.localStateFilteredFields);

    if (reduxSavedFilters?.startDateTo) {
      reduxSavedFilters.startDateTo = new Date(reduxSavedFilters?.startDateTo);
    }

    if (reduxSavedFilters?.startDateFrom) {
      reduxSavedFilters.startDateFrom = new Date(
        reduxSavedFilters?.startDateFrom,
      );
    }

    if (reduxSavedFilters?.nextPMDate) {
      reduxSavedFilters.nextPMDate = new Date(reduxSavedFilters?.nextPMDate);
    }
  }

  let reduxSavedUIFilters = null;
  if (reduxFilter?.uiTabFilteredFields) {
    reduxSavedUIFilters = reduxFilter?.uiTabFilteredFields;
  }

  const [state, setState] = React.useState(
    reduxSavedFilters || props.filtersIO,
  );
  const [uiState, setUIState] = React.useState(reduxSavedUIFilters || {});

  const toggleModal = (e) => {
    const data = TR.dataToSubmit(e?.customState || state);
    dispatch(
      toggleReduxFilterModal({
        module: props?.module,
        filteredData: data,
        localState: e?.customState || state,
      }),
    );
  };
  const handleChange = ({ key, value }) => {
    const newStateArr = cloneDeep({
      ...state,
      [key]: value,
    });
    const data = TR.dataToSubmit(newStateArr);
    dispatch(
      filterListingData({
        module: props?.module,
        filteredData: data,
        localState: newStateArr,
        uiTabFilteredData: uiState,
      }),
    );

    setState(newStateArr);
    dispatch(getListingData());
  };

  const [showMoreFilter, setShowMoreFilter] = React.useState(true);

  const resetReduxModuleFilters = () => {
    const isSame = isSameModule(history?.location?.pathname);
    if (!isSame) {
      store.dispatch(
        filterListingData({
          module: modWorkOrders.id,
          filteredData: {},
          localState: {},
          uiTabFilteredData: {},
        }),
      );
      store.dispatch(
        filterListingData({
          module: modInventories.id,
          filteredData: {},
          localState: {},
          uiTabFilteredData: {},
        }),
      );
      store.dispatch(
        filterListingData({
          module: modUsers.id,
          filteredData: {},
          localState: {},
          uiTabFilteredData: {},
        }),
      );
    }
  };

  // ! after component mount check if module is not same then reset filter
  useEffect(() => {
    resetReduxModuleFilters();
    return resetReduxModuleFilters;
  }, []);

  return (
    <>
      <div className="m-2">
        <Row className="d-none align-items-baseline d-xs-none d-sm-none d-md-none d-lg-flex filters-bar">
          <div
            className="col-lg-1 col-md-1 col-sm-3 col-xs-4 d-flex pl-0 mb-1"
            style={{ alignItems: "center" }}
          >
            <figure
              style={{ color: "#1A355E", fontSize: "15px" }}
              className="custom-primary-btn--icon "
            >
              {filterIcon}
            </figure>
            <span
              style={{ color: "#1A355E", fontSize: "20px", fontWeight: 500 }}
              className="custom-primary-btn--text"
            >
              Filters
            </span>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-6 col-xs-8">
            <RenderChildForm
              {...props}
              handleChange={handleChange}
              state={state}
              setShowMoreFilter={setShowMoreFilter}
            />
          </div>
          {!props?.hideMoreFilters && (
            <div
              className="col-lg-1 col-md-2 col-sm-3 col-xs-4 d-flex p-0"
              style={{ justifyContent: "flex-end" }}
            >
              <div
                className={`more-filter ${
                  showMoreFilter ? "d-flex" : "d-none"
                }`}
                onClick={toggleModal}
              >
                <span>More&nbsp;Filters</span>
                <figure className="pl-1">{downArrowIcon}</figure>
              </div>
            </div>
          )}
        </Row>
      </div>
      {reduxFilter?.modal && (
        <FiltersModal
          modal={reduxFilter?.modal}
          toggleModal={toggleModal}
          state={state}
          setState={setState}
          isModal
          setShowMoreFilter={setShowMoreFilter}
          {...props}
        />
      )}
    </>
  );
});

export default RenderFilters;

export const FiltersModal = observer((props) => {
  const dispatch = useDispatch();

  const [state, setState] = React.useState(props.state);

  const handleChange = ({ key, value }) => {
    setState({ ...state, [key]: value });
  };

  const showResult = () => {
    props.toggleModal({ customState: state });
    dispatch(getListingData());
    props.setState({
      ...state,
    });
  };

  const resetFilter = () => {
    setState({
      ...props.filtersIO,
    });
  };

  return (
    <Modal
      className="Modal-main"
      show={props.modal}
      // centered={}
      size="sm"
      onHide={props.toggleModal}
    >
      <Modal.Header>
        <Modal.Title>Filter</Modal.Title>
        <img
          src={CloseModal}
          alt="toggle"
          onClick={props?.toggleModal}
          className="click-able"
        />
      </Modal.Header>
      <Modal.Body>
        <RenderChildForm
          moduleName={props?.module}
          {...props}
          handleChange={handleChange}
          state={state}
        />
      </Modal.Body>
      <Modal.Footer className="d-block">
        <div className="d-flex mt-auto btn-group">
          <PrimaryButton
            onClick={resetFilter}
            type="button"
            customClasses="primary-outline w-50 py-2"
            text="Reset"
          />
          <PrimaryButton
            onClick={showResult}
            type="submit"
            customClasses="primary w-50 py-2"
            text="Show Results"
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
});

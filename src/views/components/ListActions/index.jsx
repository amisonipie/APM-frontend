import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userRole } from "utility/config";
import React, { Fragment, useState } from "react";
import { SC, errorHandler } from "utility/helper";
import {
  infoOutlineIcon, userToggleIcon, deleteIcon, editIcon,
} from "assets/icons/svgIcons";
import withReactContent from "sweetalert2-react-content";
import { addSquare } from "views/layouts/components/navbar/data";
import { Dropdown, DropdownToggle, DropdownMenu, Spinner } from "reactstrap";
import { commonDrawer } from "redux/actions/drawer/drawerActions";

const MySwal = withReactContent(Swal);

const ActionsWithTooltip = ({ item }) => item.actionIcon;

const ListActions = (props) => {
  const dispatch = useDispatch();
  let { row, module: appModule, isCWO } = props;
  const [state, setState] = useState({ tooltipOpen: false });
  // const [activeRow, setActiveRow] = useState(activeRowIO);
  const [showDDM, setShowDDM] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleActiveRow = (row, mode) => {
    // setActiveRow({ id, mode });
    const activeRow = row;
    activeRow.id = row?._id;
    activeRow.mode = mode;
    dispatch(
      commonDrawer({
        isOpen: true,
        type: mode,
        row: activeRow,
        module: appModule,
      }),
    );
  };

  const user = useSelector((item) => item?.auth?.login?.data);
  const resendActivationEmail = (id) => {
    setLoading(true);
    SC.postCall({
      url: "/users/setOTP",
      data: { userId: id, sendEmail: 1 },
      // data,
    })
      .then((response) => {
        const responseCode = response.data.code;
        const responseMessage = response.data.message;
        if (responseCode === 200) {
          toast.success(responseMessage);
        } else {
          toast.error(responseMessage);
        }
        setLoading(false);
        setShowDDM(!showDDM);
      })
      .catch((error) => {
        const errorMessage = errorHandler(error);
        if (errorMessage) toast.error(errorMessage);
        setLoading(false);
      });
  };

  const toggle = () => setState({ ...state, tooltipOpen: !state.tooltipOpen });
  const handleAlert = (row) => MySwal.fire({
    title: "",
    icon: "info",
    html: "Are you sure, you want to delete this item?",
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: (
      <span className="align-middle">
        <span className="align-middle">Confirm!</span>
      </span>
    ),
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-outline-danger ml-1",
    },

    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      props.handleDelete(row._id);
    }
  });
  const actions = [
    {
      title: "Edit",
      show: props?.isEdit,
      actionIcon: (
        <figure
          onClick={() => handleActiveRow(row, "edit")}
          className="text-danger listActions__icon"
        >
          {editIcon}
        </figure>
      ),
    },
    {
      title: "Delete",
      show: props?.isDelete,
      actionIcon: (
        <figure
          onClick={() => handleAlert(row)}
          className="text-danger listActions__icon"
        >
          {deleteIcon}
        </figure>
      ),
    },
    {
      title: "Create Work Order",
      show: isCWO,
      actionIcon: (
        <figure
          onClick={() => handleActiveRow(row, "CWO")}
          className="text-danger listActions__icon stroke"
        >
          {addSquare}
        </figure>
      ),
    },
    {
      title: "Details",
      show: props?.inventoryDetails,
      actionIcon: (
        <figure
          onClick={() => handleActiveRow(row, "edit")}
          className="text-danger listActions__icon m-0"
        >
          {infoOutlineIcon}
        </figure>
      ),
    },
    {
      title: "Send Activation Email",
      show: props.resendEmail && user?.role === userRole.superAdmin,
      actionIcon: (
        <Dropdown isOpen={showDDM} toggle={() => setShowDDM(!showDDM)}>
          <DropdownToggle tag="a">{userToggleIcon}</DropdownToggle>
          <DropdownMenu right>
            <div
              className="dropdown-item dropright"
              onClick={() => (loading ? null : resendActivationEmail(row?._id))}
            >
              {loading ? (
                <div className="d-flex">
                  <Spinner size="sm" />
                  {" "}
                  <span className="ml-1 mr-1">Resending Email...</span>
                </div>
              ) : (
                "Resend Activation Email"
              )}
            </div>
          </DropdownMenu>
        </Dropdown>
      ),
    },
  ];
  return (
    <Fragment>
      <div className="listActions">
        {actions.map((item, index) => {
          return (
            item.show && (
              <ActionsWithTooltip
                isOpen={state.tooltipOpen}
                item={item}
                key={index}
                id={index}
                toggle={toggle}
              />
            )
          );
        })}
      </div>
    </Fragment>
  );
}

export default ListActions;

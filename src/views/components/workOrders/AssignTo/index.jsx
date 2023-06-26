import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { errorHandler, SC } from "utility/helper";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleGetData } from "redux/actions/renderList/renderListAction";
import { WorkOrderModal } from "models/workOrder";

import {
  getAllUsers,
  workOrderAssignTechnician,
} from "utility/helper/endpoints";

import { descriptionIcon2 } from "assets/icons/svgIcons";
import SideBarFormHeading from "views/components/sidebar/FormHeading";
import CustomInput from "views/components/@custom/Input";
import { RiSearchLine } from "react-icons/ri";
import UserToAssign from "./UserToAssign";
import { commonDrawer } from "redux/actions/drawer/drawerActions";

const AssignTo = observer((props) => {
  const dispatch = useDispatch();
  const WorkOrders = React.useMemo(() => new WorkOrderModal(props), []);

  const { callData, userRedux } = useSelector((state) => ({
    callData: state?.renderList?.callData,
    userRedux: state?.auth?.login?.data,
  }));
  const [users, setUsers] = useState({
    data: [],
    all: [],
    selected: "",
  });

  const [usersLoading, setUsersLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const filterSearchHandle = debounce((e) => {
    // const filteredTech = users?.all?.filter(
    //   (item) =>
    //     item.name.startsWith(e) || item.name.endsWith(e) || item.name.match(e)
    // );
    getUsers({ keyword: e });

    // if (e === "") {
    //   setUsers({ ...users, data: users?.all });
    // } else {
    //   setUsers({ ...users, data: filteredTech });
    // }
  }, 1000);

  const getUsers = async ({ per_page, page, keyword }) => {
    let classificationWO = props?.workOrder?.work_order_classification?.classification;
    classificationWO = classificationWO === "generic" ? "nonmedical" : classificationWO;
    const params = {
      per_page: 500,
      page: 1,
      isPagination: 1,
      keyword: keyword || "",
      role: "hmc_technician",
      field: classificationWO,
    };
    setUsersLoading(true);

    try {
      const getUsersData = await SC.getCall({
        url: getAllUsers,
        params,
      });
      const usersData = getUsersData?.data?.data;

      setUsers({ data: usersData, all: usersData });
      setUsersLoading(false);
    } catch (err) {
      const error = errorHandler(err);
      toast.error(error);
      setUsers({ ...users, loading: false });
      setUsersLoading(false);
    }
  };
  const handleSubmit = async (payload) => {
    const data = {
      workOrderId: props?.workOrder?._id || props?.workOrderId,
      assignedTo: payload?.assignedTo,
    };
    setLoading(true);
    setUsers({ ...users, selected: payload?.assignedTo });
    try {
      const response = await SC.postCall({
        url: workOrderAssignTechnician,
        data,
      });
      const responseCode = response?.data?.code || 0;
      const responseMessage = response?.data?.message || "";
      if (responseCode === 200) {
        dispatch(toggleGetData(false));
        dispatch(commonDrawer({ isOpen: false}))
        toast.success(responseMessage);
      } else {
        toast.error(responseMessage);
      }
      setLoading(false);
    } catch (error) {
      const err = errorHandler(error);
      toast.error(err);
      setLoading(false);
    }
  };
  const woStatus = props?.workOrder?.status;
  const isRedirected = woStatus === "rejected" || woStatus === "redirected";
  const isWOAssigned = !isRedirected && woStatus !== "opened";
  const assignedUser = !isWOAssigned
    ? userRedux
    : props?.workOrder?.work_order_steps?.technician_user;

  useEffect(() => {
    getUsers({});
  }, []);

  return (
    <div className="assignTo">
      <SideBarFormHeading
        icon={descriptionIcon2}
        title="Assign to"
        customCLasses=""
      />
      <section className="assignTo__search">
        <CustomInput
          searchIcon
          type="text"
          placeholder="Search Technician"
          name="filter"
          onChange={(e) => filterSearchHandle(e.target.value)}
          // label
          eventOnChangeHandler={(e) => filterSearchHandle(e.target.value)}
        />
        {/* 
        <UserToAssign
          item={assignedUser}
          isAssigned
          isDisabled={isWOAssigned || loading}
          handleSubmit={handleSubmit}
          btnText={isWOAssigned ? "Assigned" : "Start working"}
          customCLasses="assigned"
        /> */}

        <hr className="divider" />
      </section>
      <section className="assignTo__users">
        {usersLoading ? (
          <p>Please wait, getting users...</p>
        ) : (
          users?.data?.map((item, index) => {
            const isAssigned =
              props?.workOrder?.work_order_steps?.technician_user?._id ===
                item?._id && !isRedirected;
            const isAssigning = loading && users?.selected === item?._id;
            const isDisabled = loading;

            return (
              !isAssigned && (
                <UserToAssign
                  key={index}
                  item={item}
                  isAssigning={isAssigning}
                  isAssigned={isAssigned}
                  isDisabled={isDisabled}
                  handleSubmit={handleSubmit}
                  btnText="Assign"
                />
              )
            );
          })
        )}
      </section>
    </div>
  );
});

export default AssignTo;

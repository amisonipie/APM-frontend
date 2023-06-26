import { debounce } from "lodash";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { userRole } from "utility/config";
import { errorHandler, SC } from "utility/helper";
import { sitesList, userSubRoles } from "utility/helper/endpoints";

export const IOFilter = {
  site_ids: [],
  roles: [],
};
class UserModel {
  userClassificationPermissions = {
    USER: {
      label: "User",
      value: "USER",
    },
    INVENTORY: {
      label: "Inventory",
      value: "INVENTORY",
    },
    WORKORDER: {
      label: "Work Order",
      value: "WORKORDER",
    },
    DASHBOARD: {
      label: "Dashboard",
      value: "DASHBOARD",
    },
  };

  constructor() {
    this.user = null;
    this.labs = { data: [], loading: true };
    this.roles = { data: [], loading: false };

    this.getUser();
    makeAutoObservable(this);
  }

  // Computed Props
  get isSuperAdmin() {
    return this.user?.role === userRole.superAdmin;
  }

  // Redux Getters
  async getUser() {
    try {
      const response = await SC.getCall({ url: "/token_data" });
      this.user = response?.data?.data || null;
    } catch (error) {
      const err = errorHandler(error);
      toast.error(err);
    }
  }

  async getLabs(props) {
    this.toggleLabsLoading(true);
    try {
      const response = await SC.getCall({
        url: sitesList,
        params: {
          // page: 1,
          // per_page: 10,
          isPagination: 1,
          keyword: props?.keyword || "",
        },
      });
      this.labs.data = response?.data?.data || [];
      this.toggleLabsLoading(false);
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.toggleLabsLoading(false);

      if (errorMessage) toast.error(errorMessage);
    }
  }

  async getRoles(props) {
    this.toggleRolesLoading(true);
    try {
      const response = await SC.getCall({
        url: userSubRoles,
        params: {
          // page: 1,
          // per_page: 10,
          isPagination: 1,
          keyword: props?.keyword || "",
        },
      });
      this.roles.data = response?.data?.roles?.filter(
        (item) => item?.field === this.user?.field,
      ) || [];
      this.toggleRolesLoading(false);
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.toggleRolesLoading(false);

      if (errorMessage) toast.error(errorMessage);
    }
  }

  toggleRolesLoading = (e) => (this.roles.loading = e);

  toggleLabsLoading = (e) => (this.labs.loading = e);

  findLabs = debounce((e) => this.getLabs({ keyword: e }), 1000);
}

export default UserModel;

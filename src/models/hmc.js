import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import {
  editConfirmation,
  getListingData,
  toggleGetData,
} from "redux/actions/renderList/renderListAction";
import { store } from "redux/storeConfig/store";
import { commonDrawer } from "redux/actions/drawer/drawerActions";
import { errorHandler, SC } from "utility/helper";
import {
  createHMC,
  getHMC,
  hmcFormOptions,
  sitesList,
  updateHMC,
} from "utility/helper/endpoints";
import { VF } from "utility/securePass/validatePassword";
import { TR } from "utility/transformers";

class HMCModel {
  FVIO = {
    name: [],
    type: [],
    lab_id: [],
  };

  IO = {
    name: "",
    type: null,
    lab_id: null,
  };

  constructor(props) {
    // ! state
    this.idToUpdate = props?.row?._id;
    this.rowName = props?.row;
    this.state = { ...this.IO, loading: this.idToUpdate ? true : false };
    this.options = { data: {}, loading: true };
    this.loading = false;
    this.validation = this.FVIO;
    this.isValidationError = false;
    this.labs = { data: [], loading: true };

    // ! [] useEffect
    if (this.options?.loading) this.getOptions();
    if (this.labs?.loading) this.getLabs();
    if (this.idToUpdate) this.getData();

    makeAutoObservable(this);
  }

  //! functions
  // ! handleChange
  handleChange = ({ key, value }) => {
    const stateToUpdate = { ...this.state };

    let temp = { ...stateToUpdate, [key]: value };
    this.setState(temp);
    this.handleValidationOnChange({ key, value });
    if(this.idToUpdate){
      if(temp["name"] === this.rowName?.name) {
        store.dispatch(editConfirmation(false));
      }else{
        store.dispatch(editConfirmation(true));
      }
    }else{
     if (temp["name"] ||  temp["type"] || temp["lab_id"]) {
        store.dispatch(editConfirmation(true));
    } else {
      store.dispatch(editConfirmation(false));
     }
   }
 };
  // ! getLabs
  getLabs = async () => {
    try {
      const response = await SC.getCall({
        url: sitesList,
      });
      const data = response?.data || [];
      this.setLabs({ loading: false, data });
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.setLabs({ ...this.labs, loading: false });
      if (errorMessage) toast.error(errorMessage);
    }
  };

  // ! handleSubmit
  handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = createHMC;
    let responseMessage = "HMC Created Successfully!";
    let data = TR.dataToSubmit(this.state);
    let VO = {};
    // ! validating All required fields
    Object.keys(this.FVIO).map((item) => {
      const response = VF.validateFields({
        value: data[item],
        not: true,
      });
      if (response?.length > 0) {
        VO = { ...VO, [item]: response };
      }
    });
    if (Object.keys(VO).length) {
      // set validation
      this.setValidation(VO);
      this.setIsValidationError(true);
    } else {
      this.setLoading(true);
      this.setIsValidationError(false);
      if (this.idToUpdate) {
        endpoint = updateHMC;
        data = { ...data, id: this.idToUpdate };
        responseMessage = "HMC Updated Successfully!";
      }

      try {
        await SC.postCall({
          url: endpoint,
          data,
        });
        this.setLoading(false);
        toast.success(responseMessage);
        store.dispatch(commonDrawer({ isOpen: false }));
        store.dispatch(getListingData());
        store.dispatch(toggleGetData(false));
      } catch (error) {
        const errorMessage = errorHandler(error);
        this.setLoading(false);
        if (errorMessage) toast.error(errorMessage);
      }
    }
  };

  // ! handleValidationOnChange
  handleValidationOnChange = ({ key, value }) => {
    const response = VF.validateFields({
      value,
      not: true,
    });
    this.setValidation({ ...this.validation, [key]: response });
  };

  // ! getOptions
  getOptions = async () => {
    try {
      const response = await SC.getCall({
        url: hmcFormOptions,
      });
      const data = response?.data || {};
      this.setOptions({ loading: false, data });
    } catch (error) {
      const errorMessage = errorHandler(error);
      this.setOptions({ ...this.options, loading: false });
      if (errorMessage) toast.error(errorMessage);
    }
  };

  // ! getData
  getData = async () => {
    try {
      const response = await SC.getCall({
        url: `${getHMC}/${this.idToUpdate}`,
      });
      const { data } = response;
      this.setState({
        lab_id: data?.lab || null,
        name: data?.name,
        type: { label: data?.type, value: data?.type },
        loading: false,
      });
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  // ! State Setter
  setLabs = (value) => {
    this.labs = value;
  };

  setState = (value) => {
    this.state = value;
  };

  setOptions = (value) => {
    this.options = value;
  };

  setLoading = (value) => {
    this.loading = value;
  };

  setValidation = (value) => {
    this.validation = value;
  };

  setIsValidationError = (value) => {
    this.isValidationError = value;
  };
}

export default HMCModel;

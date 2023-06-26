import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import {
  editConfirmation,
  getListingData,
  toggleGetData,
} from "redux/actions/renderList/renderListAction";
import { store } from "redux/storeConfig/store";
import { errorHandler, SC } from "utility/helper";
import {
  createManufacturer,
  getManufacturer,
  updateManufacturer,
} from "utility/helper/endpoints";
import { VF } from "utility/securePass/validatePassword";
import { TR } from "utility/transformers";
import { commonDrawer } from "redux/actions/drawer/drawerActions";

class ManufacturerModel {
  FVIO = {
    name: [],
  };

  IO = {
    name: "",
  };

  constructor(props) {
    this.idToUpdate = props?.row?._id;
    this.rowName = props?.row?.name;
    // ! state
    this.state = { ...this.IO, loading: !!this.idToUpdate };
    this.loading = false;
    this.validation = this.FVIO;
    this.isValidationError = false;

    // ! [] useEffect
    if (this.idToUpdate) this.getData();

    makeAutoObservable(this);
  }

  // ! functions
  // ! handleChange
  handleChange = ({ key, value }) => {
    const stateToUpdate = { ...this.state };

    this.setState({ ...stateToUpdate, [key]: value });
    this.handleValidationOnChange({ key, value });
    if(this.idToUpdate){
      if(value === this.rowName) {
        store.dispatch(editConfirmation(false));
      }else{
        store.dispatch(editConfirmation(true));
      }
    }else{
      if(!value) {
        store.dispatch(editConfirmation(false));
      }else{
        store.dispatch(editConfirmation(true));
      }
   }
  };

  // ! handleSubmit
  handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = createManufacturer;
    let responseMessage = "Manufacturer Created Successfully!";

    let data = TR.dataToSubmit(this.state);
    // VO === Validation Object
    let VO = {};

    // validating All required fields
    Object.keys(this.FVIO).map((item) => {
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
      // ! set validation
      this.setValidation(VO);
      this.setIsValidationError(true);
    } else {
      this.setLoading(true);
      this.setIsValidationError(false);
      if (this.idToUpdate) {
        endpoint = updateManufacturer;
        data = {
          ...data,
          id: this.idToUpdate,
        };
        responseMessage = "Manufacturer Updated Successfully!";
      }
      try {
        // const response =
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

  handleValidationOnChange = ({ key, value }) => {
    const response = VF.validateFields({
      value,
      not: true,
    });
    this.setValidation({ ...this.validation, [key]: response });
  };

  // ! getData
  getData = async () => {
    try {
      const response = await SC.getCall({
        url: `${getManufacturer}/${this.idToUpdate}`,
      });
      const { data } = response;
      this.setState({
        name: data?.name,
      });
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  // ! state setter
  setState = (value) => {
    this.state = value;
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

export default ManufacturerModel;

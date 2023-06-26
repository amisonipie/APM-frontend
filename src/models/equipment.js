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
  createEquipment,
  equipmentFormOptions,
  getEquipment,
  updateEquipment,
} from "utility/helper/endpoints";
import { VF } from "utility/securePass/validatePassword";
import { TR } from "utility/transformers";

class EquipmentModel {
  FVIO = {
    nameEnglish: [],
    levelClassification: [],
    type: [],
  };

  IO = {
    nameEnglish: "",
    nameArabic: "",
    levelClassification: "",
    type: null,
  };

  constructor(props) {
    this.idToUpdate = props?.row?._id;
    this.rowToUpdate = props?.row;
    // ! state
    this.state = { ...this.IO, loading: !!this.idToUpdate };
    this.options = { data: {}, loading: true };
    this.loading = false;
    this.validation = this.FVIO;
    this.isValidationError = false;

    // ! [] useEffect
    if (this.options?.loading) this.getOptions();
    if (this.idToUpdate) this.getData();

    makeAutoObservable(this);
  }

  // ! functions
  // ! handleChange
  handleChange = ({ key, value }) => {
    const stateToUpdate = { ...this.state };
    let temp = { ...stateToUpdate, [key]: value };
    this.setState(temp);
    this.handleValidationOnChange({ key, value });
    if(this.idToUpdate){
      if(temp["nameEnglish"] === this.rowToUpdate?.nameEnglish &&
        temp["nameArabic"] === this.rowToUpdate?.nameArabic && 
        temp["levelClassification"] === this.rowToUpdate?.levelClassification
      ) {
        store.dispatch(editConfirmation(false));
      }else{
        store.dispatch(editConfirmation(true));
      }
    }else{
     if (temp["nameEnglish"] || temp["nameArabic"] || temp["levelClassification"] || temp["type"]) 
     {
      store.dispatch(editConfirmation(true));
     } else {
      store.dispatch(editConfirmation(false));
     }
   }
  };

  // ! handleSubmit
  handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = createEquipment;
    let responseMessage = "Equipment Created Successfully!";
    let data = TR.dataToSubmit(this.state);
    delete data?.loading;
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
      // set validation
      this.setValidation(VO);
      this.setIsValidationError(true);
    } else {
      this.setLoading(true);
      this.setIsValidationError(false);
      if (this.idToUpdate) {
        endpoint = updateEquipment;
        data = {
          ...data,
          id: this.idToUpdate,
        };

        responseMessage = "Equipment Updated Successfully!";
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
        url: equipmentFormOptions,
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
        url: `${getEquipment}/${this.idToUpdate}`,
      });
      const { data } = response;
      this.setState({
        ...this.state,
        nameArabic: data?.nameArabic,
        nameEnglish: data?.nameEnglish,
        levelClassification: data?.levelClassification,
        type: { LABEL: data?.type, VALUE: data?.type },
        loading: false,
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

export default EquipmentModel;

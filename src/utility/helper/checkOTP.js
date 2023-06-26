import { history } from "utility/helper/history";
import { toast } from "react-toastify";

export const checkOTP = (OTP) => {
  if (!OTP) {
    toast.info("Please reset your password one time after first sign up!");
    history.push("/reset-password");
  }
};

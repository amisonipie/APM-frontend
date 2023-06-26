import { toast } from "react-toastify";
import { errorHandler, SC } from "utility/helper";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "views/components/PrimaryButton";
import { useHistory, useParams, Link } from "react-router-dom";
import { login, logout } from "redux/actions/auth/loginActions";
import React, {
  Fragment, useEffect, useRef, useState,
} from "react";
import { encryptPassword } from "utility/securePass/encryptPassword";
import { validatePassword } from "utility/securePass/validatePassword";
import { resetPassword, resetPasswordUA } from "utility/helper/endpoints";
import { FieldValidation } from "views/components/@custom/FieldValidation";
import {
  Form,
  FormGroup,
  Spinner,
  UncontrolledTooltip,
} from "reactstrap";
import CustomInput from "views/components/@custom/Input";

// password validation initial object
const PVIO = {
  password: [],
  confirmPassword: [],
};
function ResetPassword() {
  const { token: securityToken, email: userEmail } = useParams();
  const mountedRef = useRef(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
  });
  const { user } = useSelector((state) => ({ user: state.auth.login.data }));

  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(PVIO);
  const [isValidationError, setIsValidationError] = useState(false);
  const [isValidationOnMount, setIsValidationErrorOnMount] = useState(false);

  useEffect(() => () => {
    mountedRef.current = false;
  }, []);

  useEffect(() => {
    handlePasswordValidationOnChange({ key: "password", onMount: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = resetPassword;
    const password = validatePassword({
      value: state?.password,
      min: 8,
      max: 12,
      uppercase: 1,
      lowercase: 1,
      digits: 1,
    });
    const confirmPassword = validatePassword({
      value: state?.confirmPassword,
      includes: { value: [state?.password], message: "Password do not match!" },
    });
    if (password.length || confirmPassword.length) {
      setIsValidationError(true);
      if (password.length) {
        document.getElementById("newPassword").focus();
      } else if (confirmPassword.length) {
        document.getElementById("confirmPassword").focus();
      }
    } else {
      // get data.

      let data = {
        password: encryptPassword(state.password),
      };
      if (securityToken) {
        data = { ...data, token: securityToken, email: userEmail };
        url = resetPasswordUA;
      }

      setIsValidationError(false);
      setLoading(true);
      // call login api.
      try {
        const response = await SC.postCall({ url, data });
        if (response?.data?.code === 200) {
          toast.success("Password changed Successfully!");
          dispatch(login(response?.data));
          history.push("/");
          if (!mountedRef.current) return null;
          setLoading(false);
        } else {
          toast.error(response?.data?.message);
          setLoading(false);
        }
      } catch (error) {
        const err = errorHandler(error);
        toast.error(err);
        setLoading(false);
      }
    }
  };

  const handleChange = ({ key, value }) => {
    setState({ ...state, [key]: value });
  };
  const handlePasswordValidationOnChange = ({ key, value, onMount }) => {
    const password = validatePassword({
      value:
        key === "password"
          ? value || state?.password
          : state?.password,
      min: 8,
      max: 12,
      uppercase: 1,
      lowercase: 1,
      digits: 1,
    });
    const confirmPassword = validatePassword({
      value: key === "confirmPassword" ? value : state?.confirmPassword,
      includes: {
        value: [key === "password" ? value : state?.password],
        message: "Password do not match!",
      },
    });
    setValidation({ password, confirmPassword });
    if (onMount) setIsValidationErrorOnMount(true);
  };

  return (
    <div className="authForm">
      <h1 className="authForm--Heading">Reset password!</h1>
      <p className="authForm--subHeading">Please enter your new password</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="form-label-group position-relative has-icon-left mt-2">
          <CustomInput
            type="password"
            placeholder="New password"
            id="newPassword"
            value={state.password}
            eventOnChangeHandler={(e) => {
              handleChange({ key: "password", value: e.target.value });
              handlePasswordValidationOnChange({
                key: "password",
                value: e.target.value,
              });
            }}
            valid={!isValidationError && validation.password?.length === 0}
            invalid={(isValidationError || isValidationOnMount) && validation?.password.length > 0}
          />
          {(isValidationError || isValidationOnMount) && (
            <FieldValidation validations={validation.password} />
          )}
        </FormGroup>
        <FormGroup className="form-label-group position-relative has-icon-left">
          <CustomInput
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            value={state.confirmPassword}
            eventOnChangeHandler={(e) => {
              handleChange({ key: "confirmPassword", value: e.target.value });
              handlePasswordValidationOnChange({
                key: "confirmPassword",
                value: e.target.value,
              });
            }}
            invalid={isValidationError && validation?.confirmPassword.length > 0}
          />
          {isValidationError && (
            <FieldValidation validations={validation.confirmPassword} />
          )}
        </FormGroup>
        <div className="d-flex flex-column text-left ">
          {securityToken && (
            <Link to="/login" className="text-light mb-1">
              Back to login?
            </Link>
          )}
          <PrimaryButton
            customClasses="solid w-100"
            type="submit"
            icon={loading && <Spinner />}
            customIconClasses="stroke"
            text={loading ? "Submitting..." : "Submit"}
          />

          {user?._id && (
            <>
              <div id="logout" className="authLayout__footer__logout">
                {/* <FaPowerOff
                  className="authLayout__footer__logout--icon"
                /> */}
                <span
                  className="authLayout__footer__logout--text"
                  onClick={() => dispatch(logout())}
                >
                  Logout Now?
                </span>
              </div>
              <UncontrolledTooltip placement="bottom" target="logout">
                Logout
              </UncontrolledTooltip>
            </>
          )}
        </div>
      </Form>
    </div>
  );
}

export default ResetPassword;

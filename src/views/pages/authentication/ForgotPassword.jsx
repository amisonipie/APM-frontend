import { toast } from "react-toastify";
import { TR } from "utility/transformers";
import { errorHandler, SC } from "utility/helper";
import { Link, useHistory } from "react-router-dom";
import { getValidEmailOrPhone } from "utility/auth";
import { forgotPassword } from "utility/helper/endpoints";
import PrimaryButton from "views/components/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { Form, FormGroup, Spinner } from "reactstrap";
import CustomInput from "views/components/@custom/Input";

function ForgotPassword(props) {
  const mountedRef = useRef(true);
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    isSent: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // get data.
    const data = {
      email: getValidEmailOrPhone(state.email),
    };

    if (data.email === "") {
      handleChange({ key: "emptyField", value: true });
    } else {
      setLoading(true);
      try {
        // const response =
        await SC.postCall({
          url: forgotPassword,
          data,
        });
        handleChange({ key: "isSent", value: true });
        toast.success("Password reset link sent Successfully!");
        if (!mountedRef.current) return null;
        setLoading(false);
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

  useEffect(() => {
    if (localStorage.getItem("token")) history.push("/");
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return (
    <div className="authForm">
      <h1 className="authForm--Heading">Forgot password!</h1>
      {!state?.isSent && (
        <p className="authForm--subHeading">
          Please enter your email address to get a reset password link
        </p>
      )}
      {state?.isSent ? (
        <p className="authForm--emailSentMessage">
          Password reset link has been sent to your account. Please follow that
          link to reset your password!
          {" "}
        </p>
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormGroup className="form-label-group position-relative has-icon-left mt-2">
            <CustomInput
              type="text"
              placeholder="Email"
              required
              autoFocus
              value={state.email}
              eventOnChangeHandler={(e) => handleChange({
                key: "email",
                value: TR.removeSpaces(e.target.value),
              })}
            />
          </FormGroup>

          <div className="d-flex flex-column text-left">
            <Link to="/login" className="text-light mb-1">
              Back to login?
            </Link>
            <PrimaryButton
              customClasses="solid w-100"
              type="submit"
              icon={loading && <Spinner />}
              customIconClasses="stroke"
              text={loading ? "Submitting..." : "Submit"}
            />
          </div>
        </Form>
      )}
    </div>
  );
}

export default ForgotPassword;

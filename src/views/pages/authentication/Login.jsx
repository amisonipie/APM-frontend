import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { TR } from "utility/transformers";
import { signIn } from "utility/helper/endpoints";
import { errorHandler, SC } from "utility/helper";
import { Link, useHistory } from "react-router-dom";
import { getValidEmailOrPhone } from "utility/auth";
import { login } from "redux/actions/auth/loginActions";
import React, { useEffect, useRef, useState } from "react";
import PrimaryButton from "views/components/PrimaryButton";
import {
  Form, FormGroup, Input, Label, Spinner,
} from "reactstrap";
import { encryptPassword } from "utility/securePass/encryptPassword";
import CustomInput from "views/components/@custom/Input";

function Login(props) {
  const mountedRef = useRef(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
    rememberMe: false,
    loading: false,
    emptyField: false,
  });
  const [loading, setLoading] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();
    // get data.
    const data = {
      email: getValidEmailOrPhone(state.email),
      password: state.password,
      rememberMe: state?.rememberMe,
    };
    if (data.email === "" || data.password === "") {
      handleChange({ key: "emptyField", value: true });
    } else {
      setLoading(true);
      // call login api.
      SC.postCall({
        url: signIn,
        data: { ...data, password: encryptPassword(data?.password) },
        // data,
      })
        .then((response) => {
          const responseCode = response.data.code;
          const responseMessage = response.data.message;
          if (responseCode === 200) {
            dispatch(login(response.data));
            if (!mountedRef.current) return null;
            setLoading(false);
          } else {
            toast.error(responseMessage);
            if (!mountedRef.current) return null;
            setLoading(false);
          }
        })
        .catch((error) => {
          const errorMessage = errorHandler(error);
          if (errorMessage) toast.error(errorMessage);
          setLoading(false);
        });
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
      <h1 className="authForm--Heading">Sign in!</h1>
      <p className="authForm--subHeading">
        Sign in and start managing your assets
      </p>
      <Form onSubmit={handleLogIn}>
        <CustomInput
          type="text"
          placeholder="Email / Phone number"
          required
          autoFocus
          value={state.email}
          eventOnChangeHandler={(e) => handleChange({
            key: "email",
            value: TR.removeSpaces(e.target.value),
          })}
        />
        <CustomInput
          type="password"
          placeholder="Password"
          required
          value={state.password}
          eventOnChangeHandler={(e) => handleChange({ key: "password", value: e.target.value })}
        />
        {/* <div className="form-control-position">
            <Lock size={15} />
          </div>
          <Label>Password</Label>
           */}
        {/* </FormGroup> */}
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between flex-wrap my-2">
            <FormGroup className="" check>
              <Input
                type="checkbox"
                value={state?.rememberMe}
                id="rememberMe"
                onChange={(e) => handleChange({
                  key: "rememberMe",
                  value: Boolean(e.target.value),
                })}
              />
              <Label check className="text-light" htmlFor="rememberMe">
                Remember me
              </Label>
            </FormGroup>
            <Link to="/forgot-password" className="text-light mb-1">
              Forgot password?
            </Link>
          </div>
          <PrimaryButton
            customClasses="solid w-100"
            type="submit"
            icon={loading && <Spinner />}
            customIconClasses="stroke"
            text={loading ? "Signing In..." : "Sign In"}
          />
        </div>
      </Form>
    </div>
  );
}

export default Login;

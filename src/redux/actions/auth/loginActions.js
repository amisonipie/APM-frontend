import { SC } from "utility/helper";
import { history } from "utility/helper/history";
import { checkOTP } from "utility/helper/checkOTP";
import { resetListingData } from "redux/actions/renderList/renderListAction";
import { PAGE, UI } from "utility/helper/constants";

export const loginWithJWT = (payload) => ({ type: "LOGIN_WITH_JWT", payload });

export const expireUser = (payload) => ({ type: "LOGOUT", payload });

export const getUser = () => async (dispatch) => {
  SC.getCall({ url: "/token_data" }).then((response) => {
    const responseCode = response.data.code;
    const OTPUsed = response.data.data?.OTPUsed;
    if (responseCode === 200) {
      dispatch(loginWithJWT(response?.data?.data));
      checkOTP(OTPUsed);
    } else {
      history.push("/login");
    }
  });
};

export const login = (data) => async (dispatch, getState) => {
  const { auth } = getState();
  const token = data?.data?.token;
  const OTPUsed = data?.data?.OTPUsed;
  const isUnAuthRedirected = auth.login.intendedRoute && auth.login.intendedRoute === "unAuthorized";
  if (token) localStorage.setItem("token", token);
  dispatch(loginWithJWT(data?.data || {}));
  if (!OTPUsed) {
    checkOTP(OTPUsed);
  } else if (isUnAuthRedirected) {
    history.go(-1); // redirect me to last protected page i tried to visit
  } else {
    history.push("/");
  }
};

export const logout = (props) => async (dispatch) => {
  // handle logout
  localStorage.removeItem("token");
  // ! remove path on logout action
  localStorage.removeItem(PAGE.PREVIOUS);
  localStorage.removeItem(PAGE.CURRENT);
  localStorage.removeItem(UI.cardView);
  dispatch(expireUser(props?.reason));
  dispatch(resetListingData({}));
  if (history.location.pathname !== "/login") history.push("/login");
};

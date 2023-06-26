import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import PrimaryButton from "views/components/PrimaryButton";

function NotFound() {
  const location = useLocation();
  const history = useHistory();

  const pathname = location.pathname.split("/");
  // const homePageLink = user?.role === "super_admin" ? "/inventories" : "/";
  const homePageLink = "/";
  const errorText = pathname.includes("not-authorized")
    ? "Un Authorized Access!"
    : "Oops, Page Not Found!";
  return (
    <div
      className="error-code"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="error-code">{errorText}</h1>
      <div className="d-flex justify-content-between flex-column flex-sm-row mt-1">
        <PrimaryButton
          customClasses="mb-1 mb-sm-0 w-100 mr-0 mr-sm-1"
          text="Back to Home page"
          onClick={(e) => {
            e.preventDefault();
            history.push(homePageLink);
          }}
        />
        <PrimaryButton
          customClasses="solid RequestBtton RequestBtton__outline"
          text="Login"
          onClick={(e) => {
            e.preventDefault();
            history.push("/login");
          }}
        />
      </div>
    </div>
  );
}
export default NotFound;

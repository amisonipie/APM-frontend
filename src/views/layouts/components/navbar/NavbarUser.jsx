import { Power } from "react-feather";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { userToggleIcon } from "assets/icons/svgIcons";
import { logout } from "redux/actions/auth/loginActions";
import { getUserRole } from "views/components/generalHelper";
import userAvatar from "assets/img/profile/UserImage/avatar.png";
import Avatar from "views/components/@vuexy/avatar/AvatarComponent";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
} from "reactstrap";

function UserDropdown() {
  const { app } = useSelector((state) => ({ app: state.customizer }));
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  let mode = app.customizer.theme;

  if (mode === "light") {
    mode = "dark";
  } else {
    mode = "light";
  }
  return (
    <DropdownMenu>
      <DropdownItem tag="a" onClick={handleLogout}>
        <Power size={14} className="mr-50" />
        <span className="align-middle">
          <FormattedMessage id="Log Out" defaultMessage="Log Out" />
        </span>
      </DropdownItem>
    </DropdownMenu>
  );
}

function NavbarUser(props) {
  const [showDDM, setShowDDM] = useState(false);
  // const hostname = window?.location?.hostname;
  return (
    <div className="navbar-user">
      {/* <div className="navbar-user__user d-none d-sm-flex"> */}
      {/* // ! show avatar in all view */}
      <div className="navbar-user__user d-sm-flex">
        <Avatar
          className="navbar-user__user--avatar"
          img={userAvatar}
          status="online"
        />
        <div className="user-nav d-sm-flex d-none navbar-user__user__infoContainer">
          <p className="navbar-user__user__infoContainer--text">
            {/* {hostname !== "localhost" ? ( */}
            {/* <FormattedMessage
              id={"Welcome!"}
              // id={props?.user?.role || "guest"}
              // defaultMessage={props?.user?.role || "guest"}
              defaultMessage={"Welcome!"}
            /> */}
            {/* // ) : ( */}
            {/* <>
                {" "}
                <span>{getUserRole(props?.user?.role)}</span>
                <br />
                <span className="mt-1 d-inline-block">{env.ENV}</span>
                <br />
                <strong className="mt-1 d-inline-block">
                  {props?.user?.email}
                </strong>
              </> */}
            {/* ) */}
            {/* } */}
          </p>
          <p
            id="user-name-navbar"
            className="navbar-user__user__infoContainer--userName"
          >
            {props?.user?.name}
          </p>

          <UncontrolledTooltip placement="bottom" target="user-name-navbar">
            {props?.user?.name}
          </UncontrolledTooltip>
          <p className="navbar-user__user__infoContainer--role">
            {getUserRole(props?.user?.role)}
          </p>
        </div>
      </div>

      <Dropdown
        direction="up"
        isOpen={showDDM}
        tag="li"
        className="dropdown-user nav-item  list-unstyled"
        toggle={() => setShowDDM(!showDDM)}
      >
        <DropdownToggle tag="a" className="nav-link dropdown-user-link">
          <figure className="navbar-user__toggle ">{userToggleIcon}</figure>
        </DropdownToggle>
        <UserDropdown />
      </Dropdown>
    </div>
  );
}

export default NavbarUser;

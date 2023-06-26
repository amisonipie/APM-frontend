import React from "react";
import { env } from "utility/config";
import { useSelector } from "react-redux";
import { UncontrolledTooltip } from "reactstrap";
import MohTree from "assets/imgs/ministry-of-health-tree.svg";
import MohAr from "assets/imgs/ministry-of-health-arabic.svg";
import MohEn from "assets/imgs/ministry-of-health-english.svg";

export default function ClientLogo() {
  const { user } = useSelector((state) => ({
    user: state.auth.login.data,
  }));

  const siteLogo = user?.lab?.siteLogo;
  return (
    <div className="clientLogo d-none d-lg-flex">
      <div className="clientLogo__container">
        {(env.PROJECT === "enoviimax"
          && (siteLogo ? (
            <div className="clientLogo__container__Logo">
              <img
                className="clientLogo__container__Logo--img"
                // src={user?.lab?.siteLogo}
                src={siteLogo}
                alt="site logo"
              />
            </div>
          ) : (
            <div />
          ))) || (
          <div className="clientLogo__container__Logo">
            <div className="clientLogo__container__Logo__textPart">
              <img src={MohAr} alt="ministry of health" />
              <img src={MohEn} alt="ministry of health" />
            </div>
            <img
              className="clientLogo__container__Logo--tree"
              src={MohTree}
              alt="moh logo"
            />
          </div>
        )}
      </div>
      <div className="clientLogo__container__content">
        <h6>
          {env.PROJECT === "enoviimax" ? "Site Name" : "Ministry of Health"}
        </h6>
        <p id="site_name_logo_id">{user?.lab?.site_name}</p>
        <UncontrolledTooltip placement="bottom" target="site_name_logo_id">
          {user?.lab?.site_name}
        </UncontrolledTooltip>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  contactUsIcon, faqIcon, helpIcon, settingIcon, whatsNewIcon,
} from "assets/icons/svgIcons";

const helpMenuContent = [
  {
    title: "FAQ's",
    id: "faqs",
    icon: faqIcon,
    to: "/faq",
  },
  {
    title: "What's New",
    id: "whats-new",
    icon: whatsNewIcon,
    to: "/new",
  },
  {
    title: "Contact Us",
    id: "contact-us",
    icon: contactUsIcon,
    to: "/contact-us",
  },
];

function SidebarFooter({ isBottomShadow, ...props }) {
  const [isHelpMenu, setHelpMenu] = useState(false);
  const [activeHelpMenu, setActiveHelpMenu] = useState("");

  return (
    <div className={`sidebar__footer  ${isBottomShadow && "sidebar__shadow"}`}>
      {/* // ! TODO : Add Design rules */}
      <ul className="navigation navigation-main navigation-footer">
        <li
          id="support"
          className={`nav-item d-flex justify-content-center align-items-center ${isHelpMenu ? "active" : ""}`}
          onClick={() => setHelpMenu(true)}
          onMouseLeave={() => {
            setHelpMenu(false);
            setActiveHelpMenu("");
          }}
        >
          <a className="d-flex align-items-center justify-content-start">
            <div className="menu-text">
              {helpIcon}
              <span className="menu-item menu-title">Help</span>
            </div>
          </a>
          <div className={`help-menu ${isHelpMenu ? "open" : ""}`}>
            <ul>
              {helpMenuContent.map((content) => (
                <li key={content.id} onClick={() => setActiveHelpMenu(content.id)}>
                  <a>
                    <div className={`menu-text ${activeHelpMenu === content.id && "active"}`}>
                      {content.icon}
                      <span className="menu-item menu-title" id={content.id}>{content.title}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li className="nav-item d-flex justify-content-center align-items-center">
          <a className="d-flex align-items-center justify-content-start">
            <div className="menu-text">
              {settingIcon}
              <span className="menu-item menu-title">Settings</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}

function NeedHelp(props) {
  return (
    <div
      onClick={props.onClick}
      className="pt-1 sidebar__cursorPointer needHelp  mb-1"
    >
      <span className="text-white pt-1 span-help pr-3" onClick={props.onClick}>
        <img src={helpIcon} alt="help" onClick={props.onClick} className="help-box--icon" />
        <span className="ml-2">
          <FormattedMessage id="Need Help?" defaultMessage="Need Help?" onClick={props.onClick} />
        </span>
      </span>
    </div>
  );
}

export default SidebarFooter;

/*
  import PoweredByLogo from "assets/imgs/poweredBy.svg";
  <NeedHelp {...props} />
  <a
    href="https://ascend.com.sa/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={PoweredByLogo}
      alt="logo"
      className="authLayout__footer--logo"
    />
  </a>
*/

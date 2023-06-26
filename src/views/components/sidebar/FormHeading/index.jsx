import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadingIC from "views/components/Heading";
import { closeFileIcon } from "assets/icons/svgIcons";
import {
  editAdditionalConfirmation,
  editConfirmation,
  showDisacrdConfirmation,
} from "redux/actions/renderList/renderListAction";
import { commonDrawer } from "redux/actions/drawer/drawerActions";

function SideBarFormHeading({ title, icon, zeroMargin }) {
  const dispatch = useDispatch();
  const { isEdit, isEditAdditional } = useSelector((state) => {
    return {
      isEdit: state.renderList?.isEdit,
      isEditAdditional : state.renderList?.isEditAdditional
    };
  });

  return (
    <div className={`sidebarForm__container ${zeroMargin ? "zeroMargin" : ""}`}>
      <div className="sidebarForm__container__content">
        <HeadingIC
          className="sidebarForm__container__content__heading"
          icon={icon}
          label={title}
        />
        <figure
          className="sidebarForm__container__content--close"
          onClick={() => {
            if (isEdit || isEditAdditional) {
              dispatch(showDisacrdConfirmation(true));
            } else {
              dispatch(editConfirmation(false));
              dispatch(editAdditionalConfirmation(false));
              dispatch(commonDrawer({ isOpen: false }));
            }
          }}
        >
          {closeFileIcon}
        </figure>
      </div>
      <hr className="sidebarForm__container__divider" />
    </div>
  );
}

export default SideBarFormHeading;

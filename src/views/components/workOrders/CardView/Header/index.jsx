import React from "react";
import { getColor, getField, getStatus } from "views/components/generalHelper";
import CardBadge from "./CardBadge";

function Header({ item }) {
  const color = getColor(item?.status);

  return (
    <header className="cardView__header">
      <div className="cardView__header__badgeContainer">
        <CardBadge
          text={getStatus(item?.status, item?.site_model)}
          isIcon
          customClasses={`${color} main`}
        />
        <CardBadge
          text={item?.type}
          customClasses="cardView__header__badgeContainer--category ml-auto"
        />
        <CardBadge
          text={getField(item?.classification)}
          customClasses="cardView__header__badgeContainer--category"
        />
      </div>
    </header>
  );
}

export default Header;

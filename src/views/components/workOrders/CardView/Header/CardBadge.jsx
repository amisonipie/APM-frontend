import React from "react";
import { Badge } from "reactstrap";
import { GoPrimitiveDot } from "react-icons/go";

function CardBadge({ text, isIcon, customClasses }) {
  return (
    <Badge
      className={`cardView__header__badgeContainer__status ${customClasses}`}
    >
      {isIcon && (
        <GoPrimitiveDot className="cardView__header__badgeContainer__status--icon" />
      )}
      <span className="cardView__header__badgeContainer__status--text">
        {text}
      </span>
    </Badge>
  );
}

export default CardBadge;

import React from "react";
import { useHistory } from "react-router-dom";
import PrimaryButton from "views/components/PrimaryButton";
import { ticketIdIcon } from "views/components/workOrders/CardView/data";

function CardViewFooter({ item }) {
  const history = useHistory();
  // const isTicketActive = item?.status !== "opened" && item?.status !== "closed";

  const btnText = "Details";

  const handleDetailBtnClick = (event, item) => {
    if (event.ctrlKey) {
      window.open(`/work-orders/list/${item?._id}`, "_blank");
    } else {
      history.push(`/work-orders/list/${item?._id}`);
    }
  };

  return (
    <footer className="cardView__footer">
      <div className="cardView__footer__asset">
        <figure className="cardView__footer__asset__ticketId--icon">
          {ticketIdIcon}
        </figure>
        <span className="cardView__footer__asset__ticketId--text">
          #
          {item?.serial}
        </span>
      </div>
      <div className="cardView__footer__actionBtnContainer">
        <PrimaryButton
          text={btnText}
          customClasses="primary-outline"
          customIconClasses="stroke"
          onClick={(e) => handleDetailBtnClick(e, item)}
        />
      </div>
    </footer>
  );
}

export default CardViewFooter;

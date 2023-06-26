import { toast } from "react-toastify";
import React, { useState } from "react";
import { errorHandler, SC } from "utility/helper";
import { Button, Modal, ModalBody } from "reactstrap";
import { workOrderRating } from "utility/helper/endpoints";
import PrimaryButton from "views/components/PrimaryButton";
import { RequestorRatingIcon, StarIcon } from "assets/icons/svgIcons";

function RequestorRating({
  isRating,
  showRating,
  id,
  toggleRating,
  getWorkOrder,
}) {
  const [rating, setRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  let ratingStars = [];
  for (let i = 1; i <= 5; i++) {
    ratingStars = [...ratingStars, { icon: StarIcon, rate: i }];
  }
  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Kindly select the rating first");
    } else {
      try {
        setRatingLoading(true);
        await SC.postCall({
          url: workOrderRating,
          data: {
            workOrderId: id,
            rating,
          },
        });
        setRatingLoading(false);
        toast.success("Rating Submitted Successfully!");
        getWorkOrder();
        toggleRating();
      } catch (error) {
        const errorMessage = errorHandler(error);
        setRatingLoading(false);
        if (errorMessage) toast.error(errorMessage);
      }
    }
  };

  /* <h3>Rating submitted Successfully!</h3>, */

  return (
    <Modal
      isOpen={isRating}
      toggle={toggleRating}
      className="requestorRating"
      centered
    >
      <ModalBody>
        <figure className="requestorRating__icon">{RequestorRatingIcon}</figure>
        <h6 className="requestorRating__heading">
          Please rate the service provided?
        </h6>
        <ul className="requestorRating__list">
          {ratingStars?.map((item, index) => (
            <li
              key={index}
              className="requestorRating__list__item "
              onClick={() => handleRating(item.rate)}
            >
              <figure
                className={`requestorRating__list__item__icon ${
                  item?.rate <= rating && "active"
                }`}
              >
                {item.icon}
              </figure>
            </li>
          ))}
        </ul>
        <PrimaryButton
          text={ratingLoading ? "Submitting..." : "Submit"}
          customClasses="solid py-2 px-3"
          onClick={handleSubmit}
          isDisabled={ratingLoading}
        />
        <Button
          className="requestorRating__cancel"
          type="button"
          onClick={toggleRating}
          disabled={ratingLoading}
        >
          {"Skip >>"}
        </Button>
      </ModalBody>
    </Modal>
  );
}

export default RequestorRating;

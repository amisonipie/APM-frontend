import React from "react";
import { useSelector } from "react-redux";
import PrimaryButton from "views/components/PrimaryButton";
import { getDetailPageActions } from "views/components/workOrders/data";

function ActionController({
  isRedirected,
  woActionButtons,
  current,
  isDisabled,
  handleModel,
  handleSubmit,
  state,
  loadingSubmission,
  showRating,
  handleDownload,
  user,
}) {
  const canRate = user?._id === state?.data?.creator?._id && !state?.data?.rating;

  const { app } = useSelector((state) => ({
    app: state?.customizer?.customizer,
  }));

  return (
    <section
      className={`workOrder_detail__actions ${app?.sidebarCollapsed && "menu-collapsed"} ${
        isRedirected && "rejected"
      } `}
    >
      <p className="workOrder_detail__actions--message">
        <span dangerouslySetInnerHTML={{ __html: woActionButtons[current?.step]?.description }} />
      </p>
      <div className="workOrder_detail__actions__btnContainer">
        {woActionButtons[current?.step]?.texts?.map((text, index) => {
          const item = woActionButtons.array[index];
          const { CustomProps } = getDetailPageActions({
            item,
            current,
            woActionButtons,
            isDisabled,
            index,
            handleSubmit,
            handleModel,
            state,
            btnText: text,
            loadingSubmission,
            showRating,
            handleDownload,
          });

          return index === 0 && state?.data?.status === "closed" && !canRate ? (
            <div key={index} />
          ) : (
            <PrimaryButton {...CustomProps} />
          );
        })}
      </div>
    </section>
  );
}

export default ActionController;

import React from "react";
import moment from "moment";
import HeadingIC from "views/components/Heading";
import { remarkIcon } from "assets/icons/svgIcons";
import {
  Card, CardBody, CardHeader, UncontrolledTooltip,
} from "reactstrap";
import { getColor, getIcon, getUserRole } from "views/components/generalHelper";

function DefaultWorkorderRemark({ orderCreatedAt }) {
  const createdAt = moment(new Date(orderCreatedAt)).format(
    "DD/MM/YYYY hh:mm A",
  );
  return (
    <div
      className="d-flex justify-center align-items-center flex-row workOrder_detail_default_workorder"
    >
      <div className="workOrder_detail_default_workorder__default_icon" />
      <div className="workOrder_detail_default_workorder_text_wrapper">
        <p className="text-capitalize workOrder_detail_default_workorder__text_style">
          Workorder Created
        </p>
        <time>{createdAt}</time>
      </div>
    </div>
  );
}
// Work Order Remarks Component
function RemarksWO({ remarks, customClasses, orderCreatedAt }) {
  return (
    <Card className={` ${customClasses}`}>
      <CardHeader>
        <HeadingIC
          icon={remarkIcon}
          label="Remarks"
          className="workOrder_detail__remarks__heading"
        />
      </CardHeader>
      <CardBody className="workOrder_detail__remarks__body">
        {remarks.map((item, astIndex) => {
          const title = getUserRole(item?.user?.role);
          const createdAt = moment(new Date(item?.created_at)).format(
            "DD/MM/YYYY hh:mm A",
          );
          const userName = item?.user?.name;
          const color = getColor(item?.status);
          return (
            <div
              key={astIndex}
              className="workOrder_detail__remarks__body__boxContainer"
            >
              <div
                className={`workOrder_detail__remarks__body__boxContainer__box ${color}`}
              >
                <p className="workOrder_detail__remarks__body__boxContainer__box__role">
                  {title}
                </p>
                <div className="workOrder_detail__remarks__body__boxContainer__box__content">
                  <div className="workOrder_detail__remarks__body__boxContainer__box__content__avatar">
                    <figure>{getIcon(item?.user?.role)}</figure>
                  </div>
                  <div className="workOrder_detail__remarks__body__boxContainer__box__content__content">
                    <p
                      className="workOrder_detail__remarks__body__boxContainer__box__content__content--username"
                      id={`usertooltip${astIndex}`}
                    >
                      {userName}
                    </p>
                    <UncontrolledTooltip
                      placement="top"
                      target={`usertooltip${astIndex}`}
                    >
                      {userName}
                    </UncontrolledTooltip>

                    <h5 className="workOrder_detail__remarks__body__boxContainer__box__content__content--action">
                      {item?.action}
                    </h5>
                    {item.status === "rejected"
                    || item?.status === "redirected" ? (
                        <p className="workOrder_detail__remarks__body__boxContainer__box__content__content--comment">
                          <div dangerouslySetInnerHTML={{ __html: item.comment }} />
                        </p>
                      ) : null}
                  </div>
                </div>
              </div>
              <time className="workOrder_detail__remarks__body__boxContainer__time">
                {createdAt}
              </time>
            </div>
          );
        })}

        <DefaultWorkorderRemark orderCreatedAt={orderCreatedAt} />
      </CardBody>
    </Card>
  );
}
export default RemarksWO;

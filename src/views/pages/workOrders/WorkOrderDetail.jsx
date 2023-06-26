import { Card, Col, Row } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import PrimaryButton from "views/components/PrimaryButton";
import React, { useEffect, Fragment } from "react";
import RemarksWO from "views/components/workOrders/DetailPage/Remarks";
import WorkOrderSteps from "views/components/workOrders/DetailPage/Steps";
import RequestorRating from "views/components/workOrders/DetailPage/Rating";
import WorkOrderHeader from "views/components/workOrders/DetailPage/Header";
import DescriptionAndFiles from "views/components/workOrders/DetailPage/Description";
import ActionController from "views/components/workOrders/DetailPage/ActionController";
import RedirectionReason from "views/components/workOrders/DetailPage/RedirectionReason";
import TechnicianFormView from "views/components/workOrders/DetailPage/TechnicianOps/OutPut";
import WorkOrderAssetInformation from "views/components/workOrders/DetailPage/AssetInformation";

import WOSolutionFOrm from "views/components/workOrders/DetailPage/TechnicianOps";
import { WorkOrderModal } from "models/workOrder";
import { observer } from "mobx-react-lite";

const WorkOrderDetail = observer((props) => {
  const WorkOrders = React.useMemo(() => new WorkOrderModal(props), []);
  const history = useHistory();

  const { workOrderId } = useParams();

  useEffect(() => {
    WorkOrders.subscribeToGetWorkOrder();
  }, [workOrderId, WorkOrders?.toggleDrawer]);

  useEffect(() => {
    WorkOrders.subscribeToToggleTechnicianForm();
  }, [WorkOrders.inProgress]);

  return (
    <main className="workOrder_detail">
      {(WorkOrders?.workOderDetailLoading && (
        <p>Please wait, getting work order...</p>
      ))
        || (Object.keys(WorkOrders?.workOderDetailState.data)?.length === 0
          && !WorkOrders?.workOderDetailLoading && (
          <div className="alert alert-warning p-5 d-flex flex-column align-items-start">
            <h1>Sorry, It seems that work order is not exist!</h1>
            <PrimaryButton
              text="Back to all Work Orders"
              customClasses="mt-2 solid"
              onClick={() => history.push("/work-orders/list")}
            />
          </div>
        )) || (
        <Row>
          <Col lg="12">
            {" "}
            {/* header */}
            <WorkOrderHeader
              state={WorkOrders?.workOderDetailState}
              color={WorkOrders.color}
              current={WorkOrders.current}
              workOrderId={workOrderId}
              // showPrint={technicianForm}
            />
            {/* End header */}
            {/* detail and steps  */}
            <section className="workOrder_detail__steps">
              <Card>
                <WorkOrderSteps
                  workOrder={WorkOrders?.workOderDetailState.data}
                />
                <DescriptionAndFiles
                  state={WorkOrders?.workOderDetailState}
                />
              </Card>
            </section>
            {/* End detail and steps  */}
            {/* AssetInformation  + remarks + actions  */}
          </Col>
          <Col lg="8">
            <Row className="ARTechFContainer">
              <Col
                className={`workOrder_detail__assetRemarksContianer ${WorkOrders?.assetRemarksCols}`}
              >
                <Row className="m-0">
                  <Col
                    className={`workOrder_detail__assetRemarksContianer ${WorkOrders?.assetRemarksCols}`}
                  >
                    <Row className="m-0">
                      <Col
                        className={`workOrder_detail__assetInformation  ${WorkOrders?.assetInfoCols}`}
                      >
                        {/* AssetInformation  */}
                        <WorkOrderAssetInformation
                          assetInfo={WorkOrders?.assetInfo}
                          state={WorkOrders?.workOderDetailState}
                        />

                        {/* End AssetInformation  */}
                      </Col>
                      {WorkOrders?.WorkOrderForm
                          || WorkOrders?.technicianForm ? (
                          <Col className="p-0">
                            {/* WorkOrder completion Form  */}
                            {WorkOrders?.WorkOrderForm ? (
                              <Card className="Workorder-Card">
                                <WOSolutionFOrm
                                  workOrder={
                                    WorkOrders?.workOderDetailState?.data
                                  }
                                />
                              </Card>
                            ) : WorkOrders?.technicianForm ? (
                              <TechnicianFormView
                                technicianForm={WorkOrders?.technicianForm}
                                technicianCols={WorkOrders?.technicianCols}
                              />
                            ) : (
                              <div />
                            )}
                          </Col>
                        ) : (
                          <div />
                        )}
                    </Row>
                  </Col>
                </Row>
                {/* End  AssetInformation  + remarks + actions  */}
              </Col>
            </Row>
            {/* End  AssetInformation  + remarks + actions  */}
          </Col>
          <Col lg="4" className={` ${WorkOrders?.remarksCols}`}>
            <RemarksWO
              remarks={WorkOrders?.remarks}
              customClasses=""
              orderCreatedAt={
                WorkOrders?.workOderDetailState.data.created_at
              }
            />
          </Col>

          {/* Actions Bar */}
          {WorkOrders.isControls && !WorkOrders.isTechnicianForm && (
            <ActionController
              isRedirected={WorkOrders.isRedirected}
              handleRejection={WorkOrders.handleRejection}
              inProgress={WorkOrders.inProgress}
              current={WorkOrders.current}
              validation={WorkOrders.workOderDetailValidation}
              isValidationError={
                WorkOrders.workOrderDetailIsValidationError
              }
              handleModel={WorkOrders.handleModel}
              loadingSubmission={WorkOrders.loadingSubmission}
              woActionButtons={WorkOrders.woActionButtons}
              isDisabled={WorkOrders.isDisabled}
              handleSubmit={WorkOrders?.workOderDetailsHandleSubmit}
              state={WorkOrders?.workOderDetailState}
              showRating={WorkOrders.toggleRating}
              handleDownload={WorkOrders.handleDownload}
              user={WorkOrders.userWorkDetail}
            />
          )}

          {/* Redirection Reason Modal */}
          <RedirectionReason
            rejection={WorkOrders.rejection}
            formModal={WorkOrders.formModal}
            closeModal={WorkOrders.closeModal}
            workOrder={WorkOrders?.workOderDetailState?.data}
            loading={WorkOrders?.workOderDetailLoading}
            handleSubmit={WorkOrders?.workOderDetailsHandleSubmit}
            setFormModal={WorkOrders?.statusUpdate}
            isRedirected={WorkOrders.isRedirected}
            handleRejection={WorkOrders.handleRejection}
            inProgress={WorkOrders.inProgress}
            current={WorkOrders.current}
            validation={WorkOrders.workOderDetailValidation}
            isValidationError={WorkOrders.workOrderDetailIsValidationError}
            handleModel={WorkOrders?.handleModel}
            loadingSubmission={WorkOrders.loadingSubmission}
          />
          <RequestorRating
            isRating={WorkOrders?.isRating}
            // showRating={showRating}
            id={workOrderId}
            getWorkOrder={WorkOrders.getWorkOrder}
            toggleRating={WorkOrders.toggleRating}
          />
        </Row>
      )}
    </main>
  );
});

export default WorkOrderDetail;

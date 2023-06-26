import React from "react";
import {
  Card, CardBody, Col, Row,
} from "reactstrap";

function CardViewList(props) {
  const ChildComponent = props?.cardViewChildren;
  return (
    <Row className="m-0 row-eq-heigh">
      {(props?.data?.length > 0
        && props?.data?.map((item, index) => {
          const isMultipleOf3 = (index + 1) % 3 === 0;

          return (
            <Col
              md="4"
              key={index}
              className={`cardView-contianer ${
                isMultipleOf3 ? "thirdItem" : ""
              }`}
            >
              <ChildComponent item={item} />
            </Col>
          );
        })) || (
        <Col>
          <Card className="bg-white py-1">
            <CardBody className="text-center">
              There are no records to display
            </CardBody>
          </Card>
        </Col>
      )}
    </Row>
  );
}

export default CardViewList;

import React from "react";
import { Col, Row } from "reactstrap";
import { observer } from "mobx-react-lite";
import PMCFilter from "../../../assets/icons/PMCFilter.svg";
import CustomSelect from "../@custom/Select";

import "./PMCalender.scss";

export const PMCalendarFilter = observer((props) => (
  <div className="mt-2 pt-5 px-2 PMCFIlter">
    <Row>
      <Col lg="2">
        <div className="pmc-filter">
          <img
            className="pmc-filter-img"
            src={PMCFilter}
            alt="PMCfilter"
            width="30px"
          />
          <div className="pmc-filter-text">Filter</div>
        </div>
      </Col>
      <Col lg="10" className="">
        <Row className="">
          <Col className="pl-lg-0 " lg="5">
            <CustomSelect
              isMulti
              placeholder="Select Sites"
              options={props?.Inventories?.labs?.data}
              value={props?.Inventories?.labs?.selected}
              isLoading={props?.Inventories?.labs?.loading}
              isDisabled={props?.Inventories?.labs?.loading}
              additionalOnChangeHandler={props?.handleSiteFilter}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
));

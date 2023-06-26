import React from "react";
import ReactPaginate from "react-paginate";
import { apmModules } from "utility/helper/apmModules";

function CustomPagination(props) {
  return (
    <div
      className={`table-Pagination ${
        props?.values?.data?.length === 0 && "d-none"
      }`}
    >
      <div>
        <ReactPaginate
          initialPage={props.page - 1}
          previousLabel="<<"
          nextLabel=">>"
          forcePage={props.page - 1}
          onPageChange={props.handlePageChange}
          pageCount={props.pageCount}
          disableInitialCallback
          breakLabel="..."
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          activeClassName="active"
          pageClassName="page-item"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          nextLinkClassName="page-link"
          nextClassName="page-item next"
          previousClassName="page-item prev"
          previousLinkClassName="page-link"
          pageLinkClassName="page-link"
          containerClassName={`
      ${
    !props.totalPages && "hidden"
    } pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1`}
        />
      </div>
      <div className="count">
        <span className="primary">
          {props.values.to || 0}
          {" "}
        </span>
        {`of ${props.values.total} `}
        <span className="module">{apmModules[props?.module]?.shortId}</span>
        {" "}
      </div>
    </div>
  );
}

export default CustomPagination;

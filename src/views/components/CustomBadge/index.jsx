import React from "react";
import { Badge } from "reactstrap";
import UserDepartmentModel from "../user/UserDepartment";

function CustomBadge({
  text,
  fieldName,
  customClasses,
  onClick,
  sites,
  isEdit,
}) {
  const size = 1;
  return (
    <>
      {isEdit ? (
        <div className="d-flex flex-wrap">
          {sites === "sites"
            ? text?.map((rowValue, rowIndex) => (
              <Badge
                key={rowIndex}
                className={`${customClasses} custom-badge-width1`}
                onClick={onClick}
                title={rowValue?.site_name}
              >
                <div>{rowValue?.site_name}</div>
              </Badge>
            ))
            : text?.map((rowValue, rowIndex) => (
              <Badge
                key={rowIndex}
                className={`${customClasses} custom--badge custom-badge-width1`}
                onClick={onClick}
                title={rowValue?.name}
              >
                <div>{rowValue?.name}</div>
              </Badge>
            ))}
        </div>
      ) : (
        <div className="d-flex">
          <Badge
            className={`${customClasses} custom--badge  custom-badge-width`}
            onClick={onClick}
          >
            {sites === "sites" ? (
              <>
                {text?.slice(0, size)?.map((rowValue, rowIndex, key) => (
                  <div
                    key={key}
                    className={`${text?.slice(size)?.length > 0 ? "w-100px" : "w-100"}`}
                    title={rowValue?.site_name}
                  >
                    {rowValue?.site_name}
                  </div>
                ))}
              </>
            ) : (
              <>
                {text?.slice(0, size)?.map((rowValue, rowIndex, key) => (
                  <div
                    key={key}
                    className={`${text?.slice(size)?.length > 0 ? "w-100px" : "w-100"}`}
                    title={rowValue?.name}
                  >
                    {rowValue?.name}
                  </div>
                ))}
              </>
            )}
            {text?.slice(size)?.length > 0 && (
              <UserDepartmentModel
                size={1}
                data={text}
                sites={sites}
                fieldName={fieldName}
                isEdit={isEdit || false}
              />
            )}
          </Badge>
        </div>
      )}
    </>
  );
}

export default CustomBadge;

import React from "react";
import { Table } from "reactstrap";
import { useDispatch } from "react-redux";
import { editIcon } from "assets/icons/svgIcons";
import "./style.scss";
import { commonDrawer } from "redux/actions/drawer/drawerActions";
import { modOrganizationAdmins } from "utility/helper/apmModules";

function OrganizationCardView(props) {
  const dispatch = useDispatch();
  const { item } = props;

  const handleActiveRow = (row, mode) => {
    const activeRow = row;
    activeRow.id = row?._id;
    activeRow.mode = mode;
    dispatch(
      commonDrawer({
        isOpen: true,
        type: mode,
        row: activeRow,
        module: mode === "edit" && modOrganizationAdmins.id,
      }),
    );
  };

  return (
    <div className="cardView organizations__cardView">
      <div className="d-flex justify-content-between">
        <div className="workOrder_detail__header__owner__content">
          <strong>{item?.name}</strong>
          <a className="d-block mb-0" href={`tel:${item?.phone}`}>
            <i>
              +
              {item?.phone}
            </i>
          </a>
          <a className="d-block mb-1" href={`mailto:${item?.email}`}>
            {item?.email}
          </a>
        </div>
        <div>
          <figure
            onClick={() => handleActiveRow(item, "edit")}
            className="text-danger listActions__icon"
          >
            {editIcon}
          </figure>
        </div>
      </div>
      <div className="organizations__cardView__organizationSites">
        <Table className="table bordered">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>
            {item?.sites?.map((orgSite) => (
              <tr key={orgSite?._id}>
                <td>{orgSite?.code}</td>
                <td>{orgSite?.site_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default OrganizationCardView;

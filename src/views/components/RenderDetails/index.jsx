import { SC } from "utility/helper";
import { toast } from "react-toastify";
import React, { useState, useEffect, Fragment } from "react";
import {
  Card, Table, CardBody, CardHeader, CardTitle,
} from "reactstrap";

function RenderDetails({
  module, id, customCols, title,
}) {
  const [values, setValues] = useState({
    loading: true,
    reLoading: false,
    data: [],
  });

  const getData = () => {
    SC.getCall({
      url: `/${module}/${id}`,
    }).then((response) => {
      const rowData = response.data?.data;
      const responseCode = response.data.code;
      const responseMessage = response.data.message;

      if (responseCode === 200) {
        const data = customCols.map((col) => ({
          ...col,
          cell: col.cell ? col.cell(rowData) : rowData[col.selector],
        }));

        setValues({ loading: false, reLoading: false, data });
      } else {
        setValues({ ...values, loading: false, reLoading: false });
        toast.error(responseMessage);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {title}
          {" "}
          Details
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Table>
          <tbody>
            {values.data.map((data, index) => (
              <tr key={index}>
                <th className="text-uppercase">{data.name}</th>
                <td>{data.cell}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default RenderDetails;

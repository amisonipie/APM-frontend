import { toast } from "react-toastify";
import { errorHandler, SC } from "utility/helper";
import React, { useEffect, useState } from "react";
import { MapNew } from "views/components";
import { getMapData } from "utility/helper/endpoints";
import Spinner from "views/components/@vuexy/spinner/Loading-spinner";

import "./GeoMapping.styles.scss";

export function GeoMapping() {
  const [data, setData] = useState(null);

  const getMapInfo = async (params) => {
    try {
      const response = await SC.getCall({
        url: `${getMapData}`,
        params,
      });
      const data = response?.data || [];
      setData(data);
    } catch (error) {
      const errorMessage = errorHandler(error);
      setData({ ...data, loading: false });
      if (errorMessage) toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getMapInfo();
  }, []);

  const onFilterChange = (type) => {
    getMapInfo(type);
  };

  return (
    <div className="geo-mapping">
      {data ? (
        <div className="geo-mapping__map">
          <MapNew data={data} zoom={12} onFilterChange={onFilterChange} />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

import { useSelector } from "react-redux";
import { userRole } from "utility/config";
import React, { useState, useMemo, useEffect } from "react";
import { Tabs } from "views/components";
import {
  Overview as OverviewIcon, Setting, Clock, GeoMap,
} from "assets/icons";
import {
  Overview,
  CorrectiveMaintenance,
  PreventiveMaintenance,
  GeoMapping,
} from "views/components/sections";

import "./index.styles.scss";
import { history } from "utility/helper/history";
import { PAGE } from "utility/helper/constants";

function Dashboard() {
  const [current, setCurrent] = useState(1);
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));
  const isSuperAdmin = useMemo(
    () => user?.role === userRole.superAdmin,
    [user.role],
  );
  const isOrganizationAdmin = useMemo(
    () => user?.role === userRole.organizationAdmin,
    [user.role],
  );
  const tabs = [
    {
      heading: "Overview",
      icon: <OverviewIcon />,
      onClick: () => setCurrent(1),
    },
    {
      heading: "Corrective Maintenance",
      icon: <Setting />,
      onClick: () => setCurrent(2),
      isVisible: !(!isSuperAdmin || !isOrganizationAdmin),
    },
    {
      heading: isOrganizationAdmin ? "Work Orders" : "Preventive Maintenance",
      icon: <Clock />,
      onClick: () => setCurrent(3),
      isVisible: !isSuperAdmin,
    },
    {
      heading: "Geo-Mapping",
      icon: <GeoMap />,
      onClick: () => setCurrent(4),
    },
  ];

  useEffect(() => {
    localStorage.removeItem(PAGE.PREVIOUS);
    localStorage.setItem(PAGE.CURRENT, history?.location?.pathname);
  }, []);

  return (
    <div className="dashboard-page">
      {user?.role && (
        <>
          <Tabs tabs={tabs} current={current} />
          <div
            className="dashboard-page__content"
            style={{ paddingBottom: current === 4 ? 40 : 0 }}
          >
            {current === 1 && <Overview />}
            {current === 2 && <CorrectiveMaintenance />}
            {current === 3 && <PreventiveMaintenance />}
            {current === 4 && <GeoMapping />}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;

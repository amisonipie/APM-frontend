import React from "react";
import { MaintenanceAvgCard, MaintenanceCard } from "views/components";

import "./PreventiveMaintenance.styles.scss";

export function PreventiveMaintenance() {
  return (
    <div className="preventive-maintenance">
      <div className="preventive-maintenance__header">
        <div className="preventive-maintenance__header-placeholder" />
        {/* <div className="preventive-maintenance__header-filter">
            <div className="preventive-maintenance__header-filter-refresh">
              <RefreshIcon />
            </div>
            <div className="preventive-maintenance__header-filter-fil">
              <CMButton filter active />
            </div>
          </div> */}
      </div>
      <div className="preventive-maintenance__cards">
        <MaintenanceCard text="Average Time to apparove PM WO" PmTime />
        <MaintenanceCard text="Current PM WO Status" PmWoStatus />
        <MaintenanceCard text="Status of Overdue PM WO" StatusOverdue />
        <MaintenanceCard
          text="Devices with most overdue PM WO’s"
          deviceOverdue
        />
      </div>
      <div className="preventive-maintenance__avg-card">
        <MaintenanceAvgCard
          text="Average  Time to Respond, Repair"
          PmBarChart
        />
      </div>
      <div className="preventive-maintenance__cards">
        <MaintenanceCard text="PM WO Status at HMC" PmWoStatusHMC />
        <MaintenanceCard
          text="Overdue PM WO Status at HMC"
          PmWoStatusOverdue
        />
      </div>
    </div>
  );
}

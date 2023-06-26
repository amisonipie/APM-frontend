import React, { useMemo, useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { classification, userRole } from "utility/config";
import { canDoDirect } from "utility/helper/directPermissions";
import { userViewMedical, userViewMedicalNonMedical, userViewNonMedical } from "utility/helper/permissions";
import { CMButton, MaintenanceCard } from "views/components";

import "./CorrectiveMaintenance.styles.scss";

export function CorrectiveMaintenance() {
  const [medical, setMedical] = useState(true);

  // Removed
  // const handleActive = () => {
  //   setMedical(!medical);
  // };

  // Redux user selector
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));

  // isAdmin or isOrganiza
  const isSuperAdmin = useMemo(() => user?.role === userRole.superAdmin, [user?.role]);
  const isOrganizationAdmin = useMemo(() => user?.role === userRole.organizationAdmin, [user?.role]);

  // Getter for User Field i.e, Medical/Non-medical
  const getUserField = useMemo(() => user?.field ?? null, [user?.field]);

  // Getter for isStaffWithMedicalNonMedicalPermissions
  const isStaffWithMedicalNonMedicalPermissions = useMemo(
    () => (user?.role === userRole.staff && user?.field === classification.medical && canDoDirect(user, userViewMedicalNonMedical)),
    [user?.role, user?.field],
  );

  const isSiteAdmin = useMemo(
    () => (user?.role === userRole.siteAdmin),
    [user?.role, user?.field],
  );

  const isMedical = () => isSuperAdmin || isOrganizationAdmin || (isSiteAdmin && canDoDirect(user, [userViewMedicalNonMedical, userViewMedical])) || isStaffWithMedicalNonMedicalPermissions || getUserField === classification.medical;

  const isNonMedical = () => isSuperAdmin || isOrganizationAdmin || (isSiteAdmin && canDoDirect(user, [userViewMedicalNonMedical, userViewNonMedical])) || isStaffWithMedicalNonMedicalPermissions || getUserField === classification.nonMedical;

  // CDM for setting current tab for medical and non-medical
  useEffect(() => {
    if (user?.field === classification.nonMedical) setMedical(false);
  }, [user?.field]);

  useEffect(() => {
    if (user?.role === userRole.superAdmin || user?.role === userRole.organizationAdmin) setMedical(true);
  }, [user?.role]);

  return (
    <div className="maintenance">
      <div className="maintenance__header">
        <div className="maintenance__header-buttons">
          <CMButton
            medical
            active={medical}
            onClick={() => setMedical(true)}
            isVisible={isMedical()}
          />
          <CMButton
            nonMedical
            active={!medical}
            onClick={() => setMedical(false)}
            isVisible={isNonMedical()}
          />
        </div>
        {/* <div className="maintenance__header-filter">
            <div className="maintenance__header-filter-refresh">
              <RefreshIcon />
            </div>
            <div className="maintenance__header-filter-fil">
              <CMButton filter active />
            </div>
          </div> */}
      </div>
      <div className="maintenance__cards">
        <MaintenanceCard text="Average Time" barChart legendTxt />
        <MaintenanceCard text="Range of time" range legendTxt />
        <MaintenanceCard
          text="Average Time (Per Department)"
          singleAvg
          department
        />
        <MaintenanceCard text="Average Time (Per Device)" singleAvg device />
      </div>
      {/* UnComment after finalizing Pie chart */}
      {/* <div className="maintenance__avg-card">
          <MaintenanceAvgCard
            text="Average Time to Respond and Repair"
            correctiveMaintainance
            correctivePieChart
          />
        </div> */}
    </div>
  );
}

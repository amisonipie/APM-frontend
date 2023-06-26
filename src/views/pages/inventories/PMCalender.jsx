import React, { useEffect, useMemo, useState } from "react";
import { InventoriesModal } from "models/inventory";
import { PMCalendarTopBar } from "views/components/PMCalendar";
import { inventoriesPMCalender } from "utility/helper/endpoints";
import { errorHandler, SC } from "utility/helper";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import { TR } from "utility/transformers";
import { PMCalendarFilter } from "views/components/PMCalendar/PMCalenderFilter";
import { PMCalendarData } from "views/components/PMCalendar/PMCalenderData";

const PMCalender = observer(() => {
  const Inventories = useMemo(() => new InventoriesModal(), []);

  useEffect(() => {
    let params = {};
    const savedBracket = localStorage.getItem("bracket");
    if (savedBracket) {
      params = {
        bracket: savedBracket,
      };
      setActiveBracket(savedBracket);
    }
    getPMCalenderData({ ...params });
  }, []);

  useEffect(() => {
    Inventories.getLabs();
  }, []);

  // STATES
  const [activeBracket, setActiveBracket] = useState(
    Inventories?.brackets.annual,
  );
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth() + 1);
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);

  // CONSTANTS
  const currentMonth = Inventories?.pmMonths[activeMonth];
  const disablePrevDateToggler = activeBracket === Inventories?.brackets?.monthly && activeMonth === 1;
  const disableNextDateToggler = activeBracket === Inventories?.brackets?.monthly && activeMonth === 12;

  //  GETTERS
  const getPMCalenderData = async ({
    bracket, year, month, selectedSites,
  }) => {
    const params = TR.dataToSubmit({
      bracket: bracket || activeBracket,
      year: year || activeYear,
      month: month || activeMonth,
      site_ids: selectedSites || Inventories?.labs?.selected,
    });

    setLoading(true);
    try {
      const response = await SC.getCall({
        url: inventoriesPMCalender,
        params,
      });
      setLoading(false);
      setCalendarData(response?.data || []);
      return response;
    } catch (error) {
      setLoading(false);
      const errorMessage = errorHandler(error);
      if (errorMessage) toast.error(errorMessage);
    }
  };

  // HELPERS

  // TOGGLE YEAR
  function toggleDate(condition) {
    const conditionalValue = condition === "next" ? 1 : -1;
    if (activeBracket === Inventories.brackets.annual) {
      // TOGGLE YEAR
      setActiveYear(activeYear + conditionalValue);
      getPMCalenderData({ year: activeYear + conditionalValue });
    } else {
      // TOGGLE MONTH
      setActiveMonth(activeMonth + conditionalValue);
      getPMCalenderData({ month: activeMonth + conditionalValue });
    }
  }

  // TOGGLE BRACKET TAB (ANNUALLY OR MONTHLY)
  const toggleBracket = () => {
    const newBracket = activeBracket === Inventories.brackets.annual
      ? Inventories.brackets.monthly
      : Inventories.brackets.annual;
    setActiveBracket(newBracket);
    getPMCalenderData({ bracket: newBracket });
    localStorage.setItem("bracket", newBracket);
  };
  const handleSiteFilter = (payload) => {
    Inventories.handleSitesSelection(payload);
    getPMCalenderData({ selectedSites: payload });
  };

  return (
    <div className="pmCalender m-0 p-0">
      <PMCalendarTopBar
        Inventories={Inventories}
        toggleDate={toggleDate}
        disablePrevDateToggler={disablePrevDateToggler}
        disableNextDateToggler={disableNextDateToggler}
        currentMonth={currentMonth}
        activeBracket={activeBracket}
        activeYear={activeYear}
        loading={loading}
        toggleBracket={toggleBracket}
        calendarData={calendarData}
      />
      <PMCalendarFilter
        Inventories={Inventories}
        handleSiteFilter={handleSiteFilter}
      />
      <PMCalendarData
        data={calendarData}
        bracket={activeBracket}
        Inventories={Inventories}
      />
    </div>
  );
});

export default PMCalender;

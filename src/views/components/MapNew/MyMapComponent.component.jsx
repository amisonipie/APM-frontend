import { SC } from "utility/helper";
import { useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { getMapFormOptions } from "utility/helper/endpoints";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";

import "./Map.styles.scss";

// Map Component
export function MyMapComponent({
  center,
  zoom,
  children,
  data,
  maps,
  onSetZoom,
  onSetCenter,
  map,
  onFilterChange,
}) {
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));
  const ref = useRef();
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterModal, setFilterModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState({});
  const isSuperAdmin = user?.role === "super_admin";

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const center = {
            lat: latitude,
            lng: longitude,
          };
          onSetCenter(center);
          new maps.Marker({
            position: center,
            map,
            icon: "/map-disabled.png",
          });
        },
        () => {
          console.log("Error in getting location");
        },
      );
    }
  };

  // Function to filter data

  useEffect(() => {
    if (searchString) {
      const filteredData = data.filter((item) => {
        const itemData = item?.site_name?.toLowerCase();
        return itemData?.indexOf(searchString?.toLowerCase()) > -1;
      });
      setFilteredData(filteredData);
    } else {
      setFilteredData([]);
    }
  }, [searchString]);

  const getMapFilterOptions = async () => {
    try {
      const response = await SC.getCall({
        url: `${getMapFormOptions}`,
      });
      const data = response?.data?.type;
      if (data) {
        setFilterOptions(data);
      }
    } catch (error) {}
  };

  // Filter Options
  useEffect(() => {
    getMapFilterOptions();
  }, []);
  const onChange = (e) => {
    const { value } = e.target;
    setSearchString(value);
  };

  const toggleModal = () => {
    onFilterChange(selectedFilter);
    setFilterModal((r) => !r);
  };

  const onCancelFilter = () => {
    setSelectedFilter({});
    onFilterChange({});
    setFilterModal((r) => !r);
  };

  return (
    <>
      <div ref={ref} id="mapNew" />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return child;
        }
      })}
      {/* {children} */}
      {/* Custom Zoom Controls */}
      <div className="mapNew__zoom-controls">
        <button
          className="mapNew__zoom-controls-btn"
          onClick={() => onSetZoom((z) => z + 1)}
        >
          +
        </button>
        <button
          className="mapNew__zoom-controls-btn"
          onClick={() => onSetZoom((z) => z - 1)}
        >
          -
        </button>
      </div>
      {/* Custom Geo Location Button */}
      <div className="mapNew__geo-location">
        <button
          className="mapNew__geo-location-btn"
          onClick={getCurrentLocation}
        >
          <img src="/gps.png" alt="geo-location" />
        </button>
      </div>
      {/* Search  */}
      <div
        className="mapNew__custom-search"
        style={{
          ...(!isSuperAdmin && { right: 120 }),
        }}
      >
        <div className="mapNew__custom-search-el">
          <input
            type="text"
            placeholder="Search"
            onChange={onChange}
            value={searchString}
          />
          <img src="/search.png" alt="search" />
        </div>
        {/* Search Results */}
        {filteredData.length ? (
          <div className="mapNew__custom-search-results">
            {filteredData.map((item, index) => (
              <div key={`${index}-${item?.site_name}`}>
                <div
                  onClick={() => {
                    const coordinates = {
                      lat: Number(item?.coordinates?.latitude),
                      lng: Number(item?.coordinates?.longitude),
                    };
                    onSetCenter(coordinates, item);
                    map.setCenter(coordinates);
                    setSearchString("");
                  }}
                  className="mapNew__custom-search-results-el"
                >
                  {item?.site_name}
                </div>
                {index !== filteredData.length - 1 && <hr />}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      {isSuperAdmin && (
        <div className="filter" onClick={toggleModal}>
          <img src="/filter.png" alt="filter" />
        </div>
      )}

      <div className="heatlist">
        <p>Status of Assets</p>
        <div className="heatlist-container">
          <div className="heatlist-item">
            <div />
            <p>
              {" "}
              {"<"}
              {" "}
              84%
            </p>
          </div>
          <div className="heatlist-item">
            <div style={{ backgroundColor: "#FFD301" }} />
            <p>84 - 95%</p>
          </div>
          <div className="heatlist-item">
            <div style={{ backgroundColor: "#59FD01" }} />
            <p>96 - 100%</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={filterModal}
        fade
        toggle={toggleModal}
        style={{ width: 400, height: 200 }}
      >
        <ModalHeader>Filter</ModalHeader>
        <ModalBody
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {!!filterOptions
            && Object.entries(filterOptions).map(([key, item], index) => (
              <div
                className="filter-item"
                key={index}
                style={{
                  backgroundColor:
                      selectedFilter.type === item.TYPE ? "#2a347b" : "white",
                }}
                onClick={() => setSelectedFilter({
                  type: item.TYPE,
                })}
              >
                <p
                  style={{
                    alignText: "center",
                    color:
                        selectedFilter.type === item.TYPE ? "white" : "black",
                  }}
                >
                  {item.NAME}
                  {" "}
                </p>
              </div>
            ))}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Done
          </Button>
          <Button color="secondary" onClick={onCancelFilter}>
            Clear
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

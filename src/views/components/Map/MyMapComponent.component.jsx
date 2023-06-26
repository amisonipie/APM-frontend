import React, { useState, useEffect, useRef } from "react";

import mapStyles from "./mapStyles.json";
import "./Map.styles.scss";

// Map Component
export function MyMapComponent({
  center, zoom, children, data,
}) {
  const ref = useRef();
  const [map, setMap] = useState();
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          styles: mapStyles,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          disableDefaultUI: true,
        }),
      );
    }
  }, [ref, map]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const center = {
            lat: latitude,
            lng: longitude,
          };
          map.setCenter(center);
          new window.google.maps.Marker({
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
        const itemData = item?.lab_name?.toLowerCase();
        return itemData?.indexOf(searchString?.toLowerCase()) > -1;
      });
      setFilteredData(filteredData);
    } else {
      setFilteredData([]);
    }
  }, [searchString]);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchString(value);
  };

  return (
    <>
      <div ref={ref} id="map" />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
      {/* Custom Zoom Controls */}
      <div className="map__zoom-controls">
        <button
          className="map__zoom-controls-btn"
          onClick={() => map.setZoom(map.getZoom() + 1)}
        >
          +
        </button>
        <button
          className="map__zoom-controls-btn"
          onClick={() => map.setZoom(map.getZoom() - 1)}
        >
          -
        </button>
      </div>
      {/* Custom Geo Location Button */}
      <div className="map__geo-location">
        <button className="map__geo-location-btn" onClick={getCurrentLocation}>
          <img src="/gps.png" alt="geo-location" />
        </button>
      </div>
      {/* Search  */}
      <div className="map__custom-search">
        <div className="map__custom-search-el">
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
          <div className="map__custom-search-results">
            {filteredData.map((item, index) => (
              <div key={`${index}-${item?.lab_name}`}>
                <div
                  onClick={() => {
                    const coordinates = {
                      lat: Number(item?.coordinates?.latitude),
                      lng: Number(item?.coordinates?.longitude),
                    };
                    map.setCenter(coordinates);
                    setSearchString("");
                  }}
                  className="map__custom-search-results-el"
                >
                  {item?.lab_name}
                </div>
                {index !== filteredData.length - 1 && <hr />}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

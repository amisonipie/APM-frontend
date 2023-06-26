import ReactDOMServer from "react-dom/server";
import React, { useState, useEffect } from "react";

// Marker Component
export function Marker(props) {
  const [marker, setMarker] = useState();
  const [infoWindow, setInfoWindow] = useState();

  const infoWindowMarkup = (
    <div className="info-window">
      {/* Header */}
      <div className="info-window__header">
        <img src="/hospital.png" alt="hospital" />
        <h4>{props?.infoWindow?.labName}</h4>
      </div>
      {/* Total Assets */}
      <div className="info-window__total">
        <h5>Total Assets</h5>
        <h4>{props?.infoWindow?.totalAssets}</h4>
      </div>
      {/* Group Assets */}
      <div className="info-window__groups">
        <div className="info-window__groups-card bg-blue">
          <div style={{ height: 10 }} />
          <h4>{props?.infoWindow?.medicalAssets}</h4>
          <h5>Medical</h5>
        </div>
        <div className="info-window__groups-card bg-purple">
          <div style={{ height: 10 }} />
          <h4>{props?.infoWindow?.nonMedicalAssets}</h4>
          <h5>Non-Medical</h5>
        </div>
        <div className="info-window__groups-card bg-green">
          <div style={{ height: 10 }} />
          <h4>{props?.infoWindow?.genericAssets}</h4>
          <h5>Generic</h5>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const content = ReactDOMServer.renderToString(infoWindowMarkup);
    if (!marker) {
      setMarker(new window.google.maps.Marker());
      setInfoWindow(
        new window.google.maps.InfoWindow({
          content,
        }),
      );
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker && infoWindow) {
      marker.setOptions({
        position: props?.position,
        map: props?.map,
        icon: "/map-disabled.png",
      });
      infoWindow.addListener("closeclick", () => {
        setInfoWindow(null);
        marker.setIcon("/map-disabled.png");
      });
      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map: props?.map,
          shouldFocus: false,
        });
        marker.setIcon("/map.png");
      });
    }
  }, [marker, infoWindow, props]);
  return null;
}

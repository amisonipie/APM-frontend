import CloseSvg from "assets/svg/x.svg";
import { useSelector } from "react-redux";
import useStateRef from "hooks/useStateRef";
import ReactDOMServer from "react-dom/server";
import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

// Marker Component
export const Marker = forwardRef((props, ref) => {
  const [marker, setMarker] = useState();
  const [infoWindow, setInfoWindow, infoWindowRef] = useStateRef();
  const { maps } = props;
  const closeRef = useRef();
  const [markerClickListner, setMarkerClickListner] = useState(null);
  const { user } = useSelector((state) => ({
    user: state?.auth?.login?.data,
  }));
  const isSuperAdmin = user?.role === "super_admin";

  const close = () => {
    infoWindowRef.current.isOpen = false;
    infoWindow.close();
    marker.setIcon("/map-disabled.png");
  };

  const open = () => {
    infoWindowRef.current.isOpen = true;
    infoWindowRef.current.open({
      anchor: marker,
      map: props?.map,
      shouldFocus: true,
    });
    marker.setIcon("/map.png");
  };

  useImperativeHandle(ref, () => ({
    closeInfoWindow: close,
    openInfoWindow: () => {
      maps.event.trigger(marker, "click");
    },
  }));

  const h5Style = {
    fontSize: 11,
  };

  const infoWindowMarkup = (
    <div className="info-window">
      {/* Header */}
      <div className="info-window__header">
        <img src="/hospital.png" alt="hospital" />
        <h4>{props?.infoWindow?.siteName}</h4>
        <img
          id={props?.infoWindow?._id}
          src={CloseSvg}
          alt="hospital"
          ref={closeRef}
          style={{ cursor: "pointer" }}
        />
      </div>
      {/* Total Assets */}
      <div className="info-window__total">
        <h5>Total Assets</h5>
        <h4>{props?.infoWindow?.totalAssets}</h4>
      </div>
      {/* Group Assets */}
      {/* <div className="info-window__groups">
        <div className="info-window__groups-card bg-blue">
          <div style={{ height: 10 }} />
          {isSuperAdmin && <h5 style={h5Style}>Medical</h5>}
          <h4>{props?.infoWindow?.medicalAssets}</h4>
          {!isSuperAdmin && <h5>Medical</h5>}
        </div>
        <div className="info-window__groups-card bg-purple">
          <div style={{ height: 10 }} />
          {isSuperAdmin ? (
            <>
              <h5 style={h5Style}>Non-Medical</h5>
              <h4>{props?.infoWindow?.nonMedicalGenaricAssets}</h4>
            </>
          ) : (
            <>
              <h4>{props?.infoWindow?.nonMedicalAssets}</h4>
              <h5>Non-Medical</h5>
            </>
          )}
        </div>
        <div className="info-window__groups-card bg-green">
          <div style={{ height: 10 }} />
          {isSuperAdmin ? (
            <>
              <h5 style={h5Style}>Defined Zones</h5>
              <h4>{props?.infoWindow?.definedZone || "N/A"}</h4>
            </>
          ) : (
            <>
              <h4>{props?.infoWindow?.genericAssets}</h4>
              <h5>Generic</h5>
            </>
          )}
        </div>
      </div> */}

      <div className="info-window__groups">
        <div className="info-window__groups-card bg-green">
          <div style={{ height: 10 }} />
          <h5>Working</h5>
          <h4>{props?.infoWindow?.WorkingInventories}</h4>
        </div>
        <div className="info-window__groups-card bg-red">
          <div style={{ height: 10 }} />
          <h5>Down for Maintainance</h5>
          <h4>{props?.infoWindow?.NotWorkingInventories}</h4>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const content = ReactDOMServer.renderToString(infoWindowMarkup);
    if (!maps) return;
    if (!marker) {
      setMarker(new maps.Marker());
      setInfoWindow(
        new maps.InfoWindow({
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
  }, [marker, maps]);

  useEffect(() => {
    if (marker && infoWindow && !markerClickListner && props?.map) {
      marker.setOptions({
        position: props?.position,
        map: props?.map,
        icon: "/map-disabled.png",
      });

      const mark = marker.addListener("click", () => {
        infoWindowRef.current.isOpen ? close() : open();

        if (!infoWindowRef.current.closeListener) {
          setTimeout(() => {
            const element = document.getElementById(props?.infoWindow?._id);
            infoWindowRef.current.closeListener = element?.addEventListener(
              "click",
              close,
            );
          }, 1000);
        }
      });
      setMarkerClickListner(mark);
    }
  }, [marker, infoWindow, props?.map, markerClickListner]);
  return null;
});

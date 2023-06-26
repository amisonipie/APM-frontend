import { env } from "utility/config";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";

import mapStyles from "./mapStyles.json";
import { Marker } from "./Marker.component";
import { MyMapComponent } from "./MyMapComponent.component";

import "./Map.styles.scss";

let allMarkerRefs = {};
// Main wrapper
export function Map({ zoom, data = [], onFilterChange }) {
  const [maps, setMaps] = useState(null);
  const [map, setMap] = useState(null);
  const [mapZoom, setMapZoom] = useState(zoom);
  const [center, setCenter] = useState({
    lat: Number(data[0]?.coordinates?.latitude) || 0,
    lng: Number(data[0]?.coordinates?.longitude) || 0,
  });

  const mapData = data.filter(
    (location) => Number(location?.coordinates?.latitude)
      && Number(location?.coordinates?.longitude),
  );

  const handleApiLoaded = ({ map, maps }) => {
    setMaps(maps);
    setMap(map);
  };

  useEffect(() => {
    if (!mapData?.length) {
      getCenter();
    }
  }, [mapData]);

  const getCenter = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({
            lat: latitude,
            lng: longitude,
          });
        },
        () => {
          console.log("Error in getting location");
        },
      );
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: env.GOOGLE_MAPS_JAVASCRIPT_API }}
        center={center}
        zoom={mapZoom}
        onGoogleApiLoaded={handleApiLoaded}
        heatmapLibrary
        options={{
          styles: [{ stylers: mapStyles }],
        }}
      >
        <HeatMap maps={maps} map={map} mapData={mapData} />
        {mapData?.map((location, index) => (
          <Marker
            ref={(ref) => {
              allMarkerRefs = { ...allMarkerRefs, [location._id]: ref };
            }}
            maps={maps}
            map={map}
            key={index}
            location={location}
            position={{
              lat: Number(location?.coordinates?.latitude),
              lng: Number(location?.coordinates?.longitude),
            }}
            infoWindow={{
              siteName: location?.site_name,
              totalAssets: location?.InventoriesCount,
              medicalAssets: location?.MedicalInventoriesCount,
              nonMedicalGenaricAssets:
                  parseInt(location?.NonmedicalInventoriesCount)
                  + parseInt(location?.GenericInventoriesCount),
              nonMedicalAssets: parseInt(
                location?.NonmedicalInventoriesCount,
              ),
              genericAssets: location?.GenericInventoriesCount,
              _id: location?._id,
              WorkingInventories: location?.WorkingInventories,
              NotWorkingInventories: location?.NotWorkingInventories,
            }}
          />
        ))}
      </GoogleMapReact>
      <MyMapComponent
        center={center}
        zoom={mapZoom}
        data={data}
        maps={maps}
        onSetZoom={setMapZoom}
        onSetCenter={(coordinates, item) => {
          setCenter(coordinates);
          const ref = allMarkerRefs[item?._id];
          if (ref) {
            ref.openInfoWindow();
          }
        }}
        map={map}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}

// low: rgb(255, 10, 1)  < 84
// medium: rgb(255, 211, 1)  84 - 95
// high: rgb(89, 253, 1) 96 - 100

const colors = {
  low: ["rgba(255, 10, 1, 0)", "rgba(255, 10, 1, 1)"],
  medium: ["rgba(255, 211, 1, 0)", "rgba(255, 211, 1, 1)"],
  high: ["rgba(89, 253, 1, 0)", "rgba(89, 253, 1, 1)"],
};

function HeatMap({ map, maps, mapData }) {
  const [heatap, setHeatmap] = useState(null);

  useEffect(() => {
    if (map && mapData && !heatap) {
      const getData = (check) => mapData
        .filter(({ WorkingInventoriesPercentage }) => check(WorkingInventoriesPercentage))
        .map(({ coordinates }) => ({
          location: new maps.LatLng(
            Number(coordinates?.latitude),
            Number(coordinates?.longitude),
          ),
        }));

      const low = getData(
        (WorkingInventoriesPercentage) => WorkingInventoriesPercentage < 84,
      );

      const medium = getData(
        (WorkingInventoriesPercentage) => WorkingInventoriesPercentage >= 84
          && WorkingInventoriesPercentage <= 95,
      );

      const high = getData(
        (WorkingInventoriesPercentage) => WorkingInventoriesPercentage > 95,
      );

      const computedData = {
        low,
        medium,
        high,
      };

      ["low", "medium", "high"].forEach((heat) => {
        if (computedData[heat].length) {
          let points = computedData[heat];
          const options = {
            radius: 80,
            opacity: 1,
          };

          if (computedData[heat].length === 1) {
            points = points.map((p) => {
              p.weight = 1;
              return p;
            });
          }

          const heatmap = new maps.visualization.HeatmapLayer({
            data: points,
            ...options,
          });
          heatmap.setMap(map);
          heatmap.set(
            "gradient",
            heatmap.get("gradient") ? null : colors[heat],
          );
        }
      });
      setHeatmap(true);
    }
  }, [heatap, map, mapData, maps?.LatLng, maps?.visualization?.HeatmapLayer]);

  return null;
}

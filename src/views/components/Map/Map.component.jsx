import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Spinner from "views/components/@vuexy/spinner/Loading-spinner";

import { Marker } from "./Marker.component";
import { MyMapComponent } from "./MyMapComponent.component";

import "./Map.styles.scss";

const render = (status) => {
  if (status === Status.LOADING) return <Spinner />;
  if (status === Status.FAILURE) {
    return (
      <h3>
        {status}
        {" "}
        ...
      </h3>
    );
  }
  return null;
};

// Main wrapper
export function Map({ zoom, data }) {
  const center = {
    lat: Number(data[0]?.coordinates?.latitude),
    lng: Number(data[0]?.coordinates?.longitude),
  };
  return (
    <Wrapper apiKey="AIzaSyCRcns7naWK7nULflTHowGPkLIsUbPLCCk" render={render}>
      <MyMapComponent center={center} zoom={zoom} data={data}>
        {data?.map((location, index) => (
          <Marker
            key={`${index}-${location?.lab_name}`}
            position={{
              lat: Number(location?.coordinates?.latitude),
              lng: Number(location?.coordinates?.longitude),
            }}
            infoWindow={{
              labName: location?.lab_name,
              totalAssets: location?.InventoriesCount,
              medicalAssets: location?.MedicalInventoriesCount,
              nonMedicalAssets: location?.NonmedicalInventoriesCount,
              genericAssets: location?.GenericInventoriesCount,
            }}
          />
        ))}
      </MyMapComponent>
    </Wrapper>
  );
}

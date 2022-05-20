import React from 'react';
import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import { IDeliveryMapItem } from '@/src/models/delivery-map';

function Router({ points }: { points: IDeliveryMapItem | undefined }) {
  if (!points) return null;
  const { loadingPoint, unloadingPoint } = points;

  const createRoutingMachineLayer = () => {
    const instance = L.Routing.control({
      waypoints: [L.latLng(loadingPoint.lat, loadingPoint.lon), L.latLng(unloadingPoint.lat, unloadingPoint.lon)],
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 1,
      },
      showAlternatives: false,
    });
    return instance;
  };
  const Router = createControlComponent(createRoutingMachineLayer);
  return <Router />;
}

export default Router;

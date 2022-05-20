import { IOption } from '@/src/models/form-types/form-types';

export interface IPoint {
  lat: number;
  lon: number;
  name: string;
}
export interface IDeliveryMapItem {
  key?: number;
  id?: number;
  loadingPoint: IPoint;
  unloadingPoint: IPoint;
  payloadName: string;
}

export const deliveryMapMockData: IDeliveryMapItem[] = [
  {
    key: 1,
    id: 1,
    loadingPoint: { lat: 51.6755, lon: 39.20888, name: 'Voronez' },
    unloadingPoint: { lat: 45.0448, lon: 38.976, name: 'Krasnodar' },
    payloadName: 'Какой то товар',
  },
];

export function deliveryItemRaw(): IDeliveryMapItem {
  return {
    loadingPoint: { lat: 0, lon: 0, name: '' },
    unloadingPoint: { lat: 0, lon: 0, name: '' },
    payloadName: '',
  };
}

export const deliveryPoints: IOption[] = [
  {
    id: 1,
    title: 'Moscow',
    extra: {
      lat: 55.7522,
      lon: 37.6156,
    },
  },
  {
    id: 2,
    title: 'Krasnodar',
    extra: {
      lat: 45.0448,
      lon: 38.976,
    },
  },
  {
    id: 3,
    title: 'Voronez',
    extra: {
      lat: 51.6755,
      lon: 39.20888,
    },
  },
];

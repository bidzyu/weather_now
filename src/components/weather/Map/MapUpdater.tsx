import L from 'leaflet';
import React from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const MapUpdater: React.FC<{ center: [number, number] }> = ({
  center,
}) => {
  const map = useMap();

  React.useEffect(() => {
    const bounds = L.latLngBounds(
      L.latLng(-60, -180), // Юго-западный угол
      L.latLng(85, 180) // Северо-восточный угол
    );
    map.setMaxBounds(bounds);
    map.setView(center, 9);
    map.setMaxZoom(10);
    map.setMinZoom(3);

    const handleDrag = () => {
      map.panInsideBounds(bounds);
    };

    const zoomControl = map.zoomControl; // Получаем контроль масштаба
    if (zoomControl) {
      map.removeControl(zoomControl); // Удаляем контроль масштаба
    }

    map.dragging.disable();

    // Отключение панели навигации
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();

    // map.on('drag', handleDrag);

    // return () => {
    //   map.off('drag', handleDrag);
    // };
  }, [center, map]);

  return null; // Этот компонент ничего не рендерит
};

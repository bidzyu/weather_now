import { MapContainer, TileLayer } from 'react-leaflet';
import { MapUpdater } from './MapUpdater';
import { MapMarker } from './MapMarker';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  coordinates: [number, number];
  center: [number, number];
}

export const MapComponent: React.FC<MapComponentProps> = ({
  center,
  coordinates,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '200px', width: '100%' }}
    >
      {/* <TileLayer
        url="https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale=1&lang=ru_RU"
        attribution="Map data © Yandex"
      /> */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapUpdater center={center} />
      <MapMarker coordinates={coordinates} />
    </MapContainer>
  );
};

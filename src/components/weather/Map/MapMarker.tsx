import { Marker, Popup } from 'react-leaflet';

interface MapMarkerProps {
  coordinates: [number, number];
}

export const MapMarker: React.FC<MapMarkerProps> = ({ coordinates }) => {
  return (
    <>
      {coordinates[0] === 0 && coordinates[1] === 0 ? null : (
        <Marker position={coordinates}>
          {
            <Popup>
              lon: {coordinates[1]}, lat: {coordinates[0]}
            </Popup>
          }
        </Marker>
      )}
    </>
  );
};

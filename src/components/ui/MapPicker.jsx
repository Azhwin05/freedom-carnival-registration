import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useFormContext } from 'react-hook-form';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './MapPicker.module.css';

// Fix for default marker icon missing in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ setPosition, position }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const MapPicker = ({ name, label }) => {
  const { setValue, watch } = useFormContext();
  const [position, setPosition] = useState(null);
  const currentVal = watch(name);

  useEffect(() => {
    if (currentVal && currentVal.lat && currentVal.lng) {
        setPosition(currentVal);
    }
  }, [currentVal]);

  const handleSetPosition = (pos) => {
      setPosition(pos);
      setValue(name, { lat: pos.lat, lng: pos.lng });
  };

  return (
    <div className={styles.mapContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.mapWrapper}>
        <MapContainer center={[13.0827, 80.2707]} zoom={13} scrollWheelZoom={false} style={{ height: '300px', width: '100%' }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={handleSetPosition} />
        </MapContainer>
        <div className={styles.instruction}>Tap on the map to set location</div>
      </div>
      <input type="hidden" name={name} /> {/* Hidden input for validation if needed, or rely on RHF state */}
    </div>
  );
};

export default MapPicker;

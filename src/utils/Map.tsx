import { MapContainer, TileLayer, useMapEvent, Marker } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css'
import coordinateDTO  from './coordinatesDTO.model';
import { useState } from 'react';


export default function Map(props: mapProps){
    const [coordinates, setCoordinates] = useState<coordinateDTO[]>([])

    const defaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [16, 37]
    });
    L.Marker.prototype.options.icon = defaultIcon;
    return (
        <MapContainer 
            center={[6.440565177204682, 3.4812925785824436]} zoom={14}
            style={ {height: props.height} }    
        >
            <TileLayer attribution='MovieMax'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <MapClick setCoordinates={ coordinates=> {
                setCoordinates([coordinates]);
            }} />
            { coordinates.map( (coordinates, index)=> <Marker key={index}
            position={[coordinates.lat, coordinates.lng]} /> )}
            
        </MapContainer>
    );
}

interface mapProps {
    height: string;
}

Map.defaultProps = {
    height: '400px'
}


function MapClick(props: mapClickProps) {
    useMapEvent('click', eventArgs => {
        props.setCoordinates({ lat: eventArgs.latlng.lat, lng: eventArgs.latlng.lng});
    })
    return null;
}

interface mapClickProps{
    setCoordinates(coordinates: coordinateDTO): void;
}
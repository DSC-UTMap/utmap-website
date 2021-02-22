import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function Map() {
    const position = [43.549942349553365, -79.6627086348402]; // UTM coords

    return (
        <MapContainer 
            center={position} 
            zoom={17} 
            style={{height : '53rem'}}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default Map;
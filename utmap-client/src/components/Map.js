import React, { useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import buildingsData from './data/UTMbuildings.json';
import EventList from './EventList';
import { Dialog } from '@material-ui/core';


function Map({events}) {
    const position = [43.549942349553365, -79.6627086348402]; // UTM coords
    const [openPopup, setOpenPopup] = useState(false);
    const [eventList, setEventList] = useState(events);

    const handleOpenPopup = () => {
        setOpenPopup(true);
      };

    const handleClosePopup = () => {
        setOpenPopup(false);
    }
    
    const filterEventsByBuilding = (buildingName) => {
        return (
            events.filter(event =>
                event.location === buildingName
            )
        )
    }
    
    const onEachBuilding = (building, layer) => {
        const buildingName = building.properties.Building;
        layer.on({
            click: ()=>{
                setEventList(filterEventsByBuilding(buildingName));
                handleOpenPopup();
            }    
        })
    }

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
            <GeoJSON data={buildingsData.features} onEachFeature={onEachBuilding}/>
            <Dialog open={openPopup} onClose={handleClosePopup}>
                <EventList eventList={eventList}/>
            </Dialog>
            
        </MapContainer>
    )
}

export default Map;
import React, { useState, useEffect, forceUpdate } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import buildingsData from './data/UTMbuildings.json';
import EventList from './EventList';
import { Dialog } from '@material-ui/core';


function Map({events}) {
    const position = [43.549942349553365, -79.6627086348402]; // UTM coords
    const [openPopup, setOpenPopup] = useState(false);
    const [eventList, setEventList] = useState(events);
    //console.log('events: ' + events)
    //console.log('eventList: ' + eventList)

   // console.log("outside useEffect Map")
   useEffect(() => {
       console.log('useEffect: ' + events)
       setEventList(events);
   }, [events]);

    const handleOpenPopup = () => {
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    }
    
    const filterEventsByBuilding = (buildingName) => {
        console.log('events: ' + events)
        const filteredEvents = events.filter(event =>
            event.location === buildingName
        )
        console.log('filteredEvents: ' + filteredEvents)
        //setEventList(filteredEvents);
    }

    const onEachBuilding = (building, layer) => {
        const buildingName = building.properties.Building;
        //console.log('eventList: ' + eventList)
        //console.log(eventList)
        //console.log(events)
        //setEventList(events);
        //console.log(building)
        //console.log(eventList)
        layer.on({
            click: ()=>{
                //setEventList(events)
                //console.log('eventList' + ':' + eventList)
                //console.log('events: ' + events)
                //refreshEvents();
                //setEventList(events);
                //console.log('after' + buildingName + ':' + eventList)
                filterEventsByBuilding(buildingName);
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
import React, {useState} from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import buildingsData from './data/UTMbuildings.json';
//import mapData from "./data/countries.json"
import { map } from 'leaflet';
import { Popup } from 'leaflet';
import Tooltip from 'leaflet';
import EventList from './EventList';
import exampleEvents from './data/EventData';//Temporary dummy data
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { Dialog } from '@material-ui/core';


const CustomReactPopup = () => {
    return (
        <EventList eventList={exampleEvents}/>
    );
  };

function Map() {
    const position = [43.549942349553365, -79.6627086348402]; // UTM coords
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    //console.log(mapData)

    const onEachBuilding = (building, layer) => {
        const buildingName = building.properties.Building;
        //var customPopup = "Mozilla Toronto Offices<br/><script src='EventList.js'></script>>"
        
        layer.on({
            click: (event)=>{
                console.log(layer.feature.properties.Building);
                return (
                    <p> find </p>
                );
            }    
    })
        
        //console.log(events);
    }

    return (
        <MapContainer 
            center={position} 
            zoom={17} 
            style={{height : '53rem'}}
        >
            
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <GeoJSON data={buildingsData.features} onEachFeature={onEachBuilding}/>
            
        </MapContainer>
    )
}

export default Map;
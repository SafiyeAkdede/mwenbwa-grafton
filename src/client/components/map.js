/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/button-has-type */
import React from "react";
import {Map, TileLayer, ScaleControl} from "react-leaflet";
import MBCluster from "./mwenbwa-cluster";
import "../../../node_modules/leaflet/dist/leaflet.css";

export default function MapLeaflet({center}) {
    return (
        <Map
            center={center ? center : [50.64, 5.57]}
            zoom={17}
            maxZoom={19}
            minZoom={16}>
            <ScaleControl position={"bottomleft"} imperial={false} />

            <TileLayer
                url={
                    "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                }
                maxZoom={20}
                attribution={
                    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                }
            />
            <MBCluster />
        </Map>
    );
}

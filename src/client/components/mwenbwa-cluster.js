/* eslint-disable react/button-has-type */

import React, {useState, useEffect, useContext} from "react";
import {useLeaflet} from "react-leaflet";
import UserContext from "./mwenbwa-context";

import {toast} from "react-toastify";

import MarkerClusterGroup from "react-leaflet-markercluster";
import "../../../node_modules/react-leaflet-markercluster/dist/styles.min.css";

import MBMarker from "./mwenbwa-marker";

const MBCluster = () => {
    const leafContext = useLeaflet();
    const UserCont = useContext(UserContext);
    const [forest, plantTree] = useState([]);

    const fetchTree = bounds => {
        fetch(`trees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bounds),
        })
            .then(res => {
                res.json().then(value => {
                    plantTree(value);
                });
            })
            .catch(err => {
                toast.warning(`Problem with the connection !${err.toString()}`);
            });
    };

    useEffect(() => {
        fetchTree(leafContext.map.getBounds());
        leafContext.map.addEventListener("moveend", () => {
            fetchTree(leafContext.map.getBounds());
        });

        return () => {
            leafContext.map.removeEventListener("moveend");
            UserCont.EventEmitter.removeListener("user.connected");
        };
    }, []);

    return (
        <React.Fragment>
            <MarkerClusterGroup
                chunkedLoading={true}
                zoomToBoundsOnClick={true}
                maxClusterRadius={60}
                disableClusteringAtZoom={17}
                removeOutsideVisibleBounds={true}>
                {/* eslint-disable-next-line no-extra-parens */}
                {forest.length > 0 ? (
                    forest.map(tree => <MBMarker key={tree._id} tree={tree} />)
                ) : (
                    <></>
                )}
            </MarkerClusterGroup>
        </React.Fragment>
    );
};

export default MBCluster;

import React, { Component } from "react";
import ReactMapboxGl, { Layer } from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const containerStyle = {
  height: "70vh"
};


const Map = ReactMapboxGl({
  accessToken:'pk.eyJ1IjoibWFkZWxlaW5lam9oYW5zb24iLCJhIjoiY2lzczduYzJ4MDZrODJucGh0Mm1xbmVxNCJ9.i7q4iT8FFgh_y5v4we5UhQ'
});

class MapLock extends Component {

    render () {
        return (
            <Map
                style='mapbox://styles/mapbox/light-v9'
                containerStyle={containerStyle} 
                center={[151.2056, -33.8572]}
                zoom={[15]}
                dragRotate={false}
            >

            <DrawControl />

            </Map>
        );
    }
}

export default MapLock;
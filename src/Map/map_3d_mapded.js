import React, { Component } from "react";
import ReactMapboxGl, { Layer , GeoJSONLayer, ScaleControl} from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import geojson from "./GeoJSON/minicity2d.js";
import geojsonMatch from "./GeoJSON/minicity3d.js";
import 'bootstrap/dist/css/bootstrap.css';

const containerStyle = {
  height: "70vh"
  
};

geojson.features.map(
  (feature)=>{
    feature.properties.height = parseInt(feature.properties.height)
    feature.properties.base_height = parseInt(feature.properties.base_height)
    return feature
    })

geojsonMatch.features.map(
  (feature)=>{
    feature.properties.height = parseInt(feature.properties.height)
    feature.properties.base_height = parseInt(feature.properties.base_height)
    return feature
    })

var filteredGeojson = {"type": "FeatureCollection", "features": [{"type":"Feature","geometry":{ "type": "Polygon","coordinates": [[[151.201933324063,-33.8807377119406],[151.201824674063,-33.8803351319406],[151.201845209063,-33.8801286419406],[151.201383704063,-33.8791899719406],[151.202148404063,-33.8792981119406],[151.202192104063,-33.8793318319406],[151.202662274063,-33.8806984919406],[151.202639604063,-33.8807408519406],[151.202188684063,-33.8809207019406],[151.202048444063,-33.8809766419406],[151.201933324063,-33.8807377119406]]]},"properties":{"height":45.0,"base_height":0.0,"colour":"#78A4D2","layer":"Building Specs","tag":"<b>Height:</b> <br>45m<br><b>FSR:</b><br>11:1<br><b>Tower Floor Area:</b> <br> 1395m²<br><b>Total Floor Area:</b> <br> 124576m²"}}]};


const Map = ReactMapboxGl({
  accessToken:'pk.eyJ1IjoibWFkZWxlaW5lam9oYW5zb24iLCJhIjoiY2lzczduYzJ4MDZrODJucGh0Mm1xbmVxNCJ9.i7q4iT8FFgh_y5v4we5UhQ'
});

class Map3D extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {filter: filteredGeojson};
    this.state = {toggle: false};
  }

    componentWillMount() {
     this.setState({ zoom: [15], center: [151.2049, -33.8687], pitch: 45, bearing: -17.6 });
  }

  _onClickMap = (map, evt) => {

    if (this.state.toggle == true) {

    console.log(filteredGeojson)
    var ID = map.queryRenderedFeatures(evt.point, { layer: ["LOADED_GEOJSON-fill-extrusion"]});
    console.log(ID[0].properties.id)

    var ID_Match = (ID[0].properties.id)
    var filteredFeature = geojsonMatch.features.map((feature)=>{
      if (feature.properties.id===ID_Match){
        console.log('it matches')
        return feature
      }else{
        console.log('it doesnt match')
        return 
      }
    })


    filteredFeature = filteredFeature.filter(function(n){ return n !== undefined })
    console.log(filteredFeature)
    filteredGeojson = {"type": "FeatureCollection", "features": filteredFeature};

    console.log("this is it", filteredGeojson);
    this.setState({filter: filteredGeojson})
    console.log(this.state.filter)
    
     this.setState({toggle: false})
    }
    else{
    console.log("cant clicky click cos button is falsy false")
    }
  }

  handleChange(e){
    this.setState({filter: e.filteredGeojson})
  }

  handleClick() {
  this.setState({toggle: true});
  }

    render () {
        console.log(geojson)
        console.log(this.state.filter)
        return (
            <div>
            <Map
                style='mapbox://styles/mapbox/streets-v9'
                containerStyle={containerStyle} 
                center={this.state.center}
                zoom={this.state.zoom}
                pitch={this.state.pitch}
                bearing={this.state.bearing}
                onClick={this._onClickMap}
                // onChange={this.handleChange}

            >
            
                <Layer
                  id="3d-buildings"
                  sourceId="composite"
                  layerOptions={{
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15
                  }}
                  paint={{
                    'fill-extrusion-color': '#aaa',
                    'fill-extrusion-height': {
                        'type': 'identity',
                        'property': 'height'
                    },
                    'fill-extrusion-base': {
                        'type': 'identity',
                        'property': 'min_height'
                    }
                  }}
                /> 
                <DrawControl 
                displayControlsDefault={false}
                controls={{
                "polygon" : true,
                "trash" : true


                }}
                
                />
                <ScaleControl position='bottomLeft'/>
                <GeoJSONLayer
                  id="LOADED_GEOJSON"
                  data={geojson}
                  fillExtrusionPaint={{
                    'fill-extrusion-color': {
                      'type': 'identity',
                      'property': 'colour'
                    },
                    'fill-extrusion-height': {
                        'type': 'identity',
                        'property': 'height'
                    },
                    'fill-extrusion-base': {
                        'type': 'identity',
                        'property': 'base_height'
                    }
                  }}
                />
                <GeoJSONLayer
                id="filtered_Geojson"
                data={this.state.filter}
                fillExtrusionPaint={{
                'fill-extrusion-color': {
                      'type': 'identity',
                      'property': 'colour'
                    },
                    'fill-extrusion-height': {
                        'type': 'identity',
                        'property': 'height'
                    },
                    'fill-extrusion-base': {
                        'type': 'identity',
                        'property': 'base_height'
                    },
                    'fill-extrusion-opacity' : .6
                  }}
                />
            </Map>


            <button onClick={this.handleClick.bind(this)}>
            {this.state.toggle ? 'ON' : 'OFF'}
            </button>

            </div>
        );
    }
}

export default Map3D;
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ReactMapboxGl, { Layer , GeoJSONLayer, ScaleControl} from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import geojson from "./GeoJSON/minicity2d.js";
import geojsonMatch from "./GeoJSON/minicity3d.js";
import SiteInfo from './../Functions/siteInfo.js'

const containerStyle = {
  height: "70vh"
  
};
//makes string numbers in geojson footprint
geojson.features.map(
  (feature)=>{
    feature.properties.height = parseInt(feature.properties.height)
    feature.properties.base_height = parseInt(feature.properties.base_height)
    return feature
    })
//makes string numbers in geojson with extruded buildings
geojsonMatch.features.map(
  (feature)=>{
    feature.properties.height = parseInt(feature.properties.height)
    feature.properties.base_height = parseInt(feature.properties.base_height)
    return feature
    })
//initial extuded buildings geojson loaded in map 
var filteredGeojson = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{ 
  "type": "Polygon","coordinates": [[[151.205292222514,-33.8717258167423],[151.205298900679,-33.8717832668887],
  [151.205307631595,-33.8718573721096],[151.205527141532,-33.8718452797009],[151.205513803131,-33.871713060999],
  [151.205292222514,-33.8717258167423]]]},"properties":{"id":"0","height":20,"base_height":0,"colour":"#5d6eb6"}}]};


const Map = ReactMapboxGl({
  accessToken:'pk.eyJ1IjoibWFkZWxlaW5lam9oYW5zb24iLCJhIjoiY2lzczduYzJ4MDZrODJucGh0Mm1xbmVxNCJ9.i7q4iT8FFgh_y5v4we5UhQ'
});


//magik happens here
class Map3D extends Component {
//setting the initial state on load for the extruded buildings geojson and button state
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {filter: filteredGeojson, toggle: true, opacity:0.5};
    this.opacityChange = this.opacityChange.bind(this);
  }
//sets map position so map doesnt refresh
    componentWillMount() {
     this.setState({ zoom: [15], center: [151.2049, -33.8687], pitch: 45, bearing: -17.6 , string: "hahahahahah"});
  }

//FUNCTION THAT HAPPENS WHEN YOU CLICK ON THE MAP
  _onClickMap = (map, evt) => {
//if the button toggle state is true it does this
    if (this.state.toggle === true) {
//what has just been clicked?
    var ID = map.queryRenderedFeatures(evt.point, { layer: ["LOADED_GEOJSON-fill-extrusion"]});
    var ID_Match = (ID[0].properties.id)
//finds the matching ID in the building extrusion geojson
    var filteredFeature = geojsonMatch.features.map((feature)=>{
      if (feature.properties.id===ID_Match){
        console.log('it matches')
        return feature
      }else{
        console.log('it doesnt match')
        return 
      }
    })

    filteredFeature = filteredFeature.filter(function(n){ return n !== undefined });
    //makes the extracted matching features into a geojson
    filteredGeojson = {"type": "FeatureCollection", "features": filteredFeature};
    //swaps old geojson for new
    this.setState({filter: filteredGeojson})
    //toggle is set to false so the area is unclickable
    this.setState({toggle: false})
    return
    }
    else{
    //if button is false it wont do anything
    console.log("cant clicky click cos button is falsy false")
    return
    }
  }


  handleChange(e){
    this.setState({filter: e.filteredGeojson})
  }
  //when the button is clicked, the toggle state is set to true
  handleClick() {
  this.setState({toggle: true});
  }

  opacityChange() {
    console.log(this.input.value);
    this.setState({opacity:this.input.value})
  }

    render () {
        var opacity = parseFloat(this.state.opacity)
        console.log(opacity)
        return (
            <div>
            <Row id='mapcontainer' className="show-grid">
            <Col md={9}> 
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
                    'fill-extrusion-opacity' : opacity
                  }}
                />
            </Map>
            </Col>
            <Col md={2}> 
            <h3>User Controls</h3>
            <button onClick={this.handleClick.bind(this)}>
            {this.state.toggle ? 'SELECT SITE' : 'SELECT NEW SITE'}
            </button>
            <br></br>
            <br></br>
            <p>Max envelope transparency slider</p>
            {opacity}
            <input 
            style={{ width: 250 }}
            id="typeinp" 
            type="range" 
            defaultValue="0.5"
            min="0" max="1"  
            step="0.01"
            onChange={this.opacityChange.bind(this)}
            ref={(input) => this.input = input}
            />
            <br></br>
            <p>Building footprint extrusion slider </p>
            <br></br>
            <input 
            style={{ width: 250 }}
            id="typeinp" 
            type="range" 
            defaultValue="0"
            min="0" max="1" //height from filteredgeojson? 
            step="3"
            // onChange={this.opacityChange.bind(this)}
            // ref={(input) => this.input = input}
            />
            <br></br>
            <p>this is a state:</p> {this.state.string}
            </Col>
            </Row>
            <Row id='controlcontainer'>
            <SiteInfo stuff={this.state.string}
            />
            
            </Row>

            </div>
        );
    }
}

export default Map3D;
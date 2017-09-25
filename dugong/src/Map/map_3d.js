import React, { Component } from "react";
import ReactMapboxGl, { Layer , GeoJSONLayer, ScaleControl} from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { CirclePicker } from 'react-color';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import geojson from "./GeoJSON/minicity2d.js";
import geojsonMatch from "./GeoJSON/minicity3d.js";
import SiteInfo from './../Functions/siteInfo.js';
//import area from './../turf_area.min.js';
import { area } from '@turf/turf';
import GitHub from 'github-api';

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
    this.state = {filter: filteredGeojson, toggle: true, gist: "hello", feaso_HOB: " ", feaso_level: " ", feaso_area: " ", feaso_areabuilding: " ", feaso_FSR: " ", draw: filteredGeojson, draw_colour:"#5d6eb6", draw_height: 0, draw_baseHeight: 0, opacity:0.5, siteInfo_ID: " ", siteInfo_height: " ", siteInfo_baseHeight: " ", siteInfo_colour: " "};
    this.opacityChange = this.opacityChange.bind(this);
    this.extrudeChange = this.extrudeChange.bind(this);
    this.extrudeBaseChange = this.extrudeBaseChange.bind(this);
    this.colourChange = this.colourChange.bind(this);
    this.handleGist = this.handleGist.bind(this);
  }
//sets map position so map doesnt refresh
    componentWillMount() {
     this.setState({ zoom: [15], center: [151.2049, -33.8687], pitch: 45, bearing: -17.6 });
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
    var FG_ID1 = filteredGeojson.features[0].properties.id;
    var FG_height1 = filteredGeojson.features[0].properties.height;
    var FG_Baseheight1 = filteredGeojson.features[0].properties.base_height;
    var FG_height2 = filteredGeojson.features[1].properties.height;
    var FG_Baseheight2 = filteredGeojson.features[1].properties.base_height;
    var FG_totalHeight = (FG_height2-FG_Baseheight2)+FG_height1;
    var FG_colour1 = filteredGeojson.features[0].properties.colour;
    console.log(FG_totalHeight)
    //swaps old geojson for new
    this.setState({filter: filteredGeojson, freassiteInfo_ID: FG_ID1, siteInfo_height: FG_totalHeight, siteInfo_baseHeight: FG_Baseheight1, siteInfo_colour: FG_colour1})
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
    this.setState({filter: filteredGeojson})
  }
  //when the button is clicked, the toggle state is set to true
  handleClick() {
  this.setState({toggle: true});
  }

  handleExtrude(e){
    const draw_geojson = this.drawControl.draw.getSelected();
    this.setState({draw: draw_geojson})
  }

  opacityChange(event) {
    this.setState({opacity:event.target.value})
  }

  extrudeChange(event){
    this.setState({draw_height:event.target.value})
    var levels = event.target.value/3;
    var draw_area = area(this.state.draw);
    var rounded_area = Math.round(draw_area*100)/100;
    var level_area = rounded_area*levels;
    this.setState({draw_height:event.target.value, feaso_level: levels, feaso_areabuilding:level_area+"m2", feaso_area:rounded_area+"m2"})
  }

  extrudeBaseChange(event){
    this.setState({draw_baseHeight:event.target.value})
  }

  colourChange = (color) => {
    this.setState({ draw_colour: color.hex });
  };

  handleGist(e){
var gh = new GitHub({
   username: 'madeleinejohanson',
   password: 'Arag0rn111'
   /* also acceptable:
      token: 'MY_OAUTH_TOKEN'
    */
});
var gist = gh.getGist(); 
// not a gist yet
var retrievedGist = "global af"
var self = this;
gist.create({
   public: true,
   description: 'Dugong',
   files: {
      "mybuiding.geojson": {
         content: JSON.stringify(this.state.draw)
      }
   }
}).then(function({data}) {
   // Promises!
   var createdGist = data;
   return gist.read();

}).then(function({data}) {
   retrievedGist = data;
   retrievedGist = String(retrievedGist.html_url)
   console.log(retrievedGist)
   self.setState({ gist: retrievedGist });
});
}

    render () {
        var opacity = parseFloat(this.state.opacity)
        var draw = String(this.state.draw)
        var draw_height = parseFloat(this.state.draw_height)
        var draw_baseHeight = parseFloat(this.state.draw_baseHeight)
        var draw_colour = String(this.state.draw_colour)
        var gist_url = String(this.state.gist)
        return (
            <div>
            <Row id='mapcontainer' className="show-grid">
           <Col xs={12} md={9} > 
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
                <DrawControl 
                displayControlsDefault={false}
                ref={(drawControl) => { this.drawControl = drawControl; }}
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
                <GeoJSONLayer
                id="draw_layer"
                data={this.state.draw}
                fillExtrusionPaint={{
                'fill-extrusion-color': draw_colour
                    ,
                    'fill-extrusion-height': draw_height
                    ,
                    'fill-extrusion-base': draw_baseHeight
                  }}
                />

            </Map>
            </Col>
            <Col xs={6} md={2}> 
            <h3>User Controls</h3><br></br>
            <button onClick={this.handleClick.bind(this)}>
            {this.state.toggle ? 'SELECT SITE' : 'SELECT NEW SITE'}
            </button>
            <br></br>
            <br></br>
            <p>Site Envelope Transparency</p>
            {opacity}
            <input 
            style={{ width: 250 }}
            id="opacity_slider" 
            type="range" 
            defaultValue="0.5"
            min="0" max="1"  
            step="0.01"
            onChange={this.opacityChange.bind(this)}
            ref={(input) => this.input = input}
            />
            <br></br><br></br>
            <button onClick={this.handleExtrude.bind(this)}>
            EXTRUDE SELECTED
            </button> <br></br><br></br>
            <p>Height</p>
            {draw_height}
            <br></br>
            <input 
            style={{ width: 250 }}
            id="extrude_slider" 
            type="range" 
            defaultValue="0"
            min="0" max="150"
            step="3"
            onChange={this.extrudeChange.bind(this)}
            ref={(input) => this.input = input}
            />
            <br></br>
            <p>Base Height</p>
            {draw_baseHeight}
            <br></br>
            <input 
            style={{ width: 250 }}
            id="extrude_slider_base" 
            type="range" 
            defaultValue="0"
            min="0" max={draw_height} 
            step="3"
            onChange={this.extrudeBaseChange.bind(this)}
            ref={(input) => this.input = input}
            /><br></br>
            <p>Colour Picker</p>
            <CirclePicker
            onChangeComplete={ this.colourChange }
            /><br></br>
            <button onClick={this.handleGist.bind(this)}>
            SAVE BUILDING
            </button> <br></br>
            {gist_url}
            </Col>
            </Row>
            <Row id='controlcontainer'>
            <SiteInfo 
            stuff={this.state.string}
            SI_id={this.state.siteInfo_ID}
            SI_height={this.state.siteInfo_height}
            SI_baseHeight={this.state.siteInfo_baseHeight}
            SI_colour={this.state.siteInfo_colour}
            F_HOB={this.state.draw_height}
            F_level={this.state.feaso_level}
            F_area={this.state.feaso_area}
            F_FSR={this.state.feaso_FSR}
            F_areaB={this.state.feaso_areabuilding}
            />
            
            </Row>

            </div>
        );
    }
}

export default Map3D;
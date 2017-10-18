import React, { Component } from "react";
import ReactMapboxGl, { Layer , GeoJSONLayer, ScaleControl, ReactMapboxGL} from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { CirclePicker } from 'react-color';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import geojson from "./GeoJSON/minicity2d.js";
import geojsonMatch from "./GeoJSON/minicity3d_3.js";
import SiteInfo from './../Functions/siteInfo.js';
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
    feature.properties.ID = parseInt(feature.properties.ID)
    feature.properties.base_height = parseInt(feature.properties.base_height)
    return feature
    })
//initial extuded buildings geojson loaded in map 
var filteredGeojson = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{ 
  "type": "Polygon","coordinates": [[[151.205292222514,-33.8717258167423],[151.205298900679,-33.8717832668887],
  [151.205307631595,-33.8718573721096],[151.205527141532,-33.8718452797009],[151.205513803131,-33.871713060999],
  [151.205292222514,-33.8717258167423]]]},"properties":{"id":"0","height":20,"base_height":0,"colour":"#5d6eb6"}}]};

var drawnGeojson = {"type":"FeatureCollection","features":[{"id":"cc3f3de5a7d59ee9b27518a13fa65d2e","type":"Feature","properties":{"height":20,"base_height":0,"colour":"#5d6eb6"},"geometry":{"coordinates":[[[151.20851775060197,-33.87031814681491],[151.20848746189426,-33.871055199345335],[151.2088702693323,-33.871149221211155],[151.20925457742692,-33.87096649989355],[151.20928897260177,-33.870282586597284],[151.20889822536424,-33.869995409026224],[151.20851775060197,-33.87031814681491]]],"type":"Polygon"}}]} 


const Map = ReactMapboxGl({
  accessToken:'pk.eyJ1IjoibWFkZWxlaW5lam9oYW5zb24iLCJhIjoiY2lzczduYzJ4MDZrODJucGh0Mm1xbmVxNCJ9.i7q4iT8FFgh_y5v4we5UhQ'
});

//magik happens here
class Map3D extends Component {
//setting the initial state on load for the extruded buildings geojson and button state
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {filter: filteredGeojson, drawnBuilding: drawnGeojson, toggle: true, gist: " ", feaso_GBA: "", feaso_HOB: " ", feaso_level: "0", feaso_area: " ", feaso_areabuilding: " ", feaso_FSR: "0", draw: filteredGeojson, draw_colour:"#5d6eb6", draw_height: 0, draw_baseHeight: 0, opacity:0.5, siteInfo_ID: " ", siteInfo_height: " ", siteInfo_baseHeight: " ", siteInfo_colour: " ", siteInfo_HOB: " ", siteInfo_FSR: " ", siteInfo_council:" ", siteInfo_heritage:" ", siteInfo_landuse: " "};
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

 _onStyleLoad = (map, event) => {
        //console.log('map', map, 'event: ', event, this.refs.map)
        var Draw = MapboxDraw;
        console.log(Draw)
        map.addSource('loaded_geojson', {
            type: 'geojson',
            data: {geojson}
        })
        map.addLayer({
            'id': 'building_footprints',
            'type': 'fill-extrusion',
            'source': 'loaded_geojson',
            'paint': {
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
                  }
        });
        map.addControl(Draw)
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
    var FG_ID = filteredGeojson.features[0].properties.id;
    var FG_height1 = filteredGeojson.features[0].properties.height;
    var FG_Baseheight1 = filteredGeojson.features[0].properties.base_height;
    var FG_height2 = filteredGeojson.features[1].properties.height;
    var FG_Baseheight2 = filteredGeojson.features[1].properties.base_height;
    var FG_totalHeight = (FG_height2-FG_Baseheight2)+FG_height1;
    var FG_colour1 = filteredGeojson.features[0].properties.colour;
    var FG_HOB= filteredGeojson.features[0].properties.hob;
    var FG_FSR= filteredGeojson.features[0].properties.fsr;
    var FG_council= filteredGeojson.features[0].properties.council;
    var FG_heritage= filteredGeojson.features[0].properties.heritage;
    var FG_landuse= filteredGeojson.features[0].properties.landuse;
    //swaps old geojson for new
    this.setState({filter: filteredGeojson, siteInfo_ID: FG_ID, siteInfo_HOB: FG_HOB, siteInfo_FSR: FG_FSR, siteInfo_council: FG_council, siteInfo_heritage: FG_heritage, siteInfo_landuse: FG_landuse })
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
    const draw_geojson = this.drawControl.draw.getAll();
    var noOfId = draw_geojson.features.length
    noOfId = noOfId - 1;
    //var count = "";
    var i;
    for (i = 0; i <= noOfId; i++) {
    draw_geojson.features[i].properties = {"height":this.state.draw_height,"base_height":this.state.draw_baseHeight,"colour":this.state.draw_colour};
    }
    //count = count.substr(1).slice(0, -1);

    //draw_geojson.features[count].properties = {"height":this.state.draw_height,"base_height":this.state.draw_baseHeight,"colour":this.state.draw_colour};

    this.setState({drawnBuilding: draw_geojson});
    //console.log(JSON.stringify(this.state.drawnBuilding));
    //console.log(count)
  }

  opacityChange(event) {
    this.setState({opacity:event.target.value})
  }

  extrudeChange(event){
    const height_slide = parseFloat(event.target.value);

    this.setState({draw_height:height_slide, feaso_GBA: feaso_GBA+"m2", feaso_FSR: feaso_FSR, feaso_level: levels, feaso_areabuilding:level_area+"m2", feaso_area:rounded_area+"m2"})
   
    var draw_geojson1 = this.state.drawnBuilding;
    //console.log(draw_geojson)
    var draw_id = this.drawControl.draw.getSelectedIds();
    draw_id = draw_id[0]
    draw_id = draw_id.toString();

    var i;
    for (i=0; i<draw_geojson1.features.length; i++){
        if (draw_id == draw_geojson1.features[i].id){
             draw_geojson1.features[i].properties = {"height":height_slide,"base_height":this.state.draw_baseHeight,"colour":this.state.draw_colour};
            //return draw_geojson;
            console.log(draw_geojson1)
         }
         else{
            //return draw_geojson;
            console.log(":(")
         }
    }
    this.setState({drawnBuilding: draw_geojson1});
    //this.map.getSource('draw_layer').setData(this.state.drawnBuilding)

    console.log(this.state.drawnBuilding)

    // var noOfId = draw_geojson.features.length
    // noOfId = noOfId - 1;
    // //var count = "";
    // var i;
    // for (i = 0; i <= noOfId; i++) {
    // draw_geojson.features[i].properties = {"height":height_slide,"base_height":this.state.draw_baseHeight,"colour":this.state.draw_colour};
    // }

    //console.log(JSON.stringify(this.state.drawnBuilding));
    //console.log(count)

    // var i;
    // var j;
    // for (i = 0; i <= sel_id.length; i++) {
    //     for (j=0;j<=newState.features.length;j++){
    //         if (sel_id[i] == newState.features[j]){
    //             newState.features[0].properties.height = height_slide; 
    //             //console.log(JSON.stringify(newState))
    //             return newState;
    //         }
    //     }
    // }
    //newState.features[0].properties.height = parseFloat(event.target.value);

    var levels = event.target.value/3;
    var draw_area = area(this.state.draw);
    var rounded_area = Math.round(draw_area*100)/100;

    var level_area = rounded_area*levels;
    var level_area = Math.round(level_area*100)/100;

    var feaso_FSR = level_area/rounded_area;
    var feaso_FSR = Math.round(feaso_FSR*100)/100;

    var feaso_GBA = level_area*0.8;
    var feaso_GBA = Math.round(feaso_GBA*100)/100;
    
  }

  extrudeBaseChange(event){
    const bHeight = parseFloat(event.target.value);
    var draw_geojson2 = this.state.drawnBuilding;
    var draw_id = this.drawControl.draw.getSelectedIds();
    draw_id = draw_id[0]
    draw_id = draw_id.toString();

    var i;
    for (i=0; i<draw_geojson2.features.length; i++){
        if (draw_id == draw_geojson2.features[i].id){
             draw_geojson2.features[i].properties = {"height":this.state.draw_height,"base_height":bHeight,"colour":this.state.draw_colour};
            //return draw_geojson;
            console.log(draw_geojson2)
         }
         else{
            //return draw_geojson;
            console.log(":(")
         }
    }
    //count = count.substr(1).slice(0, -1);

    //draw_geojson.features[count].properties = {"height":this.state.draw_height,"base_height":this.state.draw_baseHeight,"colour":this.state.draw_colour};

    //console.log(JSON.stringify(this.state.drawnBuilding));
    //console.log(count)
    this.setState({draw_baseHeight:bHeight, drawnBuilding: draw_geojson2})
    //console.log(JSON.stringify(this.state.drawnBuilding));

  }

  colourChange = (color) => {
    var draw_geojson3 = this.state.drawnBuilding;
    var draw_id = this.drawControl.draw.getSelectedIds();
    draw_id = draw_id[0]
    draw_id = draw_id.toString();

    var i;
    for (i=0; i<draw_geojson3.features.length; i++){
        if (draw_id == draw_geojson3.features[i].id){
             draw_geojson3.features[i].properties = {"height":this.state.draw_height,"base_height":this.state.draw_baseHeight,"colour":color.hex};
            //return draw_geojson;
            //console.log(draw_geojson3)
         }
         else{
            //return draw_geojson;
            //console.log(":(")
         }
    }
    this.setState({ draw_colour: color.hex, drawnBuilding: draw_geojson3});

    //console.log(JSON.stringify(this.state.drawnBuilding));
  };

  handleGist(e){
var gh = new GitHub({
   username: 'Dugongg',
   password: 'nazmulisnumber1'
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
         content: JSON.stringify(this.state.drawnBuilding)
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
        console.log(this.state.drawnBuilding)
        var drawnBuildingVar = this.state.drawnBuilding
        var opacity = parseFloat(this.state.opacity)
        var draw = String(this.state.draw)
        var draw_height = parseFloat(this.state.draw_height)
        var draw_baseHeight = parseFloat(this.state.draw_baseHeight)
        var draw_colour = String(this.state.draw_colour)
        var gist_url = String(this.state.gist)
        //var drawnBuilding = this.state.drawnBuilding

        // make state building, geojson with multiple features each of which is a section. WHen you select
        // one of them and change the sliders it updates the right bit of the geoson. The geojson has a feature
        // id which is made by mapbox draw
        // add property to that geojson height, base_height and read off directly
        // function(e.height){
        //     building[filtered by current id].properties.height = e.height
        // }

        return (
            <div>
            <Row id='mapcontainer' className="show-grid">
           <Col xs={12} md={9} > 
            <ReactMapboxGL
                style={containerStyle}
                center={this.state.center}
                zoom={[13]}
                accessToken={this.props.accessToken}
                containerStyle={this.props.containerStyle}
                onStyleLoad={this._onStyleLoad}
                onClick={this._onClickMap}
                ref='map'
            > </ReactMapboxGL>
                // <DrawControl 
                // displayControlsDefault={false}
                // ref={(drawControl) => { this.drawControl = drawControl; }}
                // controls={{
                // "polygon" : true,
                // "trash" : true
                // }}
                
                // />
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
                //fillExtrusionOnClick
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
                data={this.state.drawnBuilding}
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
            <SiteInfo 
            stuff={this.state.string}
            SI_id={this.state.siteInfo_ID}
            SI_HOB={this.state.siteInfo_HOB}
            SI_FSR={this.state.siteInfo_FSR}
            SI_council={this.state.siteInfo_council}
            SI_heritage={this.state.siteInfo_heritage}
            SI_landuse={this.state.siteInfo_landuse}
            F_HOB={this.state.draw_height}
            F_level={this.state.feaso_level}
            F_area={this.state.feaso_area}
            F_FSR={this.state.feaso_FSR}
            F_areaB={this.state.feaso_areabuilding}
            F_GBA={this.state.feaso_GBA}
            />
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
            </div>
        );
    }
}

export default Map3D;
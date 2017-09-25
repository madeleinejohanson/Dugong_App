import React, { Component } from "react";
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Map3D from './../Map/map_3d.js';

class SiteInfo extends Component {

  render() {
          var F_HOB = parseInt(this.props.F_HOB);
          var SI_height = parseInt(this.props.SI_height);
          var F_level = parseInt(this.props.F_level);
          var F_levelx3 = F_level*3;
          

          const redStyle = {
          color: 'red'
          };

          const blueStyle = {
          color: 'blue'
          };

    return (
          <div>
          <Col xs={6} md={4}>
          <h4>Site Info</h4>
          <p>Important stuff here<br></br>{this.props.stuff}<br></br>
          ID: {this.props.SI_id}<br></br>
          Height: {this.props.SI_height}<br></br>
          Base Height: {this.props.SI_baseHeight}<br></br>
          Colour: {this.props.SI_colour}
          <br></br><br></br>
          Lot number: <br></br>
          Council:<br></br>
          HOB: <br></br>
          FSR:<br></br>
          Zoning:<br></br>
          Heritage:<br></br>
          </p>
          </Col>
          <Col xs={6} md={4}>
          <h4>Feaso</h4>
         
          <p>Height of building: </p>
          {F_HOB>SI_height ?
            <div style={redStyle}> {this.props.F_HOB} </div>
            :
            <div style={blueStyle}> {this.props.F_HOB} </div>
          }
          <br></br>


          <p>Levels of building: </p>
          {F_levelx3>SI_height ?
          <div style={redStyle}> {this.props.F_level} </div>
          :
          <div style={blueStyle}> {this.props.F_level} </div>
          }
          <br></br>



          <p>Area of floor: {this.props.F_area}<br></br>
          Area of building: {this.props.F_areaB}<br></br>
          FSR: {this.props.F_FSR}<br></br>
          No. of apartments<br></br>
          Approx build cost<br></br>
          </p>
          </Col>

        </div> 
    );
  }
}

export default SiteInfo;
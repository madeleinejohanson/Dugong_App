import React, { Component } from "react";
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Map3D from './../Map/map_3d.js';


class SiteInfo extends Component {



  render() {

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
          <p>
          Height of building: {this.props.F_HOB}<br></br>
          Levels of building: {this.props.F_level}<br></br>
          Area of floor: {this.props.F_area}<br></br>
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
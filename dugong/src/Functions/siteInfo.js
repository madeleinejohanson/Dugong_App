import React, { Component } from "react";
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Map3D from './../Map/map_3d.js';


class SiteInfo extends Component {



  render() {

    return (
          <div>
          <Col md={5}>
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
        <Col md={5}>
          <h4>Feaso</h4>
          <p>Important stuff here (What is red does not comply)<br></br>
          Height of building<br></br>
          Levels of building<br></br>
          Area of building<br></br>
          FSR<br></br>
          No. of apartments<br></br>
          Approx build cost<br></br>
          </p>
        </Col>
        </div> 
    );
  }
}

export default SiteInfo;
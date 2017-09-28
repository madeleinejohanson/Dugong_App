import React, { Component } from "react";
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import Map3D from './../Map/map_3d.js';

class SiteInfo extends Component {

  render() {
          var F_HOB = parseInt(this.props.F_HOB);
          var SI_HOB = parseInt(this.props.SI_HOB);
          var F_level = parseInt(this.props.F_level);
          var F_levelx3 = F_level*3;
          var SI_FSR = parseInt(this.props.SI_FSR);
          var F_FSR = parseInt(this.props.F_FSR);
          

          const redStyle = {
          color: 'red'
          };

          const blackStyle = {
          color: 'black'
          };

    return (
          <div>
          <Col xs={6} md={4}>
          <h4>Site Info</h4> 
          <p>
          Lot number: {this.props.SI_id}<br></br>
          Council: {this.props.SI_council}<br></br>
          HOB: {this.props.SI_HOB}<br></br>
          FSR: {this.props.SI_FSR}<br></br>
          Land use: {this.props.SI_landuse}<br></br>
          Heritage: {this.props.SI_heritage}<br></br>
          </p>
          </Col>
          <Col xs={6} md={4}>
          <h4>Feaso</h4>
         
          <p>Height of Building: </p> {F_HOB>SI_HOB ?
            <div style={redStyle}> {this.props.F_HOB} </div>
            :
            <div style={blackStyle}> {this.props.F_HOB} </div>
          }
          


          <p>Levels of Building: </p>
          {F_levelx3>SI_HOB ?
          <div style={redStyle}> {this.props.F_level} </div>
          :
          <div style={blackStyle}> {this.props.F_level} </div>
          }
          

          <p>FSR: </p>
          {F_FSR>SI_FSR ?
          <div style={redStyle}> {this.props.F_FSR} </div>
          :
          <div style={blackStyle}> {this.props.F_FSR} </div>
          }
          


          <p>

          Gross Floor Area (GFA): {this.props.F_areaB}<br></br>
          Gross Building Area (GBA): {this.props.F_GBA}<br></br>
          
          </p>
          </Col>

        </div> 
    );
  }
}

export default SiteInfo;
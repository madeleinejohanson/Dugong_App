import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import HeaderNavigation from './Navigation/header.js';
import Map3D from './Map/map_3d.js';
import SiteInfo from './Functions/siteInfo.js';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


function App() {
  return (
    <div style={{height:'100%'}}>
      <HeaderNavigation/>  
          <Map3D/> 


    </div>
  );
}

export default App;
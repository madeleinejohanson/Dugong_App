import React, { Component } from "react";
import HeaderNavigation from './Navigation/header.js';
import Map3D from './Map/map_3d.js';
import SiteInfo from './Functions/siteInfo.js';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';


function App() {
  return (
    <div style={{height:'100%'}}>
      <HeaderNavigation/>  
          <Map3D/> 


    </div>
  );
}

export default App;
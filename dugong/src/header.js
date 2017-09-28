import React, { Component } from "react";
//import 'bootstrap/dist/css/bootstrap.css';
import {Nav} from 'react-bootstrap';
import dugong from'./dugong.ico';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
// import Nav from 'react-bootstrap/lib/Nav';
// import Button from 'react-bootstrap/lib/Button';

class HeaderNavigation extends Component {
render() {
  return (
  	<Col md={9}>
    <nav className="navbar navbar-light navbar-fixed-top">
  	<h1 className="d-inline-block">
	<img src={dugong} height="120" alt=""/>
	{<b>  Dugong</b>}
	</h1>
	</nav>
	</Col>
  );
}
}
export default HeaderNavigation;
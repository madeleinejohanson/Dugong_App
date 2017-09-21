import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import dugong from'./dugong.ico';
// import Nav from 'react-bootstrap/lib/Nav';
// import Button from 'react-bootstrap/lib/Button';

class HeaderNavigation extends Component {
render() {
  return (
    <nav className="navbar navbar-light navbar-fixed-top">
  	<h1 className="d-inline-block">
	<img src={dugong} height="120" alt=""/>
	{<b>  Dugong</b>}
	</h1>
	</nav>
  );
}
}
export default HeaderNavigation;
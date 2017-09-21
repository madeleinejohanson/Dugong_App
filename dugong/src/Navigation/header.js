import React, { Component } from "react";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import dugong from'./dugong.ico';
// import Nav from 'react-bootstrap/lib/Nav';
// import Button from 'react-bootstrap/lib/Button';

class HeaderNavigation extends Component {
render() {
  return (

  	<h1>
	<img src={dugong} height="120" alt=""/>
	{<b>  Dugong</b>}
	</h1>

  );
}
}
export default HeaderNavigation;
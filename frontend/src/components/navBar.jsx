import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'

function NavBar() {
  return (
    <nav>
      <Link to='/'>Home</Link>   
      <Link to='/summary'>Summary</Link>
      <Link to='/ledger'>Ledger</Link>
    </nav>
  )
}


export default NavBar;
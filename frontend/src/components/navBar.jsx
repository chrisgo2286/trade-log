import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'

function NavBar() {
  return (
    <nav>
      <div className='site-links'>    
        <Link to='/'>HOME</Link>   
        <Link to='/portfolio'>PORTFOLIO</Link>
        <Link to='/ledger'>LEDGER</Link>
        <Link to='/analysis'>ANALYSIS</Link>
      </div>
      <div className="user-links">
        <span>Hello Christian!</span>
        <Link to='/'>LOG OUT</Link>
      </div>
    </nav>
  )
}


export default NavBar;
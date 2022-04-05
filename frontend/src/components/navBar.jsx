import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../index';
import '../styles/navbar.css'

export default function NavBar() {
  const user = useContext(UserContext)[0];

  function handleGreeting () {
    return (user.isLoggedIn) ? user.firstName: <Link to='/register'>REGISTER</Link>;
  }

  return (
    <nav>
      <div className='site-links'>    
        <Link to='/'>HOME</Link>   
        <Link to='/portfolio'>PORTFOLIO</Link>
        <Link to='/ledger'>LEDGER</Link>
        <Link to='/analysis'>ANALYSIS</Link>
      </div>
      <div className="user-links">
        <span>{ handleGreeting() }</span>
        <Link to='/login'>LOG IN</Link>
      </div>
    </nav>
  )
}

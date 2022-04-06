import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../index';
import LogOut from './logout';
import '../styles/navbar.css';

export default function NavBar() {
  const user = useContext(UserContext)[0];

  function handleGreeting () {
    return (user.isLoggedIn) ? createGreeting(): <Link to='/register'>REGISTER</Link>;
  }

  function createGreeting () {
    return 'Hi ' + user.username.slice(0,1).toUpperCase() + user.username.slice(1);
  }
  function handleUserStatus () {
    return (user.isLoggedIn) ? <LogOut />: <Link to='/login'>LOG IN</Link>
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
        { handleUserStatus() } 
      </div>
    </nav>
  )
}

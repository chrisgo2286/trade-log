import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../index';

export default function LogOut () {
  const user = useContext(UserContext)[0];
  const setUser = useContext(UserContext)[1];
  const navigate = useNavigate();
  
  function handleLogOut () {
    if(localStorage.getItem('token') !== '') {  
      axios.post('/api/accounts/logout/')
        .then(response => {
          console.log(response)
      });

      localStorage.setItem('token', '');
      let token = localStorage.getItem('token');
      let username = localStorage.getItem('username');

      setUser({
        isLoggedIn: (token) ? true: false,
        token: (token) ? token: '',
        username: (username) ? username: '',
      });

      navigate('/');

    }
  }

  return (
    <a className='logout' onClick={ handleLogOut }>LOG OUT</a>
  )
}
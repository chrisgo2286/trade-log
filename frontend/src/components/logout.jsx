import { useEffect, useContext } from "react";
import axios from 'axios';
import { UserContext } from '../index';

export default function LogOut () {
  const user = useContext(UserContext)[0];
  const setUser = useContext(UserContext)[1];

  function handleLogOut () {
    if(localStorage.getItem('token') !== '') {  
      axios.post('/api/accounts/logout/')
        .then(response => {
          console.log(response)
      });

      localStorage.setItem('token', '');
      let token = localStorage.getItem('token');

      setUser({
        isLoggedIn: (token) ? true: false,
        token: (token) ? token: '',
        username: '',
      });
    }
  }

  return (
    <span onClick={ handleLogOut }>LOG OUT</span>
  )
}
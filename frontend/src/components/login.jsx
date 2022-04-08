import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './button';
import Modal from './modal';
import TradeInput from './tradeInput';
import { UserContext, TradeContext } from '../index';

export default function LogIn (props) {
  const trades = useContext(TradeContext);
  const user = useContext(UserContext)[0];
  const setUser = useContext(UserContext)[1];
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate();
 
  function closeModal () {
    navigate('/');
  }
 
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setCredentials(credentials => {
      return { ...credentials, [name]: value}}
    )
  }  
  
  function handleLogin () {
    const userData = {
      username: credentials.username,
      password: credentials.password,
    }
    
    axios.post('/api/accounts/login/', userData)
      .then(response => {
        console.log(response)
        
        if(response.status === 200) {
          const token = response.data.key;
          localStorage.setItem('token', token);
          localStorage.setItem('username', credentials.username);
          setUser(user => {
            return { 
              ...user,
              isLoggedIn: true,
              token: token, 
              username: credentials.username, 
            }
          })
          trades.refresh();

        }
    })

    setCredentials({
      username: '',
      password: ''
    })

    closeModal();
  }

  return (
    <Modal showModal={ true } exitModal={ closeModal }>
      <div className='modal-header'>
        <div>LOG IN</div>
      </div>
      <div className='modal-body'>
        <TradeInput 
          name='username'
          type='text'
          value={ credentials.username }
          onChange={ handleChange } />
        <TradeInput 
          name='password'
          type='password'
          value={ credentials.password }
          onChange={ handleChange } />
      </div>
      <div className="modal-btns">  
        <Button onClick={ handleLogin }>LOG IN</Button>
        <Button onClick={ closeModal }>Exit</Button>
      </div>

    </Modal>
  )
}
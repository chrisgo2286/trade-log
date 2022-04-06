import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './button';
import Modal from './modal';
import { UserContext } from '../index';

export default function Register (props) {
  const user = useContext(UserContext)[0];
  const setUser = useContext(UserContext)[1];
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
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
  
  function handleRegister(event) {
    console.log(event)
  }
  
  return (
    <Modal showModal={ true } exitModal={ closeModal }>
      <div className='register'>
        <div className='username-input'>
          <label htmlFor='username'>USERNAME</label>
          <input type='text' name='username' value={ credentials.username } onChange={ handleChange } />
        </div>
        <div className='username-input'>
          <label htmlFor='username'>E-MAIL</label>
          <input type='text' name='email' value={ credentials.email } onChange={ handleChange } />
        </div>
        <div className='password-input'>
          <label htmlFor='password'>PASSWORD</label>
          <input type='password' name='password1' value={ credentials.password1 } onChange={ handleChange } />
        </div>
        <div className='password-input'>
          <label htmlFor='password'>RETYPE PASSWORD</label>
          <input type='password' name='password2' value={ credentials.password2 } onChange={ handleChange } />
        </div>
        <div className='btns'>
          <Button onClick={ handleRegister }>REGISTER</Button>
          <Button onClick={ closeModal }>EXIT</Button>
        </div>
      </div>
    </Modal>
  )
}
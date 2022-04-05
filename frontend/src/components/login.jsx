import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './button';
import Modal from './modal';

export default function LogIn (props) {
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
    console.log(credentials)
    closeModal();
  }
  return (
    <Modal showModal={ true } exitModal={ closeModal }>
      <div className='login'>
      <div className='username-input'>
        <label htmlFor='username'>USERNAME</label>
        <input type='text' name='username' value={ credentials.username } onChange={ handleChange } />
      </div>
      <div className='password-input'>
        <label htmlFor='password'>PASSWORD</label>
        <input type='password' name='password' value={ credentials.password } onChange={ handleChange } />
      </div>
        <Button onClick={ handleLogin }>LOG IN</Button>
        <Button onClick={ closeModal }>Exit</Button>
      </div>
    </Modal>
  )
}
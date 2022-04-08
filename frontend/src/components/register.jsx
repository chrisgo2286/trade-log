import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './button';
import Modal from './modal';
import TradeInput from './tradeInput';
import { UserContext } from '../index';
import { validateRegistration } from '../miscScripts/validator';
import ValidationErrors from './validationErrors';

export default function Register (props) {
  const user = useContext(UserContext)[0];
  const setUser = useContext(UserContext)[1];
  const [fieldErrors, setFieldErrors] = useState({});
  const [credentials, setCredentials] = useState({
    username: '',
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
  
  function handleRegister() {
    if(validateFields()) return;

    axios.post('api/accounts/registration/', credentials)
      .then(response => {
        console.log(response)

        if(response.status === 201) {
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
        }
      })
    setCredentials({
      username: '',
      password1: '',
      password2: '',
    })
    
    closeModal();
  }
  
  function validateFields() {
    const fieldErrors = validateRegistration(credentials);
    setFieldErrors(fieldErrors)
    return (Object.keys(fieldErrors).length > 0);
  }

  return (
    <Modal showModal={ true } exitModal={ closeModal }>
      <div className='modal-header'>
        <div>REGISTER</div>
      </div>
      <div className="modal-body">
        <TradeInput
          name='username'
          type='text'
          value={ credentials.username }
          onChange={ handleChange } />
        <TradeInput
          name='password1'
          type='password'
          value={ credentials.password1 }
          onChange={ handleChange } />
        <TradeInput
          name='password2'
          type='password'
          value={ credentials.password2 }
          onChange={ handleChange } />
      </div>
      <ValidationErrors errors={ Object.values(fieldErrors) }/>  
      <div className='modal-btns'>
        <Button onClick={ handleRegister }>REGISTER</Button>
        <Button onClick={ closeModal }>EXIT</Button>
      </div>
    </Modal>
  )
}
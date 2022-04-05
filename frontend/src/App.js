import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import Home from './components/home';
import Ledger from './components/ledger';
import Portfolio from './components/portfolio';
import Analysis from './components/analysis';
import LogIn from './components/login';
import { TradeContext, UserContext } from './index.js';
import axios from 'axios';
import './styles/App.css';

export default function App() {

  const fetchData = async () => {
    const result = await axios.get('/api/trades/',);
    setTrades({ ...trades, tradeList: result.data });
  };

  const [trades, setTrades] = useState({tradeList:[], refresh: fetchData});
  const [user, setUser] = useState({
    isLoggedIn: false,
    token: '',
    firstName: '',
  })

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <React.Fragment>
      <TradeContext.Provider value={ trades }>  
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={ <Home /> } />  
            <Route 
              path='/ledger' 
              element={ (user.isLoggedIn) ? <Ledger />: <LogIn /> } 
            />
            <Route 
              path='/portfolio' 
              element={ (user.isLoggedIn) ? <Portfolio />: <LogIn /> } 
            />
            <Route 
              path='/analysis' 
              element={ (user.isLoggedIn) ? <Analysis />: <LogIn /> } 
            />
            <Route 
              path='/login' 
              element={ <LogIn /> } 
            />
          </Routes>
        </Router>
      </TradeContext.Provider>
    </React.Fragment>
  );
}


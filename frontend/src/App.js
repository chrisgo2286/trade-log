import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import Home from './components/home';
import Ledger from './components/ledger';
import Summary from './components/summary';
import { TradeContext } from './index.js';
import axios from 'axios';
import './styles/App.css';

export default function App() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/trades/',);
      setTrades(result.data);
    };
  
    fetchData();
  }, []);
  
  return (
    <React.Fragment>
      <TradeContext.Provider value={ trades }>  
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={ <Home /> } />  
            <Route 
              path='/ledger' 
              element={ <Ledger /> } 
            />
            <Route 
              path='/summary' 
              element={ <Summary /> } 
            />
          </Routes>
        </Router>
      </TradeContext.Provider>
    </React.Fragment>
  );
}


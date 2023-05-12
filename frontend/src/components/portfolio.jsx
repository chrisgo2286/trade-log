import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockSummary from './stockSummary';
import Overview from './overview';
import ValueChart from './valueChart';
import CompositionChart from './compositionChart';
import Button from './button';
import '../styles/portfolio.css';

export default function Portfolio() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const result = await axios.get('/api/portfolio/',); //ADD PARAMS HERE
    setData(result.data);
    console.log(result.data)
  }

  useEffect(() => {
    fetchData()
  },[]);

  function handleFilter () {
    console.log('Filter btn pressed')
  }

  return(
    <div className="container">
      <div className='portfolio'>
        <div className='ledger-btns'>
          <Button onClick={ handleFilter }>FILTER</Button>
        </div>
        <div className='chart' id="chart1">
          <div className="chart-header">PORTFOLIO VALUE</div>
          <div className="chart-body">
            <ValueChart data={ (data.values) ? data.values: [] } />
          </div>
        </div>
        <div className='chart' id="chart2">
          <div className="chart-header">PORTFOLIO COMPOSITION</div>
          <div className="chart-body">
            <CompositionChart data={ (data.composition) ? data.composition: []} />
          </div>
        </div>
        <div className='chart' id="chart3">
          <div className="chart-header">CHART 3</div>
          <div className="chart-body"></div>
        </div>
        <div className='chart' id="overview">
          <div className="chart-header">OVERVIEW</div>
          <Overview data={ (data) ? data: {} } />
        </div>
        <div className="stock-summary">
          <StockSummary data={ (data.stocks) ? data.stocks: [] }/>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockSummary from './stockSummary';
import '../styles/portfolio.css';

export default function Portfolio() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const result = await axios.get('/api/portfolio/',);
    setData(result.data);
  }

  useEffect(() => {
    fetchData()
  },[]);

  return(
    <div className="container">
      <div className='portfolio'>
        <div className='chart' id="chart1">
          <div className="chart-header">CHART 1</div>
          <div className="chart-body"></div>
        </div>
        <div className='chart' id="chart2">
          <div className="chart-header">CHART 2</div>
          <div className="chart-body"></div>
        </div>
        <div className='chart' id="chart3">
          <div className="chart-header">CHART 3</div>
          <div className="chart-body"></div>
        </div>
        <div className='chart' id="chart4">
          <div className="chart-header">CHART 4</div>
          <div className="chart-body"></div>
        </div>
        <div className="stock-summary">
          <StockSummary data={ (data.stock_summary) ? data.stock_summary: [] }/>
        </div>
      </div>
    </div>
  );
}
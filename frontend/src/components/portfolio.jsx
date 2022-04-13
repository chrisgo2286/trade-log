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

  // function fetchData () {
  //   axios.get('/api/portfolio/',)
  //     .then(response => (
  //       setData(response.data)
  //     ))
  // }
  useEffect(() => {
    fetchData()
  },[]);

  return(
    <div className="container">
      <div className='portfolio'>
        <div className='chart' id="chart1">
          <div className="modal-header">CHART 1</div>
        </div>
        <div className='chart' id="chart2">
          <div className="modal-header">CHART 2</div>
        </div>
        <div className='chart' id="chart3">
          <div className="modal-header">CHART 3</div>
        </div>
        <div className='chart' id="chart4">
          <div className="modal-header">CHART 4</div>
        </div>
        <div className="stock-summary">
          <StockSummary data={ (data.stock_summary) ? data.stock_summary: [] }/>
        </div>
      </div>
    </div>
  );
}
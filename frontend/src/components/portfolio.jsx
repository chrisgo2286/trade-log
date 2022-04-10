import React from 'react';
import '../styles/portfolio.css';

function Portfolio() {
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
          <div className="data">
          </div>
        </div>
      </div>
    );
  }
  
  export default Portfolio;
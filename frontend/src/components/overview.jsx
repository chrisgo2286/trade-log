export default function Overview (props) {
  function formatValue (value) {
    if (value) {
      value = value.toLocaleString(undefined, {minimumFractionDigits: 2});
      return value;
    }
    return 0;
  }

  function handleClass () {
    return (props.data.return > 0) ? 'overview-value profit': 'overview-value loss';
  }

  return (
    <div className="overview">
      <div className='overview-stat'> 
        <div className='overview-category'>CURRENT MARKET VALUE</div> 
        <div className='overview-value'>${ formatValue(props.data.value) }</div>
      </div>
      <div className='overview-stat'>    
        <div className='overview-category'>ADJUSTED COST BASIS</div>
        <div className='overview-value'>${ formatValue(props.data.acb) }</div>
      </div>
      <div className='overview-stat'>
        <div className='overview-category'>PROFIT/LOSS</div>
        <div className={ handleClass() }>${ formatValue(props.data.return) }</div>
      </div>
      <div className='overview-stat'>
        <div className='overview-category'>ANNUAL RETURN</div>
        <div className={ handleClass() }>{ formatValue(props.data.roi) }%</div>
      </div>
    </div>
  )
}
export default function Overview (props) {
  function formatValue(value) {
    if (value) {
      value = value.toLocaleString(undefined, {minimumFractionDigits: 2});
      return value;
    }
    return 0;
  }

  return (
    <div className="overview">
        <div>ADJUSTED COST BASIS</div>
        <div>${ formatValue(props.data.acb) }</div>
        <div>CURRENT MARKET VALUE</div> 
        <div>${ formatValue(props.data.value) }</div>
        <div>PROFIT/LOSS</div>
        <div>${ formatValue(props.data.return) }</div>
        <div>RETURN</div>
        <div>{ formatValue(props.data.roi) }%</div>
    </div>
  )
}